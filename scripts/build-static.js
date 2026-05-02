const fs = require("fs");
const path = require("path");

const site = process.env.SITE_URL || "https://gmttoest.com";
const languages = [
  ["en", "English", "ltr", "GMT to EST Converter", "Convert GMT to EST or EDT instantly with live clocks, DST handling, meeting presets, a 24-hour chart, and timezone FAQs."],
  ["es", "Español", "ltr", "Convertidor GMT a EST", "Convierte GMT a EST o EDT al instante con relojes en vivo, horario de verano, tabla de 24 horas y preguntas frecuentes."],
  ["zh", "简体中文", "ltr", "GMT 到 EST 转换器", "即时将 GMT 转换为 EST 或 EDT，包含实时时钟、夏令时处理、24 小时对照表和常见问题。"],
  ["hi", "हिन्दी", "ltr", "GMT से EST कनवर्टर", "GMT को EST या EDT में तुरंत बदलें: लाइव घड़ियां, DST, 24 घंटे की तालिका और FAQs।"],
  ["ar", "العربية", "rtl", "محول GMT إلى EST", "حوّل GMT إلى EST أو EDT فوراً مع ساعات مباشرة، دعم التوقيت الصيفي، جدول 24 ساعة وأسئلة شائعة."],
  ["pt", "Português", "ltr", "Conversor GMT para EST", "Converta GMT para EST ou EDT instantaneamente com relógios ao vivo, horário de verão, tabela de 24 horas e FAQs."],
  ["ru", "Русский", "ltr", "Конвертер GMT в EST", "Мгновенно переводите GMT в EST или EDT: живые часы, учет летнего времени, таблица 24 часа и FAQ."],
  ["ja", "日本語", "ltr", "GMT から EST 変換", "GMT を EST または EDT に即時変換。ライブ時計、夏時間対応、24時間表、FAQ付き。"],
  ["de", "Deutsch", "ltr", "GMT in EST umrechnen", "GMT sofort in EST oder EDT umrechnen: Live-Uhren, Sommerzeitlogik, 24-Stunden-Tabelle und FAQs."],
  ["fr", "Français", "ltr", "Convertisseur GMT vers EST", "Convertissez GMT en EST ou EDT instantanément avec horloges en direct, DST, tableau 24 h et FAQ."],
  ["ko", "한국어", "ltr", "GMT에서 EST 변환기", "GMT를 EST 또는 EDT로 즉시 변환합니다. 실시간 시계, DST 처리, 24시간 표와 FAQ 포함."],
  ["it", "Italiano", "ltr", "Convertitore GMT in EST", "Converti GMT in EST o EDT subito con orologi live, gestione ora legale, tabella 24 ore e FAQ."],
  ["tr", "Türkçe", "ltr", "GMT EST Dönüştürücü", "GMT'yi EST veya EDT'ye anında çevirin: canlı saatler, yaz saati, 24 saat tablosu ve SSS."],
  ["ur", "اردو", "rtl", "GMT سے EST کنورٹر", "GMT کو EST یا EDT میں فوراً بدلیں، لائیو گھڑیاں، DST، 24 گھنٹے جدول اور سوالات کے ساتھ۔"],
  ["bn", "বাংলা", "ltr", "GMT থেকে EST কনভার্টার", "GMT কে EST বা EDT-তে তাৎক্ষণিক রূপান্তর করুন: লাইভ ঘড়ি, DST, ২৪ ঘণ্টার চার্ট ও FAQ।"],
  ["vi", "Tiếng Việt", "ltr", "Bộ đổi GMT sang EST", "Đổi GMT sang EST hoặc EDT tức thì với đồng hồ trực tiếp, DST, bảng 24 giờ và FAQ."],
  ["th", "ไทย", "ltr", "ตัวแปลง GMT เป็น EST", "แปลง GMT เป็น EST หรือ EDT ทันที พร้อมนาฬิกาสด DST ตาราง 24 ชั่วโมง และ FAQ"],
  ["id", "Indonesia", "ltr", "Konverter GMT ke EST", "Ubah GMT ke EST atau EDT seketika dengan jam langsung, DST, tabel 24 jam, dan FAQ."],
  ["fa", "فارسی", "rtl", "تبدیل GMT به EST", "GMT را فوراً به EST یا EDT تبدیل کنید؛ همراه با ساعت زنده، DST، جدول ۲۴ ساعته و پرسش‌های رایج."],
  ["pl", "Polski", "ltr", "Konwerter GMT na EST", "Konwertuj GMT na EST lub EDT natychmiast: zegary live, DST, tabela 24h i FAQ."]
];

