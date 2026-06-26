const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "theme", "i18n", "translations");

const en = {
  brand: "GMT to EST Converter",
  pages: {
    home: {
      title: "GMT to EST Converter",
      seoTitle: "GMT to EST Converter with DST-Aware Time Chart",
      description: "GMT to EST Converter for instant GMT to EST or EDT conversions with live clocks, daylight saving time handling, meeting presets, a 24-hour chart, and practical timezone notes.",
      keywords: "GMT to EST Converter, GMT to EST, EST to GMT, GMT to EST conversion, GMT to EST time difference",
      image: "/assets/gmt-to-est-converter-featured-image-960.avif",
      imageAlt: "GMT to EST Converter featured image showing live time conversion",
      ogType: "website",
      pubDate: "2026-05-19T00:00:00+05:00",
      updatedDate: "2026-06-19T00:00:00+05:00"
    },
    cdtToEst: {
      title: "CDT to EST Converter (Live) | 1 Hour Time Difference",
      description: "Convert CDT to EST instantly with live clocks, DST support, a 24-hour conversion chart, meeting planner, and real-time time difference calculator.",
      image: "/assets/cdt-to-est-converter-chart-960.avif",
      imageAlt: "CDT to EST conversion chart showing Central Time and Eastern Time difference"
    },
    cstToEst: {
      title: "CST to EST Converter (Live) | 1 Hour Time Difference",
      description: "Convert CST to EST instantly with live clocks, DST support, a 24-hour conversion chart, meeting planner, and real-time time difference calculator today.",
      image: "/assets/cst-to-est-converter-interface.png",
      imageAlt: "CST to EST conversion chart showing Central Standard Time and Eastern Standard Time difference"
    },
    gmtToEst: {
      title: "GMT to EST Converter",
      description: "GMT to EST Converter with automatic EST and EDT daylight saving handling for accurate Eastern Time conversions.",
      image: "/assets/gmt-to-est-converter-featured-image-960.avif",
      imageAlt: "GMT to EST Converter featured image showing live time conversion"
    },
    estToGmt: {
      title: "EST to GMT Converter",
      description: "Convert Eastern Time to GMT instantly with date-aware EST and EDT handling.",
      image: "/images/og/default.png",
      imageAlt: "EST to GMT Converter - timezone conversion chart"
    },
    gmtVsEst: {
      title: "GMT vs EST Difference",
      description: "Compare GMT and Eastern Time, including EST, EDT, daylight saving changes, and exact offsets.",
      image: "/images/og/default.png",
      imageAlt: "GMT vs EST Difference - time zone comparison"
    },
    guide: {
      title: "Time Zone Guide",
      description: "A practical guide to GMT, EST, EDT, abbreviations, daylight saving time, meetings, trading, and global scheduling.",
      image: "/images/og/default.png",
      imageAlt: "Time Zone Guide - GMT, EST, EDT info"
    },
    about: {
      title: "About Us",
      description: "Learn how GMT to EST Converter is maintained, how it handles daylight saving time, and how to contact the team.",
      image: "/images/og/default.png",
      imageAlt: "About GMT to EST Converter"
    },
    author: {
      title: "Author",
      description: "Meet the author and editorial reviewer behind GMT to EST Converter's timezone guides.",
      image: "/images/og/default.png",
      imageAlt: "Meet the Author - GMT to EST Converter"
    },
    authorJackie: {
      title: "Jackie Bruce",
      description: "Author profile for Jackie Bruce, a timezone content specialist covering GMT, EST, EDT, daylight saving time, and global scheduling.",
      image: "/images/og/default.png",
      imageAlt: "Jackie Bruce Author Profile - GMT to EST Converter"
    },
    contact: {
      title: "Contact Us",
      description: "Contact GMT to EST Converter for feedback, corrections, bug reports, and privacy requests.",
      image: "/images/og/default.png",
      imageAlt: "Contact Us - GMT to EST Converter"
    },
    privacy: {
      title: "Privacy Policy",
      description: "Read how GMT to EST Converter handles analytics, cookies, contact form submissions, and advertising disclosures.",
      image: "/images/og/default.png",
      imageAlt: "Privacy Policy - GMT to EST Converter"
    },
    terms: {
      title: "Terms of Service",
      description: "Read the terms that apply when using GMT to EST Converter.",
      image: "/images/og/default.png",
      imageAlt: "Terms of Service - GMT to EST Converter"
    },
    disclaimer: {
      title: "Disclaimer",
      description: "Review the accuracy limits and verification advice for GMT to EST Converter.",
      image: "/images/og/default.png",
      imageAlt: "Disclaimer - GMT to EST Converter"
    },
    sitemap: {
      title: "Sitemap",
      description: "Browse every public page on GMT to EST Converter.",
      image: "/images/og/default.png",
      imageAlt: "Sitemap - GMT to EST Converter"
    },
    dynamic: {
      title: "{from} to {to} Converter",
      description: "Use this {from} to {to} converter for instant, date-aware conversions with daylight saving time handling, live clocks, and meeting planner."
    }
  },
  nav: {
    gmtToEst: "GMT to EST Converter",
    estToGmt: "EST to GMT Converter",
    gmtVsEst: "GMT vs EST Difference",
    guide: "Guide",
    blog: "Blog",
    author: "Author",
    language: "Language"
  },
  footer: {
    about: "About Us",
    author: "Author",
    gmtToEst: "GMT to EST Converter",
    estToGmt: "EST to GMT Converter",
    difference: "GMT vs EST Difference",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us",
    disclaimer: "Disclaimer",
    sitemap: "Sitemap"
  },
  hero: {
    eyebrow: "Instant timezone calculator",
    differenceLead: "Eastern Time is usually 5 hours behind GMT in standard time and 4 hours behind during daylight saving time.",
    guideLead: "A practical guide to GMT, EST, EDT, abbreviations, daylight saving time, meetings, trading, and global scheduling."
  },
  converter: {
    direction: "Conversion direction",
    from: "From",
    toEastern: "to Eastern",
    toGmt: "to GMT",
    swap: "Swap conversion direction",
    now: "Use current time",
    format: "24h format",
    copy: "Copy",
    copied: "Copied",
    dstAware: "DST aware",
    eastern: "Eastern",
    meetingPlanner: "Meeting planner",
    is: "is",
    hoursBehindGmt: "hours behind GMT",
    bestForScheduling: "Best for scheduling",
    convertsTo: "converts to",
    variants: {
      converter: {
        startMode: "gmt-est",
        swap: true,
        "gmt-est": {
          heading: "Enter GMT date and time",
          input: "GMT time",
          source: "GMT",
          target: "Eastern Time"
        },
        "est-gmt": {
          heading: "Enter Eastern date and time",
          input: "Eastern time",
          source: "EST / EDT",
          target: "GMT"
        },
        note: "Enter a GMT date and time to get the matching EST or EDT result."
      },
      reverse: {
        startMode: "est-gmt",
        swap: false,
        heading: "Enter Eastern date and time",
        input: "Eastern time",
        source: "EST / EDT",
        target: "GMT",
        note: "Enter an Eastern Time value to convert it back to GMT."
      },
      difference: {
        startMode: "gmt-est",
        swap: false,
        heading: "Compare GMT with Eastern Time",
        input: "GMT time to compare",
        source: "GMT",
        target: "EST / EDT",
        note: "Enter a GMT time to compare the exact Eastern Time label and offset."
      },
      guide: {
        startMode: "gmt-est",
        swap: false,
        heading: "Plan a GMT meeting time",
        input: "GMT meeting time",
        source: "GMT",
        target: "Eastern meeting time",
        note: "Enter a GMT meeting time to see the Eastern Time equivalent for scheduling."
      },
      dynamic: {
        startMode: "gmt-est",
        swap: true,
        heading: "Enter {from} date and time",
        input: "{from} time",
        source: "{from}",
        target: "{to}",
        note: "Enter a {from} date and time to check the corresponding {to} conversion instantly."
      }
    }
  },
  visual: {
    eyebrow: "Visual planner",
    title: "Explore the time shift",
    cards: [
      {
        title: "Day and night rhythm",
        text: "See why GMT business hours land later in the Eastern day."
      },
      {
        title: "DST-aware offset",
        text: "The offset changes between 5 hours and 4 hours when Eastern Time uses daylight saving."
      },
      {
        title: "Meeting overlap",
        text: "Scan useful windows before you send a calendar invite."
      }
    ]
  },
  clocks: {
    title: "Live clocks",
    gmt: "Current GMT",
    eastern: "Current Eastern Time"
  },
  presets: {
    title: "Quick presets",
    meeting: "Meeting time",
    event: "Live event",
    trading: "Trading hours"
  },
  chart: {
    title: "GMT to EST chart",
    eastern: "Eastern",
    offset: "Offset"
  },
  strip: {
    title: "Workday overlap",
    aria: "GMT and Eastern Time overlap timeline"
  },

  intro_home: "GMT to EST Converter provides real-time, daylight-saving-aware time conversions between Greenwich Mean Time and North American Eastern Time (EST/EDT). Track current offsets, view live clocks, and schedule meetings seamlessly. We designed this utility specifically for international remote teams, forex traders operating in overlapping markets, and global logistics managers who cannot afford a one-hour calculation error. By anchoring all results to the official IANA timezone databases, our clocks ensure that whether you are logging a server timestamp or booking a transatlantic flight, the output is perfectly synchronized with current calendar rules.",
  intro_difference: "Comparing Greenwich Mean Time (GMT) and Eastern Standard Time (EST) reveals standard and seasonal offset changes. While GMT remains fixed, Eastern Time shifts to EDT during daylight saving time, changing the time gap. This fundamental difference trips up countless international conference calls every March and November. Unlike regions aligned to the equator, the North American eastern seaboard alters its civic clocks aggressively to capture sunlight, meaning anyone doing business with New York, Miami, or Toronto must strictly monitor the transition dates to avoid showing up an hour late.",
  intro_reverse: "Convert Eastern Time (EST/EDT) back to Greenwich Mean Time (GMT/UTC) instantly. Perfect for East Coast professionals, researchers, and event organizers contacting GMT regions.",
  intro_guide: "A comprehensive educational guide explaining global timekeeping systems, Coordinated Universal Time (UTC), Greenwich Mean Time (GMT), Eastern Standard Time (EST), and the history of daylight saving shifts.",
  intro_dynamic: "Convert {from} to {to} instantly. This tool handles daylight saving time shifts dynamically, showing the correct local offset, live clocks, and meeting planners.",

  explanation_difference: "Greenwich Mean Time (GMT) is the zero-offset reference point for global time coordination. It does not observe daylight saving changes. Eastern Standard Time (EST) is five hours behind GMT (UTC-5). However, during North American daylight saving time (from March to November), Eastern Time transitions to Eastern Daylight Time (EDT), which is UTC-4 (four hours behind GMT). This seasonal shift means the actual difference between the two zones oscillates between 5 hours in winter and 4 hours in summer.",
  explanation_reverse: "When converting from Eastern Time to GMT, you must add hours rather than subtract them. Specifically, if Eastern Time is in standard time (EST), you add 5 hours to find GMT. If Eastern Time is in daylight saving time (EDT), you add 4 hours. For example, 9:00 AM EST is 2:00 PM GMT, and 9:00 AM EDT is 1:00 PM GMT.",
  explanation_guide: "Time zones divide the Earth into 24 bands, each representing 15 degrees of longitude. Greenwich Mean Time (GMT) originated as a marine navigation standard based on the Royal Observatory in Greenwich, London. Today, it is largely synonymous with Coordinated Universal Time (UTC), which is kept precise by atomic clocks. Eastern Standard Time (EST) represents UTC-5 and is observed in Eastern North America, including parts of the USA, Canada, and the Caribbean. During summer, these regions switch to Eastern Daylight Time (EDT) at UTC-4.",
  explanation_dynamic: "Converting time between {from} and {to} requires understanding the active offsets of both regions. Depending on the time of year, one or both of these zones may observe daylight saving time, causing the difference to shift. For example, {from} uses the IANA zone {fromZone} and {to} uses the IANA zone {toZone}. Use the calculator above to find the exact time mapping for any calendar date.",

  // Unique Content - English Specifics
  useCases_home: {
    title: "Real-World Applications",
    items: [
      { title: "Forex Traders", text: "Track exact trading session openings and overlaps between GMT and Eastern markets." },
      { title: "Remote Teams", text: "Coordinate business meetings and standups without timezone calculation errors." },
      { title: "Online Gamers", text: "Sync global server resets, tournament schedules, and live community events." },
      { title: "Students & Educators", text: "Check deadline cutoffs and webinar schedules across regions." },
      { title: "Global Logistics", text: "Align transit schedules, cargo dispatches, and aviation reference times." }
    ]
  },
  useCases_difference: {
    title: "Comparison Scenarios",
    items: [
      { title: "Strategic Planning", text: "Evaluate daylight saving time transition gaps before scheduling annual events." },
      { title: "Contract Agreement", text: "Verify standard offsets used in legal, medical, or broadcast agreements." },
      { title: "Regional Coordination", text: "Observe how New York standard time contrasts with fixed zero-offset regions." }
    ]
  },
  useCases_reverse: {
    title: "Reverse Scheduling Use Cases",
    items: [
      { title: "Server Log Analysis", text: "Convert local Eastern incident logs to standard UTC/GMT reference times." },
      { title: "International Broadcasts", text: "Coordinate webinar starts for a European audience from the US East Coast." },
      { title: "Travel Navigation", text: "Align flight departures and transport tickets using standardized GMT offsets." }
    ]
  },
  useCases_guide: {
    title: "Educational Timekeeping Areas",
    items: [
      { title: "Historical Context", text: "Learn the origins of maritime meridian standards and GMT's civil role." },
      { title: "Scientific Tracking", text: "Discover why laboratories and spacecraft tracking stations use UTC." },
      { title: "Software Development", text: "Master ISO date patterns and database epoch times." }
    ]
  },
  useCases_dynamic: [
    { title: "Remote Collaboration ({from} and {to})", text: "Schedule calls and sync projects between {from} and {to}." },
    { title: "Travel Coordination ({from} to {to})", text: "Convert flight times and check-in hours between {from} and {to}." },
    { title: "Event Planning in {from} & {to}", text: "Publish live webinars or game times in both {from} and {to}." }
  ],

  topics_difference: {
    title: "Key Differences and Shifts",
    items: [
      { title: "Standard vs Daylight Saving", text: "GMT is a constant offset reference, whereas Eastern Time switches between EST (UTC-5) and EDT (UTC-4)." },
      { title: "The 4-Hour vs 5-Hour Gap", text: "The timezone gap is 5 hours in winter months and shifts to 4 hours in summer months." },
      { title: "Daylight Transition Rules", text: "The US observes DST transitions on the second Sunday of March and first Sunday of November." }
    ]
  },
  topics_reverse: {
    title: "Eastern to GMT Conversion Tips",
    items: [
      { title: "Add Offset for GMT", text: "Since Eastern Time is behind GMT, you must add hours (5 in winter, 4 in summer) to convert Eastern to GMT." },
      { title: "Avoiding the EDT Fallacy", text: "Do not assume Eastern Time is always UTC-5. In summer, EDT is UTC-4, altering the calculation." },
      { title: "Data Synchronization", text: "Use GMT/UTC when saving log data, then render Eastern Time locally for users." }
    ]
  },
  topics_guide: {
    title: "Timekeeping Systems & Evolution",
    items: [
      { title: "Astronomical vs Atomic", text: "GMT is defined by solar transit at the Greenwich meridian, whereas UTC is kept by high-precision atomic clocks." },
      { title: "Military and Aviation Standards", text: "The military utilizes a 24-hour clock and refers to GMT/UTC as 'Z' or 'Zulu' time." },
      { title: "The History of Standard Time", text: "Standardized time was established in the late 19th century to address railroad coordination needs." }
    ]
  },
  topics_dynamic: [
    { title: "{from} and {to} Base Offsets", text: "Understanding the base offset difference between {from} and {to}." },
    { title: "Daylight Saving Shifts in {from} or {to}", text: "How summer time transitions alter the time gap between {from} and {to}." },
    { title: "International Planning between {from} and {to}", text: "Meeting coordination strategies to avoid date boundary issues between {from} and {to}." }
  ],

  faqs_difference: {
    title: "GMT vs EST Difference FAQs",
    items: [
      { q: "Is GMT always ahead of EST?", a: "Yes. Greenwich Mean Time is always ahead of Eastern Time. It is 5 hours ahead during winter (EST) and 4 hours ahead during summer (EDT)." },
      { q: "Why does the difference between GMT and EST change?", a: "It changes because the Eastern Time zone observes daylight saving time (shifting to EDT), while GMT does not alter its clocks." },
      { q: "How do businesses schedule meetings across GMT and EST?", a: "Organizations must check the current season. A meeting at 3:00 PM GMT is 10:00 AM EST in winter and 11:00 AM EDT in summer." },
      { q: "Which major cities use Eastern Time?", a: "Key cities include New York, Miami, Toronto, and Atlanta." }
    ]
  },
  faqs_reverse: {
    title: "EST to GMT Conversion FAQs",
    items: [
      { q: "How do I convert EST/EDT to GMT?", a: "Add 5 hours to EST (winter) or 4 hours to EDT (summer) to obtain the matching GMT time." },
      { q: "Is Eastern Time behind GMT?", a: "Yes. Eastern Time is behind GMT, meaning GMT is further ahead in the day." },
      { q: "What is a common error when converting from Eastern to GMT?", a: "Forgetting that Eastern Time observes daylight saving time (EDT) in summer, leading to a 1-hour schedule mismatch." },
      { q: "Why do developers convert local Eastern events to GMT?", a: "GMT/UTC is the standard for databases and logs, which ensures consistent sorting regardless of local user locations." }
    ]
  },
  faqs_guide: {
    title: "Time Zone & Timekeeping FAQs",
    items: [
      { q: "What is the difference between GMT and UTC?", a: "GMT is an astronomical time zone, whereas UTC is an atomic time standard. They share the same offset for civil use." },
      { q: "What does UTC offset mean?", a: "A UTC offset is the difference in hours and minutes from Coordinated Universal Time (UTC) for a given place." },
      { q: "Why was Daylight Saving Time introduced?", a: "DST was designed to conserve energy and maximize daylight hours during summer periods." },
      { q: "What is Military Time?", a: "Military time is a 24-hour timekeeping system that eliminates the AM/PM suffix to avoid communication errors." }
    ]
  },
  faqs_dynamic: [
    { q: "How do I convert {from} to {to}?", a: "Select a date and time in the input fields above to convert between {from} and {to} with automatic daylight saving calculations." },
    { q: "Does the time difference between {from} and {to} change?", a: "Yes. If either region observes daylight saving time, the offset gap will adjust accordingly." },
    { q: "What is the standard offset for {from} and {to}?", a: "The standard reference zone for {from} is {fromZone} and for {to} is {toZone}." }
  ],

  cta_home: "Use our primary GMT to EST converter above to check live clocks and plan your schedule.",
  cta_difference: "Compare GMT and EST offsets to align your business meetings correctly.",
  cta_reverse: "Convert Eastern Time to GMT using the reverse calculator above.",
  cta_guide: "Read our detailed guides below to master global time standards.",
  cta_dynamic: "Use the {from} to {to} converter above to plan your timezone transition.",

  conclusion_home: "Staying aware of daylight saving offsets ensures accurate coordination between GMT and Eastern Time zones.",
  conclusion_difference: "Understanding the difference between GMT and EST is essential for error-free scheduling. Always check the calendar date to apply the correct offset.",
  conclusion_reverse: "Converting EST/EDT back to GMT is simple when you remember to add the active offset. Keep this page bookmarked for fast calculations.",
  conclusion_guide: "Global timekeeping standards like GMT and UTC keep the modern world synced. Mastering these concepts prevents scheduling and technical logging errors.",
  conclusion_dynamic: "Time differences between {from} and {to} are subject to seasonal rules. Always use a date-aware timezone calculator to confirm meeting and travel details.",

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
    heroAlt: "GMT to EST featured image showing live time conversion",
    clockAlt: "GMT to EST clock comparison visual",
    mapAlt: "GMT to EST world map showing time regions"
  }
};

