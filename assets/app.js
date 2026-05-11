(() => {
  // Back to Top Button - Initialize first, before anything else
  const initBackToTopButton = () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) {
      // Try again in 100ms if button not found
      setTimeout(initBackToTopButton, 100);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
      ticking = false;
    };

    // Use throttling with requestAnimationFrame
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Set initial state
    handleScroll();
  };

  // Initialize with multiple triggers to ensure it runs
  if (document.readyState === 'complete') {
    initBackToTopButton();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTopButton);
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initBackToTopButton();
      }
    });
  }

  // Also try immediately (in case button exists)
  setTimeout(initBackToTopButton, 0);

  const easternZone = "America/New_York";
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => [...document.querySelectorAll(s)];
  const state = {
    mode: qs("#converter")?.dataset.startMode || document.body.dataset.mode || "gmt-est",
    intent: qs("#converter")?.dataset.intent || "converter",
    labels: JSON.parse(qs("#converter")?.dataset.labels || "{}"),
    use24: true,
    lastText: ""
  };

  const intentLabels = state.labels.variants || {};

  function parts(date, timeZone) {
    const map = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZoneName: "short"
    }).formatToParts(date).forEach((part) => { map[part.type] = part.value; });
    return map;
  }

  function zoneName(date) {
    return parts(date, easternZone).timeZoneName || "ET";
  }

  function offsetMinutes(date) {
    const p = parts(date, easternZone);
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((asUTC - date.getTime()) / 60000);
  }

  function localEasternToUtc(value) {
    const [d, t] = value.split("T");
    const [year, month, day] = d.split("-").map(Number);
    const [hour, minute] = t.split(":").map(Number);
    const base = Date.UTC(year, month - 1, day, hour, minute);
    let guess = base - offsetMinutes(new Date(base)) * 60000;
    for (let i = 0; i < 4; i += 1) {
      guess = base - offsetMinutes(new Date(guess)) * 60000;
    }
    return new Date(guess);
  }

  function parseInput() {
    const value = qs("#datetime").value;
    if (!value) return null;
    if (state.mode === "gmt-est") return new Date(`${value}:00Z`);
    return localEasternToUtc(value);
  }

  function format(date, timeZone) {
    return new Intl.DateTimeFormat(undefined, {
      timeZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: !state.use24,
      timeZoneName: "short"
    }).format(date);
  }

  function compact(date, timeZone) {
    return new Intl.DateTimeFormat(undefined, {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: !state.use24,
      timeZoneName: "short"
    }).format(date);
  }

  function setInputFromDate(date, zone) {
    const p = zone === "UTC" ? parts(date, "UTC") : parts(date, easternZone);
    qs("#datetime").value = `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
  }

  function explain(date) {
    const offset = offsetMinutes(date);
    const hours = Math.abs(offset / 60);
    const z = zoneName(date);
    return `${z} is ${hours} hours behind GMT on this date. DST transitions can create skipped or repeated local hours, so date-aware conversion is essential.`;
  }

  function shortFormat(date, timeZone) {
    return new Intl.DateTimeFormat(undefined, {
      timeZone,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: !state.use24,
      timeZoneName: "short"
    }).format(date);
  }

  function setText(selector, text) {
    const node = qs(selector);
    if (node) node.textContent = text;
  }

  function convert() {
    const date = parseInput();
    if (!date || Number.isNaN(date.getTime())) return;
    const target = state.mode === "gmt-est" ? easternZone : "UTC";
    const source = state.mode === "gmt-est" ? "UTC" : easternZone;
    const label = state.mode === "gmt-est" ? "Eastern Time" : "GMT";
    const easternLabel = format(date, easternZone);
    const gmtLabel = format(date, "UTC");
    if (state.intent === "difference") {
      state.lastText = `GMT: ${gmtLabel} | ${state.labels.eastern || "Eastern"}: ${easternLabel} | ${explain(date)}`;
    } else if (state.intent === "guide") {
      state.lastText = `${state.labels.meetingPlanner || "Meeting planner"}: ${gmtLabel} ${state.labels.is || "is"} ${easternLabel}`;
    } else {
      state.lastText = `${label}: ${format(date, target)}`;
    }
    const result = qs("#result");
    result.textContent = state.intent === "difference"
      ? `${Math.abs(offsetMinutes(date) / 60)} ${state.labels.hoursBehindGmt || "hours behind GMT"}`
      : shortFormat(date, target);
    result.classList.remove("pulse");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        result.classList.add("pulse");
      });
    });
    setText("#sourcePreview", shortFormat(date, source));
    setText("#difference", state.intent === "guide"
      ? `${state.labels.bestForScheduling || "Best for scheduling"}: ${gmtLabel} ${state.labels.convertsTo || "converts to"} ${easternLabel}. ${explain(date)}`
      : explain(date));
    setText("#offsetBadge", `${Math.abs(offsetMinutes(date) / 60)}h difference - ${zoneName(date)}`);
  }

  function tick() {
    const now = new Date();
    qs("#gmtClock").textContent = compact(now, "UTC");
    qs("#estClock").textContent = compact(now, easternZone);
    qs("#estZone").textContent = zoneName(now);
  }

  function buildTable() {
    const tbody = qs("#timeTable tbody");
    if (!tbody) return;
    const today = new Date();
    const p = parts(today, "UTC");
    tbody.innerHTML = "";
    for (let h = 0; h < 24; h += 1) {
      const date = new Date(Date.UTC(+p.year, +p.month - 1, +p.day, h, 0));
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${String(h).padStart(2, "0")}:00 GMT</td><td>${format(date, easternZone)}</td><td>${Math.abs(offsetMinutes(date) / 60)} hours behind</td>`;
      tbody.appendChild(tr);
    }
  }

  function buildStrip() {
    const strip = qs("#timeStrip");
    if (!strip) return;
    strip.innerHTML = "";
    for (let h = 0; h < 24; h += 1) {
      const cell = document.createElement("span");
      const isOverlap = h >= 13 && h <= 18;
      cell.className = isOverlap ? "overlap" : "";
      cell.innerHTML = `<b>${String(h).padStart(2, "0")}:00</b><small>GMT</small>`;
      strip.appendChild(cell);
    }
  }

  function applyMode(mode) {
    state.mode = state.intent === "reverse" ? "est-gmt" : mode;
    if (state.intent === "difference" || state.intent === "guide") state.mode = "gmt-est";
    document.body.dataset.mode = mode;
    qsa(".mode").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
    const labels = intentLabels[state.intent] || intentLabels.converter;
    if (state.intent === "converter") {
      const modeLabels = labels[state.mode] || labels["gmt-est"];
      setText("#converterHeading", modeLabels.heading);
      setText("#inputZoneName", modeLabels.input);
      setText("#sourceZone", modeLabels.source);
      setText("#outputZoneName", modeLabels.target);
    } else {
      setText("#converterHeading", labels.heading);
      setText("#inputZoneName", labels.input);
      setText("#sourceZone", labels.source);
      setText("#outputZoneName", labels.target);
    }
    setInputFromDate(new Date(), state.mode === "gmt-est" ? "UTC" : easternZone);
    convert();
  }

  // Removed dark mode/theme switch logic

  function initReveal() {
    const items = qsa(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach((item) => observer.observe(item));
  }

  function init() {
    // Removed initTheme()
    initReveal();
    qs("#datetime")?.addEventListener("input", convert);
    qs("#formatToggle")?.addEventListener("change", (event) => {
      state.use24 = event.target.checked;
      convert();
      tick();
      buildTable();
    });
    qs("#now")?.addEventListener("click", () => {
      setInputFromDate(new Date(), state.mode === "gmt-est" ? "UTC" : easternZone);
      convert();
    });
    qs("#swap")?.addEventListener("click", () => {
      applyMode(state.mode === "gmt-est" ? "est-gmt" : "gmt-est");
    });
    qs("#copy")?.addEventListener("click", async () => {
      await navigator.clipboard?.writeText(state.lastText);
      const button = qs("#copy");
      const original = button.textContent;
      button.textContent = button.dataset.copied || "Copied";
      setTimeout(() => { button.textContent = original; }, 1100);
    });
    qsa(".mode").forEach((button) => button.addEventListener("click", () => applyMode(button.dataset.mode)));
    qsa("[data-preset]").forEach((button) => button.addEventListener("click", () => {
      const now = new Date();
      const hour = button.dataset.preset === "trading" ? 13 : button.dataset.preset === "event" ? 18 : 15;
      const p = parts(now, "UTC");
      setInputFromDate(new Date(Date.UTC(+p.year, +p.month - 1, +p.day, hour, 0)), "UTC");
      applyMode(state.intent === "reverse" ? "est-gmt" : "gmt-est");
    }));
    initFooterControls();
    applyMode(state.mode);
    buildTable();
    buildStrip();
    tick();
    setInterval(tick, 1000);
  }

  function initFooterControls() {
    const langSelect = qs('#language-select');
    if (langSelect) {
      langSelect.addEventListener('change', function () {
        const selectedLang = this.value;
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter((p) => p);
        if (pathParts.length > 0 && pathParts[0].length === 2) {
          pathParts[0] = selectedLang;
        } else {
          pathParts.unshift(selectedLang);
        }
        const newPath = '/' + pathParts.join('/') + (pathParts.length > 0 ? '/' : '');
        window.location.href = newPath;
      });
    }
  }

  init();
  initFooterControls();
})();