const pages = [
  ["", "converter", "GMT to EST Converter"],
  ["gmt-to-est", "converter", "GMT to EST Converter"],
  ["est-to-gmt", "reverse", "EST to GMT Converter"],
  ["gmt-vs-est", "difference", "GMT vs EST Difference"],
  ["time-zone-guide", "guide", "Time Zone Guide"]
];

const ui = {
  en: {
    h1: "GMT to EST Converter", eyebrow: "Instant timezone calculator", lead: "Convert Greenwich Mean Time to Eastern Time in under three seconds, with DST handled automatically.",
    input: "Date and time", from: "From", to: "To", convertNow: "Use current time", copy: "Copy", copied: "Copied", format: "24h format",
    clocks: "Live clocks", gmt: "Current GMT", est: "Current Eastern Time", result: "Converted time", note: "Eastern Time is usually 5 hours behind GMT in standard time and 4 hours behind during daylight saving time.",
    presets: "Quick presets", meeting: "Meeting time", event: "Live event", trading: "Trading hours", table: "GMT to EST chart", strip: "Workday overlap",
    uses: "Built for real use", faq: "GMT to EST FAQs", topics: "Time zone authority", visualAlt: "Generated world map showing GMT and Eastern Time regions"
  }
};

Object.assign(ui, {
  es: { h1: "Convertidor GMT a EST", eyebrow: "Calculadora instantánea", lead: "Convierte Greenwich Mean Time a hora del Este con DST automático.", input: "Fecha y hora", convertNow: "Usar hora actual", copy: "Copiar", copied: "Copiado", format: "Formato 24 h", clocks: "Relojes en vivo", gmt: "GMT actual", est: "Hora del Este actual", result: "Hora convertida", note: "EST suele estar 5 horas detrás de GMT y EDT 4 horas detrás.", presets: "Atajos rápidos", meeting: "Reunión", event: "Evento en vivo", trading: "Mercados", table: "Tabla GMT a EST", strip: "Solapamiento laboral", uses: "Hecho para uso real", faq: "Preguntas GMT a EST", topics: "Guía de zonas horarias", visualAlt: "Mapa generado con regiones GMT y hora del Este" },
  zh: { h1: "GMT 到 EST 转换器", eyebrow: "即时计算器", lead: "将 GMT 快速转换为美国东部时间，并自动处理夏令时。", input: "日期和时间", convertNow: "使用当前时间", copy: "复制", copied: "已复制", format: "24 小时制", clocks: "实时时钟", gmt: "当前 GMT", est: "当前东部时间", result: "转换结果", note: "标准时间 EST 比 GMT 晚 5 小时，夏令时 EDT 晚 4 小时。", presets: "快速预设", meeting: "会议时间", event: "直播活动", trading: "交易时间", table: "GMT 到 EST 表", strip: "工作时间重叠", uses: "真实场景", faq: "GMT 到 EST 常见问题", topics: "时区知识", visualAlt: "显示 GMT 与东部时间区域的生成地图" },
  hi: { h1: "GMT से EST कनवर्टर", eyebrow: "तुरंत टाइम कैलकुलेटर", lead: "GMT को Eastern Time में तुरंत बदलें और DST अपने आप संभालें।", input: "दिनांक और समय", convertNow: "वर्तमान समय", copy: "कॉपी", copied: "कॉपी हो गया", format: "24 घंटे", clocks: "लाइव घड़ियां", gmt: "वर्तमान GMT", est: "वर्तमान Eastern Time", result: "परिणाम", note: "EST आम तौर पर GMT से 5 घंटे पीछे और EDT 4 घंटे पीछे होता है।", presets: "त्वरित विकल्प", meeting: "मीटिंग", event: "लाइव इवेंट", trading: "ट्रेडिंग", table: "GMT से EST चार्ट", strip: "कार्य समय ओवरलैप", uses: "वास्तविक उपयोग", faq: "GMT से EST सवाल", topics: "टाइम ज़ोन गाइड", visualAlt: "GMT और Eastern Time क्षेत्रों का जनरेटेड मानचित्र" },
  ar: { h1: "محول GMT إلى EST", eyebrow: "حاسبة وقت فورية", lead: "حوّل GMT إلى التوقيت الشرقي مع دعم تلقائي للتوقيت الصيفي.", input: "التاريخ والوقت", convertNow: "استخدم الوقت الحالي", copy: "نسخ", copied: "تم النسخ", format: "نظام 24 ساعة", clocks: "ساعات مباشرة", gmt: "GMT الآن", est: "التوقيت الشرقي الآن", result: "الوقت المحوّل", note: "EST يتأخر غالباً 5 ساعات عن GMT و EDT يتأخر 4 ساعات.", presets: "اختصارات", meeting: "اجتماع", event: "حدث مباشر", trading: "التداول", table: "جدول GMT إلى EST", strip: "تداخل ساعات العمل", uses: "استخدامات عملية", faq: "أسئلة GMT إلى EST", topics: "دليل المناطق الزمنية", visualAlt: "خريطة مولدة تعرض GMT والتوقيت الشرقي" },
  pt: { h1: "Conversor GMT para EST", eyebrow: "Calculadora instantânea", lead: "Converta GMT para horário do Leste com DST automático.", input: "Data e hora", convertNow: "Usar agora", copy: "Copiar", copied: "Copiado", format: "Formato 24 h", clocks: "Relógios ao vivo", gmt: "GMT atual", est: "Hora do Leste atual", result: "Hora convertida", note: "EST fica 5 horas atrás do GMT; EDT fica 4 horas atrás.", presets: "Atalhos", meeting: "Reunião", event: "Evento ao vivo", trading: "Mercados", table: "Tabela GMT para EST", strip: "Sobreposição útil", uses: "Uso real", faq: "FAQs GMT para EST", topics: "Guia de fusos", visualAlt: "Mapa gerado com GMT e horário do Leste" },
  ru: { h1: "Конвертер GMT в EST", eyebrow: "Мгновенный калькулятор", lead: "Переводите GMT в восточное время с автоматическим учетом DST.", input: "Дата и время", convertNow: "Текущее время", copy: "Копировать", copied: "Скопировано", format: "24 часа", clocks: "Живые часы", gmt: "Текущий GMT", est: "Текущее Eastern Time", result: "Результат", note: "EST обычно на 5 часов позади GMT, EDT на 4 часа.", presets: "Быстрые варианты", meeting: "Встреча", event: "Событие", trading: "Торги", table: "Таблица GMT в EST", strip: "Пересечение часов", uses: "Практические сценарии", faq: "Вопросы GMT в EST", topics: "Гид по зонам", visualAlt: "Сгенерированная карта GMT и Eastern Time" },
  ja: { h1: "GMT から EST 変換", eyebrow: "即時タイム計算", lead: "GMT を米国東部時間へ、夏時間も自動で変換します。", input: "日付と時刻", convertNow: "現在時刻を使う", copy: "コピー", copied: "コピー済み", format: "24時間表記", clocks: "ライブ時計", gmt: "現在の GMT", est: "現在の東部時間", result: "変換結果", note: "EST は GMT より通常5時間遅れ、EDT は4時間遅れです。", presets: "クイック設定", meeting: "会議", event: "ライブイベント", trading: "取引時間", table: "GMT から EST 表", strip: "重なる時間", uses: "用途別", faq: "GMT から EST FAQ", topics: "タイムゾーン解説", visualAlt: "GMT と東部時間を示す生成マップ" },
  de: { h1: "GMT in EST umrechnen", eyebrow: "Sofortiger Zeitrechner", lead: "GMT in Eastern Time umrechnen, inklusive automatischer Sommerzeit.", input: "Datum und Uhrzeit", convertNow: "Aktuelle Zeit", copy: "Kopieren", copied: "Kopiert", format: "24-Stunden-Format", clocks: "Live-Uhren", gmt: "Aktuelle GMT", est: "Aktuelle Eastern Time", result: "Umgerechnete Zeit", note: "EST liegt meist 5 Stunden hinter GMT, EDT 4 Stunden.", presets: "Schnellwahl", meeting: "Meeting", event: "Live-Event", trading: "Handelszeiten", table: "GMT-EST-Tabelle", strip: "Arbeitszeit-Overlap", uses: "Praxisfälle", faq: "GMT-EST-FAQ", topics: "Zeitzonenwissen", visualAlt: "Generierte Karte mit GMT und Eastern Time" },
  fr: { h1: "Convertisseur GMT vers EST", eyebrow: "Calculateur instantané", lead: "Convertissez GMT en heure de l’Est avec gestion automatique du DST.", input: "Date et heure", convertNow: "Utiliser l’heure actuelle", copy: "Copier", copied: "Copié", format: "Format 24 h", clocks: "Horloges en direct", gmt: "GMT actuel", est: "Heure de l’Est actuelle", result: "Heure convertie", note: "EST a généralement 5 heures de retard sur GMT, EDT 4 heures.", presets: "Raccourcis", meeting: "Réunion", event: "Événement live", trading: "Trading", table: "Table GMT vers EST", strip: "Chevauchement utile", uses: "Cas d’usage", faq: "FAQ GMT vers EST", topics: "Guide des fuseaux", visualAlt: "Carte générée montrant GMT et l’heure de l’Est" },
  ko: { h1: "GMT에서 EST 변환기", eyebrow: "즉시 시간 계산기", lead: "GMT를 미국 동부 시간으로 변환하고 DST를 자동 처리합니다.", input: "날짜와 시간", convertNow: "현재 시간 사용", copy: "복사", copied: "복사됨", format: "24시간 형식", clocks: "실시간 시계", gmt: "현재 GMT", est: "현재 동부 시간", result: "변환된 시간", note: "EST는 GMT보다 보통 5시간, EDT는 4시간 늦습니다.", presets: "빠른 설정", meeting: "회의", event: "라이브 이벤트", trading: "거래 시간", table: "GMT-EST 표", strip: "겹치는 업무 시간", uses: "실제 활용", faq: "GMT-EST FAQ", topics: "시간대 가이드", visualAlt: "GMT와 동부 시간 지역을 보여주는 생성 지도" },
  it: { h1: "Convertitore GMT in EST", eyebrow: "Calcolatore istantaneo", lead: "Converti GMT in ora orientale con gestione automatica dell’ora legale.", input: "Data e ora", convertNow: "Usa ora attuale", copy: "Copia", copied: "Copiato", format: "Formato 24 h", clocks: "Orologi live", gmt: "GMT attuale", est: "Ora orientale attuale", result: "Ora convertita", note: "EST è di solito 5 ore dietro GMT, EDT 4 ore.", presets: "Scelte rapide", meeting: "Riunione", event: "Evento live", trading: "Trading", table: "Tabella GMT-EST", strip: "Sovrapposizione", uses: "Uso reale", faq: "FAQ GMT-EST", topics: "Guida fusi orari", visualAlt: "Mappa generata con GMT e ora orientale" },
  tr: { h1: "GMT EST Dönüştürücü", eyebrow: "Anında saat hesaplayıcı", lead: "GMT'yi Doğu Saati'ne çevirin; yaz saati otomatik hesaplansın.", input: "Tarih ve saat", convertNow: "Şimdiki zamanı kullan", copy: "Kopyala", copied: "Kopyalandı", format: "24 saat", clocks: "Canlı saatler", gmt: "Güncel GMT", est: "Güncel Eastern Time", result: "Dönüştürülen saat", note: "EST genelde GMT'den 5 saat, EDT 4 saat geridedir.", presets: "Hızlı seçimler", meeting: "Toplantı", event: "Canlı etkinlik", trading: "Piyasa saatleri", table: "GMT EST tablosu", strip: "Çakışan saatler", uses: "Gerçek kullanım", faq: "GMT EST SSS", topics: "Saat dilimi rehberi", visualAlt: "GMT ve Eastern Time bölgelerini gösteren üretilmiş harita" },
  ur: { h1: "GMT سے EST کنورٹر", eyebrow: "فوری وقت کیلکولیٹر", lead: "GMT کو Eastern Time میں بدلیں، DST خودکار طور پر شامل ہے۔", input: "تاریخ اور وقت", convertNow: "موجودہ وقت", copy: "کاپی", copied: "کاپی ہو گیا", format: "24 گھنٹے", clocks: "لائیو گھڑیاں", gmt: "موجودہ GMT", est: "موجودہ Eastern Time", result: "تبدیل شدہ وقت", note: "EST عموماً GMT سے 5 گھنٹے اور EDT 4 گھنٹے پیچھے ہوتا ہے۔", presets: "فوری اختیارات", meeting: "میٹنگ", event: "لائیو ایونٹ", trading: "ٹریڈنگ", table: "GMT سے EST جدول", strip: "کام کے اوقات", uses: "عملی استعمال", faq: "GMT سے EST سوالات", topics: "ٹائم زون گائیڈ", visualAlt: "GMT اور Eastern Time علاقوں کا بنایا گیا نقشہ" },
  bn: { h1: "GMT থেকে EST কনভার্টার", eyebrow: "তাৎক্ষণিক সময় ক্যালকুলেটর", lead: "GMT থেকে Eastern Time রূপান্তর করুন, DST স্বয়ংক্রিয়।", input: "তারিখ ও সময়", convertNow: "বর্তমান সময়", copy: "কপি", copied: "কপি হয়েছে", format: "২৪ ঘণ্টা", clocks: "লাইভ ঘড়ি", gmt: "বর্তমান GMT", est: "বর্তমান Eastern Time", result: "রূপান্তরিত সময়", note: "EST সাধারণত GMT থেকে ৫ ঘণ্টা, EDT ৪ ঘণ্টা পিছিয়ে।", presets: "দ্রুত পছন্দ", meeting: "মিটিং", event: "লাইভ ইভেন্ট", trading: "ট্রেডিং", table: "GMT থেকে EST চার্ট", strip: "ওভারল্যাপ সময়", uses: "বাস্তব ব্যবহার", faq: "GMT থেকে EST প্রশ্ন", topics: "টাইম জোন গাইড", visualAlt: "GMT ও Eastern Time অঞ্চল দেখানো তৈরি মানচিত্র" },
  vi: { h1: "Bộ đổi GMT sang EST", eyebrow: "Máy tính giờ tức thì", lead: "Đổi GMT sang giờ miền Đông với DST tự động.", input: "Ngày và giờ", convertNow: "Dùng giờ hiện tại", copy: "Sao chép", copied: "Đã sao chép", format: "Định dạng 24h", clocks: "Đồng hồ trực tiếp", gmt: "GMT hiện tại", est: "Giờ miền Đông hiện tại", result: "Giờ đã đổi", note: "EST thường chậm hơn GMT 5 giờ, EDT chậm hơn 4 giờ.", presets: "Lối tắt", meeting: "Họp", event: "Sự kiện live", trading: "Giờ giao dịch", table: "Bảng GMT sang EST", strip: "Giờ trùng nhau", uses: "Ứng dụng thực tế", faq: "FAQ GMT sang EST", topics: "Hướng dẫn múi giờ", visualAlt: "Bản đồ tạo sẵn hiển thị GMT và giờ miền Đông" },
  th: { h1: "ตัวแปลง GMT เป็น EST", eyebrow: "คำนวณเวลาทันที", lead: "แปลง GMT เป็นเวลาตะวันออกพร้อมจัดการ DST อัตโนมัติ", input: "วันที่และเวลา", convertNow: "ใช้เวลาปัจจุบัน", copy: "คัดลอก", copied: "คัดลอกแล้ว", format: "รูปแบบ 24 ชม.", clocks: "นาฬิกาสด", gmt: "GMT ปัจจุบัน", est: "เวลาตะวันออกปัจจุบัน", result: "เวลาที่แปลงแล้ว", note: "EST ช้ากว่า GMT 5 ชั่วโมง และ EDT ช้ากว่า 4 ชั่วโมง", presets: "ตัวเลือกด่วน", meeting: "ประชุม", event: "อีเวนต์สด", trading: "เวลาซื้อขาย", table: "ตาราง GMT เป็น EST", strip: "เวลาทำงานทับซ้อน", uses: "การใช้งานจริง", faq: "คำถาม GMT เป็น EST", topics: "คู่มือเขตเวลา", visualAlt: "แผนที่สร้างขึ้นแสดง GMT และเวลาตะวันออก" },
  id: { h1: "Konverter GMT ke EST", eyebrow: "Kalkulator waktu instan", lead: "Ubah GMT ke Waktu Timur dengan DST otomatis.", input: "Tanggal dan waktu", convertNow: "Pakai waktu saat ini", copy: "Salin", copied: "Disalin", format: "Format 24 jam", clocks: "Jam langsung", gmt: "GMT saat ini", est: "Waktu Timur saat ini", result: "Waktu hasil", note: "EST biasanya 5 jam di belakang GMT, EDT 4 jam.", presets: "Pintasan cepat", meeting: "Rapat", event: "Acara live", trading: "Jam trading", table: "Tabel GMT ke EST", strip: "Jam overlap", uses: "Kegunaan nyata", faq: "FAQ GMT ke EST", topics: "Panduan zona waktu", visualAlt: "Peta buatan yang menunjukkan GMT dan Waktu Timur" },
  fa: { h1: "تبدیل GMT به EST", eyebrow: "محاسبه‌گر فوری زمان", lead: "GMT را به زمان شرقی تبدیل کنید و DST خودکار محاسبه شود.", input: "تاریخ و زمان", convertNow: "استفاده از زمان فعلی", copy: "کپی", copied: "کپی شد", format: "قالب ۲۴ ساعته", clocks: "ساعت‌های زنده", gmt: "GMT فعلی", est: "زمان شرقی فعلی", result: "زمان تبدیل‌شده", note: "EST معمولاً ۵ ساعت و EDT ۴ ساعت از GMT عقب‌تر است.", presets: "گزینه‌های سریع", meeting: "جلسه", event: "رویداد زنده", trading: "ساعات معامله", table: "جدول GMT به EST", strip: "همپوشانی کاری", uses: "کاربردهای واقعی", faq: "پرسش‌های GMT به EST", topics: "راهنمای مناطق زمانی", visualAlt: "نقشه تولیدشده از GMT و زمان شرقی" },
  pl: { h1: "Konwerter GMT na EST", eyebrow: "Natychmiastowy kalkulator", lead: "Przelicz GMT na czas wschodni z automatyczną obsługą DST.", input: "Data i godzina", convertNow: "Użyj bieżącego czasu", copy: "Kopiuj", copied: "Skopiowano", format: "Format 24 h", clocks: "Zegary na żywo", gmt: "Aktualny GMT", est: "Aktualny czas wschodni", result: "Przeliczony czas", note: "EST jest zwykle 5 godzin za GMT, EDT 4 godziny.", presets: "Szybkie wybory", meeting: "Spotkanie", event: "Wydarzenie live", trading: "Godziny handlu", table: "Tabela GMT na EST", strip: "Wspólne godziny", uses: "Realne zastosowania", faq: "FAQ GMT na EST", topics: "Przewodnik po strefach", visualAlt: "Wygenerowana mapa GMT i czasu wschodniego" }
});

