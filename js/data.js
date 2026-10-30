window.FLOWFI = {
  contact: {
    email: "weflowfi@gmail.com",
    phone: "+96597378148",
    phonePretty: "+965 9737 8148",
    whatsapp: "96597378148",
    site: "https://weflowfi.com"
  },
  rates: { KWD: 1, SAR: 12.26, USD: 3.27 },
  currencyLabel: {
    ar: { KWD: "د.ك", SAR: "ر.س", USD: "USD" },
    en: { KWD: "KWD", SAR: "SAR", USD: "USD" }
  },
  ui: {
    ar: {
      pinWrong: "الرمز غير صحيح.",
      pinChanged: "تم تغيير رمز اللوحة على هذا المتصفح.",
      pinMismatch: "الرمز والتأكيد غير متطابقين.",
      pinShort: "استخدم 4 أحرف على الأقل.",
      savedLead: "حُفظ الطلب في لوحة التحكم وجُهّز للإرسال.",
      copied: "نُسخ النص.",
      exported: "تم تنزيل الملف.",
      deleted: "حُذف الطلب من هذا المتصفح.",
      pricingSaved: "تحدّثت الأسعار على الموقع.",
      workSaved: "تحدّث معرض القدرات.",
      resetDone: "عادت البيانات الافتراضية.",
      needTrack: "اختر مساراً واحداً على الأقل.",
      needModule: "اختر وحدة واحدة على الأقل داخل المسار.",
      needContact: "أكمل الاسم ووسيلة التواصل والدولة.",
      quoteReady: "طلبك جاهز. أرسله عبر واتساب لإغلاقه الآن.",
      confirmDelete: "حذف هذا الطلب من لوحة هذا المتصفح؟",
      confirmReset: "استعادة الأسعار والمعرض الافتراضيين؟ الطلبات لن تُمسح.",
      workNeedTitle: "أضف عنواناً بالعربية والإنجليزية.",
      priceInvalid: "الأسعار يجب أن تكون أرقاماً صحيحة أو صفراً.",
      emptyLeads: "لا توجد اتفاقات بعد. عندما يؤكد العميل الاتفاق مع المستشار تُحفظ هنا، ويصل إشعار تيليجرام والبريد وواتساب.",
      emptySearch: "لا توجد نتائج مطابقة.",
      perMonth: "شهرياً",
      launch: "إطلاق",
      support: "دعم اختياري شهري",
      from: "يبدأ من",
      estimateOnce: "تقدير التنفيذ",
      estimateMonth: "تقدير شهري",
      planningNote: "تقدير تخطيطي للمقارنة. العرض النهائي يُعتمد كتابياً بالدينار الكويتي بعد مراجعة النطاق.",
      whatsapp: "إرسال الطلب عبر واتساب",
      telegram: "مشاركة النص عبر تيليجرام",
      email: "إرسال عبر البريد",
      copy: "نسخ الطلب",
      newQuote: "طلب جديد",
      featured: "الأكثر طلباً للسيطرة",
      sample: "عينة توضيحية",
      status: { new: "جديد", reviewing: "قيد المراجعة", building: "جاري التنفيذ", done: "مكتمل" },
      cat: { saas: "هندسة SaaS", automation: "أتمتة", marketing: "تسويق ومحتوى" },
      all: "الكل",
      monthlyUnit: "بند شهري",
      onceUnit: "بند تنفيذي",
      noLines: "لم تُحدد وحدات بعد.",
      internalSaved: "حُفظت ملاحظتك الداخلية.",
      filterAll: "كل الحالات"
    },
    en: {
      pinWrong: "Incorrect code.",
      pinChanged: "The panel code was updated in this browser.",
      pinMismatch: "The code and confirmation do not match.",
      pinShort: "Use at least 4 characters.",
      savedLead: "The request is saved in the dashboard and ready to send.",
      copied: "Copied.",
      exported: "File downloaded.",
      deleted: "Request removed from this browser.",
      pricingSaved: "Pricing on the site was updated.",
      workSaved: "The capability gallery was updated.",
      resetDone: "Defaults restored.",
      needTrack: "Select at least one track.",
      needModule: "Select at least one module inside the track.",
      needContact: "Add a name, a way to reach you, and a country.",
      quoteReady: "Your request is ready. Send it on WhatsApp to close it now.",
      confirmDelete: "Remove this request from this browser's panel?",
      confirmReset: "Restore default pricing and gallery? Requests will stay.",
      workNeedTitle: "Add an Arabic and an English title.",
      priceInvalid: "Prices must be valid numbers or zero.",
      emptyLeads: "No agreements yet. When a client confirms with the architect, the order is stored here and Telegram, email, and WhatsApp are notified.",
      emptySearch: "No matching results.",
      perMonth: "per month",
      launch: "launch",
      support: "optional monthly support",
      from: "From",
      estimateOnce: "Build estimate",
      estimateMonth: "Monthly estimate",
      planningNote: "A planning estimate. The final proposal is confirmed in writing in KWD after scope review.",
      whatsapp: "Send the request on WhatsApp",
      telegram: "Share the text on Telegram",
      email: "Send by email",
      copy: "Copy request",
      newQuote: "New request",
      featured: "Full-market partner",
      sample: "Illustrative sample",
      status: { new: "New", reviewing: "Reviewing", building: "In progress", done: "Complete" },
      cat: { saas: "SaaS engineering", automation: "Automation", marketing: "Marketing & content" },
      all: "All",
      monthlyUnit: "Monthly item",
      onceUnit: "Build item",
      noLines: "No modules selected yet.",
      internalSaved: "Internal note saved.",
      filterAll: "All statuses"
    }
  },
  modules: [
    { id: "saas-core", track: "software", priceKwd: 1600, monthly: false, name: { ar: "منصة SaaS متعددة المستخدمين", en: "Multi-user SaaS platform" }, blurb: { ar: "اشتراكات، حسابات، ولوحة إدارة من الصفر حتى الإطلاق.", en: "Subscriptions, accounts, and an admin console from zero to launch." } },
    { id: "web-app", track: "software", priceKwd: 750, monthly: false, name: { ar: "نظام ويب تشغيلي", en: "Operational web system" }, blurb: { ar: "طلبات، تشغيل شركات، بوابات عملاء، أو منصة داخلية.", en: "Orders, company operations, client portals, or an internal platform." } },
    { id: "mobile-pwa", track: "software", priceKwd: 420, monthly: false, name: { ar: "تجربة موبايل / PWA", en: "Mobile experience / PWA" }, blurb: { ar: "واجهة تعمل على الجوال بثبات وتناسب الاستخدام اليومي.", en: "A phone-ready experience built for daily use." } },
    { id: "dashboards", track: "software", priceKwd: 360, monthly: false, name: { ar: "لوحات مالية وتشغيلية", en: "Finance and operations dashboards" }, blurb: { ar: "مؤشرات، حركات، ومراجعة للإدارة بدون جداول مبعثرة.", en: "Indicators, activity, and a management view without scattered sheets." } },
    { id: "payments", track: "software", priceKwd: 280, monthly: false, name: { ar: "بوابات الدفع", en: "Payment gateways" }, blurb: { ar: "KNET وMyFatoorah وStripe حسب السوق المتفق عليه.", en: "KNET, MyFatoorah, and Stripe for the agreed markets." } },
    { id: "intel", track: "software", priceKwd: 620, monthly: false, name: { ar: "استخبارات السوق وسحب البيانات", en: "Market intelligence and data collection" }, blurb: { ar: "رصد مصادر علنية وتنظيمها في قاعدة قابلة للمراجعة.", en: "Monitor public sources and organize them into a reviewable base." } },
    { id: "roles", track: "software", priceKwd: 180, monthly: false, name: { ar: "صلاحيات وأدوار", en: "Roles and permissions" }, blurb: { ar: "من يرى الأرقام، ومن يعدّل، ومن يعتمد.", en: "Who can view figures, edit records, and approve." } },
    { id: "branches", track: "software", priceKwd: 260, monthly: false, name: { ar: "تعدد الفروع", en: "Multi-branch records" }, blurb: { ar: "فصل بيانات الفروع مع نظرة موحدة للإدارة.", en: "Separate branch records with one management view." } },
    { id: "tg", track: "automation", priceKwd: 260, monthly: false, name: { ar: "مساعد FlowFi على تيليجرام", en: "FlowFi assistant on Telegram" }, blurb: { ar: "تحويل الرسالة إلى سجل تشغيلي قابل للمراجعة.", en: "Turn a message into an operational record ready for review." } },
    { id: "wa", track: "automation", priceKwd: 150, monthly: false, name: { ar: "مساعد على واتساب", en: "WhatsApp assistant" }, blurb: { ar: "نفس منطق التسجيل على القناة التي يستخدمها الفريق. الربط يُختبر ضمن النطاق.", en: "The same capture flow on the channel your team already uses. Connection is tested in scope." } },
    { id: "voice", track: "automation", priceKwd: 80, monthly: false, name: { ar: "الرسائل الصوتية", en: "Voice notes" }, blurb: { ar: "فهم ملاحظة صوتية واستخراج الحقول المتفق عليها.", en: "Read a voice note into the agreed fields." } },
    { id: "ocr", track: "automation", priceKwd: 100, monthly: false, name: { ar: "صور الفواتير والإيصالات", en: "Receipt and invoice images" }, blurb: { ar: "قراءة صورة إيصال إلى مبلغ وتصنيف وطريقة دفع.", en: "Read a receipt image into amount, category, and payment method." } },
    { id: "ledger", track: "automation", priceKwd: 140, monthly: false, name: { ar: "مبيعات ومصاريف وفواتير", en: "Sales, expenses, and invoices" }, blurb: { ar: "سجلات بالدينار الكويتي وعملات الخليج المتفق عليها.", en: "Records in KWD and the agreed Gulf currencies." } },
    { id: "stock", track: "automation", priceKwd: 120, monthly: false, name: { ar: "مخزون وموردون", en: "Inventory and suppliers" }, blurb: { ar: "حركة صنف، حد أدنى، وفاتورة مورد واستحقاق.", en: "Item movement, low stock, supplier bills, and due amounts." } },
    { id: "sheets", track: "automation", priceKwd: 90, monthly: false, name: { ar: "ربط الجداول والبريد", en: "Sheets and email bridge" }, blurb: { ar: "مزامنة Excel أو Google Sheets ومسار بريد متفق عليه.", en: "Excel or Google Sheets sync and an agreed email path." } },
    { id: "agents", track: "automation", priceKwd: 480, monthly: false, name: { ar: "وكلاء متعددون يعملون 24/7", en: "Multi-agents running 24/7" }, blurb: { ar: "وكلاء يربطون القاعدة والجداول والبريد بمهام محددة ومراجعة بشرية.", en: "Agents that connect the database, sheets, and email for defined tasks with human review." } },
    { id: "m-plan", track: "marketing", priceKwd: 70, monthly: true, name: { ar: "خطة محتوى وكتابة بيعية", en: "Content plan and sales copy" }, blurb: { ar: "رزنامة شهرية، نصوص إعلانات، ومقالات عند الحاجة.", en: "A monthly calendar, ad copy, and articles when needed." } },
    { id: "m-design", track: "marketing", priceKwd: 55, monthly: true, name: { ar: "أغلفة ريلز وبوستات", en: "Reel covers and posts" }, blurb: { ar: "أغلفة 9:16، كاروسيل، وثبات بصري للمنصات.", en: "9:16 covers, carousels, and a consistent social look." } },
    { id: "m-video", track: "marketing", priceKwd: 95, monthly: true, name: { ar: "إنتاج 4 فيديوهات قصيرة", en: "Four short videos produced" }, blurb: { ar: "سكريبت، توجيه بصري، ومونتاج ريلز / TikTok / Shorts.", en: "Script, visual direction, and edit for Reels, TikTok, and Shorts." } },
    { id: "m-ads", track: "marketing", priceKwd: 40, monthly: true, name: { ar: "حزمة نصوص إعلانية", en: "Ad script pack" }, blurb: { ar: "خطافات ودعوات إجراء جاهزة للتجربة على الحملات.", en: "Hooks and calls to action ready to test in campaigns." } }
  ],
  pricing: [
    {
      id: "marketing",
      featured: false,
      from: false,
      cadence: "month",
      priceKwd: 220,
      setupKwd: 0,
      monthlyKwd: 220,
      quote: "marketing",
      name: { ar: "محرك التسويق والريلز", en: "Marketing & Reels Engine" },
      tagline: { ar: "محتوى يُكتب ليبيع، وأغلفة تُوقف التمرير، وفيديو قصير يُنتج كل شهر.", en: "Copy written to sell, covers that stop the scroll, and short video produced every month." },
      features: {
        ar: ["خطة محتوى شهرية مربوطة بهدف البيع", "8 نصوص ريلز / TikTok / Shorts", "8 أغلفة ريلز وتصاميم بوست وكاروسيل", "إنتاج ومونتاج 4 فيديوهات قصيرة", "حزمة نصوص إعلانية بيعية", "مراجعة اتجاه شهرية وتعديل الخطة"],
        en: ["Monthly content plan tied to a sales goal", "8 Reels / TikTok / Shorts scripts", "8 reel covers plus post and carousel design", "Production and edit of 4 short videos", "Direct-response ad copy pack", "Monthly direction review and plan adjustment"]
      }
    },
    {
      id: "automation",
      featured: false,
      from: false,
      cadence: "hybrid",
      priceKwd: 750,
      setupKwd: 750,
      monthlyKwd: 95,
      quote: "automation",
      name: { ar: "أتمتة الأعمال ومساعد FlowFi", en: "Business Automation Suite" },
      tagline: { ar: "تيليجرام وواتساب يحوّلان النص والصوت وصورة الفاتورة إلى سجلات مبيعات ومصاريف ومخزون.", en: "Telegram and WhatsApp turn text, voice, and receipt photos into sales, expense, and stock records." },
      features: {
        ar: ["مساعد تيليجرام وواتساب حسب النطاق", "نص، رسالة صوتية، وصورة فاتورة", "مبيعات، مصاريف، فواتير، مخزون، وموردون", "الدينار الكويتي وعملات الخليج المتفق عليها", "مزامنة Excel / Google Sheets وقاعدة البيانات", "تنبيهات وتقارير بعد اختبار الإعداد", "تسليم لوحة مراجعة وتدريب التشغيل"],
        en: ["Telegram and WhatsApp assistant within scope", "Text, voice note, and invoice photo", "Sales, expenses, invoices, inventory, and suppliers", "Kuwaiti dinar and agreed Gulf currencies", "Excel / Google Sheets and database sync", "Alerts and reports after setup testing", "Review dashboard handover and operator training"]
      }
    },
    {
      id: "saas",
      featured: false,
      from: true,
      cadence: "project",
      priceKwd: 2800,
      setupKwd: 2800,
      monthlyKwd: 120,
      quote: "software",
      name: { ar: "بناء SaaS أو نظام مخصص", en: "Custom Enterprise / SaaS Build" },
      tagline: { ar: "أي برنامج، مهما كان ثقيلاً أو غير تقليدي، من المعمارية حتى الإطلاق.", en: "Any product, however heavy or unconventional, from architecture through launch." },
      features: {
        ar: ["بناء كامل من الصفر حتى الإطلاق", "اشتراكات، تعدد مستخدمين، وصلاحيات", "لوحات مالية وتشغيلية", "KNET وMyFatoorah وStripe حسب السوق", "ويب، سحابة، وتجربة جوال عند الحاجة", "استخبارات سوق وسحب بيانات إذا دخلت في النطاق", "تسليم الكود، النشر، وتدريب التشغيل"],
        en: ["Full build from zero to launch", "Subscriptions, multi-user access, and roles", "Finance and operations dashboards", "KNET, MyFatoorah, and Stripe for the target market", "Web, cloud, and mobile experience when needed", "Market intelligence and collection if it is in scope", "Code handover, deployment, and operator training"]
      }
    },
    {
      id: "partner",
      featured: true,
      from: false,
      cadence: "hybrid",
      priceKwd: 4600,
      setupKwd: 4600,
      monthlyKwd: 420,
      quote: "full",
      name: { ar: "الشريك الشامل للسيطرة على السوق", en: "Full Tech + Marketing Partner" },
      tagline: { ar: "النظام، والأتمتة، ومحرك الريلز تحت معمارية واحدة ومع المهندس مباشرة.", en: "The product, the automation, and the reels engine under one architecture, directly with the engineer." },
      features: {
        ar: ["بناء النظام البرمجي حسب نطاق الشريك", "مساعد ذكي مربوط بالتشغيل اليومي", "إدارة المحتوى والريلز والفيديو القصير شهرياً", "أولوية تنفيذ مع المهندس مباشرة", "مراجعة نمو ربع سنوية ومسار تطوير", "عرض أوضح من تجميع كل الوحدات منفردة"],
        en: ["Software build inside the partner scope", "An intelligent assistant tied to daily operations", "Monthly content, reels, and short-video management", "Priority delivery directly with the engineer", "Quarterly growth review and a development path", "A clearer engagement than assembling every module alone"]
      }
    }
  ],
  portfolio: [
    {
      id: "treasury",
      category: "saas",
      title: { ar: "منصة خزينة واستثمار وتشغيل", en: "Treasury, portfolio, and operations platform" },
      summary: { ar: "لوحة واحدة تجمع الحركة المالية، المحافظ، والاشتراكات، مع صلاحيات للإدارة والمالية.", en: "One console for cash movement, portfolios, and subscriptions, with finance and management roles." },
      points: {
        ar: ["مؤشرات سيولة وتشغيل", "سجل حركات قابل للمراجعة", "تعدد مستخدمين وصلاحيات", "جاهزية لربط بوابة دفع"],
        en: ["Liquidity and operating indicators", "A reviewable transaction ledger", "Multi-user roles", "Ready for a payment gateway"]
      },
      stack: ["Next.js", "PostgreSQL", "Stripe", "KNET"]
    },
    {
      id: "branches",
      category: "saas",
      title: { ar: "نظام تشغيل متعدد الفروع", en: "Multi-branch operating system" },
      summary: { ar: "طلبات، مخزون، ومصاريف كل فرع في سجل منفصل مع نظرة موحدة لصاحب الشركة.", en: "Orders, stock, and expenses per branch, with one owner view across locations." },
      points: {
        ar: ["فصل بيانات الفروع", "تنبيه نقص الصنف", "تقرير يومي للإدارة", "مسار اعتماد للمصاريف"],
        en: ["Branch-level records", "Low-stock signal", "Daily management report", "Expense approval path"]
      },
      stack: ["React", "Node.js", "PostgreSQL"]
    },
    {
      id: "delivery",
      category: "saas",
      title: { ar: "مركز طلبات وتوصيل", en: "Orders and delivery desk" },
      summary: { ar: "تنسيق الطلب من التأكيد حتى التسليم، بدون ادعاء تتبع GPS إلا إذا اتُفق عليه منفصلاً.", en: "Coordinate an order from confirmation to delivery, without implying live GPS unless separately scoped." },
      points: {
        ar: ["حالات الطلب والتسليم", "عنوان العميل وتأكيد الاستلام", "لوحة للمتابعة اليومية", "ربط لاحق بالمصاريف الميدانية"],
        en: ["Order and delivery states", "Customer address and receipt confirmation", "A daily follow-up board", "A later link to field expenses"]
      },
      stack: ["React", "Supabase", "Maps-ready"]
    },
    {
      id: "flowfi-assistant",
      category: "automation",
      title: { ar: "مساعد FlowFi المحاسبي", en: "FlowFi ledger assistant" },
      summary: { ar: "النموذج الأصلي المطوّر: رسالة نصية أو صوتية أو صورة إيصال وقود 45 د.ك تتحول إلى سجل مصروف منظم.", en: "The original product, upgraded: a text, a voice note, or a KWD 45 fuel receipt becomes a structured expense record." },
      points: {
        ar: ["نص وصوت وصورة فاتورة", "دينار كويتي وتصنيف نقدي", "مراجعة قبل الاعتماد", "أسئلة عن السجلات بعد الاختبار"],
        en: ["Text, voice, and receipt image", "Kuwaiti dinar and cash classification", "Review before posting", "Questions over records after testing"]
      },
      stack: ["Python", "Telegram", "PostgreSQL", "OCR"]
    },
    {
      id: "reels-studio",
      category: "marketing",
      title: { ar: "استوديو ريلز ونمو", en: "Reels growth studio" },
      summary: { ar: "خط إنتاج شهري: زاوية بيع، سكريبت، غلاف، ومونتاج قصير مربوط بعرض واضح لا بشعارات عامة.", en: "A monthly line: sales angle, script, cover, and a short edit tied to a clear offer." },
      points: {
        ar: ["خطاف في أول ثلاث ثوانٍ", "غلاف 9:16 بهوية ثابتة", "دعوة إجراء واحدة", "تقويم نشر قابل للإدارة"],
        en: ["A hook in the first three seconds", "A consistent 9:16 cover", "One call to action", "A manageable publishing calendar"]
      },
      stack: ["Copy", "Art direction", "Edit"]
    },
    {
      id: "intel-desk",
      category: "saas",
      title: { ar: "مكتب استخبارات السوق", en: "Market intelligence desk" },
      summary: { ar: "جمع مصادر علنية، توحيد الحقول، وتنبيه عند تغيّر سعر أو عرض منافس، مع أثر مراجعة بشري.", en: "Collect public sources, normalize fields, and flag a competitor price or offer change, with a human review trail." },
      points: {
        ar: ["مصادر علنية فقط", "توحيد المنتج والسعر", "سجل تغيّر", "تصدير إلى جدول أو قاعدة"],
        en: ["Public sources only", "Normalized product and price", "A change log", "Export to a sheet or database"]
      },
      stack: ["Python", "PostgreSQL", "Schedulers"]
    }
  ],
  industries: [
    {
      id: "perfume",
      label: { ar: "عطور فاخرة", en: "Luxury fragrance" },
      script: {
        duration: { ar: "18–25 ثانية", en: "18–25 seconds" },
        hook: { ar: "العطر الذي يدخل قبلك لا يُشرح في ثلاث ثوانٍ.", en: "The fragrance that arrives before you does not need a speech." },
        vo: {
          ar: ["لقطة ظل على الرخام، ثم الزجاجة وحدها.", "جملة واحدة على الشاشة: مركّب للحضور، لا للازدحام.", "اختم برقم الدفعة والدعوة لحجز الإصدار."],
          en: ["A shadow on marble, then the bottle alone.", "One line on screen: composed for presence, not for noise.", "Close on the batch number and the invitation to reserve."]
        },
        onScreen: { ar: "مجموعة الليالي · إصدار محدود", en: "Night collection · limited batch" },
        cta: { ar: "احجز زجاجتك قبل نفاد الدفعة.", en: "Reserve the bottle before this batch is gone." },
        mood: { ar: "إيقاع بطيء، مساحة صامتة، بدون موسيقى صاخبة.", en: "Slow pace, quiet space, no loud track." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 01", en: "Reel cover 01" },
        title: { ar: "حضورٌ لا يُقلَّد", en: "Presence, not perfume" },
        subtitle: { ar: "زجاجة في الثلث السفلي ومساحة سوداء واسعة وسطر ذهبي واحد.", en: "Bottle in the lower third, wide black space, one gold line." },
        colors: ["#140e08", "#d4af37", "#f6e7c1"]
      },
      software: {
        title: { ar: "حجوزات الدفعة الخاصة + مخزون الزجاجات", en: "Private-batch reservations + bottle inventory" },
        points: {
          ar: ["سجل عملاء الإصدار الخاص", "تنبيه عند اقتراب نفاد الدفعة", "متابعة بعد التسليم عبر المساعد", "لوحة مبيعات لكل عطر"],
          en: ["A private-client list for the drop", "A signal as the batch runs low", "A post-delivery follow-up through the assistant", "Sales by fragrance"]
        }
      }
    },
    {
      id: "restaurant",
      label: { ar: "مطاعم", en: "Restaurants" },
      script: {
        duration: { ar: "15–20 ثانية", en: "15–20 seconds" },
        hook: { ar: "الزبون لا يبحث عن قائمة. يبحث عن الطاولة التي تستحق الخروج.", en: "Guests are not looking for a menu. They are looking for a table worth leaving the house for." },
        vo: {
          ar: ["اقترب من الطبق حتى يملأ الإطار.", "اسم الطبق فقط، ثم جملة عن سبب طلبه الليلة.", "اختم بعدد المقاعد المتاح اليوم ورابط الحجز."],
          en: ["Move close until the dish fills the frame.", "The dish name, then one line on why it is tonight's order.", "Close with seats left today and the reservation link."]
        },
        onScreen: { ar: "طبق التوقيع · الليلة", en: "Signature plate · tonight" },
        cta: { ar: "احجز الطاولة قبل اكتمال الفترة.", en: "Book the table before the sitting is full." },
        mood: { ar: "صوت المطبخ خفيف، قطع سريعة، ضوء دافئ.", en: "Light kitchen sound, quick cuts, warm light." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 02", en: "Reel cover 02" },
        title: { ar: "الليلة على الطاولة", en: "Tonight, at the table" },
        subtitle: { ar: "صورة الطبق كاملة مع شريط سفلي للاسم والسعر فقط.", en: "Full dish photo with a bottom bar for the name and price only." },
        colors: ["#1a0d0a", "#e7b15a", "#f4efe4"]
      },
      software: {
        title: { ar: "حجوزات ومطبخ ومصاريف يومية", en: "Reservations, kitchen, and daily spend" },
        points: {
          ar: ["حجوزات وحالة الطاولة", "صرف المكونات من المخزون", "مصروف التوصيل والوقود عبر تيليجرام", "ريل مربوط بطبق اليوم لا بأرشيف عام"],
          en: ["Reservations and table status", "Ingredient depletion from stock", "Delivery and fuel spend through Telegram", "A reel tied to today's dish, not a generic archive"]
        }
      }
    },
    {
      id: "apps",
      label: { ar: "تطبيقات ومنتجات رقمية", en: "Apps and digital products" },
      script: {
        duration: { ar: "12–18 ثانية", en: "12–18 seconds" },
        hook: { ar: "إذا احتاج تطبيقك شرحاً طويلاً، فالمشكلة في أول خمس ثوانٍ.", en: "If the product needs a long explanation, the first five seconds are the problem." },
        vo: {
          ar: ["أظهر المشكلة في شاشة واحدة.", "ضغطة واحدة، ثم النتيجة بدون شعارات.", "اختم بمن يستخدمه اليوم وكيف يبدأ."],
          en: ["Show the problem on one screen.", "One tap, then the result, with no slogans.", "Close on who uses it today and how to start."]
        },
        onScreen: { ar: "من الفوضى إلى السجل", en: "From noise to a record" },
        cta: { ar: "احجز معاينة النطاق أو ابدأ التجربة.", en: "Book a scope review or start the trial." },
        mood: { ar: "لقطات واجهة نظيفة، بدون موسيقى مبالغ فيها.", en: "Clean interface shots, no overblown music." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 03", en: "Reel cover 03" },
        title: { ar: "خمس ثوانٍ تكفي", en: "Five seconds is enough" },
        subtitle: { ar: "واجهة المنتج على خلفية سبج مع جملة المشكلة فقط.", en: "The product UI on obsidian, with only the problem statement." },
        colors: ["#07090e", "#00f0ff", "#d4af37"]
      },
      software: {
        title: { ar: "بناء المنتج نفسه: اشتراك، لوحة، وإطلاق", en: "Build the product itself: billing, dashboard, launch" },
        points: {
          ar: ["معمارية SaaS متعددة المستخدمين", "بوابة دفع حسب السوق", "لوحة استخدام للإدارة", "سكريبتات إطلاق مربوطة بالميزة لا بالشعار"],
          en: ["Multi-user SaaS architecture", "A payment gateway for the market", "An admin usage view", "Launch scripts tied to the feature, not the logo"]
        }
      }
    },
    {
      id: "realestate",
      label: { ar: "عقارات", en: "Real estate" },
      script: {
        duration: { ar: "20–28 ثانية", en: "20–28 seconds" },
        hook: { ar: "العقار الصحيح لا يُباع بالمتر. يُباع بقرار تشعر أنه هادئ.", en: "The right property is not sold by the square meter. It is sold by a decision that feels calm." },
        vo: {
          ar: ["واجهة عند أول الضوء، ثم فراغ الغرفة الرئيسية.", "حقيقة واحدة: الموقع، المساحة، أو الموعد. بدون عائد استثماري مُختلق.", "اختم بدعوة لمعاينة محددة الوقت."],
          en: ["The facade at first light, then the main room empty.", "One fact: location, area, or the viewing time. No invented yield.", "Close with an invitation to a timed viewing."]
        },
        onScreen: { ar: "معاينة خاصة · هذا الأسبوع", en: "Private viewing · this week" },
        cta: { ar: "احجز المعاينة. القرار يبقى لك.", en: "Book the viewing. The decision stays yours." },
        mood: { ar: "لقطات ثابتة، صوت مدينة منخفض، جملة قصيرة.", en: "Still shots, low city sound, a short line." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 04", en: "Reel cover 04" },
        title: { ar: "قرار هادئ", en: "A calm decision" },
        subtitle: { ar: "صورة الواجهة مع شريط بيانات: الحي، المساحة، وموعد المعاينة.", en: "Facade photo with a data bar: district, area, viewing time." },
        colors: ["#10141c", "#d4af37", "#e8eef2"]
      },
      software: {
        title: { ar: "سجل وحدات ومعاينات ومتابعة", en: "Unit book, viewings, and follow-up" },
        points: {
          ar: ["حالة كل وحدة: متاح، محجوز، مباع", "تقويم معاينات", "متابعة العميل بدون رسائل تلقائية مفترضة", "ريل لكل مشروع من ملف الوحدة نفسه"],
          en: ["Each unit: available, reserved, sold", "A viewing calendar", "Client follow-up without assuming automated messaging", "A reel per project drawn from the unit file"]
        }
      }
    },
    {
      id: "corporate",
      label: { ar: "شركات", en: "Companies" },
      script: {
        duration: { ar: "18–24 ثانية", en: "18–24 seconds" },
        hook: { ar: "الشركات لا تشتري كلاماً عاماً. تشتري نظاماً يختصر أسبوعاً من الفوضى.", en: "Companies do not buy generic language. They buy a system that removes a week of chaos." },
        vo: {
          ar: ["ابدأ بمشهد الرسالة الضائعة ثم السجل المنظم.", "سمِّ العملية: مصروف، طلب، أو اعتماد.", "اختم بدعوة لمراجعة نطاق مدتها محددة."],
          en: ["Open on a lost message, then the organized record.", "Name the process: an expense, an order, or an approval.", "Close with an invitation to a timed scope review."]
        },
        onScreen: { ar: "من الرسالة إلى السجل", en: "From the message to the record" },
        cta: { ar: "احجز مراجعة النطاق مع المهندس.", en: "Book a scope review with the engineer." },
        mood: { ar: "إيقاع واثق، لقطات شاشة حقيقية للنموذج، بدون وعود أرقام.", en: "A steady pace, real sample screens, no invented numbers." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 05", en: "Reel cover 05" },
        title: { ar: "أسبوع أقل من الفوضى", en: "One less week of chaos" },
        subtitle: { ar: "انقسام قبل/بعد مع سطر ذهبي في المنتصف.", en: "A before/after split with one gold line through the center." },
        colors: ["#0c1018", "#d4af37", "#00f0ff"]
      },
      software: {
        title: { ar: "بوابة تشغيل داخلية للشركة", en: "An internal operations portal" },
        points: {
          ar: ["اعتمادات ومصاريف", "صلاحيات حسب الدور", "ملخص إداري أسبوعي", "مساعد يسجّل ما يتكرر كل يوم"],
          en: ["Approvals and expenses", "Role-based access", "A weekly management summary", "An assistant for what repeats every day"]
        }
      }
    },
    {
      id: "ecommerce",
      label: { ar: "تجارة إلكترونية", en: "E-commerce" },
      script: {
        duration: { ar: "12–16 ثانية", en: "12–16 seconds" },
        hook: { ar: "الإعلان الذي لا يعرف مخزونك يبيع منتجاً نافداً.", en: "An ad that does not know your stock sells a product you no longer have." },
        vo: {
          ar: ["المنتج في اليد، ثم الرقم المتبقي فعلاً.", "سعر واضح وطريقة الطلب.", "لا تَعِد بشحن لا تملكه."],
          en: ["The product in hand, then the quantity you actually have.", "A clear price and how to order.", "Do not promise dispatch you cannot make."]
        },
        onScreen: { ar: "متوفر الآن · الكمية ظاهرة", en: "Available now · quantity visible" },
        cta: { ar: "اطلبه اليوم من الرابط في أول تعليق.", en: "Order it today from the link in the first comment." },
        mood: { ar: "ضوء منتج نظيف، قطع سريعة، نص كبير.", en: "Clean product light, fast cuts, large type." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 06", en: "Reel cover 06" },
        title: { ar: "متوفر. واضح. الآن.", en: "In stock. Clear. Now." },
        subtitle: { ar: "المنتج في المنتصف والسعر والكمية في شريط سفلي.", en: "Product centered, price and quantity on a bottom bar." },
        colors: ["#12100e", "#f0d78c", "#f7f4ee"]
      },
      software: {
        title: { ar: "تشغيل المتجر مربوط بالمحتوى", en: "Store operations tied to content" },
        points: {
          ar: ["مخزون يمنع بيع النافد", "سجل طلبات وحالات دفع", "قائمة متابعة للسلات المتروكة بدون افتراض ربط تلقائي", "ريل يُسحب من المنتجات المتاحة فقط"],
          en: ["Stock that blocks selling out", "Orders and payment states", "A follow-up list for abandoned carts without assuming an automatic integration", "Reels pulled only from products you can ship"]
        }
      }
    },
    {
      id: "clinic",
      label: { ar: "عيادات", en: "Clinics" },
      script: {
        duration: { ar: "16–22 ثانية", en: "16–22 seconds" },
        hook: { ar: "الثقة لا تُشترى بإعلان صاخب. تُبنى بسؤال يُجاب في وقته.", en: "Trust is not bought with a loud ad. It is built when a question is answered on time." },
        vo: {
          ar: ["لقطة المكان بهدوء، ثم خطوات الحجز الثلاث.", "معلومة تشغيلية فقط: التخصص، الموعد، والتحضير.", "لا تشخيص ولا وعد علاجي. المراجعة الطبية تبقى على المنشأة."],
          en: ["A quiet shot of the place, then the three booking steps.", "Operational facts only: specialty, time, and how to prepare.", "No diagnosis and no treatment promise. Clinical review stays with the clinic."]
        },
        onScreen: { ar: "موعدك واضح قبل الزيارة", en: "Your visit is clear before you arrive" },
        cta: { ar: "احجز الموعد المتاح هذا الأسبوع.", en: "Book the opening available this week." },
        mood: { ar: "هدوء، إضاءة طبيعية، نص قليل.", en: "Quiet, natural light, very little text." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 07", en: "Reel cover 07" },
        title: { ar: "موعد بلا التباس", en: "An appointment without confusion" },
        subtitle: { ar: "مساحة فاتحة واسم العيادة وزر موعد واحد.", en: "A light field, the clinic name, and one appointment line." },
        colors: ["#102028", "#d7ece8", "#d4af37"]
      },
      software: {
        title: { ar: "طلبات المواعيد وتشغيل العيادة", en: "Appointment requests and clinic operations" },
        points: {
          ar: ["طلب موعد وحالته", "تذكير يُختبر قبل تفعيله", "مصاريف وموردون تشغيليون", "محتوى تعريفي يعتمد قبل النشر"],
          en: ["An appointment request and its status", "A reminder tested before it is enabled", "Operating expenses and suppliers", "Introductory content approved before it is published"]
        }
      }
    },
    {
      id: "logistics",
      label: { ar: "لوجستيات وتوصيل", en: "Logistics and delivery" },
      script: {
        duration: { ar: "14–20 ثانية", en: "14–20 seconds" },
        hook: { ar: "الشحنة المتأخرة تبدأ من رسالة ضاعت، لا من الطريق.", en: "A late shipment starts with a lost message, not with the road." },
        vo: {
          ar: ["لوحة الحالات: تأكيد، خروج، تسليم.", "ثم مثال حي: مصروف وقود 45 د.ك يُسجل من الرسالة.", "اختم بأن العميل يرى الحالة التالية لا عذراً."],
          en: ["A status board: confirmed, out, delivered.", "Then a live example: a KWD 45 fuel expense captured from a message.", "Close on the customer seeing the next status, not an excuse."]
        },
        onScreen: { ar: "الحالة واضحة · الوقود مسجّل", en: "Status clear · fuel recorded" },
        cta: { ar: "شغّل مكتب الحركة هذا الأسبوع.", en: "Put the dispatch desk live this week." },
        mood: { ar: "إيقاع حركة، لقطات طريق قصيرة، أرقام كبيرة.", en: "A moving pace, short road shots, large figures." }
      },
      cover: {
        kicker: { ar: "غلاف ريل 08", en: "Reel cover 08" },
        title: { ar: "في الطريق. الحالة واضحة.", en: "On the way. Status clear." },
        subtitle: { ar: "خريطة مبسطة بلا ادعاء GPS حي، مع شارة الحالة.", en: "A simplified map with no live-GPS claim, plus a status badge." },
        colors: ["#071018", "#00f0ff", "#d4af37"]
      },
      software: {
        title: { ar: "تنسيق التوصيل ومصاريف الميدان", en: "Delivery coordination and field expenses" },
        points: {
          ar: ["حالات الشحنة بدون تتبع GPS إلا باتفاق منفصل", "مصروف السائق من نص أو صورة إيصال", "عنوان وتأكيد تسليم", "تقرير يومي للحركة والمصاريف"],
          en: ["Shipment states, with live GPS only if separately agreed", "Driver spend from text or a receipt photo", "Address and delivery confirmation", "A daily movement and expense report"]
        }
      }
    }
  ]
};
