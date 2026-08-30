import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const distDir = path.resolve("dist/client");
const screenshotsDir = path.resolve("screenshots");

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Simple static server for dist/client
function createServer(port) {
  const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".json": "application/json"
  };

  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split("?")[0];
    let filePath = path.join(distDir, reqUrl);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

// WebSocket client for Chrome DevTools Protocol
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const WebSocket = globalThis.WebSocket;
    if (!WebSocket) {
      throw new Error("Native WebSocket not supported in this Node version");
    }
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || "Runtime.evaluate exception");
    }
    return res.result ? res.result.value : undefined;
  }

  async screenshot(filename) {
    const res = await this.send("Page.captureScreenshot", { format: "png" });
    const buffer = Buffer.from(res.data, "base64");
    const filePath = path.join(screenshotsDir, filename);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runTests() {
  const PORT = 4321;
  const server = await createServer(PORT);
  console.log(`Static server running on http://127.0.0.1:${PORT}`);

  const debugPort = 9222;
  const chromeProcess = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=" + debugPort,
    "--disable-gpu",
    "--no-sandbox",
    "--disable-extensions",
    "--disable-background-networking",
    "about:blank"
  ], { stdio: "ignore" });

  // Wait for Chrome debugger endpoint
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const resp = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (resp.ok) {
        versionData = await resp.json();
        break;
      }
    } catch (e) {}
  }

  if (!versionData) {
    console.error("Failed to connect to Chrome remote debugging port.");
    chromeProcess.kill();
    server.close();
    process.exit(1);
  }

  // Create new target tab
  const newTabResp = await fetch(`http://127.0.0.1:${debugPort}/json/new?http://127.0.0.1:${PORT}/`, { method: "PUT" });
  const tabData = await newTabResp.json();
  const cdp = new CDPClient(tabData.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");

  const mobileViewports = [
    { w: 320, h: 667, name: "320x667 (iPhone SE 1)" },
    { w: 360, h: 720, name: "360x720 (Android Small)" },
    { w: 375, h: 844, name: "375x844 (iPhone 12/13/14)" },
    { w: 390, h: 844, name: "390x844 (iPhone 13/14 Pro)" },
    { w: 412, h: 932, name: "412x932 (Pixel 7 / Galaxy)" },
    { w: 430, h: 932, name: "430x932 (iPhone 14/15 Pro Max)" },
    { w: 546, h: 800, name: "546x800 (Foldable / Phablet)" },
    { w: 768, h: 932, name: "768x932 (iPad Mini Portrait)" }
  ];

  const desktopViewports = [
    { w: 1024, h: 800, name: "1024x800 (Tablet Landscape / Laptop)" },
    { w: 1280, h: 800, name: "1280x800 (MacBook Air / Laptop)" },
    { w: 1440, h: 900, name: "1440x900 (Standard Desktop)" },
    { w: 1920, h: 1080, name: "1920x1080 (Full HD Desktop)" }
  ];

  let allPassed = true;

  console.log("\n==================================================");
  console.log("1. DEEP TABLE OVERFLOW & WRAPPER CONTAINMENT AUDIT");
  console.log("==================================================");

  for (const vp of [mobileViewports[0], mobileViewports[2]]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 2,
      mobile: true
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await new Promise(r => setTimeout(r, 400));

    const tableReport = await cdp.eval(`(() => {
      const winWidth = window.innerWidth;
      const tables = [...document.querySelectorAll('table')];
      return tables.map(table => {
        const tableRect = table.getBoundingClientRect();
        const wrapper = table.closest('.table-wrap') || table.closest('.time-strip') || table.parentElement;
        const wrapRect = wrapper.getBoundingClientRect();
        const wrapStyle = getComputedStyle(wrapper);
        const isScrollContained = wrapStyle.overflowX === 'auto' || wrapStyle.overflowX === 'scroll' || wrapStyle.overflow === 'auto' || wrapStyle.overflow === 'scroll';
        
        return {
          tableWidth: Math.round(tableRect.width),
          tableScrollWidth: table.scrollWidth,
          tableWrapperWidth: Math.round(wrapRect.width),
          tableWrapperLeft: Math.round(wrapRect.left),
          tableWrapperRight: Math.round(wrapRect.right),
          tableWrapperOverflowsViewport: wrapRect.right > winWidth + 1 || wrapRect.left < -1,
          tableHasContainedHorizontalScroll: isScrollContained
        };
      });
    })()`);

    console.log(`\nTable Report at ${vp.name}: (${tableReport.length} tables found)`);
    for (let i = 0; i < tableReport.length; i++) {
      const rep = tableReport[i];
      const pass = !rep.tableWrapperOverflowsViewport && rep.tableHasContainedHorizontalScroll;
      if (pass) {
        console.log(`  ✅ Table #${i+1}: tableWidth=${rep.tableWidth}px, wrapperWidth=${rep.tableWrapperWidth}px (L=${rep.tableWrapperLeft}, R=${rep.tableWrapperRight}), wrapperOverflowsVP=${rep.tableWrapperOverflowsViewport ? 'YES (FAIL)' : 'NO (PASS)'}, containedScroll=${rep.tableHasContainedHorizontalScroll ? 'YES (PASS)' : 'NO'}`);
      } else {
        console.error(`  ❌ Table #${i+1} FAIL: wrapperOverflowsVP=${rep.tableWrapperOverflowsViewport}, containedScroll=${rep.tableHasContainedHorizontalScroll}`);
        allPassed = false;
      }
    }
  }

  console.log("\n==================================================");
  console.log("2. EXHAUSTIVE DOM HORIZONTAL OVERFLOW SCAN (* query)");
  console.log("==================================================");

  for (const vp of mobileViewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 2,
      mobile: true
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await new Promise(r => setTimeout(r, 400));

    const domScan = await cdp.eval(`(() => {
      const winWidth = window.innerWidth;
      const allElements = [...document.querySelectorAll('*')];
      const overflowing = [];

      for (const el of allElements) {
        // Skip elements inside a known horizontal scroll/clipped container
        if (el.closest('.table-wrap') && el !== el.closest('.table-wrap')) continue;
        if (el.closest('.time-strip') && el !== el.closest('.time-strip')) continue;
        if (el.closest('.mobile-nav-drawer')) continue; // drawer manages its own bounds

        const rect = el.getBoundingClientRect();
        // Ignore invisible or zero-size elements
        if (rect.width === 0 || rect.height === 0) continue;
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;

        if (rect.right > winWidth + 1 || rect.left < -1) {
          overflowing.push({
            tag: el.tagName.toLowerCase(),
            className: el.className || '',
            id: el.id || '',
            parent: el.parentElement ? (el.parentElement.tagName.toLowerCase() + '.' + (el.parentElement.className || '')) : 'none',
            text: (el.textContent || '').slice(0, 40).trim(),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      }

      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;

      return {
        winWidth,
        docWidth,
        bodyWidth,
        hasDocOverflow: docWidth > winWidth + 1,
        overflowingElements: overflowing.slice(0, 5)
      };
    })()`);

    if (!domScan.hasDocOverflow && domScan.overflowingElements.length === 0) {
      console.log(`✅ ${vp.name}: 0 overflowing elements (docWidth=${domScan.docWidth}px, vpWidth=${domScan.winWidth}px)`);
    } else {
      console.error(`❌ ${vp.name} FAIL: ${domScan.overflowingElements.length} overflowing elements found!`, domScan.overflowingElements);
      allPassed = false;
    }
  }

  console.log("\n==================================================");
  console.log("3. HEADER BOUNDARIES, CONTENT CLEARANCE & SITE TITLE");
  console.log("==================================================");

  for (const vp of mobileViewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 2,
      mobile: true
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await new Promise(r => setTimeout(r, 400));

    const headerMetrics = await cdp.eval(`(() => {
      const header = document.querySelector('.header');
      const headerContainer = document.querySelector('.header-container');
      const logoLink = document.querySelector('.logo-link');
      const logoIcon = document.querySelector('.logo-icon');
      const siteName = document.querySelector('.site-name');
      const main = document.querySelector('main');
      const firstContent = main ? (main.querySelector('nav.breadcrumb') || main.querySelector('section') || main.firstElementChild) : null;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const hRect = header ? header.getBoundingClientRect() : null;
      const hcRect = headerContainer ? headerContainer.getBoundingClientRect() : null;
      const sRect = siteName ? siteName.getBoundingClientRect() : null;
      const lRect = logoIcon ? logoIcon.getBoundingClientRect() : null;
      const fcRect = firstContent ? firstContent.getBoundingClientRect() : null;

      return {
        headerLeft: hRect ? Math.round(hRect.left) : -999,
        headerRight: hRect ? Math.round(hRect.right) : -999,
        headerWidth: hRect ? Math.round(hRect.width) : -999,
        headerHeight: hRect ? Math.round(hRect.height) : -999,
        headerBottom: hRect ? Math.round(hRect.bottom) : -999,
        headerRatio: hRect ? (hRect.height / winHeight) : 1,
        siteNameLeft: sRect ? Math.round(sRect.left) : -999,
        siteNameRight: sRect ? Math.round(sRect.right) : -999,
        siteNameWidth: sRect ? Math.round(sRect.width) : 0,
        logoVisible: lRect ? (lRect.width > 0 && lRect.left >= 0) : false,
        firstContentTop: fcRect ? Math.round(fcRect.top) : -999,
        contentClearedHeader: fcRect && hRect ? (fcRect.top >= hRect.bottom - 2) : false
      };
    })()`);

    const boundsPass = headerMetrics.headerLeft >= 0 && headerMetrics.headerRight <= vp.w && headerMetrics.headerWidth <= vp.w;
    const heightPass = headerMetrics.headerHeight >= 48 && headerMetrics.headerHeight <= 60 && headerMetrics.headerRatio <= 0.10;
    const titlePass = headerMetrics.siteNameLeft >= 0 && headerMetrics.siteNameRight <= vp.w && headerMetrics.siteNameWidth > 0 && headerMetrics.logoVisible;
    const clearancePass = headerMetrics.contentClearedHeader;

    if (boundsPass && heightPass && titlePass && clearancePass) {
      console.log(`✅ ${vp.name} | Header: ${headerMetrics.headerWidth}x${headerMetrics.headerHeight}px (L=${headerMetrics.headerLeft}, R=${headerMetrics.headerRight}, ${Math.round(headerMetrics.headerRatio*100)}% of VP) | Title: ${headerMetrics.siteNameWidth}px (L=${headerMetrics.siteNameLeft}, R=${headerMetrics.siteNameRight}) | Content Top=${headerMetrics.firstContentTop}px (Cleared: YES)`);
    } else {
      console.error(`❌ ${vp.name} FAIL: boundsPass=${boundsPass}, heightPass=${heightPass} (H=${headerMetrics.headerHeight}px), titlePass=${titlePass}, clearancePass=${clearancePass} (contentTop=${headerMetrics.firstContentTop} vs headerBottom=${headerMetrics.headerBottom})`);
      allPassed = false;
    }
  }

  console.log("\n==================================================");
  console.log("4. STICKY HEADER ACCESSIBILITY & SCROLL STABILITY");
  console.log("==================================================");

  // Test across scroll positions at 375x844
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 375, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
  await new Promise(r => setTimeout(r, 400));

  const scrollOffsets = [0, 200, 500, 1200, 2500, 4000];
  for (const scrollY of scrollOffsets) {
    await cdp.eval(`window.scrollTo(0, ${scrollY})`);
    await new Promise(r => setTimeout(r, 120));

    const scrollCheck = await cdp.eval(`(() => {
      const header = document.querySelector('.header');
      const hRect = header.getBoundingClientRect();
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;

      return {
        scrollY: window.scrollY,
        top: Math.round(hRect.top),
        height: Math.round(hRect.height),
        width: Math.round(hRect.width),
        overflow: docWidth > winWidth + 1
      };
    })()`);

    const pass = Math.abs(scrollCheck.top) <= 1 && scrollCheck.height <= 60 && !scrollCheck.overflow;
    if (pass) {
      console.log(`✅ Scroll Y=${scrollY}px: Sticky Header Top=${scrollCheck.top}px, Height=${scrollCheck.height}px, Width=${scrollCheck.width}px, Overflow=NO`);
    } else {
      console.error(`❌ Scroll Y=${scrollY}px FAIL: top=${scrollCheck.top}, height=${scrollCheck.height}, overflow=${scrollCheck.overflow}`);
      allPassed = false;
    }
  }

  console.log("\n==================================================");
  console.log("5. INTERACTION AUDIT: SEARCH, HAMBURGER & CLEAN CLOSING");
  console.log("==================================================");

  const interactionCheck = await cdp.eval(`(() => {
    const searchBtn = document.querySelector('.search-header-btn');
    const searchModal = document.querySelector('#global-search-modal');
    const searchClose = document.querySelector('#search-modal-close');
    const menuBtn = document.querySelector('#mobile-menu-toggle');
    const drawer = document.querySelector('#mobile-nav-drawer');

    // 1. Test Search Modal Open
    searchBtn.click();
    const searchOpened = searchModal.classList.contains('is-open') && searchModal.getAttribute('aria-hidden') === 'false';
    const searchBackdropVisible = getComputedStyle(searchModal).visibility === 'visible';

    // Close Search Modal
    if (searchClose) searchClose.click();
    const searchClosed = !searchModal.classList.contains('is-open') && searchModal.getAttribute('aria-hidden') === 'true';
    const searchNoBackdrop = getComputedStyle(searchModal).visibility === 'hidden' || getComputedStyle(searchModal).opacity === '0';

    // 2. Test Mobile Menu Open
    menuBtn.click();
    const menuOpened = drawer.classList.contains('is-open') && drawer.getAttribute('aria-hidden') === 'false' && menuBtn.getAttribute('aria-expanded') === 'true';
    const drawerHeight = drawer.getBoundingClientRect().height;

    // Close Mobile Menu
    menuBtn.click();
    const menuClosed = !drawer.classList.contains('is-open') && drawer.getAttribute('aria-hidden') === 'true' && menuBtn.getAttribute('aria-expanded') === 'false';
    const drawerHidden = getComputedStyle(drawer).visibility === 'hidden' || getComputedStyle(drawer).opacity === '0';

    // 3. Verify no lingering overlay or scroll lock
    const bodyScrollLocked = document.body.classList.contains('nav-open') || getComputedStyle(document.body).overflow === 'hidden';

    return {
      searchOpened,
      searchBackdropVisible,
      searchClosed,
      searchNoBackdrop,
      menuOpened,
      drawerHeight: Math.round(drawerHeight),
      menuClosed,
      drawerHidden,
      bodyScrollLocked
    };
  })()`);

  const searchPass = interactionCheck.searchOpened && interactionCheck.searchClosed && interactionCheck.searchNoBackdrop;
  const menuPass = interactionCheck.menuOpened && interactionCheck.menuClosed && interactionCheck.drawerHidden && !interactionCheck.bodyScrollLocked;

  if (searchPass && menuPass) {
    console.log(`✅ Search Modal: Opens properly, Closes cleanly with NO invisible overlay blocking page.`);
    console.log(`✅ Mobile Drawer: Opens properly (Height=${interactionCheck.drawerHeight}px), Closes cleanly with NO lingering backdrop or scroll lock.`);
  } else {
    console.error("❌ Interaction FAIL:", interactionCheck);
    allPassed = false;
  }

  console.log("\n==================================================");
  console.log("6. DESKTOP VIEWPORT INTEGRITY VERIFICATION");
  console.log("==================================================");

  for (const vp of desktopViewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 1,
      mobile: false
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await new Promise(r => setTimeout(r, 400));

    const deskMetrics = await cdp.eval(`(() => {
      const header = document.querySelector('.header');
      const desktopNav = document.querySelector('.desktop-nav');
      const menuBtn = document.querySelector('#mobile-menu-toggle');
      const searchBtnText = document.querySelector('.search-btn-text');
      const searchBtnKbd = document.querySelector('.search-btn-kbd');
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const hRect = header ? header.getBoundingClientRect() : null;

      const navItems = desktopNav ? [...desktopNav.querySelectorAll('.nav-link')].map(a => a.textContent.trim()) : [];

      return {
        docWidth,
        winWidth,
        overflow: docWidth > winWidth + 1,
        headerHeight: hRect ? Math.round(hRect.height) : 0,
        desktopNavVisible: desktopNav && getComputedStyle(desktopNav).display !== 'none',
        menuBtnHidden: !menuBtn || getComputedStyle(menuBtn).display === 'none',
        searchTextVisible: searchBtnText && getComputedStyle(searchBtnText).display !== 'none',
        searchKbdVisible: searchBtnKbd && getComputedStyle(searchBtnKbd).display !== 'none',
        navCount: navItems.length
      };
    })()`);

    const pass = !deskMetrics.overflow && deskMetrics.desktopNavVisible && deskMetrics.menuBtnHidden && deskMetrics.searchTextVisible && deskMetrics.navCount === 6;
    if (pass) {
      console.log(`✅ ${vp.name} | Header Height=${deskMetrics.headerHeight}px | Nav Items=${deskMetrics.navCount} (Visible) | Hamburger=HIDDEN | Search Bar=FULL`);
    } else {
      console.error(`❌ ${vp.name} FAIL:`, deskMetrics);
      allPassed = false;
    }
  }

  console.log("\n==================================================");
  console.log("7. CAPTURING REAL BROWSER SCREENSHOTS");
  console.log("==================================================");

  const screenshotSpecs = [
    { w: 320, h: 667, scrollY: 0, file: "mobile-320x667-top.png" },
    { w: 320, h: 667, scrollY: 500, file: "mobile-320x667-scroll500.png" },
    { w: 320, h: 667, scrollY: 1200, file: "mobile-320x667-scroll1200.png" },
    { w: 360, h: 720, scrollY: 0, file: "mobile-360x720-top.png" },
    { w: 360, h: 720, scrollY: 500, file: "mobile-360x720-scroll500.png" },
    { w: 375, h: 844, scrollY: 0, file: "mobile-375x844-top.png" },
    { w: 375, h: 844, scrollY: 500, file: "mobile-375x844-scroll500.png" },
    { w: 375, h: 844, scrollY: 1200, file: "mobile-375x844-scroll1200.png" },
    { w: 390, h: 844, scrollY: 0, file: "mobile-390x844-top.png" },
    { w: 412, h: 932, scrollY: 0, file: "mobile-412x932-top.png" },
    { w: 430, h: 932, scrollY: 0, file: "mobile-430x932-top.png" },
    { w: 1440, h: 900, scrollY: 0, file: "desktop-1440x900-top.png" }
  ];

  for (const s of screenshotSpecs) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: s.w,
      height: s.h,
      deviceScaleFactor: 2,
      mobile: s.w <= 768
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await new Promise(r => setTimeout(r, 400));
    if (s.scrollY > 0) {
      await cdp.eval(`window.scrollTo(0, ${s.scrollY})`);
      await new Promise(r => setTimeout(r, 150));
    }
    const savedPath = await cdp.screenshot(s.file);
    console.log(`📸 Captured screenshot: ${s.file} (${s.w}x${s.h}, Y=${s.scrollY}) -> ${savedPath}`);
  }

  cdp.close();
  chromeProcess.kill();
  server.close();

  if (allPassed) {
    console.log("\n==================================================");
    console.log("🎉 ALL IN-DEPTH BEHAVIORAL & VISUAL CHECKS PASSED!");
    console.log("==================================================\n");
    process.exit(0);
  } else {
    console.error("\n❌ TESTS FAILED.\n");
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});