const faq = {
  en: [
    ["What is GMT?", "GMT, or Greenwich Mean Time, is the time standard historically tied to the Greenwich meridian. For practical online conversion, GMT is treated as UTC+0."],
    ["What is EST?", "EST means Eastern Standard Time, UTC-5. In summer, many Eastern Time locations use EDT, which is UTC-4."],
    ["Is GMT always 5 hours ahead of EST?", "GMT is 5 hours ahead of EST, but only 4 hours ahead of EDT during daylight saving time."],
    ["Does this converter handle daylight saving time?", "Yes. The calculator uses the America/New_York time zone, so it shows EST or EDT based on the selected date."],
    ["What is the best time to call from GMT to EST?", "For standard office hours, 14:00 to 17:00 GMT often overlaps with 9:00 to 12:00 Eastern Time, changing by one hour during DST."]
  ]
};

for (const [code] of languages) {
  if (!faq[code]) {
    const s = ui[code] || ui.en;
    faq[code] = [
      [s.topics, s.lead],
      [s.table, s.note],
      [s.strip, `${s.clocks}. ${s.uses}.`],
      [s.result, `${s.result}. ${s.note}`],
      [s.presets, `${s.meeting}. ${s.event}. ${s.trading}.`]
    ];
  }
}

const fallbackUi = (code) => ({
  ...ui.en,
  h1: languages.find((l) => l[0] === code)[3],
  lead: languages.find((l) => l[0] === code)[4],
  faq: `${languages.find((l) => l[0] === code)[3]} FAQs`
});

