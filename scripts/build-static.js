const fs = require("fs");
const path = require("path");

const rawSite = process.env.SITE_URL || "https://gmttoestconverter.com";
const site = rawSite.replace(/\/+$/, "").replace("://www.", "://");
const primaryKeyword = "GMT to EST Converter";
const primaryLandingSlug = "gmt-to-est-converter";
const languages = [
  ["en", "English", "ltr", "GMT to EST Converter", "GMT to EST Converter for instant GMT to EST or EDT conversions with live clocks, DST handling, meeting presets, a 24-hour chart, and timezone FAQs."],
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
    uses: "Built for real use", faq: "GMT to EST FAQs", topics: "Time zone authority", visualAlt: "GMT to EST world map showing time regions"
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
  ],
  es: [
    ["¿Qué es GMT?", "GMT, o Hora del Meridiano de Greenwich, es el estándar de tiempo de referencia en UTC+0."],
    ["¿Qué es EST?", "EST significa Hora Estándar del Este, UTC-5. En verano muchas zonas del Este usan EDT, que es UTC-4."],
    ["¿GMT siempre está 5 horas adelante de EST?", "GMT está 5 horas adelante de EST, pero solo 4 horas adelante de EDT durante el horario de verano."],
    ["¿Este convertidor maneja el horario de verano?", "Sí. El calculador usa la zona America/New_York y muestra EST o EDT según la fecha seleccionada."],
    ["¿Cuál es la mejor hora para llamar de GMT a EST?", "Para horario de oficina estándar, de 14:00 a 17:00 GMT suele coincidir con 9:00 a 12:00 hora del Este, cambiando una hora en horario de verano."]
  ],
  zh: [
    ["什么是 GMT？", "GMT 即格林威治标准时间，是 UTC+0 的时间参考标准。"],
    ["什么是 EST？", "EST 是东部标准时间，即 UTC-5。夏季许多东部地区使用 EDT，即 UTC-4。"],
    ["GMT 总是比 EST 快 5 小时吗？", "GMT 比 EST 快 5 小时，但在夏令时期间只比 EDT 快 4 小时。"],
    ["此转换器能处理夏令时吗？", "可以。计算器使用 America/New_York 时区，根据所选日期显示 EST 或 EDT。"],
    ["从 GMT 打电话到 EST 最佳时间是什么时候？", "标准办公时间内，GMT 14:00 至 17:00 通常与东部时间 9:00 至 12:00 重叠，夏令时期间偏移一小时。"]
  ],
  hi: [
    ["GMT क्या है?", "GMT यानी ग्रीनविच मीन टाइम, UTC+0 का समय संदर्भ मानक है।"],
    ["EST क्या है?", "EST यानी पूर्वी मानक समय, UTC-5 है। गर्मियों में कई पूर्वी क्षेत्र EDT (UTC-4) का उपयोग करते हैं।"],
    ["क्या GMT हमेशा EST से 5 घंटे आगे है?", "GMT, EST से 5 घंटे आगे है, लेकिन DST के दौरान EDT से केवल 4 घंटे आगे होता है।"],
    ["क्या यह कनवर्टर DST को संभालता है?", "हाँ। कैलकुलेटर America/New_York ज़ोन का उपयोग करता है और चुनी गई तिथि के अनुसार EST या EDT दिखाता है।"],
    ["GMT से EST पर कॉल करने का सबसे अच्छा समय क्या है?", "मानक कार्यालय समय के लिए, GMT 14:00 से 17:00 अक्सर Eastern Time 9:00 से 12:00 से मेल खाता है।"]
  ],
  ar: [
    ["ما هو GMT؟", "GMT أو توقيت غرينتش هو المعيار الزمني المرجعي عند UTC+0."],
    ["ما هو EST؟", "EST هو التوقيت الشرقي الموحد عند UTC-5. في الصيف تستخدم مناطق كثيرة EDT عند UTC-4."],
    ["هل GMT دائماً 5 ساعات أمام EST؟", "GMT يتقدم 5 ساعات على EST، لكن 4 ساعات فقط على EDT خلال التوقيت الصيفي."],
    ["هل يدعم هذا المحوّل التوقيت الصيفي؟", "نعم. يستخدم الحاسبة منطقة America/New_York ويعرض EST أو EDT حسب التاريخ المحدد."],
    ["ما أفضل وقت للاتصال من GMT إلى EST؟", "لساعات العمل الاعتيادية، يتداخل GMT 14:00–17:00 مع 9:00–12:00 بالتوقيت الشرقي، مع تغيير ساعة واحدة خلال التوقيت الصيفي."]
  ],
  pt: [
    ["O que é GMT?", "GMT, ou Hora do Meridiano de Greenwich, é o padrão de tempo de referência em UTC+0."],
    ["O que é EST?", "EST significa Hora Padrão do Leste, UTC-5. No verão, muitas regiões do Leste usam EDT, que é UTC-4."],
    ["GMT está sempre 5 horas à frente de EST?", "GMT está 5 horas à frente de EST, mas apenas 4 horas à frente de EDT durante o horário de verão."],
    ["Este conversor lida com o horário de verão?", "Sim. A calculadora usa o fuso America/New_York e exibe EST ou EDT conforme a data selecionada."],
    ["Qual o melhor horário para ligar de GMT para EST?", "Para horário comercial padrão, 14h às 17h GMT geralmente coincide com 9h às 12h do Leste, mudando uma hora no horário de verão."]
  ],
  ru: [
    ["Что такое GMT?", "GMT — Среднее время по Гринвичу, эталонный стандарт времени на UTC+0."],
    ["Что такое EST?", "EST — Восточное стандартное время, UTC-5. Летом многие восточные регионы используют EDT (UTC-4)."],
    ["Всегда ли GMT на 5 часов опережает EST?", "GMT опережает EST на 5 часов, но только на 4 часа в период летнего времени EDT."],
    ["Учитывает ли конвертер летнее время?", "Да. Калькулятор использует зону America/New_York и показывает EST или EDT в зависимости от выбранной даты."],
    ["Когда лучше всего звонить из GMT в EST?", "Для стандартных рабочих часов 14:00–17:00 GMT часто совпадает с 9:00–12:00 по восточному времени, с поправкой на час при летнем времени."]
  ],
  ja: [
    ["GMTとは何ですか？", "GMTはグリニッジ標準時で、UTC+0の時間基準です。"],
    ["ESTとは何ですか？", "ESTは東部標準時（UTC-5）です。夏季には多くの東部地域がEDT（UTC-4）を使用します。"],
    ["GMTは常にESTより5時間早いですか？", "GMTはESTより5時間早いですが、夏時間のEDTとは4時間差になります。"],
    ["このコンバーターは夏時間に対応していますか？", "はい。America/New_Yorkゾーンを使用し、選択した日付に応じてESTまたはEDTを表示します。"],
    ["GMTからESTへ電話する最適な時間帯は？", "通常の業務時間では、GMT14:00〜17:00が東部時間9:00〜12:00に重なることが多く、夏時間中は1時間ずれます。"]
  ],
  de: [
    ["Was ist GMT?", "GMT steht für Greenwich Mean Time und ist der Zeitstandard bei UTC+0."],
    ["Was ist EST?", "EST steht für Eastern Standard Time, UTC-5. Im Sommer nutzen viele Regionen EDT (UTC-4)."],
    ["Ist GMT immer 5 Stunden vor EST?", "GMT liegt 5 Stunden vor EST, aber nur 4 Stunden vor EDT während der Sommerzeit."],
    ["Berücksichtigt dieser Konverter die Sommerzeit?", "Ja. Der Rechner nutzt die Zone America/New_York und zeigt EST oder EDT je nach gewähltem Datum."],
    ["Wann ist die beste Zeit für einen Anruf von GMT nach EST?", "Für normale Bürozeiten überschneiden sich GMT 14:00–17:00 oft mit 9:00–12:00 Eastern Time, verschoben um eine Stunde in der Sommerzeit."]
  ],
  fr: [
    ["Qu'est-ce que GMT ?", "GMT, l'heure du méridien de Greenwich, est le standard de temps de référence à UTC+0."],
    ["Qu'est-ce que EST ?", "EST signifie Heure normale de l'Est, UTC-5. En été, beaucoup de régions de l'Est utilisent EDT (UTC-4)."],
    ["GMT est-il toujours 5 heures en avance sur EST ?", "GMT est en avance de 5 heures sur EST, mais seulement de 4 heures sur EDT pendant l'heure d'été."],
    ["Ce convertisseur gère-t-il l'heure d'été ?", "Oui. La calculatrice utilise le fuseau America/New_York et affiche EST ou EDT selon la date sélectionnée."],
    ["Quelle est la meilleure heure pour appeler de GMT vers EST ?", "Pour les heures de bureau standards, 14h–17h GMT coïncide souvent avec 9h–12h heure de l'Est, avec un décalage d'une heure pendant l'heure d'été."]
  ],
  ko: [
    ["GMT란 무엇인가요?", "GMT는 그리니치 표준시로, UTC+0의 시간 기준입니다."],
    ["EST란 무엇인가요?", "EST는 동부 표준시(UTC-5)입니다. 여름에는 많은 동부 지역이 EDT(UTC-4)를 사용합니다."],
    ["GMT는 항상 EST보다 5시간 빠른가요?", "GMT는 EST보다 5시간 빠르지만, 일광절약시간(EDT) 동안에는 4시간 차이가 납니다."],
    ["이 변환기는 일광절약시간을 처리하나요?", "예. America/New_York 시간대를 사용하여 선택한 날짜에 따라 EST 또는 EDT를 표시합니다."],
    ["GMT에서 EST로 전화하기 가장 좋은 시간은 언제인가요?", "표준 업무 시간의 경우 GMT 14:00~17:00는 동부 시간 9:00~12:00와 겹치며, 일광절약시간 동안은 1시간 차이가 납니다."]
  ],
  it: [
    ["Cos'è GMT?", "GMT, o Greenwich Mean Time, è lo standard temporale di riferimento a UTC+0."],
    ["Cos'è EST?", "EST significa Eastern Standard Time, UTC-5. In estate molte zone orientali usano EDT (UTC-4)."],
    ["GMT è sempre 5 ore avanti rispetto a EST?", "GMT è 5 ore avanti di EST, ma solo 4 ore avanti di EDT durante l'ora legale."],
    ["Questo convertitore gestisce l'ora legale?", "Sì. Il calcolatore usa il fuso America/New_York e mostra EST o EDT in base alla data selezionata."],
    ["Qual è il momento migliore per chiamare da GMT a EST?", "Per gli orari d'ufficio standard, dalle 14:00 alle 17:00 GMT si sovrappone spesso alle 9:00–12:00 ora orientale, con uno spostamento di un'ora durante l'ora legale."]
  ],
  tr: [
    ["GMT nedir?", "GMT, Greenwich Ortalama Saati anlamına gelir ve UTC+0 referans zaman standardıdır."],
    ["EST nedir?", "EST, Doğu Standart Saati, UTC-5 demektir. Yazın birçok Doğu bölgesi EDT (UTC-4) kullanır."],
    ["GMT her zaman EST'den 5 saat önde midir?", "GMT, EST'den 5 saat önde olur; ancak yaz saati uygulaması döneminde EDT'den yalnızca 4 saat öndedir."],
    ["Bu dönüştürücü yaz saati uygulamasını destekliyor mu?", "Evet. Hesaplayıcı America/New_York dilimini kullanır ve seçilen tarihe göre EST veya EDT gösterir."],
    ["GMT'den EST'ye en iyi arama saati nedir?", "Standart mesai saatlerinde GMT 14:00–17:00, çoğunlukla Doğu Saati 9:00–12:00 ile örtüşür; yaz saatinde bir saat kayar."]
  ],
  ur: [
    ["GMT کیا ہے؟", "GMT یعنی گرین وچ مین ٹائم، UTC+0 کا حوالہ وقت معیار ہے۔"],
    ["EST کیا ہے؟", "EST یعنی مشرقی معیاری وقت، UTC-5 ہے۔ گرمیوں میں بہت سے مشرقی علاقے EDT (UTC-4) استعمال کرتے ہیں۔"],
    ["کیا GMT ہمیشہ EST سے 5 گھنٹے آگے ہوتا ہے؟", "GMT، EST سے 5 گھنٹے آگے ہوتا ہے، لیکن DST کے دوران EDT سے صرف 4 گھنٹے آگے ہوتا ہے۔"],
    ["کیا یہ کنورٹر DST کو سنبھالتا ہے؟", "ہاں۔ کیلکولیٹر America/New_York زون استعمال کرتا ہے اور منتخب تاریخ کے مطابق EST یا EDT دکھاتا ہے۔"],
    ["GMT سے EST پر کال کرنے کا بہترین وقت کیا ہے؟", "معیاری دفتری اوقات کے لیے، GMT 14:00 سے 17:00 اکثر مشرقی وقت 9:00 سے 12:00 کے ساتھ ملتا ہے۔"]
  ],
  bn: [
    ["GMT কী?", "GMT মানে গ্রিনউইচ মিন টাইম, এটি UTC+0-এর রেফারেন্স সময় মান।"],
    ["EST কী?", "EST মানে ইস্টার্ন স্ট্যান্ডার্ড টাইম, UTC-5। গ্রীষ্মে অনেক পূর্বাঞ্চলীয় এলাকা EDT (UTC-4) ব্যবহার করে।"],
    ["GMT কি সবসময় EST-এর চেয়ে ৫ ঘন্টা এগিয়ে?", "GMT, EST-এর চেয়ে ৫ ঘন্টা এগিয়ে, কিন্তু DST চলাকালে EDT-এর চেয়ে মাত্র ৪ ঘন্টা এগিয়ে।"],
    ["এই কনভার্টার কি DST সামলায়?", "হ্যাঁ। ক্যালকুলেটর America/New_York জোন ব্যবহার করে এবং নির্বাচিত তারিখ অনুযায়ী EST বা EDT দেখায়।"],
    ["GMT থেকে EST-এ কল করার সেরা সময় কোনটি?", "প্রমাণ অফিস সময়ের জন্য, GMT 14:00–17:00 প্রায়ই ইস্টার্ন টাইম 9:00–12:00-এর সাথে মিলে যায়।"]
  ],
  vi: [
    ["GMT là gì?", "GMT là Giờ Trung bình Greenwich, tiêu chuẩn thời gian tham chiếu tại UTC+0."],
    ["EST là gì?", "EST là Giờ Chuẩn miền Đông, UTC-5. Mùa hè nhiều khu vực miền Đông dùng EDT (UTC-4)."],
    ["GMT luôn sớm hơn EST 5 tiếng?", "GMT sớm hơn EST 5 tiếng, nhưng trong giờ mùa hè EDT chỉ sớm hơn 4 tiếng."],
    ["Bộ đổi này có xử lý giờ mùa hè không?", "Có. Máy tính dùng múi giờ America/New_York và hiển thị EST hoặc EDT tùy theo ngày được chọn."],
    ["Thời điểm tốt nhất để gọi từ GMT sang EST là khi nào?", "Với giờ làm việc tiêu chuẩn, GMT 14:00–17:00 thường trùng với 9:00–12:00 giờ miền Đông, lệch 1 giờ trong mùa hè."]
  ],
  th: [
    ["GMT คืออะไร?", "GMT หรือเวลามาตรฐานกรีนิช คือเวลาอ้างอิงที่ UTC+0"],
    ["EST คืออะไร?", "EST คือเวลามาตรฐานตะวันออก UTC-5 ในฤดูร้อนหลายพื้นที่ตะวันออกใช้ EDT (UTC-4)"],
    ["GMT เร็วกว่า EST เสมอ 5 ชั่วโมงหรือไม่?", "GMT เร็วกว่า EST 5 ชั่วโมง แต่ในช่วงฤดูร้อน EDT เร็วกว่าเพียง 4 ชั่วโมง"],
    ["ตัวแปลงนี้รองรับการปรับเวลาฤดูร้อนหรือไม่?", "ใช่ เครื่องคำนวณใช้โซน America/New_York และแสดง EST หรือ EDT ตามวันที่ที่เลือก"],
    ["เวลาที่ดีที่สุดในการโทรจาก GMT ไป EST คือเมื่อไร?", "สำหรับเวลาทำงานมาตรฐาน GMT 14:00–17:00 มักทับซ้อนกับ 9:00–12:00 เวลาตะวันออก โดยเลื่อน 1 ชั่วโมงในช่วงฤดูร้อน"]
  ],
  id: [
    ["Apa itu GMT?", "GMT atau Greenwich Mean Time adalah standar waktu referensi di UTC+0."],
    ["Apa itu EST?", "EST adalah Eastern Standard Time, UTC-5. Di musim panas banyak wilayah Timur menggunakan EDT (UTC-4)."],
    ["Apakah GMT selalu 5 jam lebih awal dari EST?", "GMT 5 jam lebih awal dari EST, tetapi hanya 4 jam lebih awal dari EDT selama waktu musim panas."],
    ["Apakah konverter ini menangani waktu musim panas?", "Ya. Kalkulator menggunakan zona America/New_York dan menampilkan EST atau EDT sesuai tanggal yang dipilih."],
    ["Kapan waktu terbaik untuk menelepon dari GMT ke EST?", "Untuk jam kerja standar, GMT 14:00–17:00 sering bertepatan dengan 9:00–12:00 Waktu Timur, bergeser 1 jam saat musim panas."]
  ],
  fa: [
    ["GMT چیست؟", "GMT یا زمان میانگین گرینویچ، استاندارد مرجع زمانی در UTC+0 است."],
    ["EST چیست؟", "EST زمان استاندارد شرقی، یعنی UTC-5 است. در تابستان بسیاری از مناطق شرقی از EDT (UTC-4) استفاده می‌کنند."],
    ["آیا GMT همیشه ۵ ساعت از EST جلوتر است؟", "GMT پنج ساعت از EST جلوتر است، اما در دوره تابستان تنها ۴ ساعت از EDT جلوتر است."],
    ["آیا این مبدل با تغییر ساعت تابستانی کار می‌کند؟", "بله. ماشین‌حساب از منطقه America/New_York استفاده می‌کند و بر اساس تاریخ انتخابی EST یا EDT را نشان می‌دهد."],
    ["بهترین زمان برای تماس از GMT به EST چه وقت است؟", "برای ساعات اداری معمول، ساعت ۱۴ تا ۱۷ GMT اغلب با ساعت ۹ تا ۱۲ زمان شرقی همپوشانی دارد."]
  ],
  pl: [
    ["Co to jest GMT?", "GMT, czyli Czas Południka Greenwich, to standardowy czas odniesienia przy UTC+0."],
    ["Co to jest EST?", "EST oznacza Eastern Standard Time, UTC-5. Latem wiele wschodnich regionów stosuje EDT (UTC-4)."],
    ["Czy GMT jest zawsze 5 godzin przed EST?", "GMT jest 5 godzin przed EST, ale tylko 4 godziny przed EDT w czasie letnim."],
    ["Czy ten konwerter obsługuje czas letni?", "Tak. Kalkulator używa strefy America/New_York i pokazuje EST lub EDT w zależności od wybranej daty."],
    ["Kiedy najlepiej dzwonić z GMT do EST?", "W standardowych godzinach biurowych GMT 14:00–17:00 często pokrywa się z 9:00–12:00 czasu wschodniego, z przesunięciem o godzinę w czasie letnim."]
  ]
};

