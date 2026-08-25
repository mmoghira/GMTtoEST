(() => {
  // Cached Intl.DateTimeFormat instances for performance
  const formatters = { parts: {}, format: {}, compact: {}, short: {} };

  function getFormatter(group, timeZone, use24, options) {
    const pageLang = document.body?.dataset?.lang || document.documentElement?.lang || "en";
    const isEs = pageLang === "es";
    const locale = isEs ? "es-ES" : "en-US";
    const key = timeZone + "_" + use24 + "_" + locale;
    if (!formatters[group][key]) {
      formatters[group][key] = new Intl.DateTimeFormat(locale, { timeZone, ...options });
    }
    return formatters[group][key];
  }

  function parts(date, timeZone, use24 = true) {
    const f = getFormatter("parts", timeZone, use24, {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hourCycle: "h23", timeZoneName: "short"
    });
    const map = {};
    f.formatToParts(date).forEach((part) => { map[part.type] = part.value; });
    return map;
  }

  function offsetMinutes(date, zone) {
    const p = parts(date, zone);
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((asUTC - date.getTime()) / 60000);
  }

  function zoneName(date, zone, configuredSourceLabel = "", configuredTargetLabel = "", sourceZone = "UTC", targetZone = "America/New_York") {
    const shortName = parts(date, zone).timeZoneName || "ET";
    if (zone === "UTC") {
      if (zone === sourceZone && configuredSourceLabel) return configuredSourceLabel;
      if (zone === targetZone && configuredTargetLabel) return configuredTargetLabel;
      return "GMT";
    }
    if (zone === "Australia/Adelaide") {
      const offset = offsetMinutes(date, zone);
      if (offset === 630) return "ACDT";
      if (offset === 570) return "ACST";
    }
    return shortName;
  }

  function localToUtc(value, zone) {
    if (!value) return null;
    const [d, t] = value.split("T");
    if (!d || !t) return null;
    const [year, month, day] = d.split("-").map(Number);
    const [hour, minute] = t.split(":").map(Number);
    const base = Date.UTC(year, month - 1, day, hour, minute);
    let guess = base - offsetMinutes(new Date(base), zone) * 60000;
    for (let i = 0; i < 4; i += 1) {
      guess = base - offsetMinutes(new Date(guess), zone) * 60000;
    }
    return new Date(guess);
  }

  function applyZoneLabel(text, date, timeZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone) {
    const intlName = parts(date, timeZone).timeZoneName;
    const displayName = zoneName(date, timeZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
    return intlName && displayName && intlName !== displayName ? text.replace(intlName, displayName) : text;
  }

  function format(date, timeZone, use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone) {
    const f = getFormatter("format", timeZone, use24, {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit", hour12: !use24, timeZoneName: "short"
    });
    return applyZoneLabel(f.format(date), date, timeZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
  }

  function compact(date, timeZone, use24 = true) {
    const f = getFormatter("compact", timeZone, use24, {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: !use24, hourCycle: use24 ? "h23" : "h12"
    });
    return f.format(date);
  }

  function shortFormat(date, timeZone, use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone) {
    const f = getFormatter("short", timeZone, use24, {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
      hour12: !use24, timeZoneName: "short"
    });
    return applyZoneLabel(f.format(date), date, timeZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
  }

  function initConverter(root) {
    if (!root || root.dataset.initialized) return;
    root.dataset.initialized = "true";

    const pageLang = document.body?.dataset?.lang || document.documentElement?.lang || "en";
    const isEs = pageLang === "es";

    const datetimeInput = root.querySelector('[data-role="datetime"]') || root.querySelector('#datetime');
    const nowBtn = root.querySelector('[data-role="now"]') || root.querySelector('#now');
    const swapBtn = root.querySelector('[data-role="swap"]') || root.querySelector('#swap');
    const formatToggle = root.querySelector('[data-role="formatToggle"]') || root.querySelector('#formatToggle');
    const resultOutput = root.querySelector('[data-role="conversion-output"]') || root.querySelector('#conversion-output');
    const sourcePreview = root.querySelector('[data-role="sourcePreview"]') || root.querySelector('#sourcePreview');
    const differenceEl = root.querySelector('[data-role="difference"]') || root.querySelector('#difference');
    const offsetBadge = root.querySelector('[data-role="offsetBadge"]') || root.querySelector('#offsetBadge');
    const copyBtn = root.querySelector('[data-role="copy-result"]') || root.querySelector('#copy-result');
    const inputZoneName = root.querySelector('[data-role="inputZoneName"]') || root.querySelector('#inputZoneName');
    const sourceZoneEl = root.querySelector('[data-role="sourceZone"]') || root.querySelector('#sourceZone');
    const outputZoneNameEl = root.querySelector('[data-role="outputZoneName"]') || root.querySelector('#outputZoneName');
    const converterHeading = root.querySelector('[data-role="converterHeading"]') || root.querySelector('#converterHeading');
    const modeBtns = root.querySelectorAll('[data-role="mode"], .mode');

    const sourceZone = root.dataset.sourceZone || "UTC";
    const targetZone = root.dataset.targetZone || "America/New_York";
    const configuredSourceLabel = root.dataset.sourceLabel || "GMT";
    const configuredTargetLabel = root.dataset.targetLabel || "EST";
    const intent = root.dataset.intent || "converter";
    let labels = {};
    try { labels = JSON.parse(root.dataset.labels || "{}"); } catch (e) { labels = {}; }

    const state = {
      mode: root.dataset.startMode || "gmt-est",
      use24: formatToggle ? formatToggle.checked : true,
      lastText: "",
      followNow: true
    };

    const intentLabels = labels.variants || {};

    function parseInput() {
      if (!datetimeInput || !datetimeInput.value) return null;
      const value = datetimeInput.value;
      const currentInputZone = state.mode === "gmt-est" ? sourceZone : targetZone;
      if (currentInputZone === "UTC") return new Date(value + ":00Z");
      return localToUtc(value, currentInputZone);
    }

    function setInputFromDate(date, zone) {
      if (!datetimeInput) return;
      const p = parts(date, zone, state.use24);
      datetimeInput.value = p.year + "-" + p.month + "-" + p.day + "T" + p.hour + ":" + p.minute;
    }

    function explain(date) {
      const diffHours = Math.abs((offsetMinutes(date, targetZone) - offsetMinutes(date, sourceZone)) / 60);
      const z1 = zoneName(date, sourceZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      const z2 = zoneName(date, targetZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      if (isEs) {
        return z2 + " está " + diffHours + " horas por detrás de " + z1 + " en esta fecha. Los cambios de horario de verano pueden crear horas omitidas o repetidas, por lo que es esencial realizar la conversión teniendo en cuenta la fecha.";
      }
      return z2 + " is " + diffHours + " hours difference from " + z1 + " on this date. DST transitions can create skipped or repeated local hours, so date-aware conversion is essential.";
    }

    function convert() {
      const date = parseInput();
      if (!date || Number.isNaN(date.getTime())) return;
      const target = state.mode === "gmt-est" ? targetZone : sourceZone;
      const source = state.mode === "gmt-est" ? sourceZone : targetZone;

      const easternLabel = format(date, targetZone, state.use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      const gmtLabel = format(date, sourceZone, state.use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      const diffHours = Math.abs((offsetMinutes(date, targetZone) - offsetMinutes(date, sourceZone)) / 60);

      const modeLabels = intentLabels[intent] || intentLabels.converter || {};
      const specificModeLabels = modeLabels[state.mode] || modeLabels["gmt-est"] || {};
      const label = specificModeLabels.target || (state.mode === "gmt-est" ? (isEs ? "Destino" : "Target") : (isEs ? "Origen" : "Source"));

      if (intent === "difference") {
        state.lastText = zoneName(date, sourceZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone) + ": " + gmtLabel + " | " + zoneName(date, targetZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone) + ": " + easternLabel + " | " + explain(date);
      } else if (intent === "guide") {
        state.lastText = (labels.meetingPlanner || (isEs ? "Planificador de reuniones" : "Meeting planner")) + ": " + gmtLabel + " " + (labels.is || (isEs ? "es" : "is")) + " " + easternLabel;
      } else {
        state.lastText = label + ": " + format(date, target, state.use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      }

      if (resultOutput) {
        resultOutput.textContent = intent === "difference"
          ? (isEs ? diffHours + " horas de diferencia" : diffHours + " " + (labels.hoursBehindGmt || "hours difference"))
          : shortFormat(date, target, state.use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
        
        // CSS pulse animation without layout thrashing
        resultOutput.classList.remove("pulse");
        requestAnimationFrame(() => {
          resultOutput.classList.add("pulse");
        });
      }

      if (sourcePreview) sourcePreview.textContent = shortFormat(date, source, state.use24, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      if (differenceEl) {
        differenceEl.textContent = intent === "guide"
          ? (labels.bestForScheduling || (isEs ? "Ideal para programar" : "Best for scheduling")) + ": " + gmtLabel + " " + (labels.convertsTo || (isEs ? "se convierte en" : "converts to")) + " " + easternLabel + ". " + explain(date)
          : explain(date);
      }
      if (offsetBadge) {
        offsetBadge.textContent = isEs
          ? "Diferencia de " + diffHours + " horas — " + zoneName(date, targetZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone)
          : diffHours + "h difference - " + zoneName(date, targetZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
      }
    }

    function applyMode(mode) {
      state.mode = intent === "reverse" ? "est-gmt" : mode;
      if (intent === "difference" || intent === "guide") state.mode = "gmt-est";
      
      modeBtns.forEach((button) => {
        button.classList.toggle("active", button.dataset.mode === state.mode);
      });

      const modeDefs = intentLabels[intent] || intentLabels.converter || {};
      if (intent === "converter") {
        const modeLabels = modeDefs[state.mode] || modeDefs["gmt-est"] || {};
        if (converterHeading && modeLabels.heading) converterHeading.textContent = modeLabels.heading;
        if (inputZoneName && modeLabels.input) inputZoneName.textContent = modeLabels.input;
        if (sourceZoneEl && modeLabels.source) sourceZoneEl.textContent = modeLabels.source;
        if (outputZoneNameEl && modeLabels.target) outputZoneNameEl.textContent = modeLabels.target;
      }

      if (sourceZone !== "UTC" || targetZone !== "America/New_York") {
        const sourceAbbr = zoneName(new Date(), sourceZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
        const targetAbbr = zoneName(new Date(), targetZone, configuredSourceLabel, configuredTargetLabel, sourceZone, targetZone);
        if (state.mode === "gmt-est") {
          if (inputZoneName) inputZoneName.textContent = isEs ? `Hora ${sourceAbbr}` : sourceAbbr + " time";
          if (sourceZoneEl) sourceZoneEl.textContent = sourceAbbr;
          if (outputZoneNameEl) outputZoneNameEl.textContent = targetAbbr;
        } else {
          if (inputZoneName) inputZoneName.textContent = isEs ? `Hora ${targetAbbr}` : targetAbbr + " time";
          if (sourceZoneEl) sourceZoneEl.textContent = targetAbbr;
          if (outputZoneNameEl) outputZoneNameEl.textContent = sourceAbbr;
        }
        root.querySelectorAll('.mode[data-mode="gmt-est"] b').forEach((b) => { b.textContent = sourceAbbr; });
        root.querySelectorAll('.mode[data-mode="gmt-est"] small').forEach((s) => { s.textContent = (isEs ? "a " : "to ") + targetAbbr; });
        root.querySelectorAll('.mode[data-mode="est-gmt"] b').forEach((b) => { b.textContent = targetAbbr; });
        root.querySelectorAll('.mode[data-mode="est-gmt"] small').forEach((s) => { s.textContent = (isEs ? "a " : "to ") + sourceAbbr; });
      }

      setInputFromDate(new Date(), state.mode === "gmt-est" ? sourceZone : targetZone);
      convert();
    }

    if (datetimeInput) {
      datetimeInput.addEventListener("input", () => {
        state.followNow = false;
        convert();
      });
    }

    if (formatToggle) {
      formatToggle.addEventListener("change", (e) => {
        state.use24 = e.target.checked;
        convert();
        tickClocks();
      });
    }

    if (nowBtn) {
      nowBtn.addEventListener("click", () => {
        state.followNow = true;
        setInputFromDate(new Date(), state.mode === "gmt-est" ? sourceZone : targetZone);
        convert();
      });
    }

    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        applyMode(state.mode === "gmt-est" ? "est-gmt" : "gmt-est");
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const original = copyBtn.textContent;
        try {
          await navigator.clipboard.writeText(state.lastText);
          copyBtn.textContent = copyBtn.dataset.copied || (isEs ? "¡Copiado!" : "Copied!");
          copyBtn.setAttribute("aria-label", isEs ? "Copiado al portapapeles" : "Copied to clipboard");
          setTimeout(() => {
            copyBtn.textContent = original;
            copyBtn.setAttribute("aria-label", isEs ? "Copiar resultado de la conversión al portapapeles" : "Copy conversion result to clipboard");
          }, 2000);
        } catch (err) {
          copyBtn.textContent = copyBtn.dataset.copyFailed || (isEs ? "Error al copiar" : "Copy failed");
          setTimeout(() => { copyBtn.textContent = original; }, 2000);
        }
      });
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => applyMode(btn.dataset.mode));
    });

    applyMode(state.mode);

    // Dynamic minute updates if followNow is true
    setInterval(() => {
      if (!state.followNow) return;
      setInputFromDate(new Date(), state.mode === "gmt-est" ? sourceZone : targetZone);
      convert();
    }, 60000);
  }

  function tickClocks() {
    try {
      const gmtClock = document.querySelector("#gmtClock");
      const estClock = document.querySelector("#estClock");
      const estZone = document.querySelector("#estZone");
      if (!gmtClock && !estClock) return;

      const now = new Date();
      const firstConverter = document.querySelector('[data-component="converter"]') || document.querySelector('.converter');
      const sZone = firstConverter?.dataset.sourceZone || "UTC";
      const tZone = firstConverter?.dataset.targetZone || "America/New_York";
      const sLabel = firstConverter?.dataset.sourceLabel || "GMT";
      const tLabel = firstConverter?.dataset.targetLabel || "EST";

      const formatToggle = document.querySelector('[data-role="formatToggle"]') || document.querySelector('#formatToggle');
      const use24 = formatToggle ? formatToggle.checked : true;

      if (gmtClock) gmtClock.textContent = compact(now, sZone, use24);
      if (estClock) estClock.textContent = compact(now, tZone, use24);
      if (estZone) estZone.textContent = zoneName(now, tZone, sLabel, tLabel, sZone, tZone);
    } catch (e) {
      console.error("Clock tick error:", e);
    }
  }

  function buildTable() {
    const tbody = document.querySelector("#timeTable tbody");
    if (!tbody) return;
    const pageLang = document.body?.dataset?.lang || document.documentElement?.lang || "en";
    const isEs = pageLang === "es";
    const today = new Date();
    const firstConverter = document.querySelector('[data-component="converter"]') || document.querySelector('.converter');
    const sZone = firstConverter?.dataset.sourceZone || "UTC";
    const tZone = firstConverter?.dataset.targetZone || "America/New_York";
    const sLabel = firstConverter?.dataset.sourceLabel || "GMT";
    const tLabel = firstConverter?.dataset.targetLabel || "EST";
    const p = parts(today, sZone);

    const diffSuffix = isEs ? "horas de diferencia" : "hours diff";
    const fragment = document.createDocumentFragment();
    for (let h = 0; h < 24; h += 1) {
      let rowDate;
      if (sZone === "UTC") {
        rowDate = new Date(Date.UTC(+p.year, +p.month - 1, +p.day, h, 0));
      } else {
        rowDate = localToUtc(p.year + "-" + p.month + "-" + p.day + "T" + String(h).padStart(2, '0') + ":00", sZone);
      }
      const diffHours = Math.abs((offsetMinutes(rowDate, tZone) - offsetMinutes(rowDate, sZone)) / 60);
      const tr = document.createElement("tr");
      tr.innerHTML = "<td>" + String(h).padStart(2, "0") + ":00 " + zoneName(rowDate, sZone, sLabel, tLabel, sZone, tZone) + "</td><td>" + format(rowDate, tZone, true, sLabel, tLabel, sZone, tZone) + "</td><td>" + diffHours + " " + diffSuffix + "</td>";
      fragment.appendChild(tr);
    }
    tbody.innerHTML = "";
    tbody.appendChild(fragment);
  }

  function buildStrip() {
    const strip = document.querySelector("#timeStrip");
    if (!strip) return;
    const fragment = document.createDocumentFragment();
    const firstConverter = document.querySelector('[data-component="converter"]') || document.querySelector('.converter');
    const sZone = firstConverter?.dataset.sourceZone || "UTC";
    const sLabel = firstConverter?.dataset.sourceLabel || "GMT";
    const tLabel = firstConverter?.dataset.targetLabel || "EST";
    const currentZoneName = zoneName(new Date(), sZone, sLabel, tLabel, sZone, "America/New_York");

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

  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) document.documentElement.dataset.theme = saved;
    document.querySelector("#theme")?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
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
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
  }

  function init() {
    initTheme();

    // Initialize all converter instances on page
    const converters = document.querySelectorAll('[data-component="converter"], .converter');
    converters.forEach((root) => initConverter(root));

    // Live clock ticks
    tickClocks();
    setInterval(tickClocks, 1000);

    // Defer below-the-fold table generation & reveals to avoid blocking main thread during TTI
    const scheduleIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    scheduleIdle(() => {
      initReveal();
      buildTable();
      buildStrip();
    }, { timeout: 2500 });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      tickClocks();
    }
  });
})();
