const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "theme", "i18n", "translations");

const en = {
  brand: "GMT to EST Converter",
  pages: {
    home: { title: "GMT to EST Converter", description: "Convert GMT to EST or EDT instantly with live clocks, DST handling, meeting presets, a 24-hour chart, and timezone FAQs." },
    gmtToEst: { title: "GMT to EST Converter", description: "Convert GMT to Eastern Time instantly with automatic EST and EDT daylight saving handling." },
    estToGmt: { title: "EST to GMT Converter", description: "Convert Eastern Time to GMT instantly with date-aware EST and EDT handling." },
    gmtVsEst: { title: "GMT vs EST Difference", description: "Compare GMT and Eastern Time, including EST, EDT, daylight saving changes, and exact offsets." },
    guide: { title: "Time Zone Guide", description: "A practical guide to GMT, EST, EDT, abbreviations, daylight saving time, meetings, trading, and global scheduling." }
  },
  nav: { gmtToEst: "GMT→EST", estToGmt: "EST→GMT", gmtVsEst: "GMT vs EST", guide: "Guide", language: "Language", theme: "Toggle dark mode" },
  footer: { gmtToEst: "GMT to EST calculator", estToGmt: "EST to GMT calculator", difference: "GMT vs EST difference" },
  hero: {
    eyebrow: "Instant timezone calculator",
    differenceLead: "Eastern Time is usually 5 hours behind GMT in standard time and 4 hours behind during daylight saving time.",
    guideLead: "A practical guide to GMT, EST, EDT, abbreviations, daylight saving time, meetings, trading, and global scheduling."
  },
  converter: {
    direction: "Conversion direction", from: "From", toEastern: "to Eastern", toGmt: "to GMT", swap: "Swap conversion direction",
    now: "Use current time", format: "24h format", copy: "Copy", copied: "Copied", dstAware: "DST aware",
    eastern: "Eastern", meetingPlanner: "Meeting planner", is: "is", hoursBehindGmt: "hours behind GMT", bestForScheduling: "Best for scheduling", convertsTo: "converts to",
    variants: {
      converter: {
        startMode: "gmt-est", swap: true,
        "gmt-est": { heading: "Enter GMT date and time", input: "GMT time", source: "GMT", target: "Eastern Time" },
        "est-gmt": { heading: "Enter Eastern date and time", input: "Eastern time", source: "EST / EDT", target: "GMT" },
        note: "Enter a GMT date and time to get the matching EST or EDT result."
      },
      reverse: { startMode: "est-gmt", swap: false, heading: "Enter Eastern date and time", input: "Eastern time", source: "EST / EDT", target: "GMT", note: "Enter an Eastern Time value to convert it back to GMT." },
      difference: { startMode: "gmt-est", swap: false, heading: "Compare GMT with Eastern Time", input: "GMT time to compare", source: "GMT", target: "EST / EDT", note: "Enter a GMT time to compare the exact Eastern Time label and offset." },
      guide: { startMode: "gmt-est", swap: false, heading: "Plan a GMT meeting time", input: "GMT meeting time", source: "GMT", target: "Eastern meeting time", note: "Enter a GMT meeting time to see the Eastern Time equivalent for scheduling." }
    }
  },
  visual: {
    eyebrow: "Visual planner", title: "Explore the time shift",
    cards: [
      { title: "Day and night rhythm", text: "See why GMT business hours land later in the Eastern day." },
      { title: "DST-aware offset", text: "The offset changes between 5 hours and 4 hours when Eastern Time uses daylight saving." },
      { title: "Meeting overlap", text: "Scan useful windows before you send a calendar invite." }
    ]
  },
  clocks: { title: "Live clocks", gmt: "Current GMT", eastern: "Current Eastern Time" },
  presets: { title: "Quick presets", meeting: "Meeting time", event: "Live event", trading: "Trading hours" },
  chart: { title: "GMT to EST chart", eastern: "Eastern", offset: "Offset" },
  strip: { title: "Workday overlap", aria: "GMT and Eastern Time overlap timeline" },
  useCases: {
    title: "Built for real use",
    items: [
      { title: "Forex traders", text: "Use precise GMT to Eastern Time conversion for schedules where one missed hour changes the outcome." },
      { title: "Remote workers", text: "Plan meetings across GMT and Eastern Time without mental math." },
      { title: "Gamers", text: "Join global events and tournaments at the right Eastern Time." },
      { title: "Students", text: "Convert class, exam, and webinar times before deadlines." },
      { title: "International businesses", text: "Coordinate launches, calls, and support coverage across time zones." }
    ]
  },
  topics: {
    title: "Time zone authority",
    items: [
      { title: "What is GMT?", text: "GMT is the zero-offset reference used for global coordination, conversion charts, event planning, and current GMT time." },
      { title: "What is EST?", text: "EST is Eastern Standard Time at UTC-5. Many Eastern Time locations use EDT at UTC-4 during daylight saving time." },
      { title: "GMT to EST daylight saving time", text: "Eastern Time changes between EST and EDT, so the GMT offset can be five hours or four hours depending on date." },
      { title: "GMT to EST meeting planner", text: "Use live clocks, quick presets, and the 24-hour chart to choose practical overlap windows for meetings." },
      { title: "GMT to EST for trading", text: "Forex and market schedules often publish GMT times while many desks operate on Eastern Time." },
      { title: "Time zone abbreviations explained", text: "GMT, EST, and EDT are abbreviations. Date-aware tools should use named zones when rules matter." }
    ]
  },
  faqs: {
    title: "GMT to EST FAQs",
    items: [
      { q: "What is GMT to EST time difference?", a: "GMT is 5 hours ahead of EST during standard time. When daylight saving time is active, the difference may change to 4 hours." },
      { q: "Is GMT ahead of EST or behind?", a: "GMT is ahead of EST. When it is 12:00 GMT, it is 7:00 AM EST during standard time." },
      { q: "How many hours is GMT ahead of EST?", a: "GMT is 5 hours ahead of EST in winter and 4 hours ahead during daylight saving time when EST shifts to EDT." },
      { q: "Does GMT to EST change during daylight saving time?", a: "Yes. EST switches to EDT, Eastern Daylight Time, during daylight saving time, reducing the difference from 5 hours to 4 hours." },
      { q: "What is the current GMT to EST time right now?", a: "The current GMT to EST time depends on daylight saving status. This converter automatically shows the accurate real-time conversion." },
      { q: "Is EST always GMT-5?", a: "No. EST is GMT-5 only during standard time. During daylight saving time, Eastern Time becomes EDT, which is GMT-4." },
      { q: "What does EST GMT-5 mean?", a: "EST GMT-5 means Eastern Standard Time is 5 hours behind Greenwich Mean Time." },
      { q: "Is Eastern Time the same as EST?", a: "Not always. Eastern Time can be EST, standard time, or EDT, daylight time, depending on the time of year." },
      { q: "Does this GMT to EST converter handle daylight saving automatically?", a: "Yes. This converter automatically accounts for daylight saving time and shows the correct EST or EDT conversion." },
      { q: "Which countries or cities use EST?", a: "EST is used in parts of the United States and Canada, including cities like New York, Toronto, and Washington, D.C." }
    ]
  },
  images: {
    heroAlt: "Animated GMT to Eastern Time conversion visual",
    clockAlt: "GMT and Eastern Time clock comparison visual",
    mapAlt: "Generated world map showing GMT and Eastern Time regions"
  }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function merge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) return override ?? base;
  if (!base || typeof base !== "object") return override ?? base;
  const out = { ...base };
  for (const key of Object.keys(override || {})) out[key] = merge(base[key], override[key]);
  return out;
}

