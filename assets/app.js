(() => {
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => [...document.querySelectorAll(s)];
  const sourceZone = qs("#converter")?.dataset.sourceZone || "UTC";
  const easternZone = qs("#converter")?.dataset.targetZone || "America/New_York";
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

  function zoneName(date, timeZone) {
    return parts(date, timeZone || easternZone).timeZoneName || "ET";
  }

  function offsetMinutes(date, timeZone) {
    const p = parts(date, timeZone || easternZone);
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return Math.round((asUTC - date.getTime()) / 60000);
  }

  function localZoneToUtc(value, timeZone) {
    const [d, t] = value.split("T");
    const [year, month, day] = d.split("-").map(Number);
    const [hour, minute] = t.split(":").map(Number);
    const base = Date.UTC(year, month - 1, day, hour, minute);
    let guess = base - offsetMinutes(new Date(base), timeZone) * 60000;
    for (let i = 0; i < 4; i += 1) {
      guess = base - offsetMinutes(new Date(guess), timeZone) * 60000;
    }
    return new Date(guess);
  }

  function parseInput() {
    const value = qs("#datetime").value;
    if (!value) return null;
    if (state.mode === "gmt-est") return localZoneToUtc(value, sourceZone);
    return localZoneToUtc(value, easternZone);
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
    const offsetSource = offsetMinutes(date, sourceZone);
    const offsetTarget = offsetMinutes(date, easternZone);
    const diff = Math.round((offsetSource - offsetTarget) / 60);
    const zSource = zoneName(date, sourceZone);
    const zTarget = zoneName(date, easternZone);
    if (diff === 0) {
      return `Both zones are at the same offset (${zSource}/${zTarget}) on this date.`;
    }
    const absDiff = Math.abs(diff);
    const direction = diff > 0 ? "behind" : "ahead";
    const sourceLabelVal = qs("#converter")?.dataset.sourceLabel || "GMT";
    const targetLabelVal = qs("#converter")?.dataset.targetLabel || "EST";
    return `${zTarget} (${targetLabelVal}) is ${absDiff} hour${absDiff > 1 ? "s" : ""} ${direction} of ${zSource} (${sourceLabelVal}) on this date. DST transitions can create skipped or repeated local hours, so date-aware conversion is essential.`;
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
    const target = state.mode === "gmt-est" ? easternZone : sourceZone;
    const source = state.mode === "gmt-est" ? sourceZone : easternZone;
    const label = state.mode === "gmt-est" ? (state.labels.target || "EST") : (state.labels.source || "GMT");
    const targetLabel = format(date, target);
    const sourceLabel = format(date, source);
    if (state.intent === "difference") {
      state.lastText = `${sourceZone}: ${sourceLabel} | ${easternZone}: ${targetLabel} | ${explain(date)}`;
    } else if (state.intent === "guide") {
      state.lastText = `${state.labels.meetingPlanner || "Meeting planner"}: ${sourceLabel} is ${targetLabel}`;
    } else {
      state.lastText = `${label}: ${format(date, target)}`;
    }
    const result = qs("#result");
    if (result) {
      const diff = Math.round((offsetMinutes(date, sourceZone) - offsetMinutes(date, easternZone)) / 60);
      result.textContent = state.intent === "difference"
        ? `${Math.abs(diff)} ${state.labels.hoursBehindGmt || "hours behind"}`
        : shortFormat(date, target);
      result.classList.remove("pulse");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          result.classList.add("pulse");
        });
      });
    }
    setText("#sourcePreview", shortFormat(date, source));
    setText("#difference", state.intent === "guide"
      ? `${state.labels.bestForScheduling || "Best for scheduling"}: ${sourceLabel} converts to ${targetLabel}. ${explain(date)}`
      : explain(date));
    const finalDiff = Math.round((offsetMinutes(date, sourceZone) - offsetMinutes(date, easternZone)) / 60);
    setText("#offsetBadge", `${Math.abs(finalDiff)}h difference - ${zoneName(date, target)}`);
  }

  function tick() {
    const now = new Date();
    qsa("#gmtClock, .top-gmt-clock").forEach(el => { el.textContent = compact(now, sourceZone); });
    qsa("#estClock, .top-est-clock").forEach(el => { el.textContent = compact(now, easternZone); });
    qsa("#estZone, .top-est-zone").forEach(el => { el.textContent = zoneName(now, easternZone); });
  }

  function formatHourOnly(date, timeZone) {
    return new Intl.DateTimeFormat(undefined, {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: !state.use24,
      timeZoneName: "short"
    }).format(date);
  }

  function buildTable() {
    const tbody = qs("#timeTable tbody");
    if (!tbody) return;
    const today = new Date();
    const p = parts(today, sourceZone);
    const frag = document.createDocumentFragment();
    const sourceLabelVal = qs("#converter")?.dataset.sourceLabel || "GMT";
    for (let h = 0; h < 24; h += 1) {
      const dateString = `${p.year}-${p.month}-${p.day}T${String(h).padStart(2, "0")}:00`;
      const date = localZoneToUtc(dateString, sourceZone);
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = formatHourOnly(date, sourceZone);
      const td2 = document.createElement("td");
      td2.textContent = formatHourOnly(date, easternZone);
      const td3 = document.createElement("td");
      const diff = Math.round((offsetMinutes(date, sourceZone) - offsetMinutes(date, easternZone)) / 60);
      td3.textContent = diff === 0
        ? "No difference"
        : `${Math.abs(diff)} hour${Math.abs(diff) > 1 ? "s" : ""} ${diff > 0 ? "behind" : "ahead"}`;
      tr.append(td1, td2, td3);
      frag.appendChild(tr);
    }
    tbody.innerHTML = "";
    tbody.appendChild(frag);
  }

  function buildStrip() {
    const strip = qs("#timeStrip");
    if (!strip) return;
    strip.innerHTML = "";
    const sourceLabelVal = qs("#converter")?.dataset.sourceLabel || "GMT";
    for (let h = 0; h < 24; h += 1) {
      const cell = document.createElement("span");
      const isOverlap = h >= 13 && h <= 18;
      cell.className = isOverlap ? "overlap" : "";
      cell.innerHTML = `<b>${String(h).padStart(2, "0")}:00</b><small>${sourceLabelVal}</small>`;
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
    setInputFromDate(new Date(), state.mode === "gmt-est" ? sourceZone : easternZone);
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
    const backBtn = qs('#back-to-top');
    if (backBtn) {
      window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
          backBtn.classList.toggle('show', window.scrollY > 300);
        });
      }, { passive: true });
      backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
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
    let tickInterval = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(tickInterval);
      } else {
        tick();
        tickInterval = setInterval(tick, 1000);
      }
    });
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
})();