// Add unique page metadata and content elements to eliminate duplication
en.pages.kstToEst = {
  title: "KST to EST Converter (Live) | Seoul to New York Time Difference",
  description: "Convert Korean Standard Time (KST) to Eastern Standard Time (EST) with live clocks, winter/summer offset changes (13/14 hours gap), and workday overlap planner.",
  image: "/images/og/default.png",
  imageAlt: "KST to EST Converter - Seoul to New York timezone calculator"
};
en.pages.pdtToEst = {
  title: "PDT to EST Converter (Live) | Pacific to Eastern Daylight Difference",
  description: "Convert Pacific Daylight Time (PDT) to Eastern Standard Time (EST) with live clocks, standard 3-hour difference calculator, Wall Street trading hours, and remote meeting planner.",
  image: "/images/og/default.png",
  imageAlt: "PDT to EST Converter - Pacific to Eastern timezone calculator"
};
en.pages.mstToEst = {
  title: "MST to EST Converter (Live) | Denver to New York Time difference",
  description: "Convert Mountain Standard Time (MST) to Eastern Standard Time (EST) with live clocks, Denver/Phoenix to East Coast offset rules, and business schedule overlap planner.",
  image: "/images/og/default.png",
  imageAlt: "MST to EST Converter - Mountain to Eastern timezone calculator"
};
en.pages.astToEst = {
  title: "AST to EST Converter (Live) | Atlantic to Eastern Time Difference",
  description: "Convert Atlantic Standard Time (AST) to Eastern Standard Time (EST) with live clocks, Caribbean and Halifax to New York offset differences, and business overlap planner.",
  image: "/images/og/default.png",
  imageAlt: "AST to EST Converter - Atlantic to Eastern timezone calculator"
};