function localizedPack(language) {
  const x = language;
  return merge(clone(en), {
    brand: x.brand,
    pages: {
      home: { title: x.brand, description: x.description },
      gmtToEst: { title: x.brand, description: x.description },
      estToGmt: { title: x.estToGmt, description: x.reverseDescription },
      gmtVsEst: { title: x.gmtVsEst, description: x.differenceDescription },
      guide: { title: x.guide, description: x.guideDescription }
    },
    nav: { guide: x.guideNav, language: x.language, theme: x.theme },
    footer: { gmtToEst: x.footerGmt, estToGmt: x.footerEst, difference: x.footerDiff },
    hero: { eyebrow: x.eyebrow, differenceLead: x.differenceLead, guideLead: x.guideLead },
    converter: {
      direction: x.direction, from: x.from, toEastern: x.toEastern, toGmt: x.toGmt, swap: x.swap,
      now: x.now, format: x.format, copy: x.copy, copied: x.copied, dstAware: x.dstAware,
      eastern: x.eastern, meetingPlanner: x.meetingPlanner, is: x.is, hoursBehindGmt: x.hoursBehindGmt,
      bestForScheduling: x.bestForScheduling, convertsTo: x.convertsTo,
      variants: {
        converter: {
          "gmt-est": { heading: x.gmtHeading, input: x.gmtInput, source: "GMT", target: x.eastern },
          "est-gmt": { heading: x.estHeading, input: x.estInput, source: "EST / EDT", target: "GMT" },
          note: x.converterNote
        },
        reverse: { heading: x.estHeading, input: x.estInput, source: "EST / EDT", target: "GMT", note: x.reverseNote },
        difference: { heading: x.compareHeading, input: x.compareInput, source: "GMT", target: "EST / EDT", note: x.compareNote },
        guide: { heading: x.planHeading, input: x.planInput, source: "GMT", target: x.easternMeeting, note: x.planNote }
      }
    },
    visual: {
      eyebrow: x.visualEyebrow, title: x.visualTitle,
      cards: [
        { title: x.visual1Title, text: x.visual1Text },
        { title: x.visual2Title, text: x.visual2Text },
        { title: x.visual3Title, text: x.visual3Text }
      ]
    },
    clocks: { title: x.liveClocks, gmt: x.currentGmt, eastern: x.currentEastern },
    presets: { title: x.quickPresets, meeting: x.meeting, event: x.event, trading: x.trading },
    chart: { title: x.chartTitle, eastern: x.eastern, offset: x.offset },
    strip: { title: x.stripTitle, aria: x.stripAria },
    useCases: { title: x.useTitle, items: x.useCases },
    topics: { title: x.topicsTitle, items: x.topics },
    faqs: { title: x.faqTitle, items: x.faqs },
    images: { heroAlt: x.heroAlt, clockAlt: x.clockAlt, mapAlt: x.mapAlt }
  });
}

