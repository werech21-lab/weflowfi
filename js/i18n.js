(function () {
  const dict = {
    ar: {
      "nav.platform": "المنصة",
      "nav.lab": "مختبر المنتجات الحية",
      "nav.command": "غرفة القيادة",
      "nav.launch": "أطلق مشروعك",
      "hero.badge": "حي · حلقة مشاريع مستقلة",
      "hero.sub": "Autonomous AI Venture Studio",
      "hero.lead": "وكلاء يبتكرون المنتج، يبنونه، ويسوّقونه — وأنت ترى الحلقة حية أمامك.",
      "hero.ctaLab": "ادخل المختبر",
      "hero.ctaCmd": "غرفة القيادة",
      "bento.kicker": "المنصة",
      "bento.title": "حلقة واحدة. منتج حي. تسويق ذاتي.",
      "bento.1t": "ديوانية الوكلاء",
      "bento.1d": "طاقم هرمي يبتكر الفرصة، يبني الـ MVP، ويطلق حملة — بدون انتظار سباقات يدوية.",
      "bento.2t": "Foundry",
      "bento.2d": "كل منتج يظهر في المختبر فور توليده.",
      "bento.3t": "Telegram CMD",
      "bento.3d": "/new_venture · /status · /deploy",
      "bento.4t": "Memory Cloud",
      "bento.4d": "ذاكرة إدراكية + دفتر جلسات حي.",
      "bento.5t": "Quality Gate",
      "bento.5d": "لا يُنشر منتج يفشل بوابة الجودة.",
      "lab.kicker": "مختبر المنتجات",
      "lab.title": "مختبر المنتجات الحية",
      "lab.lead": "يُقرأ تلقائياً من مصنع FlowFi — جرّب أي منتج عبر الـ API داخل نافذة أنيقة.",
      "lab.refresh": "تحديث",
      "cmd.kicker": "غرفة القيادة",
      "cmd.title": "غرفة القيادة",
      "cmd.lead": "أرسل طلباً — يصل فوراً إلى تيليجرام ويُحفظ في قاعدة البيانات.",
      "cmd.b1": "إشعار تيليجرام لحظي",
      "cmd.b2": "حفظ سحابي Postgres",
      "cmd.b3": "موافقة صريحة قبل التخزين",
      "form.name": "الاسم",
      "form.company": "الشركة",
      "form.email": "البريد",
      "form.phone": "الهاتف",
      "form.message": "ماذا تريد أن تطلق؟",
      "form.ph": "أتمتة مبيعات + منتج AI…",
      "form.consent": "أوافق على التواصل وحفظ بياناتي في FlowFi.",
      "form.submit": "أرسل لغرفة القيادة",
      "launch.title": "أطلق مشروعك مع FlowFi",
      "launch.lead": "من فكرة إلى منتج حي وحملة — حلقة واحدة مستقلة.",
      "launch.cta": "ابدأ الطلب الآن"
    },
    en: {
      "nav.platform": "Platform",
      "nav.lab": "Live Products Lab",
      "nav.command": "Command Center",
      "nav.launch": "Launch project",
      "hero.badge": "Live · Autonomous venture loop",
      "hero.sub": "Autonomous AI Venture Studio",
      "hero.lead": "Agents invent, build, and market the product — you watch the loop live.",
      "hero.ctaLab": "Enter the lab",
      "hero.ctaCmd": "Command center",
      "bento.kicker": "Platform",
      "bento.title": "One loop. Live product. Self-marketing.",
      "bento.1t": "Agent boardroom",
      "bento.1d": "A hierarchical crew invents the wedge, builds the MVP, and launches — no manual race.",
      "bento.2t": "Foundry",
      "bento.2d": "Every product lands in the lab the moment it ships.",
      "bento.3t": "Telegram CMD",
      "bento.3d": "/new_venture · /status · /deploy",
      "bento.4t": "Memory Cloud",
      "bento.4d": "Cognitive memory + live session ledger.",
      "bento.5t": "Quality Gate",
      "bento.5d": "Nothing ships past a failed quality gate.",
      "lab.kicker": "Live Products Lab",
      "lab.title": "Live Products Lab",
      "lab.lead": "Auto-read from the FlowFi foundry — try any product through the API in a clean modal.",
      "lab.refresh": "Refresh",
      "cmd.kicker": "Command Center",
      "cmd.title": "Command Center",
      "cmd.lead": "Send a request — it hits Telegram instantly and lands in the database.",
      "cmd.b1": "Instant Telegram alert",
      "cmd.b2": "Postgres cloud store",
      "cmd.b3": "Explicit consent before storage",
      "form.name": "Name",
      "form.company": "Company",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.message": "What should we launch?",
      "form.ph": "Sales automation + an AI product…",
      "form.consent": "I consent to contact and storage in FlowFi.",
      "form.submit": "Send to command center",
      "launch.title": "Launch with FlowFi",
      "launch.lead": "From idea to live product and campaign — one autonomous loop.",
      "launch.cta": "Start your request"
    }
  };

  function apply(lang) {
    const pack = dict[lang] || dict.ar;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (pack[key]) el.textContent = pack[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (pack[key]) el.setAttribute("placeholder", pack[key]);
    });
    const toggle = document.getElementById("langToggle");
    if (toggle) toggle.textContent = lang === "ar" ? "EN" : "ع";
    try {
      localStorage.setItem("flowfi.lang.v2", lang);
    } catch (err) {}
    window.FLOWFI_LANG = lang;
  }

  let lang = "ar";
  try {
    lang = localStorage.getItem("flowfi.lang.v2") || "ar";
  } catch (err) {}
  apply(lang);

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        apply((window.FLOWFI_LANG || "ar") === "ar" ? "en" : "ar");
        if (window.lucide) window.lucide.createIcons();
      });
    }
  });

  window.FlowFiI18n = { apply, dict };
})();
