(() => {
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => [...document.querySelectorAll(s)];
  
  const converterNode = qs("#converter");
  const sourceZone = converterNode?.dataset.sourceZone || "UTC";
  const targetZone = converterNode?.dataset.targetZone || "America/New_York";

  const state = {
    mode: converterNode?.dataset.startMode || document.body.dataset.mode || "gmt-est",
    intent: converterNode?.dataset.intent || "converter",
    labels: JSON.parse(converterNode?.dataset.labels || "{}"),
    use24: true,
    lastText: ""
  };

  const intentLabels = state.labels.variants || {};
  
  // Performance optimization: Cache Intl.DateTimeFormat instances
  const formatters = { parts: {}, format: {}, compact: {}, short: {} };

  function getFormatter(group, timeZone, options) {
    const key = timeZone + "_" + state.use24;
    if (!formatters[group][key]) {
      formatters[group][key] = new Intl.DateTimeFormat("en-US", { timeZone, ...options });
    }
    return formatters[group][key];
  }

  function parts(date, timeZone) {
    const f = getFormatter("parts", timeZone, {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hourCycle: "h23", timeZoneName: "short"
    });
    const map = {};
    f.formatToParts(date).forEach((part) => { map[part.type] = part.value; });
    return map;
  }

  function zoneName(date, zone = targetZone) {
    return parts(date, zone).timeZoneName || "ET";
  }

  function offsetMinutes(date, zone = targetZone) {
    const p = parts(date, zone);
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((asUTC - date.getTime()) / 60000);
  }

  function localToUtc(value, zone) {
    const [d, t] = value.split("T");
    const [year, month, day] = d.split("-").map(Number);
    const [hour, minute] = t.split(":").map(Number);
    const base = Date.UTC(year, month - 1, day, hour, minute);
    let guess = base - offsetMinutes(new Date(base), zone) * 60000;
    for (let i = 0; i < 4; i += 1) {
      guess = base - offsetMinutes(new Date(guess), zone) * 60000;
    }
    return new Date(guess);
  }

  function parseInput() {
    const value = qs("#datetime").value;
    if (!value) return null;
    const currentInputZone = state.mode === "gmt-est" ? sourceZone : targetZone;
    if (currentInputZone === "UTC") return new Date(value + ":00Z");
    return localToUtc(value, currentInputZone);
  }

  function format(date, timeZone) {
    const f = getFormatter("format", timeZone, {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit", hour12: !state.use24, timeZoneName: "short"
    });
    return f.format(date);
  }

  function compact(date, timeZone) {
    const f = getFormatter("compact", timeZone, {
      hour: "numeric", minute: "2-digit", second: "2-digit",
      hour12: !state.use24, timeZoneName: "short"
    });
    return f.format(date);
  }

  function setInputFromDate(date, zone) {
    const p = parts(date, zone);
    qs("#datetime").value = p.year + "-" + p.month + "-" + p.day + "T" + p.hour + ":" + p.minute;
  }

  function explain(date) {
    const diffHours = Math.abs((offsetMinutes(date, targetZone) - offsetMinutes(date, sourceZone)) / 60);
    const z1 = zoneName(date, sourceZone);
    const z2 = zoneName(date, targetZone);
    return z2 + " is " + diffHours + " hours difference from " + z1 + " on this date. DST transitions can create skipped or repeated local hours, so date-aware conversion is essential.";
  }

  function shortFormat(date, timeZone) {
    const f = getFormatter("short", timeZone, {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
      hour12: !state.use24, timeZoneName: "short"
    });
    return f.format(date);
  }

  function setText(selector, text) {
    const node = qs(selector);
    if (node) node.textContent = text;
  }

  function convert() {
    const date = parseInput();
    if (!date || Number.isNaN(date.getTime())) return;
    const target = state.mode === "gmt-est" ? targetZone : sourceZone;
    const source = state.mode === "gmt-est" ? sourceZone : targetZone;
    
    const easternLabel = format(date, targetZone);
    const gmtLabel = format(date, sourceZone);
    const diffHours = Math.abs((offsetMinutes(date, targetZone) - offsetMinutes(date, sourceZone)) / 60);

    const modeLabels = intentLabels[state.intent] || intentLabels.converter || {};
    const specificModeLabels = modeLabels[state.mode] || modeLabels["gmt-est"] || {};
    const label = specificModeLabels.target || (state.mode === "gmt-est" ? "Target" : "Source");

    if (state.intent === "difference") {
      state.lastText = zoneName(date, sourceZone) + ": " + gmtLabel + " | " + zoneName(date, targetZone) + ": " + easternLabel + " | " + explain(date);
    } else if (state.intent === "guide") {
      state.lastText = (state.labels.meetingPlanner || "Meeting planner") + ": " + gmtLabel + " " + (state.labels.is || "is") + " " + easternLabel;
    } else {
      state.lastText = label + ": " + format(date, target);
    }
    
    const result = qs("#result");
    result.textContent = state.intent === "difference"
      ? diffHours + " " + (state.labels.hoursBehindGmt || "hours difference")
      : shortFormat(date, target);
    
    result.classList.remove("pulse");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        result.classList.add("pulse");
      });
    });
    
    setText("#sourcePreview", shortFormat(date, source));
    setText("#difference", state.intent === "guide"
      ? (state.labels.bestForScheduling || "Best for scheduling") + ": " + gmtLabel + " " + (state.labels.convertsTo || "converts to") + " " + easternLabel + ". " + explain(date)
      : explain(date));
    setText("#offsetBadge", diffHours + "h difference - " + zoneName(date, targetZone));
  }

  function tick() {
    const now = new Date();
    // Cache variables to prevent heavy DOM queries if not needed
    const gmtClock = qs("#gmtClock");
    const estClock = qs("#estClock");
    const estZone = qs("#estZone");
    
    if (gmtClock) gmtClock.textContent = compact(now, sourceZone);
    if (estClock) estClock.textContent = compact(now, targetZone);
    if (estZone) estZone.textContent = zoneName(now, targetZone);
  }

  function buildTable() {
    const tbody = qs("#timeTable tbody");
    if (!tbody) return;
    const today = new Date();
    const p = parts(today, sourceZone);
    // Use DocumentFragment to optimize DOM writes
    const fragment = document.createDocumentFragment();
    for (let h = 0; h < 24; h += 1) {
      let rowDate;
      if (sourceZone === "UTC") {
        rowDate = new Date(Date.UTC(+p.year, +p.month - 1, +p.day, h, 0));
      } else {
        rowDate = localToUtc(p.year + "-" + p.month + "-" + p.day + "T" + String(h).padStart(2, '0') + ":00", sourceZone);
      }
      const diffHours = Math.abs((offsetMinutes(rowDate, targetZone) - offsetMinutes(rowDate, sourceZone)) / 60);
      const tr = document.createElement("tr");
      tr.innerHTML = "<td>" + String(h).padStart(2, "0") + ":00 " + zoneName(rowDate, sourceZone) + "</td><td>" + format(rowDate, targetZone) + "</td><td>" + diffHours + " hours diff</td>";
      fragment.appendChild(tr);
    }
    tbody.innerHTML = "";
    tbody.appendChild(fragment);
  }

  function buildStrip() {
    const strip = qs("#timeStrip");
    if (!strip) return;
    const fragment = document.createDocumentFragment();
    const currentZoneName = zoneName(new Date(), sourceZone);
    for (let h = 0; h < 24; h += 1) {
      const cell = document.createElement("span");
      const isOverlap = h >= 13 && h <= 18;
      cell.className = isOverlap ? "overlap" : "";
      cell.innerHTML = "<b>" + String(h).padStart(2, "0") + ":00</b><small>" + currentZoneName + "</small>";
      fragment.appendChild(cell);
    }
    strip.innerHTML = "";
    strip.appendChild(fragment);
  }

  function applyMode(mode) {
    state.mode = state.intent === "reverse" ? "est-gmt" : mode;
    if (state.intent === "difference" || state.intent === "guide") state.mode = "gmt-est";
    document.body.dataset.mode = mode;
    qsa(".mode").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
    
    const labels = intentLabels[state.intent] || intentLabels.converter || {};
    if (state.intent === "converter") {
      const modeLabels = labels[state.mode] || labels["gmt-est"] || {};
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
    
    // Quick hack to override hardcoded labels for dynamic pages
    if (sourceZone !== "UTC" || targetZone !== "America/New_York") {
      const sourceAbbr = zoneName(new Date(), sourceZone);
      const targetAbbr = zoneName(new Date(), targetZone);
      if (state.mode === "gmt-est") {
        setText("#inputZoneName", sourceAbbr + " time");
        setText("#sourceZone", sourceAbbr);
        setText("#outputZoneName", targetAbbr);
      } else {
        setText("#inputZoneName", targetAbbr + " time");
        setText("#sourceZone", targetAbbr);
        setText("#outputZoneName", sourceAbbr);
      }
      qsa(".mode[data-mode='gmt-est'] b").forEach(b => b.textContent = sourceAbbr);
      qsa(".mode[data-mode='gmt-est'] small").forEach(b => b.textContent = "to " + targetAbbr);
      qsa(".mode[data-mode='est-gmt'] b").forEach(b => b.textContent = targetAbbr);
      qsa(".mode[data-mode='est-gmt'] small").forEach(b => b.textContent = "to " + sourceAbbr);
      const clockCards = qsa(".clock-card span");
      if (clockCards.length >= 3) {
        clockCards[1].textContent = "Current " + sourceAbbr;
        clockCards[2].textContent = "Current " + targetAbbr;
      }
    }

    setInputFromDate(new Date(), state.mode === "gmt-est" ? sourceZone : targetZone);
    convert();
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) document.documentElement.dataset.theme = saved;
    qs("#theme")?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

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
    initTheme();
    // Use requestIdleCallback or setTimeout to defer non-critical initialization
    setTimeout(() => {
      initReveal();
      buildTable();
      buildStrip();
    }, 100);

    qs("#datetime")?.addEventListener("input", convert);
    qs("#formatToggle")?.addEventListener("change", (event) => {
      state.use24 = event.target.checked;
      convert();
      tick();
      buildTable();
    });
    qs("#now")?.addEventListener("click", () => {
      setInputFromDate(new Date(), state.mode === "gmt-est" ? sourceZone : targetZone);
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
    qsa("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const now = new Date();
        const hour = button.dataset.preset === "trading" ? 13 : button.dataset.preset === "event" ? 18 : 15;
        const p = parts(now, sourceZone);
        let rowDate;
        if (sourceZone === "UTC") {
          rowDate = new Date(Date.UTC(+p.year, +p.month - 1, +p.day, hour, 0));
        } else {
          rowDate = localToUtc(p.year + "-" + p.month + "-" + p.day + "T" + String(hour).padStart(2, '0') + ":00", sourceZone);
        }
        setInputFromDate(rowDate, sourceZone);
        applyMode(state.intent === "reverse" ? "est-gmt" : "gmt-est");
      });
    });
    
    applyMode(state.mode);
    tick();
    setInterval(tick, 1000);
  }

  // Defer init slightly to improve LCP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