const packs = {
  en,
  es: localizedPack({
    brand: "Convertidor GMT a EST", estToGmt: "Convertidor EST a GMT", gmtVsEst: "Diferencia entre GMT y EST", guide: "Guía de zonas horarias",
    description: "Convierte GMT a EST o EDT al instante con relojes en vivo, horario de verano, tabla de 24 horas y preguntas frecuentes.", reverseDescription: "Convierte hora del Este a GMT al instante con manejo de EST y EDT.", differenceDescription: "Compara GMT y hora del Este con cambios de EST, EDT y horario de verano.", guideDescription: "Guía práctica de GMT, EST, EDT, abreviaturas, reuniones, trading y programación global.",
    guideNav: "Guía", language: "Idioma", theme: "Cambiar modo oscuro", footerGmt: "Calculadora GMT a EST", footerEst: "Calculadora EST a GMT", footerDiff: "Diferencia GMT vs EST",
    eyebrow: "Calculadora de zona horaria instantánea", differenceLead: "La hora del Este suele estar 5 horas detrás de GMT en horario estándar y 4 horas durante el horario de verano.", guideLead: "Guía práctica para GMT, EST, EDT, abreviaturas, horario de verano, reuniones, trading y planificación global.",
    direction: "Dirección de conversión", from: "Desde", toEastern: "a hora del Este", toGmt: "a GMT", swap: "Cambiar dirección", now: "Usar hora actual", format: "Formato 24 h", copy: "Copiar", copied: "Copiado", dstAware: "Con DST", eastern: "Hora del Este", meetingPlanner: "Planificador de reuniones", is: "es", hoursBehindGmt: "horas detrás de GMT", bestForScheduling: "Ideal para programar", convertsTo: "se convierte en",
    gmtHeading: "Introduce fecha y hora GMT", gmtInput: "Hora GMT", estHeading: "Introduce fecha y hora del Este", estInput: "Hora del Este", converterNote: "Introduce una fecha y hora GMT para obtener el resultado EST o EDT correspondiente.", reverseNote: "Introduce una hora del Este para convertirla a GMT.", compareHeading: "Compara GMT con hora del Este", compareInput: "Hora GMT para comparar", compareNote: "Introduce una hora GMT para comparar la etiqueta y el desfase exactos.", planHeading: "Planifica una reunión en GMT", planInput: "Hora de reunión GMT", easternMeeting: "Reunión en hora del Este", planNote: "Introduce una hora GMT para ver el equivalente en hora del Este.",
    visualEyebrow: "Planificador visual", visualTitle: "Explora el cambio horario", visual1Title: "Ritmo día y noche", visual1Text: "Mira por qué las horas laborales GMT llegan más tarde en el Este.", visual2Title: "Desfase con DST", visual2Text: "El desfase cambia entre 5 y 4 horas cuando aplica horario de verano.", visual3Title: "Solapamiento de reuniones", visual3Text: "Revisa ventanas útiles antes de enviar una invitación.",
    liveClocks: "Relojes en vivo", currentGmt: "GMT actual", currentEastern: "Hora del Este actual", quickPresets: "Atajos rápidos", meeting: "Reunión", event: "Evento en vivo", trading: "Horario de trading", chartTitle: "Tabla GMT a EST", offset: "Desfase", stripTitle: "Solapamiento laboral", stripAria: "Línea de tiempo de solapamiento GMT y hora del Este",
    useTitle: "Creado para uso real", useCases: [
      { title: "Traders de forex", text: "Convierte GMT a hora del Este con precisión para no perder una hora clave." },
      { title: "Equipos remotos", text: "Planifica reuniones entre GMT y hora del Este sin cálculos mentales." },
      { title: "Jugadores", text: "Únete a eventos y torneos globales a la hora correcta." },
      { title: "Estudiantes", text: "Convierte horarios de clases, exámenes y webinars antes del plazo." },
      { title: "Empresas internacionales", text: "Coordina lanzamientos, llamadas y soporte entre zonas horarias." }
    ],
    topicsTitle: "Autoridad sobre zonas horarias", topics: [
      { title: "¿Qué es GMT?", text: "GMT es la referencia de desplazamiento cero usada para coordinación global y conversiones." },
      { title: "¿Qué es EST?", text: "EST es Eastern Standard Time, UTC-5; muchas zonas usan EDT, UTC-4, en verano." },
      { title: "Horario de verano GMT a EST", text: "La hora del Este cambia entre EST y EDT, así que el desfase depende de la fecha." },
      { title: "Planificador de reuniones GMT a EST", text: "Usa relojes, atajos y la tabla de 24 horas para elegir una buena ventana." },
      { title: "GMT a EST para trading", text: "Muchos horarios de mercado se publican en GMT mientras los equipos usan hora del Este." },
      { title: "Abreviaturas de zona horaria", text: "GMT, EST y EDT son abreviaturas; para DST conviene usar zonas con nombre." }
    ],
    faqTitle: "Preguntas frecuentes GMT a EST", faqs: [
      { q: "¿Cuál es la diferencia horaria GMT a EST?", a: "GMT está 5 horas por delante de EST en horario estándar y 4 horas durante horario de verano." },
      { q: "¿GMT está delante o detrás de EST?", a: "GMT está por delante de EST. Si son las 12:00 GMT, son las 7:00 AM EST." },
      { q: "¿Cuántas horas está GMT por delante de EST?", a: "GMT está 5 horas por delante en invierno y 4 horas cuando EST cambia a EDT." },
      { q: "¿GMT a EST cambia con el horario de verano?", a: "Sí. EST cambia a EDT y la diferencia baja de 5 a 4 horas." },
      { q: "¿Cuál es la hora GMT a EST ahora?", a: "Depende del horario de verano. Este convertidor muestra la conversión exacta en tiempo real." },
      { q: "¿EST siempre es GMT-5?", a: "No. EST es GMT-5 solo en horario estándar; en verano Eastern Time es EDT, GMT-4." },
      { q: "¿Qué significa EST GMT-5?", a: "Significa que Eastern Standard Time está 5 horas detrás de Greenwich Mean Time." },
      { q: "¿Eastern Time es lo mismo que EST?", a: "No siempre. Eastern Time puede ser EST o EDT según la época del año." },
      { q: "¿Este convertidor maneja DST automáticamente?", a: "Sí. Tiene en cuenta el horario de verano y muestra EST o EDT correctamente." },
      { q: "¿Qué ciudades usan EST?", a: "Se usa en partes de Estados Unidos y Canadá, como Nueva York, Toronto y Washington, D.C." }
    ],
    heroAlt: "Visual animado de conversión GMT a hora del Este", clockAlt: "Visual de relojes GMT y hora del Este", mapAlt: "Mapa generado con regiones GMT y hora del Este"
  })
};