function esc(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function hreflang(slug) {
  return languages.map(([code]) => `<link rel="alternate" hreflang="${code}" href="${site}/${code}/${slug ? `${slug}/` : ""}">`).join("\n");
}

function schema(lang, slug, strings, title, desc) {
  const questions = (faq[lang] || faq.en).map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text }
  }));
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: `${site}/${lang}/${slug ? `${slug}/` : ""}`,
      description: desc
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: strings.h1, item: `${site}/${lang}/` },
        { "@type": "ListItem", position: 2, name: title, item: `${site}/${lang}/${slug ? `${slug}/` : ""}` }
      ]
    }
  ]);
}

function html(lang, langName, dir, slug, kind, baseTitle, desc) {
  const strings = ui[lang] || fallbackUi(lang);
  const title = lang === "en" ? baseTitle : languages.find((l) => l[0] === lang)[3];
  const canonical = `${site}/${lang}/${slug ? `${slug}/` : ""}`;
  const mode = kind === "reverse" ? "est-gmt" : "gmt-est";
  const pageLead = kind === "difference" ? strings.note : kind === "guide" ? strings.lead : desc;
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | GMT to EST</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  ${hreflang(slug)}
  <link rel="alternate" hreflang="x-default" href="${site}/en/${slug ? `${slug}/` : ""}">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${schema(lang, slug, strings, title, desc)}</script>
  <script defer src="/assets/app.js"></script>
</head>
<body data-lang="${lang}" data-mode="${mode}">
  <header class="topbar">
    <a class="brand" href="/${lang}/" aria-label="${esc(strings.h1)}"><span>GMT</span><b>EST</b></a>
    <nav aria-label="Primary">
      <a href="/${lang}/gmt-to-est/">GMT→EST</a>
      <a href="/${lang}/est-to-gmt/">EST→GMT</a>
      <a href="/${lang}/gmt-vs-est/">GMT vs EST</a>
      <a href="/${lang}/time-zone-guide/">Guide</a>
    </nav>
    <div class="switchers">
      <button id="theme" class="icon-button" type="button" aria-label="Toggle dark mode">◐</button>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${esc(strings.eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p>${esc(pageLead)}</p>
        <figure class="hero-visual reveal">
          <img width="960" height="420" src="/assets/timeflow-hero.svg" alt="Animated GMT to Eastern Time conversion visual">
        </figure>
      </div>
      <form class="converter" id="converter">
        <div class="converter-head">
          <div>
            <span class="step">1</span>
            <strong>${esc(strings.input)}</strong>
          </div>
          <button type="button" id="swap" class="swap-button" aria-label="Swap conversion direction">⇄</button>
        </div>
        <div class="mode-tabs" role="tablist" aria-label="Conversion direction">
          <button type="button" class="mode active" data-mode="gmt-est"><span>From</span><b>GMT</b><small>to Eastern</small></button>
          <button type="button" class="mode" data-mode="est-gmt"><span>From</span><b>EST / EDT</b><small>to GMT</small></button>
        </div>
        <label class="datetime-label"><span id="inputZoneName">GMT time</span><input id="datetime" type="datetime-local"></label>
        <div class="controls">
          <button type="button" id="now">${esc(strings.convertNow)}</button>
          <label class="toggle"><input id="formatToggle" type="checkbox" checked> ${esc(strings.format)}</label>
        </div>
        <div class="answer-card">
          <span class="step">2</span>
          <div class="answer-grid">
            <div>
              <span id="sourceZone">GMT</span>
              <strong id="sourcePreview">--</strong>
            </div>
            <div class="arrow" aria-hidden="true">→</div>
            <div>
              <span id="outputZoneName">Eastern Time</span>
              <output class="result" id="result" aria-live="polite">--</output>
            </div>
          </div>
          <div class="result-actions">
            <strong class="offset-badge" id="offsetBadge">DST aware</strong>
            <button type="button" id="copy" data-copied="${esc(strings.copied)}">${esc(strings.copy)}</button>
          </div>
        </div>
        <p class="difference" id="difference">${esc(strings.note)}</p>
      </form>
    </section>

    <section class="visual-lab" aria-labelledby="visual-lab">
      <div>
        <p class="eyebrow">Visual planner</p>
        <h2 id="visual-lab">Explore the time shift</h2>
      </div>
      <article class="motion-card reveal">
        <div class="orbit-visual" aria-hidden="true">
          <span class="planet"></span>
          <span class="orbit-dot dot-a"></span>
          <span class="orbit-dot dot-b"></span>
        </div>
        <h3>Day and night rhythm</h3>
        <p>See why GMT business hours land later in the Eastern day.</p>
      </article>
      <article class="motion-card reveal">
        <div class="wave-visual" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        <h3>DST-aware offset</h3>
        <p>The offset changes between 5 hours and 4 hours when Eastern Time uses daylight saving.</p>
      </article>
      <article class="motion-card reveal">
        <div class="blocks-visual" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => `<span style="--i:${i}"></span>`).join("")}</div>
        <h3>Meeting overlap</h3>
        <p>Scan useful windows before you send a calendar invite.</p>
      </article>
    </section>

    <section class="clock-grid" aria-labelledby="live-clocks">
      <h2 id="live-clocks">${esc(strings.clocks)}</h2>
      <div class="clock-card"><span>${esc(strings.gmt)}</span><strong id="gmtClock">--:--</strong></div>
      <div class="clock-card"><span>${esc(strings.est)}</span><strong id="estClock">--:--</strong><em id="estZone">EST</em></div>
    </section>

    <section class="band">
      <div>
        <h2>${esc(strings.presets)}</h2>
        <div class="preset-row">
          <button type="button" data-preset="meeting">${esc(strings.meeting)}</button>
          <button type="button" data-preset="event">${esc(strings.event)}</button>
          <button type="button" data-preset="trading">${esc(strings.trading)}</button>
        </div>
      </div>
      <img loading="lazy" width="900" height="380" src="/assets/clock-visual.svg" alt="GMT and Eastern Time clock comparison visual">
    </section>

    <section aria-labelledby="chart">
      <h2 id="chart">${esc(strings.table)}</h2>
      <div class="table-wrap"><table id="timeTable"><thead><tr><th>GMT</th><th>Eastern</th><th>Offset</th></tr></thead><tbody></tbody></table></div>
    </section>

    <section aria-labelledby="strip">
      <h2 id="strip">${esc(strings.strip)}</h2>
      <div class="time-strip" id="timeStrip" aria-label="GMT and Eastern Time overlap timeline"></div>
    </section>

    <section class="use-cases" aria-labelledby="uses">
      <h2 id="uses">${esc(strings.uses)}</h2>
      ${["Forex traders", "Remote workers", "Gamers", "Students", "International businesses"].map((name) => `<article><h3>${name}</h3><p>Use precise GMT to Eastern Time conversion for schedules where one missed hour changes the outcome.</p></article>`).join("")}
    </section>

    <section class="content" aria-labelledby="topics">
      <h2 id="topics">${esc(strings.topics)}</h2>
      <article id="what-is-gmt"><h3>What is GMT?</h3><p>GMT is the zero-offset reference used for global coordination. It is the baseline for GMT to EST calculators, charts, current GMT time, and event planning.</p></article>
      <article id="what-is-est"><h3>What is EST?</h3><p>EST is Eastern Standard Time at UTC-5. When daylight saving time applies in New York, the zone becomes EDT at UTC-4.</p></article>
      <article id="dst"><h3>GMT to EST daylight saving time</h3><p>The safest conversion checks the date. This website labels the result as EST or EDT and explains whether the offset is four or five hours.</p></article>
      <article id="planner"><h3>GMT to EST meeting planner</h3><p>For calls, classes, webinars, and launches, compare both live clocks and the 24-hour chart before sending invitations.</p></article>
      <article id="trading"><h3>GMT to EST for trading</h3><p>Forex and market schedules often publish GMT times, while many desks operate on Eastern Time. The quick preset highlights common market overlap windows.</p></article>
      <article id="abbr"><h3>Time zone abbreviations explained</h3><p>GMT, EST, and EDT are abbreviations. The underlying conversion should use a named zone like America/New_York when daylight saving rules matter.</p></article>
    </section>

    <section class="faq" aria-labelledby="faq">
      <h2 id="faq">${esc(strings.faq)}</h2>
      ${(faq[lang] || faq.en).map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </section>

    <figure class="map">
      <img loading="lazy" width="1200" height="520" src="/assets/world-time-map.svg" alt="${esc(strings.visualAlt)}">
    </figure>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} GMT to EST Converter</p>
    <a href="/${lang}/gmt-to-est/">GMT to EST calculator</a>
    <a href="/${lang}/est-to-gmt/">EST to GMT calculator</a>
    <a href="/${lang}/gmt-vs-est/">GMT vs EST difference</a>
  </footer>
</body>
</html>`;
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

for (const [lang, name, dir, title, desc] of languages) {
  for (const [slug, kind, baseTitle] of pages) {
    write(path.join(process.cwd(), lang, slug, "index.html"), html(lang, name, dir, slug, kind, baseTitle, desc));
  }
}

write(path.join(process.cwd(), "index.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GMT to EST Converter</title><link rel="canonical" href="${site}/en/"><meta http-equiv="refresh" content="0; url=/en/"></head><body><a href="/en/">GMT to EST Converter</a></body></html>`);

const urls = [];
for (const [lang] of languages) {
  for (const [slug] of pages) urls.push(`${site}/${lang}/${slug ? `${slug}/` : ""}`);
}
write(path.join(process.cwd(), "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${u}</loc></url>`).join("")}</urlset>`);

console.log(`Generated ${urls.length + 1} pages.`);