// Unique English introductions, explanations, use cases, topics, FAQs, conclusions, and CTAs for each of the 6 landing pages
Object.assign(en, {
  // CDT to EST
  intro_cdtToEst: "provides real-time conversion from Central Daylight Time (CDT) to North American Eastern Time (EST/EDT). Track the standard 1-hour timezone offset gap, view live clocks, and schedule meetings between Chicago and New York. This particular tool is highly optimized for summer schedules when Central regions observe daylight saving. It removes the guesswork out of cross-regional communication and logistics. When trading hours commence in the Midwest, aligning them accurately with Wall Street requires zero latency and exact standardizations, which is what this calculator guarantees.",
  explanation_cdtToEst: "Central Daylight Time (CDT) is observed during summer at UTC-5. Eastern Standard Time (EST) is observed during winter at UTC-5. Although they share the same numerical offset, CDT is used in summer and EST in winter, so they rarely overlap. For matching seasons, Eastern (EDT/EST) is always 1 hour ahead of Central (CDT/CST). Understanding this shift is critical for corporate teams heavily concentrated in the Midwest wanting to run operations seamlessly with East Coast headquarters.",
  useCases_cdtToEst: {
    title: "CDT to EST Applications",
    items: [
      { title: "Chicago Derivatives", text: "Sync Chicago trading desks with New York Wall Street equity markets." },
      { title: "Midwest remote workers", text: "Coordinate standups between Central developers and Eastern managers." },
      { title: "Sports Broadcasts", text: "Check live game times and kickoff schedules airing in Eastern Time from Central cities." }
    ]
  },
  topics_cdtToEst: {
    title: "Central to Eastern Scheduling Details",
    items: [
      { title: "Chicago vs New York", text: "How the 1-hour difference affects business between the two largest US cities." },
      { title: "DST Shift Alignment", text: "Central and Eastern transition DST at the same time, maintaining the 1-hour gap." },
      { title: "Central Time Cities", text: "Central zone spans from Dallas and Houston to Winnipeg, staying 1 hour behind Eastern." }
    ]
  },
  faqs_cdtToEst: {
    title: "CDT to EST Conversion FAQs",
    items: [
      { q: "Is CDT the same as EST?", a: "No, CDT is UTC-5 used in summer, while EST is UTC-5 used in winter. During summer, Eastern is EDT (UTC-4), which is 1 hour ahead of CDT." },
      { q: "What is 5 PM CDT in Eastern?", a: "5:00 PM CDT is 6:00 PM Eastern Time (EDT) during summer." },
      { q: "Does Central Time change offsets?", a: "Yes, Central changes between CST (UTC-6) in winter and CDT (UTC-5) in summer." }
    ]
  },
  conclusion_cdtToEst: "Staying aware of the 1-hour difference makes scheduling between Chicago and New York seamless. As financial institutions in Illinois and manufacturing hubs in Wisconsin communicate with East Coast partners, confirming whether both regions have successfully shifted into their summer configurations prevents expensive delays.",
  cta_cdtToEst: "Use our CDT to EST converter above to check the exact time right now.",

  // CST to EST
  intro_cstToEst: "gives instant conversions from Central Standard Time (CST) to Eastern Standard Time (EST). Calculate the 1-hour difference during winter months, check live clocks, and schedule calls. Whether you are dealing with winter holiday planning or standard educational schedules spanning the US interior, this calculator handles the exact conversion metrics without manual computation.",
  explanation_cstToEst: "Central Standard Time (CST) represents UTC-6, while Eastern Standard Time (EST) is UTC-5. This winter offset maintains a 1-hour gap where Eastern is 1 hour ahead. When the seasons shift to summer, CST becomes CDT (UTC-5) and EST becomes EDT (UTC-4), keeping the 1-hour difference. Remembering that the East Coast moves faster through the day than the Central states is the fundamental rule for accurate scheduling here.",
  useCases_cstToEst: {
    title: "CST to EST Scenarios",
    items: [
      { title: "Winter Logistics", text: "Manage truck dispatches and delivery times between Chicago and Atlanta hubs." },
      { title: "Academic Deadlines", text: "Coordinate class schedules and project deadlines for universities on CST and EST." },
      { title: "Holiday Planning", text: "Sync family holiday calls between Midwest and East Coast homes during winter." }
    ]
  },
  topics_cstToEst: {
    title: "CST to EST Coordination Topics",
    items: [
      { title: "Standard vs Daylight Offset", text: "Why CST to EST conversion is specific to winter months and switches to CDT to EDT in summer." },
      { title: "Retail Operations Overlap", text: "Practical scheduling tips for retail operations spanning the standard zones." },
      { title: "Midwestern Hubs", text: "Focus on cities like Minneapolis, New Orleans, and St. Louis converting to Eastern." }
    ]
  },
  faqs_cstToEst: {
    title: "CST to EST Winter FAQs",
    items: [
      { q: "What is the time difference between CST and EST?", a: "EST is exactly 1 hour ahead of CST in winter." },
      { q: "What is 9 AM CST in EST?", a: "9:00 AM CST is 10:00 AM EST." },
      { q: "Which cities use CST?", a: "Cities like Chicago, Houston, Dallas, and Winnipeg use CST in winter." }
    ]
  },
  conclusion_cstToEst: "Converting CST to EST is easy when you remember that Eastern Standard Time is always 1 hour ahead during winter. Always double-check your calendar for early November and mid-March boundaries where standard policies overlap.",
  cta_cstToEst: "Check our CST to EST converter above for live winter time comparisons.",

  // KST to EST
  intro_kstToEst: "offers live time conversion from Korean Standard Time (KST) to North American Eastern Time (EST/EDT). Calculate the 13-hour or 14-hour difference, check business hour overlaps, and schedule meetings between Seoul and New York. Because the time barrier is so significant, utilizing an accurate digital planner helps prevent accidentally booking appointments at 3:00 AM on the other side of the planet.",
  explanation_kstToEst: "Korean Standard Time (KST) is UTC+9 year-round. Eastern Time changes between EST (UTC-5) in winter and EDT (UTC-4) in summer. Consequently, the timezone gap changes seasonally: KST is 14 hours ahead of Eastern during standard time (winter) and 13 hours ahead during daylight saving time (summer). This massive flip in relative hours makes manual addition very tricky without an automated tool referencing current transition dates.",
  useCases_kstToEst: {
    title: "KST to EST Applications",
    items: [
      { title: "Tech Partnerships", text: "Coordinate software releases and hardware syncs between Seoul developers and East Coast offices." },
      { title: "K-Pop Entertainment", text: "Coordinate K-Pop album launches and concert ticket sales for East Coast fans." },
      { title: "Gaming Server Resets", text: "Sync multiplayer online game tournament schedules between East Asia and US East." }
    ]
  },
  topics_kstToEst: {
    title: "KST to EST Timekeeping Topics",
    items: [
      { title: "The Seasonal Gap Shift", text: "Why Korea's constant offset changes the gap between 13 and 14 hours depending on New York's DST." },
      { title: "The Workday Split", text: "How to find the narrow business hour overlap between Seoul's morning and New York's evening." },
      { title: "Travel Navigation Tips", text: "Tips for flight connections and jet lag when traveling between Seoul Incheon and JFK." }
    ]
  },
  faqs_kstToEst: {
    title: "KST to EST Conversion FAQs",
    items: [
      { q: "How many hours is Korea ahead of New York?", a: "Korea is 13 hours ahead of New York in summer (EDT) and 14 hours ahead in winter (EST)." },
      { q: "What is 9 AM KST in Eastern?", a: "9:00 AM KST is 8:00 PM Eastern (summer) or 7:00 PM Eastern (winter) of the previous day." },
      { q: "Does Korea use Daylight Saving?", a: "No, South Korea remains on permanent UTC+9 all year." }
    ]
  },
  conclusion_kstToEst: "Managing the Seoul to East Coast timezone gap requires tracking seasonal daylight saving changes in the US. By consistently monitoring the 13-hour versus 14-hour jump, international enterprise teams can successfully align Asian morning operations with American evening sign-offs.",
  cta_kstToEst: "Use our KST to EST tool above to sync your Seoul and New York calls.",

  // PDT to EST
  intro_pdtToEst: "provides real-time conversion from Pacific Daylight Time (PDT) to North American Eastern Time (EST/EDT). Track the standard 3-hour difference, view live clocks, and schedule meetings between San Francisco and New York. This specific 3-hour jump is the defining rhythm of continental US business, making it absolutely vital to recognize how West Coast mornings line up perfectly with East Coast lunch breaks. Software engineering teams and venture capital firms in Silicon Valley rely heavily on this predictable shift to orchestrate product launches and investor relations seamlessly.",
  explanation_pdtToEst: "Pacific Daylight Time (PDT) is UTC-7, while Eastern Standard Time (EST) is UTC-5. For matching seasons (summer), PDT is compared to EDT (UTC-4), which is exactly 3 hours ahead. When both zones transition, PST (UTC-8) is compared to EST (UTC-5), preserving the 3-hour gap. Because California and New York adopt daylight saving time concurrently, you will virtually never see this gap widen or shrink throughout the entire calendar year.",
  useCases_pdtToEst: {
    title: "PDT to EST Scenarios",
    items: [
      { title: "Venture Capital Calls", text: "Coordinate funding calls and board meetings between California tech and Wall Street." },
      { title: "Support Coverage", text: "Manage support coverage hours between West Coast teams and East Coast clients." },
      { title: "Coast-to-Coast Travel", text: "Sync cross-country flight arrivals and car rentals between LAX and LGA." }
    ]
  },
  topics_pdtToEst: {
    title: "Pacific to Eastern Business Topics",
    items: [
      { title: "Coast-to-Coast Sync", text: "How the 3-hour difference affects daily business communications across the United States." },
      { title: "Stock Market Trading", text: "Aligning West Coast trading hours with the New York Stock Exchange (NYSE) opening at 9:30 AM Eastern." },
      { title: "Daily Life Gaps", text: "Managing dinner times and TV broadcast schedules between Pacific and Eastern viewers." }
    ]
  },
  faqs_pdtToEst: {
    title: "PDT to EST Conversion FAQs",
    items: [
      { q: "Is PDT always 3 hours behind EST?", a: "PDT (summer) is 3 hours behind EDT (summer). In winter, PST is 3 hours behind EST." },
      { q: "What is 12 PM PDT in Eastern?", a: "12:00 PM PDT is 3:00 PM Eastern Time." },
      { q: "Which major states use PDT?", a: "California, Oregon, Washington, and British Columbia use PDT in summer." }
    ]
  },
  conclusion_pdtToEst: "Navigating West Coast to East Coast schedules is simple when you keep the permanent 3-hour gap in mind. From Seattle software developers launching features at dawn to Boston executives closing out their day, preserving this stable three-hour window guarantees everyone is on the same page.",
  cta_pdtToEst: "Check our PDT to EST calculator above to coordinate your coast-to-coast call.",

  // MST to EST
  intro_mstToEst: "gives instant timezone conversions from Mountain Standard Time (MST) to North American Eastern Time (EST/EDT). Compare the 2-hour or 3-hour difference, view live clocks, and plan business meetings between Denver, Phoenix, and New York. Since MST uniquely spans regions with vastly different daylight saving policies, this accurate utility provides clarity to frequent travelers and remote agents operating from the Rocky Mountains. You will no longer wonder whether the Navajo Nation or surrounding counties are matching your expected appointment times during the complex autumn switchovers.",
  explanation_mstToEst: "Mountain Standard Time (MST) is UTC-7. Most of Arizona (including Phoenix) remains on permanent MST all year, while other Mountain states (like Colorado) switch to MDT (UTC-6) in summer. Eastern Time switches between EST (UTC-5) and EDT (UTC-4). This means Arizona is 2 hours behind New York in winter and 3 hours behind in summer. Failing to identify the exact state destination can lead to missing scheduled events entirely.",
  useCases_mstToEst: {
    title: "MST to EST Scenarios",
    items: [
      { title: "Energy Operations", text: "Coordinate operations between Denver oil and gas offices and East Coast financial investors." },
      { title: "Phoenix Call Centers", text: "Manage customer support shifts in Arizona aligned to East Coast business hours." },
      { title: "Mountain Ski Trips", text: "Plan ski trips and outdoor excursions in Colorado or Utah with East Coast visitors." }
    ]
  },
  topics_mstToEst: {
    title: "Mountain to Eastern timekeeping",
    items: [
      { title: "The Arizona Exception", text: "Why Arizona's lack of DST changes its offset difference with the East Coast seasonally." },
      { title: "Rocky Mountain Hubs", text: "Focus on cities like Denver, Salt Lake City, and Calgary converting to Eastern Time." },
      { title: "Early Morning Syncs", text: "Practical tips for early morning calls from Mountain Time to Eastern offices." }
    ]
  },
  faqs_mstToEst: {
    title: "MST to EST Conversion FAQs",
    items: [
      { q: "What is the difference between Denver and New York time?", a: "New York is always 2 hours ahead of Denver." },
      { q: "How many hours is Phoenix behind New York?", a: "Phoenix is 2 hours behind New York in winter and 3 hours behind in summer." },
      { q: "What is 10 AM MST in Eastern?", a: "10:00 AM MST is 12:00 PM Eastern (winter) or 1:00 PM Eastern (summer in Arizona)." }
    ]
  },
  conclusion_mstToEst: "Always check if your Mountain Time contact is in Arizona or Colorado to apply the correct 2-hour or 3-hour offset. Because Arizona fundamentally rejects seasonal clock shifting, assuming a standard Mountain gap will almost certainly cause scheduling conflicts during July.",
  cta_mstToEst: "Use our MST to EST converter above to schedule Denver and Phoenix meetings.",

  // AST to EST
  intro_astToEst: "provides real-time conversion from Atlantic Standard Time (AST) to North American Eastern Time (EST/EDT). Compare the 1-hour or 0-hour difference, check live clocks, and coordinate schedules between Halifax, Puerto Rico, and New York. Understanding the Atlantic dynamic helps international shipping industries and tropical resort managers sync effectively with East Coast consumers and vendors.",
  explanation_astToEst: "Atlantic Standard Time (AST) is UTC-4. Parts of the Atlantic region (like Halifax) observe DST (ADT at UTC-3), while Caribbean territories (like Puerto Rico and Bermuda) stay on permanent UTC-4. Since Eastern Time changes between EST (UTC-5) and EDT (UTC-4), Puerto Rico is 1 hour ahead of Eastern in winter and shares the exact same time in summer. This zero-hour overlap in July or August surprises many visitors planning trips south from Miami.",
  useCases_astToEst: {
    title: "AST to EST Scenarios",
    items: [
      { title: "Halifax Shipments", text: "Sync shipping timetables between Halifax ports and East Coast distribution centers." },
      { title: "Caribbean Transactions", text: "Coordinate financial transactions and wire transfers between Puerto Rico banks and New York offices." },
      { title: "Island Hotel Bookings", text: "Manage hotel check-ins and cruise schedules for East Coast travelers visiting the Caribbean." }
    ]
  },
  topics_astToEst: {
    title: "Atlantic to Eastern Details",
    items: [
      { title: "Caribbean Shared Time", text: "Why Puerto Rico shares the exact same clock time as New York during summer months." },
      { title: "Canadian Atlantic Provinces", text: "Focus on Nova Scotia, New Brunswick, and Prince Edward Island converting to Eastern." },
      { title: "Bermuda and Island Sync", text: "Scheduling business calls with Bermuda, Virgin Islands, and Puerto Rico." }
    ]
  },
  faqs_astToEst: {
    title: "AST to EST Conversion FAQs",
    items: [
      { q: "Is Puerto Rico on Eastern Time?", a: "No, Puerto Rico is in the Atlantic zone (AST). It is 1 hour ahead of Eastern in winter, but shares the same time in summer when Eastern is on EDT." },
      { q: "What is the difference between Halifax and New York time?", a: "Halifax is always 1 hour ahead of New York." },
      { q: "What is 3 PM AST in Eastern?", a: "3:00 PM AST is 2:00 PM Eastern in winter, and 3:00 PM Eastern in summer (for Caribbean AST)." }
    ]
  },
  conclusion_astToEst: "Check the geographic location of your Atlantic zone contact to ensure correct 0-hour or 1-hour offset planning. While a maritime Canadian province observes summer adjustments normally, Caribbean nations prefer stable schedules year-round, merging perfectly with East Coast summers.",
  cta_astToEst: "Use our AST to EST tool above to plan your Atlantic and Eastern schedule."
});

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
      guide: { title: x.guide, description: x.guideDescription },
      dynamic: x.dynamic || { title: "{from} to {to} Converter", description: "Use this {from} to {to} converter for instant, date-aware conversions with daylight saving time handling, live clocks, and meeting planner." },
      cdtToEst: {
        title: "Convertidor CDT a EST (En Vivo) | 1 Hora de Diferencia",
        description: "Convierta CDT a EST al instante con relojes en vivo, soporte de horario de verano, tabla de 24 horas y planificador de reuniones."
      },
      cstToEst: {
        title: "Convertidor CST a EST (En Vivo) | 1 Hora de Diferencia",
        description: "Convierta CST a EST al instante con relojes en vivo, soporte de horario de verano y calculadora de diferencia horaria en invierno."
      },
      kstToEst: {
        title: "Convertidor KST a EST (En Vivo) | Diferencia Seúl a Nueva York",
        description: "Convierta KST a EST con relojes en vivo y diferencias estacionales de 13/14 horas entre Seúl y Nueva York."
      },
      pdtToEst: {
        title: "Convertidor PDT a EST (En Vivo) | Diferencia Pacífico a Este",
        description: "Convierta PDT a EST al instante con relojes en vivo, diferencia estándar de 3 horas y planificador de reuniones de costa a costa."
      },
      mstToEst: {
        title: "Convertidor MST a EST (En Vivo) | Diferencia Denver a Nueva York",
        description: "Convierta MST a EST con relojes en vivo, desfase de Arizona y Colorado, y planificador de reuniones de oficinas."
      },
      astToEst: {
        title: "Convertidor AST a EST (En Vivo) | Diferencia Atlántico a Este",
        description: "Convierta AST a EST con relojes en vivo, diferencia horaria de Halifax y el Caribe con Nueva York."
      }
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
        guide: { heading: x.planHeading, input: x.planInput, source: "GMT", target: x.easternMeeting, note: x.planNote },
        dynamic: { heading: "Introduce la fecha y hora de {from}", input: "Hora {from}", source: "{from}", target: "{to}", note: "Introduce una fecha y hora de {from} para comprobar la conversión de {to} al instante." }
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
    images: { heroAlt: x.heroAlt, clockAlt: x.clockAlt, mapAlt: x.mapAlt },

    // Localized page-specific strings for Spanish
    intro_home: x.intro_home,
    intro_difference: x.intro_difference,
    intro_reverse: x.intro_reverse,
    intro_guide: x.intro_guide,
    intro_dynamic: x.intro_dynamic,
    explanation_difference: x.explanation_difference,
    explanation_reverse: x.explanation_reverse,
    explanation_guide: x.explanation_guide,
    explanation_dynamic: x.explanation_dynamic,
    useCases_home: x.useCases_home,
    useCases_difference: x.useCases_difference,
    useCases_reverse: x.useCases_reverse,
    useCases_guide: x.useCases_guide,
    useCases_dynamic: x.useCases_dynamic,
    topics_difference: x.topics_difference,
    topics_reverse: x.topics_reverse,
    topics_guide: x.topics_guide,
    topics_dynamic: x.topics_dynamic,
    faqs_difference: x.faqs_difference,
    faqs_reverse: x.faqs_reverse,
    faqs_guide: x.faqs_guide,
    faqs_dynamic: x.faqs_dynamic,
    cta_home: x.cta_home,
    cta_difference: x.cta_difference,
    cta_reverse: x.cta_reverse,
    cta_guide: x.cta_guide,
    cta_dynamic: x.cta_dynamic,
    conclusion_home: x.conclusion_home,
    conclusion_difference: x.conclusion_difference,
    conclusion_reverse: x.conclusion_reverse,
    conclusion_guide: x.conclusion_guide,
    conclusion_dynamic: x.conclusion_dynamic,

    // Spanish landing pages overrides
    intro_cdtToEst: "proporciona conversión en tiempo real de Central Daylight Time (CDT) a la hora del Este (EST/EDT). Trackea la diferencia estándar de 1 hora.",
    explanation_cdtToEst: "Central Daylight Time (CDT) tiene un desfase de UTC-5. Eastern Standard Time (EST) es UTC-5 en invierno. En verano, Eastern es EDT (UTC-4), 1 hora por delante.",
    useCases_cdtToEst: {
      title: "Aplicaciones de CDT a EST",
      items: [
        { title: "Derivados de Chicago", text: "Sincronice las mesas de negociación de Chicago con Wall Street en Nueva York." },
        { title: "Equipos remotos", text: "Coordine standups entre desarrolladores de Central y gerentes del Este." },
        { title: "Transmisiones deportivas", text: "Verifique horarios de partidos en hora del Este desde la zona Central." }
      ]
    },
    topics_cdtToEst: {
      title: "Detalles de programación de Central a Este",
      items: [
        { title: "Chicago vs Nueva York", text: "Cómo afecta la diferencia de 1 hora a los negocios entre ambas ciudades." },
        { title: "Alineación del cambio DST", text: "Ambas zonas cambian al horario de verano al mismo tiempo." },
        { title: "Ciudades de la zona Central", text: "La zona abarca desde Dallas hasta Winnipeg, 1 hora detrás del Este." }
      ]
    },
    faqs_cdtToEst: {
      title: "Preguntas frecuentes CDT a EST",
      items: [
        { q: "¿CDT es lo mismo que EST?", a: "No, CDT es UTC-5 en verano, mientras que EST es UTC-5 en invierno. En verano, Eastern es EDT (UTC-4), 1 hora por delante." },
        { q: "¿Qué hora es las 5 PM CDT en Eastern?", a: "Las 5:00 PM CDT son las 6:00 PM en hora del Este." }
      ]
    },
    conclusion_cdtToEst: "Tener en cuenta la diferencia de 1 hora facilita la programación entre Chicago y Nueva York.",
    cta_cdtToEst: "Use nuestro convertidor CDT a EST arriba para comprobar la hora en vivo.",

    intro_cstToEst: "ofrece conversiones instantáneas de Central Standard Time (CST) a Eastern Standard Time (EST) en invierno.",
    explanation_cstToEst: "CST es UTC-6 y EST es UTC-5, manteniendo una diferencia constante de 1 hora durante los meses de invierno.",
    useCases_cstToEst: {
      title: "Casos de CST a EST",
      items: [
        { title: "Logística de invierno", text: "Gestione despachos y entregas de camiones entre Chicago y Atlanta." },
        { title: "Plazos académicos", text: "Coordine clases y exámenes para universidades en CST y EST." },
        { title: "Llamadas navideñas", text: "Sincronice llamadas familiares durante la época invernal." }
      ]
    },
    topics_cstToEst: {
      title: "Coordinación entre CST y EST",
      items: [
        { title: "Horario estándar vs verano", text: "Por qué esta conversión es específica para los meses de invierno." },
        { title: "Solapamiento comercial", text: "Consejos prácticos para operaciones comerciales en ambas zonas." },
        { title: "Ciudades del medio oeste", text: "Conversión para ciudades como Minneapolis, Nueva Orleans y San Luis." }
      ]
    },
    faqs_cstToEst: {
      title: "Preguntas frecuentes CST a EST",
      items: [
        { q: "¿Cuál es la diferencia horaria entre CST y EST?", a: "La hora del Este está exactamente 1 hora por delante de CST en invierno." },
        { q: "¿Qué hora es las 9 AM CST en EST?", a: "Las 9:00 AM CST son las 10:00 AM EST." }
      ]
    },
    conclusion_cstToEst: "Convertir CST a EST es sencillo sabiendo que la hora del Este va 1 hora por delante en invierno.",
    cta_cstToEst: "Compruebe nuestro convertidor CST a EST arriba para ver la hora en vivo.",

    intro_kstToEst: "ofrece conversión en tiempo real de Korean Standard Time (KST) a la hora del Este (EST/EDT) de EE. UU.",
    explanation_kstToEst: "Corea del Sur está en UTC+9 todo el año, por lo que la diferencia con el Este es de 13 horas en verano y 14 en invierno.",
    useCases_kstToEst: {
      title: "Casos de KST a EST",
      items: [
        { title: "Colaboración tecnológica", text: "Coordine lanzamientos de software entre Seúl y oficinas de la costa este." },
        { title: "Eventos de K-Pop", text: "Sincronice lanzamientos de álbumes y ventas de entradas para fans del Este." },
        { title: "Torneos de videojuegos", text: "Sincronice las partidas multijugador online entre Asia y EE. UU." }
      ]
    },
    topics_kstToEst: {
      title: "Temas horários KST a EST",
      items: [
        { title: "El cambio estacional", text: "Por qué el desfase cambia de 13 a 14 horas según el horario de verano en EE. UU." },
        { title: "División de la jornada laboral", text: "Cómo encontrar la ventana de solapamiento entre la mañana de Seúl y la tarde de Nueva York." },
        { title: "Consejos para viajeros", text: "Recomendaciones de vuelos y jet lag entre Seúl Incheon y JFK." }
      ]
    },
    faqs_kstToEst: {
      title: "Preguntas frecuentes KST a EST",
      items: [
        { q: "¿Cuántas horas le lleva Corea a Nueva York?", a: "Corea va 13 horas por delante en verano (EDT) y 14 en invierno (EST)." },
        { q: "¿Qué hora es las 9 AM KST en Eastern?", a: "Las 9:00 AM KST son las 8:00 PM (verano) o 7:00 PM (invierno) del día anterior en el Este." }
      ]
    },
    conclusion_kstToEst: "Gestionar la diferencia horaria entre Seúl y la costa este requiere seguir el horario de verano en EE. UU.",
    cta_kstToEst: "Use nuestra herramienta KST a EST arriba para sincronizar sus llamadas.",

    intro_pdtToEst: "proporciona conversión en tiempo real de Pacific Daylight Time (PDT) a hora del Este (EST/EDT).",
    explanation_pdtToEst: "PDT es UTC-7 y EDT es UTC-4, manteniendo una diferencia de 3 horas durante el verano.",
    useCases_pdtToEst: {
      title: "Casos de PDT a EST",
      items: [
        { title: "Llamadas de capital de recurso", text: "Coordine reuniones entre las empresas tecnológicas de California y Wall Street." },
        { title: "Cobertura de soporte", text: "Gestione turnos de atención al cliente entre la costa oeste y la costa este." },
        { title: "Viajes de costa a costa", text: "Sincronice llegadas de vuelos y alquileres de coches entre LAX y LGA." }
      ]
    },
    topics_pdtToEst: {
      title: "Temas comerciales de Pacífico a Este",
      items: [
        { title: "Sincronización costa a costa", text: "Cómo afecta la diferencia de 3 horas a la comunicación diaria en EE. UU." },
        { title: "Operaciones bursátiles", text: "Alineación con la apertura de la Bolsa de Nueva York (NYSE) a las 9:30 AM Eastern." },
        { title: "Vida cotidiana", text: "Gestión de horarios de cena y retransmisiones de televisión." }
      ]
    },
    faqs_pdtToEst: {
      title: "Preguntas frecuentes PDT a EST",
      items: [
        { q: "¿PDT siempre está 3 horas detrás de EST?", a: "Sí, PDT está 3 horas detrás de EDT en verano, y PST está 3 horas detrás de EST in invierno." },
        { q: "¿Qué hora es las 12 PM PDT en Eastern?", a: "Las 12:00 PM PDT son las 3:00 PM en hora del Este." }
      ]
    },
    conclusion_pdtToEst: "La coordinación entre la costa oeste y la costa este es muy sencilla manteniendo el desfase de 3 horas.",
    cta_pdtToEst: "Compruebe nuestra calculadora PDT a EST arriba para coordinar su llamada.",

    intro_mstToEst: "ofrece conversiones instantáneas de Mountain Standard Time (MST) a hora del Este.",
    explanation_mstToEst: "MST es UTC-7. La mayor parte de Arizona no usa DST, por lo que su desfase con Nueva York varía de 2 a 3 horas.",
    useCases_mstToEst: {
      title: "Casos de MST a EST",
      items: [
        { title: "Sector energético", text: "Coordine operaciones de petróleo y gas en Denver con inversores de la costa este." },
        { title: "Soporte en Phoenix", text: "Gestione turnos de atención al cliente en Arizona alineados con la costa este." },
        { title: "Turismo de montaña", text: "Planifique viajes de esquí en Colorado o Utah con visitantes del este." }
      ]
    },
    topics_mstToEst: {
      title: "Cronometración de Montaña a Este",
      items: [
        { title: "La excepción de Arizona", text: "Por qué Arizona no observa el horario de verano y cómo afecta al desfase." },
        { title: "Centros de Montaña", text: "Detalles sobre ciudades como Denver, Salt Lake City y Calgary." },
        { title: "Llamadas matutinas", text: "Recomendaciones para las llamadas a primera hora desde la zona de Montaña." }
      ]
    },
    faqs_mstToEst: {
      title: "Preguntas frecuentes MST a EST",
      items: [
        { q: "¿Cuál es la diferencia entre Denver y Nueva York?", a: "Nueva York siempre va 2 horas por diante de Denver." },
        { q: "¿Cuántas horas le lleva Nueva York a Phoenix?", a: "Phoenix va 2 horas por detrás en invierno y 3 horas en verano." }
      ]
    },
    conclusion_mstToEst: "Asegúrese de verificar si su contacto de la zona de Montaña está en Arizona o Colorado para aplicar el desfase correcto.",
    cta_mstToEst: "Use nuestro convertidor MST a EST arriba para programar reuniones en Denver y Phoenix.",

    intro_astToEst: "proporciona conversión en tiempo real de Atlantic Standard Time (AST) a hora del Este (EST/EDT).",
    explanation_astToEst: "AST es UTC-4. Zonas del norte (Halifax) usan DST (ADT, UTC-3), mientras que el Caribe (Puerto Rico) mantiene UTC-4.",
    useCases_astToEst: {
      title: "Casos de AST a EST",
      items: [
        { title: "Envíos desde Halifax", text: "Sincronice los horarios de los barcos de Halifax con centros de distribución del este." },
        { title: "Banca del Caribe", text: "Coordine transacciones financieras entre bancos de Puerto Rico y oficinas de Nueva York." },
        { title: "Turismo en las islas", text: "Gestione reservas de hoteles y cruceros para viajeros de la costa este." }
      ]
    },
    topics_astToEst: {
      title: "Detalles de Atlántico a Este",
      items: [
        { title: "Hora compartida en el Caribe", text: "Por qué Puerto Rico comparte la misma hora que Nueva York durante el verano." },
        { title: "Provincias atlánticas de Canadá", text: "Conversión horaria para Nueva Escocia, Nuevo Brunswick e Isla del Príncipe Eduardo." },
        { title: "Sincronización con las islas", text: "Programación de llamadas con Bermudas, Islas Vírgenes y Puerto Rico." }
      ]
    },
    faqs_astToEst: {
      title: "Preguntas frecuentes AST a EST",
      items: [
        { q: "¿Puerto Rico está en la hora del Este?", a: "No, Puerto Rico es en la zona del Atlántico (AST). Va 1 hora por delante en invierno y comparte hora en verano." },
        { q: "¿Cuál es la diferencia entre Halifax y Nueva York?", a: "Halifax siempre va 1 hora por delante de Nueva York." }
      ]
    },
    conclusion_astToEst: "Revise la ubicación geográfica de su contacto en la zona del Atlántico para planificar con 0 o 1 hora de desfase.",
    cta_astToEst: "Use nuestra herramienta AST a EST arriba para planificar sus actividades."
  });
}