const light = {
  pt: ["Conversor GMT para EST", "Conversor EST para GMT", "Diferença GMT vs EST", "Guia de fusos horários", "Converta GMT para EST ou EDT instantaneamente com relógios ao vivo, horário de verão e tabela de 24 horas.", "Calculadora instantânea de fuso horário"],
  de: ["GMT in EST umrechnen", "EST in GMT umrechnen", "GMT vs EST Unterschied", "Zeitzonenführer", "GMT sofort in EST oder EDT umrechnen, mit Live-Uhren, Sommerzeit und 24-Stunden-Tabelle.", "Sofortiger Zeitzonenrechner"],
  fr: ["Convertisseur GMT vers EST", "Convertisseur EST vers GMT", "Différence GMT vs EST", "Guide des fuseaux horaires", "Convertissez GMT en EST ou EDT instantanément avec horloges en direct, DST et tableau 24 h.", "Calculateur instantané de fuseau horaire"],
  it: ["Convertitore GMT in EST", "Convertitore EST in GMT", "Differenza GMT vs EST", "Guida ai fusi orari", "Converti GMT in EST o EDT subito con orologi live, ora legale e tabella 24 ore.", "Calcolatore istantaneo di fuso orario"],
  id: ["Konverter GMT ke EST", "Konverter EST ke GMT", "Perbedaan GMT vs EST", "Panduan zona waktu", "Ubah GMT ke EST atau EDT seketika dengan jam langsung, DST, dan tabel 24 jam.", "Kalkulator zona waktu instan"],
  pl: ["Konwerter GMT na EST", "Konwerter EST na GMT", "Różnica GMT vs EST", "Przewodnik po strefach czasu", "Konwertuj GMT na EST lub EDT natychmiast z zegarami live, DST i tabelą 24h.", "Natychmiastowy kalkulator stref czasu"],
  tr: ["GMT EST Dönüştürücü", "EST GMT Dönüştürücü", "GMT vs EST Farkı", "Saat dilimi rehberi", "GMT'yi EST veya EDT'ye anında çevirin; canlı saatler, yaz saati ve 24 saat tablosu.", "Anında saat dilimi hesaplayıcı"],
  vi: ["Bộ đổi GMT sang EST", "Bộ đổi EST sang GMT", "Chênh lệch GMT vs EST", "Hướng dẫn múi giờ", "Đổi GMT sang EST hoặc EDT tức thì với đồng hồ trực tiếp, DST và bảng 24 giờ.", "Máy tính múi giờ tức thì"],
  ru: ["Конвертер GMT в EST", "Конвертер EST в GMT", "Разница GMT и EST", "Гид по часовым поясам", "Мгновенно переводите GMT в EST или EDT с живыми часами, DST и таблицей 24 часа.", "Мгновенный калькулятор часовых поясов"],
  ja: ["GMT から EST 変換", "EST から GMT 変換", "GMT と EST の違い", "タイムゾーンガイド", "GMT を EST または EDT に即時変換。ライブ時計、夏時間、24時間表付き。", "即時タイムゾーン計算"],
  ko: ["GMT에서 EST 변환기", "EST에서 GMT 변환기", "GMT vs EST 차이", "시간대 가이드", "GMT를 EST 또는 EDT로 즉시 변환합니다. 실시간 시계, DST, 24시간 표 포함.", "즉시 시간대 계산기"],
  zh: ["GMT 到 EST 转换器", "EST 到 GMT 转换器", "GMT vs EST 差异", "时区指南", "即时将 GMT 转换为 EST 或 EDT，包含实时时钟、夏令时和 24 小时表。", "即时 时区 计算器"],
  hi: ["GMT से EST कनवर्टर", "EST से GMT कनवर्टर", "GMT बनाम EST अंतर", "टाइम ज़ोन गाइड", "GMT को EST या EDT में तुरंत बदलें, लाइव घड़ियां, DST और 24 घंटे की तालिका के साथ।", "तुरंत टाइम ज़ोन कैलकुलेटर"],
  ar: ["محول GMT إلى EST", "محول EST إلى GMT", "فرق GMT و EST", "دليل المناطق الزمنية", "حوّل GMT إلى EST أو EDT فوراً مع ساعات مباشرة و DST وجدول 24 ساعة.", "حاسبة مناطق زمنية فورية"],
  ur: ["GMT سے EST کنورٹر", "EST سے GMT کنورٹر", "GMT بمقابلہ EST فرق", "ٹائم زون گائیڈ", "GMT کو EST یا EDT میں فوراً بدلیں، لائیو گھڑیوں، DST اور 24 گھنٹے جدول کے ساتھ۔", "فوری ٹائم زون کیلکولیٹر"],
  fa: ["تبدیل GMT به EST", "تبدیل EST به GMT", "تفاوت GMT و EST", "راهنمای مناطق زمانی", "GMT را فوراً به EST یا EDT تبدیل کنید، همراه با ساعت زنده، DST و جدول ۲۴ ساعته.", "محاسبه‌گر فوری منطقه زمانی"],
  bn: ["GMT থেকে EST কনভার্টার", "EST থেকে GMT কনভার্টার", "GMT বনাম EST পার্থক্য", "টাইম জোন গাইড", "GMT কে EST বা EDT-তে তাৎক্ষণিক রূপান্তর করুন, লাইভ ঘড়ি, DST ও ২৪ ঘণ্টার টেবিলসহ।", "তাৎক্ষণিক টাইম জোন ক্যালকুলেটর"],
  th: ["ตัวแปลง GMT เป็น EST", "ตัวแปลง EST เป็น GMT", "ความต่าง GMT vs EST", "คู่มือเขตเวลา", "แปลง GMT เป็น EST หรือ EDT ทันที พร้อมนาฬิกาสด DST และตาราง 24 ชั่วโมง", "เครื่องคำนวณเขตเวลาทันที"]
};

for (const [code, values] of Object.entries(light)) {
  const [brand, estToGmt, diff, guide, description, eyebrow] = values;
  packs[code] = merge(clone(en), {
    brand,
    pages: {
      home: { title: brand, description },
      gmtToEst: { title: brand, description },
      estToGmt: { title: estToGmt, description },
      gmtVsEst: { title: diff, description },
      guide: { title: guide, description }
    },
    nav: { guide },
    hero: { eyebrow },
    footer: { gmtToEst: brand, estToGmt, difference: diff }
  });
}

fs.mkdirSync(outDir, { recursive: true });
for (const [code, data] of Object.entries(packs)) {
  fs.writeFileSync(path.join(outDir, `${code}.json`), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

console.log(`Wrote ${Object.keys(packs).length} translation files.`);
