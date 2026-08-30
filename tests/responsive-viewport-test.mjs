import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const distDir = path.resolve("dist/client");

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

  const viewportWidths = [320, 360, 375, 390, 412, 430, 546, 768, 1024, 1280, 1440, 1920];
  const viewportHeights = [667, 720, 800, 844, 932];

  console.log("\n==================================================");
  console.log("1. TESTING MOBILE VIEWPORT DIMENSIONS & HEADER METRICS");
  console.log("==================================================\n");

  let allPassed = true;

  for (const width of viewportWidths) {
    for (const height of viewportHeights) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 2,
        mobile: width <= 768
      });

      await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
      await new Promise(r => setTimeout(r, 300));

      const metrics = await cdp.eval(`(() => {
        const header = document.querySelector('.header');
        const siteName = document.querySelector('.site-name');
        const searchBtn = document.querySelector('.search-header-btn');
        const menuBtn = document.querySelector('#mobile-menu-toggle');
        const desktopNav = document.querySelector('.desktop-nav');
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const headerRect = header ? header.getBoundingClientRect() : null;

        return {
          winWidth,
          docWidth,
          bodyWidth,
          hasHorizontalOverflow: docWidth > winWidth + 1,
          headerHeight: headerRect ? headerRect.height : 0,
          searchBtnVisible: searchBtn && getComputedStyle(searchBtn).display !== 'none',
          menuBtnVisible: menuBtn && getComputedStyle(menuBtn).display !== 'none',
          desktopNavVisible: desktopNav && getComputedStyle(desktopNav).display !== 'none'
        };
      })()`);

      const isMobile = width <= 768;
      const overflowPass = !metrics.hasHorizontalOverflow;
      const heightPass = isMobile ? (metrics.headerHeight >= 45 && metrics.headerHeight <= 70) : (metrics.headerHeight <= 80);
      const navModePass = isMobile ? (metrics.menuBtnVisible && !metrics.desktopNavVisible) : (!metrics.menuBtnVisible && metrics.desktopNavVisible);

      if (!overflowPass || !heightPass || !navModePass) {
        console.error(`❌ FAIL at ${width}x${height}: overflow=${metrics.hasHorizontalOverflow} (${metrics.docWidth}px vs ${width}px), headerHeight=${metrics.headerHeight}px, menuBtn=${metrics.menuBtnVisible}, desktopNav=${metrics.desktopNavVisible}`);
        allPassed = false;
      } else {
        console.log(`✅ PASS: ${width}x${height} | Header H=${Math.round(metrics.headerHeight)}px | Overflow=NO | NavMode=${isMobile ? 'Mobile Hamburger' : 'Desktop Bar'}`);
      }
    }
  }

  console.log("\n==================================================");
  console.log("2. TESTING SCROLL BEHAVIOR & STICKY POSITIONING");
  console.log("==================================================\n");

  // Test scroll behavior at 375x812
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
  await new Promise(r => setTimeout(r, 300));

  const scrollPositions = [0, 200, 500, 1200, 2500, 4000];
  for (const scrollY of scrollPositions) {
    await cdp.eval(`window.scrollTo(0, ${scrollY})`);
    await new Promise(r => setTimeout(r, 100));

    const scrollMetrics = await cdp.eval(`(() => {
      const header = document.querySelector('.header');
      const rect = header.getBoundingClientRect();
      const docScrollWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return {
        scrollY: window.scrollY,
        headerTop: rect.top,
        headerHeight: rect.height,
        hasHorizontalOverflow: docScrollWidth > winWidth + 1
      };
    })()`);

    const stickyPass = Math.abs(scrollMetrics.headerTop) <= 2;
    const heightPass = scrollMetrics.headerHeight >= 45 && scrollMetrics.headerHeight <= 70;
    const noOverflow = !scrollMetrics.hasHorizontalOverflow;

    if (stickyPass && heightPass && noOverflow) {
      console.log(`✅ Scroll at Y=${scrollY}px: Header sticky at top=${Math.round(scrollMetrics.headerTop)}px, Height=${Math.round(scrollMetrics.headerHeight)}px, Overflow=NO`);
    } else {
      console.error(`❌ FAIL Scroll at Y=${scrollY}px: top=${scrollMetrics.headerTop}, height=${scrollMetrics.headerHeight}`);
      allPassed = false;
    }
  }

  console.log("\n==================================================");
  console.log("3. TESTING MOBILE NAVIGATION DRAWER OPEN & CLOSE");
  console.log("==================================================\n");

  const menuTest = await cdp.eval(`(() => {
    const btn = document.querySelector('#mobile-menu-toggle');
    const drawer = document.querySelector('#mobile-nav-drawer');
    const initialClosed = !drawer.classList.contains('is-open') && drawer.getAttribute('aria-hidden') === 'true';

    // Click to open
    btn.click();
    const afterOpen = drawer.classList.contains('is-open') && drawer.getAttribute('aria-hidden') === 'false' && btn.getAttribute('aria-expanded') === 'true';
    const drawerRect = drawer.getBoundingClientRect();

    // Click to close
    btn.click();
    const afterClose = !drawer.classList.contains('is-open') && drawer.getAttribute('aria-hidden') === 'true' && btn.getAttribute('aria-expanded') === 'false';

    return {
      initialClosed,
      afterOpen,
      drawerHeight: drawerRect.height,
      afterClose
    };
  })()`);

  if (menuTest.initialClosed && menuTest.afterOpen && menuTest.afterClose) {
    console.log(`✅ Mobile menu open/close interaction passed cleanly! Drawer height when open: ${Math.round(menuTest.drawerHeight)}px`);
  } else {
    console.error("❌ FAIL mobile menu interaction:", menuTest);
    allPassed = false;
  }

  console.log("\n==================================================");
  console.log("4. TESTING SEARCH MODAL TRIGGER ON MOBILE");
  console.log("==================================================\n");

  const searchTest = await cdp.eval(`(() => {
    const searchBtn = document.querySelector('.search-header-btn');
    const modal = document.querySelector('#global-search-modal');
    const initialClosed = !modal.classList.contains('is-open');

    searchBtn.click();
    const afterOpen = modal.classList.contains('is-open') && modal.getAttribute('aria-hidden') === 'false';

    const closeBtn = document.querySelector('#search-modal-close');
    if (closeBtn) closeBtn.click();
    const afterClose = !modal.classList.contains('is-open');

    return {
      initialClosed,
      afterOpen,
      afterClose
    };
  })()`);

  if (searchTest.initialClosed && searchTest.afterOpen && searchTest.afterClose) {
    console.log("✅ Search modal opens and closes correctly on mobile trigger button click!");
  } else {
    console.error("❌ FAIL search modal trigger:", searchTest);
    allPassed = false;
  }

  cdp.close();
  chromeProcess.kill();
  server.close();

  if (allPassed) {
    console.log("\n🎉 ALL RESPONSIVE VIEWPORT & MOBILE HEADER TESTS PASSED 100%!\n");
    process.exit(0);
  } else {
    console.error("\n❌ SOME RESPONSIVE TESTS FAILED.\n");
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});