const packs = {
  en,
  es: localizedPack({
    brand: "Convertidor GMT a EST", estToGmt: "Convertidor EST a GMT", gmtVsEst: "Diferencia entre GMT y EST", guide: "Guía de zonas horarias",
    description: "Convierte GMT a EST o EDT al instante con relojes en vivo, horario de verano, tabla de 24 horas y preguntas frecuentes.", reverseDescription: "Convierte hora del Este a GMT al instante con manejo de EST y EDT.", differenceDescription: "Compara GMT y hora del Este con cambios de EST, EDT y horario de verano.", guideDescription: "Guía práctica de GMT, EST, EDT, abreviaturas, reuniones, trading y programación global.",
    dynamic: { title: "Convertidor {from} a {to}", description: "Use este convertidor de {from} a {to} para realizar conversiones instantáneas con ajuste automático de horario de verano, relojes en vivo y planificador de reuniones." },
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
    heroAlt: "Imagen destacada de conversion GMT a EST", clockAlt: "Visual de relojes GMT a EST", mapAlt: "Mapa generado de GMT a EST",

    // Localized page-specific strings for Spanish
    useCases_home: {
      title: "Aplicaciones del Mundo Real",
      items: [
        { title: "Traders de Forex", text: "Realice un seguimiento de las aperturas y solapamientos de sesiones de trading de GMT a mercados del Este." },
        { title: "Equipos remotos", text: "Coordine reuniones de negocios y standups sin errores de cálculo de zona horaria." },
        { title: "Jugadores en línea", text: "Sincronice reinicios de servidores globales, torneos y eventos." },
        { title: "Estudiantes y educadores", text: "Verifique plazos de entrega y horarios de seminarios web." },
        { title: "Logística global", text: "Alinee horarios de tránsito, envíos y tiempos de referencia de aviación." }
      ]
    },
    useCases_difference: {
      title: "Escenarios de Comparación",
      items: [
        { title: "Planificación estratégica", text: "Evalúe diferencias de horario de verano antes de planificar eventos anuales." },
        { title: "Acuerdos contractuales", text: "Verifique los desfases oficiales utilizados en acuerdos legales o médicos." },
        { title: "Coordinación regional", text: "Observe cómo el horario estándar de Nueva York difiere de GMT." }
      ]
    },
    useCases_reverse: {
      title: "Casos de Uso de Programación Inversa",
      items: [
        { title: "Análisis de registros", text: "Convierta registros de incidentes locales a marcas de tiempo UTC/GMT estándar." },
        { title: "Transmisiones globales", text: "Publique inicios de seminarios web en la costa este para audiencias en GMT." },
        { title: "Coordinación de viajes", text: "Alinee salidas de vuelos y billetes de transporte usando el desfase GMT estándar." }
      ]
    },
    useCases_guide: {
      title: "Áreas Educativas de Cronometraje",
      items: [
        { title: "Contexto histórico", text: "Aprenda los orígenes de los estándares meridianos marítimos y GMT." },
        { title: "Seguimiento científico", text: "Descubra por qué los laboratorios usan la hora UTC." },
        { title: "Desarrollo de software", text: "Domine patrones de fecha ISO y épocas de bases de datos." }
      ]
    },
    useCases_dynamic: [
      { title: "Colaboración remota ({from} y {to})", text: "Programe llamadas y sincronice proyectos entre {from} y {to}." },
      { title: "Coordinación de viajes ({from} a {to})", text: "Convierta horarios de vuelos y registros entre {from} y {to}." },
      { title: "Planificación de eventos en {from} y {to}", text: "Publique seminarios web o eventos en {from} y {to}." }
    ],

    topics_difference: {
      title: "Diferencias y Cambios Clave",
      items: [
        { title: "Horario estándar vs Horario de verano", text: "GMT es una referencia constante, mientras que Eastern Time cambia entre EST (UTC-5) y EDT (UTC-4)." },
        { title: "La brecha de 4 o 5 horas", text: "La diferencia es de 5 horas en invierno y de 4 horas en los meses de verano." },
        { title: "Reglas de transición de verano", text: "Estados Unidos cambia el horario el segundo domingo de marzo y el primer domingo de noviembre." }
      ]
    },
    topics_reverse: {
      title: "Consejos de Conversión de Este a GMT",
      items: [
        { title: "Sumar desfase para GMT", text: "Dado que Eastern Time está detrás de GMT, debe sumar horas (5 en invierno, 4 en verano) para obtener GMT." },
        { title: "Evitar la falacia de EDT", text: "No asuma que Eastern Time siempre es UTC-5. En verano, EDT es UTC-4." },
        { title: "Sincronización de datos", text: "Use GMT/UTC al guardar registros de datos y convierta al final para los usuarios." }
      ]
    },
    topics_guide: {
      title: "Sistemas de Tiempo y Evolución",
      items: [
        { title: "Astronómica vs Atómica", text: "GMT se define por el paso del sol por Greenwich, mientras que UTC se mantiene con relojes atómicos de precisión." },
        { title: "Estándares militares y de aviación", text: "El ejército utiliza el formato de 24 horas y se refiere a GMT/UTC como hora 'Zulu'." },
        { title: "Historia de la hora estándar", text: "Se estableció a finales del siglo XIX para resolver la coordinación de los ferrocarriles." }
      ]
    },
    topics_dynamic: [
      { title: "Desfases de base de {from} y {to}", text: "Comprensión del desfase de base entre ambas regiones." },
      { title: "Horario de verano en {from} o {to}", text: "Cómo las transiciones de verano cambian la diferencia de hora entre {from} y {to}." },
      { title: "Planificación internacional entre {from} y {to}", text: "Estrategias de coordinación de reuniones para evitar errores de fecha." }
    ],

    faqs_difference: {
      title: "Preguntas Frecuentes Diferencia GMT vs EST",
      items: [
        { q: "¿GMT siempre está por delante de EST?", a: "Sí, GMT siempre está por delante de Eastern Time. Son 5 horas en invierno (EST) y 4 horas en verano (EDT)." },
        { q: "¿Por qué cambia la diferencia entre GMT y EST?", a: "Cambia porque Eastern Time observa el horario de verano, mientras que GMT mantiene sus relojes fijos todo el año." },
        { q: "¿Cómo programan reuniones entre GMT y EST?", a: "Debe revisar la estación del año. Una reunión a las 3:00 PM GMT es a las 10:00 AM EST en invierno y a las 11:00 AM EDT en verano." },
        { q: "¿Qué ciudades principales usan Eastern Time?", a: "Ciudades principales como Nueva York, Miami, Toronto y Atlanta." }
      ]
    },
    faqs_reverse: {
      title: "Preguntas Frecuentes Conversión EST a GMT",
      items: [
        { q: "¿Cómo convierto EST/EDT a GMT?", a: "Sume 5 horas a EST (invierno) o 4 horas a EDT (verano) para obtener la hora GMT correspondiente." },
        { q: "¿Eastern Time está detrás de GMT?", a: "Sí. Eastern Time está detrás de GMT, lo que significa que GMT va por delante en el día." },
        { q: "¿Cuál es un error común al convertir de Eastern a GMT?", a: "Olvidar que Eastern Time usa el horario de verano (EDT) en verano, causando un error de 1 hora." },
        { q: "¿Por qué los desarrolladores convierten eventos locales a GMT?", a: "GMT/UTC es el estándar para bases de datos, lo que garantiza el orden de los registros sin importar la ubicación del usuario." }
      ]
    },
    faqs_guide: {
      title: "Preguntas Frecuentes Zonas Horarias",
      items: [
        { q: "¿Cuál es la diferencia entre GMT y UTC?", a: "GMT es una zona horaria astronómica, mientras que UTC es un estándar atómico de tiempo. Comparten el mismo desfase para uso civil." },
        { q: "¿Qué significa el desfase UTC?", a: "El desfase UTC es la diferencia en horas y minutos respecto a Coordinated Universal Time (UTC) para un lugar." },
        { q: "¿Por qué se inventó el horario de verano?", a: "Fue introducido para ahorrar energía y maximizar las horas de luz solar durante el verano." },
        { q: "¿Qué es la hora militar?", a: "Es un formato de 24 horas que elimina AM/PM para evitar errores de comunicación." }
      ]
    },
    faqs_dynamic: [
      { q: "¿Cómo convierto {from} a {to}?", a: "Use nuestro convertidor. Seleccione una fecha y hora arriba para realizar la conversión con ajuste automático de horario de verano." },
      { q: "¿Cambia la diferencia de hora entre {from} y {to}?", a: "Sí. Si alguna de las dos regiones observa el horario de verano, el desfase cambiará según corresponda." },
      { q: "¿Cuál es el desfase estándar para {from} y {to}?", a: "La zona horaria de referencia para {from} es {fromZone} y para {to} es {toZone}." }
    ],

    intro_home: "GMT to EST Converter proporciona conversiones de hora en tiempo real con ajuste de horario de verano entre Greenwich Mean Time y hora del Este de América del Norte (EST/EDT). Siga los desfases, vea relojes en vivo y programe reuniones.",
    intro_difference: "Comparar Greenwich Mean Time (GMT) y Eastern Standard Time (EST) revela desfases estándar y estacionales. Mientras GMT permanece fijo, Eastern Time cambia a EDT durante el horario de verano.",
    intro_reverse: "Convierta hora del Este (EST/EDT) a Greenwich Mean Time (GMT/UTC) al instante. Ideal para profesionales en la costa este de EE. UU. que necesitan coordinar con regiones en GMT.",
    intro_guide: "Una guía educativa completa sobre sistemas de tiempo global, Coordinated Universal Time (UTC), Greenwich Mean Time (GMT), Eastern Standard Time (EST) e historia del horario de verano.",
    intro_dynamic: "Convierta {from} a {to} al instante. Esta herramienta gestiona los cambios de horario de verano en tiempo real para mostrar el desfase exacto, relojes en vivo y planificador de reuniones.",

    explanation_difference: "Greenwich Mean Time (GMT) es la referencia de desfase cero utilizada para la coordinación global. No observa horario de verano. Eastern Standard Time (EST) está cinco horas detrás de GMT (UTC-5). Sin embargo, durante el horario de verano (de marzo a noviembre), Eastern Time cambia a Eastern Daylight Time (EDT), que es UTC-4 (cuatro horas detrás de GMT). Este cambio estacional hace que la diferencia oscile entre 5 horas en invierno y 4 horas en verano.",
    explanation_reverse: "Al convertir de Eastern Time a GMT, debe sumar horas en lugar de restarlas. En horario estándar (EST), sume 5 horas para obtener GMT. En horario de verano (EDT), sume 4 horas. Por ejemplo, las 9:00 AM EST equivalen a las 2:00 PM GMT, y las 9:00 AM EDT equivalen a las 1:00 PM GMT.",
    explanation_guide: "Las zonas horarias dividen la Tierra en 24 franjas de 15 grados de longitud. Greenwich Mean Time (GMT) nació como estándar de navegación marítima del Real Observatorio de Greenwich en Londres. Hoy en día es sinónimo de Coordinated Universal Time (UTC), que se mantiene exacto mediante relojes atómicos. Eastern Standard Time (EST) representa UTC-5 y se observa en el este de América del Norte. En verano, estas regiones cambian a Eastern Daylight Time (EDT) en UTC-4.",
    explanation_dynamic: "La conversión de hora entre {from} y {to} requiere comprender los desfases activos de ambas regiones. Según la época del año, una o ambas zonas pueden observar el horario de verano, lo que altera la diferencia horaria. Por ejemplo, {from} utiliza la zona IANA {fromZone} y {to} la zona {toZone}. Use el convertidor arriba para comprobar cualquier fecha.",

    cta_home: "Use nuestro convertidor principal de GMT a EST arriba para comprobar los relojes en vivo.",
    cta_difference: "Compare los desfases de GMT y EST para alinear sus reuniones correctamente.",
    cta_reverse: "Convierta la hora del Este a GMT usando la calculadora inversa arriba.",
    cta_guide: "Lea nuestras guías detalladas a continuación para dominar los estándares de tiempo global.",
    cta_dynamic: "Use el convertidor de {from} a {to} arriba para planificar su cambio horario.",

    conclusion_home: "Estar al tanto de los cambios de horario de verano garantiza una coordinación precisa entre GMT y Eastern Time.",
    conclusion_difference: "Entender la diferencia entre GMT y EST es esencial para programar sin errores. Revise siempre la fecha exacta.",
    conclusion_reverse: "Convertir EST/EDT a GMT es sencillo si recuerda sumar el desfase activo. Guarde esta página para consultas rápidas.",
    conclusion_guide: "Los estándares de tiempo como GMT y UTC mantienen el mundo sincronizado. Dominar estos conceptos evita errores de programación.",
    conclusion_dynamic: "Las diferencias de hora entre {from} y {to} están sugeras a reglas estacionales. Use siempre un convertidor preciso."
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
  zh: ["GMT 到 EST 转换器", "EST 到 GMT 转换器", "GMT vs EST 差异", "时区指南", "即时将 GMT 转换为 EST 或 EDT，包含实时时钟、夏令时 and 24 小时表。", "即时 时区 计算器"],
  hi: ["GMT से EST कनवर्टर", "EST से GMT कनवर्टर", "GMT बनाम EST अंतर", "टाइम ज़ोन गाइड", "GMT को EST या EDT में तुरंत बदलें, लाइव घड़ियां, DST और 24 घंटे की तालिका के साथ।", "तुरंत Time Zone Calculator"],
  ar: ["محول GMT إلى EST", "محول EST إلى GMT", "فرق GMT و EST", "دليل المناطق الزمنية", "حوّل GMT إلى EST أو EDT فوراً مع ساعات مباشرة و DST وجدول 24 ساعة.", "حاسبة مناطق زمنية فورية"],
  ur: ["GMT سے EST کنورٹر", "EST سے GMT کنورٹر", "GMT بمقابلہ EST فرق", "ٹائم زون گائیڈ", "GMT کو EST یا EDT میں فوراً بدلیں، لائیو گھڑیوں, DST اور 24 گھنٹے جدول کے ساتھ۔", "فوری ٹائم زون کیلکولیٹر"],
  fa: ["تبدیل GMT به EST", "تبدیل EST به GMT", "تفاوت GMT و EST", "راهنمای مناطق زمانی", "GMT را فوراً به EST یا EDT تبدیل کنید، همراه با ساعت زنده، DST و جدول ۲۴ ساعته.", "محاسبه‌گر فوری منطقه زمانی"],
  bn: ["GMT থেকে EST কনভার্টার", "EST থেকে GMT কনভার্টার", "GMT বনাম EST পার্থক্য", "টাইم জোন গাইড", "GMT কে EST বা EDT-তে তাৎক্ষণিক রূপান্তর করুন, লাইভ ঘড়ি, DST ও ২৪ ঘণ্টার টেবিলসহ।", "তাৎক্ষণিক টাইম জอน ক্যালকুলেটর"],
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