const fallbackUi = (code) => ({
  ...ui.en,
  h1: languages.find((l) => l[0] === code)[3],
  lead: languages.find((l) => l[0] === code)[4],
  faq: `${languages.find((l) => l[0] === code)[3]} FAQs`
});

function esc(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function pagePath(lang, slug) {
  if (lang === "en" && !slug) {
    return "/";
  }
  return `/${lang}/${slug ? `${slug}/` : ""}`;
}

function pageUrl(lang, slug) {
  return `${site}${pagePath(lang, slug)}`;
}

function hreflang(slug) {
  return languages.map(([code]) => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code, slug)}">`).join("\n");
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
      url: pageUrl(lang, slug),
      description: desc
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: strings.h1, item: pageUrl(lang, "") },
        { "@type": "ListItem", position: 2, name: title, item: pageUrl(lang, slug) }
      ]
    }
  ]);
}

function html(lang, langName, dir, slug, kind, baseTitle, desc) {
  const strings = ui[lang] || fallbackUi(lang);
  const title = lang === "en" ? baseTitle : languages.find((l) => l[0] === lang)[3];
  const canonical = pageUrl(lang, slug);
  const mode = kind === "reverse" ? "est-gmt" : "gmt-est";
  const pageLead = kind === "difference" ? strings.note : kind === "guide" ? strings.lead : desc;
  const brandPath = pagePath(lang, "");
  const mapAlt = lang === "en" ? `${primaryKeyword} world map showing time regions` : `${strings.visualAlt} - GMT to EST`;
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZY6RBZFSY3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-ZY6RBZFSY3');
  </script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | GMT to EST</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  ${hreflang(slug)}
  <link rel="alternate" hreflang="x-default" href="${pageUrl("en", slug)}">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${schema(lang, slug, strings, title, desc)}</script>
  <script defer src="/assets/app.js"></script>
</head>
<body data-lang="${lang}" data-mode="${mode}">
  <header class="topbar">
    <a class="brand" href="${brandPath}" aria-label="${esc(strings.h1)}"><span>GMT</span><b>EST</b></a>
    <nav aria-label="Primary">
      <a href="/${lang}/gmt-to-est/">GMT→EST</a>
      <a href="/${lang}/est-to-gmt/">EST→GMT</a>
      <a href="/${lang}/gmt-vs-est/">GMT vs EST</a>
      <a href="/${lang}/time-zone-guide/">Guide</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${esc(strings.eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p>${esc(pageLead)}</p>
        <figure class="hero-visual reveal">
          <img width="960" height="420" src="/assets/gmt-to-est-converter-featured-image.svg" alt="${primaryKeyword} featured image showing conversion flow">
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

    <p class="seo-keyword-intro"><strong>GMT to EST Converter</strong> gives instant, date-aware conversion between GMT and Eastern Time with DST handling, live clocks, and a full comparison chart.</p>

    <section class="visual-lab" aria-labelledby="visual-lab">
      <div>
        <p class="eyebrow">Visual planner</p>
        <h2 id="visual-lab">GMT to EST Converter explore the time shift</h2>
      </div>
      <article class="motion-card reveal">
        <div class="orbit-visual" aria-hidden="true">
          <span class="planet"></span>
          <span class="orbit-dot dot-a"></span>
          <span class="orbit-dot dot-b"></span>
        </div>
        <h3>GMT to EST Converter day and night rhythm</h3>
        <p>See why GMT business hours land later in the Eastern day.</p>
      </article>
      <article class="motion-card reveal">
        <div class="wave-visual" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        <h3>GMT to EST Converter DST-aware offset</h3>
        <p>The offset changes between 5 hours and 4 hours when Eastern Time uses daylight saving.</p>
      </article>
      <article class="motion-card reveal">
        <div class="blocks-visual" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => `<span style="--i:${i}"></span>`).join("")}</div>
        <h3>GMT to EST Converter meeting overlap</h3>
        <p>Scan useful windows before you send a calendar invite.</p>
      </article>
    </section>

    <section class="clock-grid" aria-labelledby="live-clocks">
      <h2 id="live-clocks">GMT to EST Converter live clocks</h2>
      <div class="clock-card"><span>${esc(strings.gmt)}</span><strong id="gmtClock">--:--</strong></div>
      <div class="clock-card"><span>${esc(strings.est)}</span><strong id="estClock">--:--</strong><em id="estZone">EST</em></div>
    </section>

    <section class="band">
      <div>
        <h2>GMT to EST Converter quick presets</h2>
        <div class="preset-row">
          <button type="button" data-preset="meeting">${esc(strings.meeting)}</button>
          <button type="button" data-preset="event">${esc(strings.event)}</button>
          <button type="button" data-preset="trading">${esc(strings.trading)}</button>
        </div>
      </div>
      <img loading="lazy" width="900" height="380" src="/assets/gmt-to-est-converter-clock-visual.svg" alt="${primaryKeyword} clock comparison visual">
    </section>

    <section aria-labelledby="chart">
      <h2 id="chart">GMT to EST Converter chart</h2>
      <div class="table-wrap"><table id="timeTable"><thead><tr><th>GMT</th><th>Eastern</th><th>Offset</th></tr></thead><tbody></tbody></table></div>
    </section>

    <section aria-labelledby="strip">
      <h2 id="strip">GMT to EST Converter workday overlap</h2>
      <div class="time-strip" id="timeStrip" aria-label="GMT and Eastern Time overlap timeline"></div>
    </section>

    <section class="use-cases" aria-labelledby="uses">
      <h2 id="uses">GMT to EST Converter built for real use</h2>
      ${["Forex traders", "Remote workers", "Gamers", "Students", "International businesses"].map((name) => `<article><h3>${name}</h3><p>Use precise GMT to Eastern Time conversion for schedules where one missed hour changes the outcome.</p></article>`).join("")}
    </section>

    <section class="content" aria-labelledby="topics">
      <h2 id="topics">GMT to EST Converter time zone authority</h2>
      <article id="what-is-gmt"><h3>What is GMT?</h3><p>GMT is the zero-offset reference used for global coordination. It is the baseline for GMT to EST calculators, charts, current GMT time, and event planning.</p></article>
      <article id="what-is-est"><h3>What is EST?</h3><p>EST is Eastern Standard Time at UTC-5. When daylight saving time applies in New York, the zone becomes EDT at UTC-4.</p></article>
      <article id="dst"><h3>GMT to EST daylight saving time</h3><p>The safest conversion checks the date. This website labels the result as EST or EDT and explains whether the offset is four or five hours.</p></article>
      <article id="planner"><h3>GMT to EST meeting planner</h3><p>For calls, classes, webinars, and launches, compare both live clocks and the 24-hour chart before sending invitations.</p></article>
      <article id="trading"><h3>GMT to EST for trading</h3><p>Forex and market schedules often publish GMT times, while many desks operate on Eastern Time. The quick preset highlights common market overlap windows.</p></article>
      <article id="abbr"><h3>Time zone abbreviations explained</h3><p>GMT, EST, and EDT are abbreviations. The underlying conversion should use a named zone like America/New_York when daylight saving rules matter.</p></article>
    </section>

    <section class="faq" aria-labelledby="faq">
      <h2 id="faq">GMT to EST Converter FAQs</h2>
      ${(faq[lang] || faq.en).map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </section>

    <figure class="map">
      <img loading="lazy" width="1200" height="520" src="/assets/gmt-to-est-converter-world-time-map.svg" alt="${esc(mapAlt)}">
    </figure>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} GMT to EST Converter</p>
    <a href="/${lang}/gmt-to-est/">GMT to EST calculator</a>
    <a href="/${lang}/est-to-gmt/">EST to GMT calculator</a>
    <a href="/${lang}/gmt-vs-est/">GMT vs EST difference</a>
  </footer>
  <button id="back-to-top" class="back-to-top" aria-label="Back to top" title="Back to top">
    ↑
  </button>
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

const [enLang, enName, enDir, enTitle, enDesc] = languages.find(([code]) => code === "en");
write(path.join(process.cwd(), primaryLandingSlug, "index.html"), html(enLang, enName, enDir, "", "converter", enTitle, enDesc));

write(path.join(process.cwd(), "index.html"), html(enLang, enName, enDir, "", "converter", enTitle, enDesc));

const urls = [];
for (const [lang] of languages) {
  for (const [slug] of pages) urls.push(pageUrl(lang, slug));
}
write(path.join(process.cwd(), "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${u}</loc></url>`).join("")}</urlset>`);

console.log(`Generated ${urls.length + 1} pages.`);
