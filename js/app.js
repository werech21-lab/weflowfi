(function () {
  const D = window.FLOWFI;
  const KEYS = {
    lang: "flowfi.lang.v1",
    currency: "flowfi.currency.v1",
    leads: "flowfi.leads.v1",
    pricing: "flowfi.pricing.v1",
    portfolio: "flowfi.portfolio.v1",
    pin: "flowfi.pin.v1",
    session: "flowfi.admin.session.v1",
    draft: "flowfi.draft.v1"
  };
  const SIZE = { solo: 1, team: 1.12, company: 1.28, group: 1.5 };
  const SIZE_M = { solo: 1, team: 1.05, company: 1.12, group: 1.2 };
  const TIME = { flexible: 1, standard: 1.08, priority: 1.22 };
  const COVERS = [
    { c1: "#140e08", c2: "#d4af37", arTitle: "حضورٌ لا يُقلَّد", enTitle: "Presence, not noise", arSub: "9:16 · سطر ذهبي واحد", enSub: "9:16 · one gold line" },
    { c1: "#071018", c2: "#00f0ff", arTitle: "في الطريق. الحالة واضحة.", enTitle: "On the way. Status clear.", arSub: "شارة حالة · بدون ادعاء GPS", enSub: "Status badge · no GPS claim" },
    { c1: "#1a0d0a", c2: "#e7b15a", arTitle: "الليلة على الطاولة", enTitle: "Tonight, at the table", arSub: "طبق واحد · سعر واحد", enSub: "One dish · one price" }
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const state = {
    lang: document.documentElement.lang === "en" ? "en" : "ar",
    currency: "KWD",
    hero: "saas",
    pillar: "saas",
    tg: "text",
    saasTab: "finance",
    cover: 0,
    tracks: new Set(),
    modules: new Set(),
    step: 1,
    filter: "all",
    industry: "",
    menu: false,
    admin: false,
    authed: false,
    adminTab: "leads",
    leadStatus: "all",
    leadQuery: "",
    openLead: "",
    saving: false
  };

  document.documentElement.classList.add("js");

  function t(key) {
    return D.ui[state.lang][key];
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function persist(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function linesOf(text) {
    return String(text || "").split(/\n/).map((line) => line.trim()).filter(Boolean);
  }

  function moneyParts(kwd) {
    const amount = Number(kwd || 0) * D.rates[state.currency];
    const digits = state.currency === "KWD" ? 3 : 2;
    const formatted = amount.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
    const label = D.currencyLabel[state.lang][state.currency];
    return { formatted, label, text: formatted + " " + label };
  }

  function moneyHtml(kwd) {
    const parts = moneyParts(kwd);
    return '<bdi dir="ltr">' + esc(parts.formatted) + "</bdi> " + esc(parts.label);
  }

  function getPin() {
    return localStorage.getItem(KEYS.pin) || "8148";
  }

  function getPricing() {
    const saved = load(KEYS.pricing, null);
    if (!Array.isArray(saved)) return D.pricing.map((item) => JSON.parse(JSON.stringify(item)));
    const map = new Map(saved.map((item) => [item.id, item]));
    return D.pricing.map((base) => {
      const custom = map.get(base.id);
      if (!custom) return JSON.parse(JSON.stringify(base));
      return {
        ...base,
        ...custom,
        name: { ...base.name, ...(custom.name || {}) },
        tagline: { ...base.tagline, ...(custom.tagline || {}) },
        features: {
          ar: (custom.features && custom.features.ar) || base.features.ar,
          en: (custom.features && custom.features.en) || base.features.en
        }
      };
    });
  }

  function getPortfolio() {
    const saved = load(KEYS.portfolio, null);
    return Array.isArray(saved) ? saved : D.portfolio.map((item) => JSON.parse(JSON.stringify(item)));
  }

  function getLeads() {
    const saved = load(KEYS.leads, []);
    return Array.isArray(saved) ? saved : [];
  }

  function setLeads(list) {
    persist(KEYS.leads, list);
  }

  function optionLabel(select) {
    const option = select.options[select.selectedIndex];
    if (!option) return "";
    return option.dataset[state.lang] || option.textContent || "";
  }

  function fillSelectLabels() {
    $$("option[data-ar]").forEach((option) => {
      option.textContent = option.dataset[state.lang] || option.dataset.ar;
    });
  }

  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("is-on");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("is-on"), 3200);
  }

  function setLang(lang) {
    state.lang = lang === "en" ? "en" : "ar";
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem(KEYS.lang, state.lang);
    document.title = state.lang === "ar"
      ? "FlowFi | هندسة SaaS والأتمتة والتسويق"
      : "FlowFi | SaaS Engineering, Automation & Marketing";
    const desc = $("#metaDesc");
    if (desc) {
      desc.setAttribute("content", state.lang === "ar"
        ? "FlowFi من الكويت: هندسة أنظمة SaaS، أتمتة تيليجرام وواتساب، ومحتوى وريلز. نبني البرنامج من الصفر حتى الإطلاق."
        : "FlowFi from Kuwait: SaaS engineering, Telegram and WhatsApp automation, and reels content. Software built from zero to launch.");
    }
    $$("[data-set-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.setLang === state.lang ? "true" : "false");
      button.classList.toggle("is-on", button.dataset.setLang === state.lang);
    });
    fillSelectLabels();
    renderRateNote();
    renderPricing();
    renderModules();
    renderEstimate();
    renderReview();
    renderIndustries();
    if (state.industry) renderStudio(state.industry);
    renderAdmin();
    tickClock();
    const search = $("#leadSearch");
    if (search) search.placeholder = state.lang === "ar" ? "بحث بالاسم أو الرقم" : "Search name or ID";
    if (window.FlowFiDeal) window.FlowFiDeal.refresh();
    if (window.FlowFiAcquire) window.FlowFiAcquire.refresh();
  }

  function renderRateNote() {
    const note = $("#rateNote");
    if (!note) return;
    note.textContent = state.lang === "ar"
      ? "عرض فقط: 1 د.ك = 3.27 USD = 12.26 ر.س. الفاتورة بالدينار ما لم يُتفق على غيره."
      : "Display only: 1 KWD = 3.27 USD = 12.26 SAR. Invoices are in KWD unless agreed otherwise.";
  }

  function setCurrency(code) {
    state.currency = D.rates[code] ? code : "KWD";
    localStorage.setItem(KEYS.currency, state.currency);
    $$("[data-set-currency]").forEach((button) => {
      button.classList.toggle("is-on", button.dataset.setCurrency === state.currency);
      button.setAttribute("aria-pressed", button.dataset.setCurrency === state.currency ? "true" : "false");
    });
    renderRateNote();
    renderPricing();
    renderModules();
    renderEstimate();
    renderReview();
    renderAdmin();
    if (window.FlowFiDeal) window.FlowFiDeal.refresh();
  }

  function setMenu(open) {
    state.menu = open;
    $("#navPanel").classList.toggle("is-open", open);
    $("#menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("lock", open || state.admin);
  }

  function setHero(name) {
    state.hero = name;
    $$("[data-hero]").forEach((button) => {
      const on = button.dataset.hero === name;
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$("[data-hero-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.heroPanel === name);
    });
    if (name === "telegram") setTg(state.tg);
  }

  function setSaasTab(name) {
    state.saasTab = name;
    $$("[data-saas-tab]").forEach((button) => button.classList.toggle("is-on", button.dataset.saasTab === name));
    $$("[data-saas-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.saasPanel !== name;
    });
  }

  function setTg(mode) {
    state.tg = mode;
    $$("[data-tg]").forEach((button) => button.classList.toggle("is-on", button.dataset.tg === mode));
    $$("[data-tg-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.tgPanel !== mode;
    });
    if (mode === "receipt") {
      const scan = $(".scanline");
      if (scan) {
        scan.style.animation = "none";
        void scan.offsetWidth;
        scan.style.animation = "";
      }
    }
  }

  function setPillar(name) {
    state.pillar = name;
    $$("[data-pillar]").forEach((button) => button.classList.toggle("is-on", button.dataset.pillar === name));
    $$(".pillar-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === name));
  }

  function cycleCover() {
    state.cover = (state.cover + 1) % COVERS.length;
    const cover = COVERS[state.cover];
    const poster = $("#heroPoster");
    poster.style.setProperty("--c1", cover.c1);
    poster.style.setProperty("--c2", cover.c2);
    $("#heroPosterTitle").innerHTML = '<span data-lang="ar">' + esc(cover.arTitle) + '</span><span data-lang="en">' + esc(cover.enTitle) + "</span>";
    $("#heroPosterSub").innerHTML = '<span data-lang="ar">' + esc(cover.arSub) + '</span><span data-lang="en">' + esc(cover.enSub) + "</span>";
  }

  function renderIndustries() {
    const root = $("#industryChips");
    root.innerHTML = D.industries.map((item) => {
      const on = item.id === state.industry ? " is-on" : "";
      return '<button type="button" class="chip-btn' + on + '" data-industry="' + esc(item.id) + '">' + esc(item.label[state.lang]) + "</button>";
    }).join("");
  }

  function renderStudio(id) {
    const item = D.industries.find((entry) => entry.id === id);
    const root = $("#studioOutput");
    if (!item) return;
    state.industry = id;
    const lang = state.lang;
    const colors = item.cover.colors.map((color) => '<i style="background:' + esc(color) + '"></i>').join("");
    const vo = item.script.vo[lang].map((line) => "<li>" + esc(line) + "</li>").join("");
    const points = item.software.points[lang].map((line) => "<li>" + esc(line) + "</li>").join("");
    root.innerHTML = ''
      + '<div class="out-grid">'
      + '<article class="out-card poster" style="--c1:' + esc(item.cover.colors[0]) + ';--c2:' + esc(item.cover.colors[1]) + '">'
      + '<div><div class="poster-kicker">' + esc(item.cover.kicker[lang]) + '</div><div class="poster-title">' + esc(item.cover.title[lang]) + "</div></div>"
      + '<div><div class="poster-sub">' + esc(item.cover.subtitle[lang]) + '</div><div class="swatches">' + colors + "</div></div></article>"
      + '<article class="out-card"><p class="eyebrow">' + esc(lang === "ar" ? "سكريبت الريل" : "Reel script") + " · " + esc(item.script.duration[lang]) + "</p>"
      + "<h3>" + esc(item.script.hook[lang]) + "</h3><ol class=\"vo\">" + vo + "</ol>"
      + "<p><strong>" + esc(lang === "ar" ? "على الشاشة: " : "On screen: ") + "</strong>" + esc(item.script.onScreen[lang]) + "</p>"
      + "<p><strong>" + esc(lang === "ar" ? "الدعوة: " : "CTA: ") + "</strong>" + esc(item.script.cta[lang]) + "</p>"
      + '<p class="soft">' + esc(item.script.mood[lang]) + "</p></article>"
      + '<article class="out-card"><p class="eyebrow">' + esc(lang === "ar" ? "النظام المقترح" : "Suggested system") + "</p>"
      + "<h3>" + esc(item.software.title[lang]) + '</h3><ul class="ticks">' + points + "</ul>"
      + '<div class="hero-actions"><button type="button" class="btn btn-line btn-sm" id="copyStudio">' + esc(t("copy")) + '</button>'
      + '<a class="btn btn-gold btn-sm" href="#calculator">' + esc(lang === "ar" ? "حوّله إلى طلب" : "Turn it into a request") + "</a></div></article></div>";
    renderIndustries();
    const copy = $("#copyStudio");
    if (copy) {
      copy.addEventListener("click", async () => {
        const text = [item.label[lang], item.script.hook[lang], item.script.vo[lang].join("\n"), item.script.cta[lang], item.software.title[lang], item.software.points[lang].join("\n")].join("\n\n");
        try {
          await navigator.clipboard.writeText(text);
          toast(t("copied"));
        } catch (err) {
          toast(text.slice(0, 80));
        }
      });
    }
  }

  function renderWork() {
    const root = $("#workGrid");
    const items = getPortfolio().filter((item) => state.filter === "all" || item.category === state.filter);
    const lang = state.lang;
    root.innerHTML = items.map((item) => {
      const points = (item.points[lang] || []).map((point) => "<li>" + esc(point) + "</li>").join("");
      const stack = (item.stack || []).map((bit) => '<span class="mini">' + esc(bit) + "</span>").join("");
      return '<article class="work-card"><p class="work-cat">' + esc(t("cat")[item.category] || item.category) + "</p><h3>"
        + esc(item.title[lang]) + "</h3><p class=\"muted\">" + esc(item.summary[lang]) + '</p><ul class="ticks">'
        + points + '</ul><div class="stack-row">' + stack + "</div></article>";
    }).join("");
  }

  function priceFigure(item) {
    const bits = [];
    if (item.cadence === "month") {
      bits.push('<div class="price-figure">' + moneyHtml(item.monthlyKwd || item.priceKwd) + '</div><div class="soft">' + esc(t("perMonth")) + "</div>");
    } else if (item.cadence === "project") {
      const prefix = item.from ? esc(t("from")) + " " : "";
      bits.push('<div class="price-figure">' + prefix + moneyHtml(item.priceKwd) + "</div>");
      if (Number(item.monthlyKwd) > 0) bits.push('<div class="soft">' + esc(t("support")) + ": " + moneyHtml(item.monthlyKwd) + "</div>");
    } else {
      bits.push('<div class="price-figure">' + moneyHtml(item.setupKwd || item.priceKwd) + '</div><div class="soft">' + esc(t("launch")) + "</div>");
      if (Number(item.monthlyKwd) > 0) bits.push('<div class="soft">+ ' + moneyHtml(item.monthlyKwd) + " " + esc(t("perMonth")) + "</div>");
    }
    return bits.join("");
  }

  function renderPricing() {
    const root = $("#pricingGrid");
    if (!root) return;
    const lang = state.lang;
    root.innerHTML = getPricing().map((item) => {
      const features = (item.features[lang] || []).map((feature) => "<li>" + esc(feature) + "</li>").join("");
      const badge = item.featured ? '<p class="work-cat">' + esc(t("featured")) + "</p>" : '<p class="work-cat">FlowFi</p>';
      return '<article class="price-card' + (item.featured ? " featured" : "") + '">' + badge
        + "<h3>" + esc(item.name[lang]) + '</h3><p class="muted">' + esc(item.tagline[lang]) + "</p>"
        + priceFigure(item) + '<ul class="ticks">' + features + "</ul>"
        + '<button class="btn btn-gold" type="button" data-quote="' + esc(item.quote) + '">'
        + esc(lang === "ar" ? "ابدأ بهذه الباقة" : "Start with this package") + "</button></article>";
    }).join("");
  }

  function selectedModules() {
    return D.modules.filter((item) => state.modules.has(item.id) && state.tracks.has(item.track));
  }

  function profileFactors() {
    const size = $("#clientSize") ? $("#clientSize").value : "solo";
    const timeline = $("#clientTimeline") ? $("#clientTimeline").value : "flexible";
    return {
      size,
      timeline,
      sizeMult: SIZE[size] || 1,
      monthMult: SIZE_M[size] || 1,
      timeMult: TIME[timeline] || 1
    };
  }

  function computeEstimate() {
    const factors = profileFactors();
    const lines = selectedModules().map((item) => {
      const amount = item.monthly
        ? Math.round(item.priceKwd * factors.monthMult)
        : Math.round(item.priceKwd * factors.sizeMult * factors.timeMult);
      return { ...item, amount };
    });
    const once = lines.filter((line) => !line.monthly).reduce((sum, line) => sum + line.amount, 0);
    const monthly = lines.filter((line) => line.monthly).reduce((sum, line) => sum + line.amount, 0);
    return {
      lines,
      onceLow: Math.round(once * 0.92),
      onceHigh: Math.round(once * 1.15),
      monthly
    };
  }

  function renderModules() {
    const root = $("#moduleGrid");
    if (!root) return;
    const lang = state.lang;
    const visible = D.modules.filter((item) => state.tracks.has(item.track));
    if (!visible.length) {
      root.innerHTML = '<p class="muted">' + esc(t("needTrack")) + "</p>";
      return;
    }
    root.innerHTML = visible.map((item) => {
      const checked = state.modules.has(item.id) ? " checked" : "";
      return '<label class="mod"><input type="checkbox" data-module="' + esc(item.id) + '"' + checked + '><span><strong>'
        + esc(item.name[lang]) + '</strong><br><span class="muted">' + esc(item.blurb[lang]) + '</span><br><span class="mod-price">'
        + moneyHtml(item.priceKwd) + " · " + esc(item.monthly ? t("monthlyUnit") : t("onceUnit")) + "</span></span></label>";
    }).join("");
  }

  function renderEstimate() {
    const root = $("#estimateBox");
    if (!root) return;
    const estimate = computeEstimate();
    const lang = state.lang;
    const rows = estimate.lines.length
      ? estimate.lines.map((line) => '<div class="summary-line"><span>' + esc(line.name[lang]) + "</span><strong>" + moneyHtml(line.amount) + "</strong></div>").join("")
      : '<p class="muted">' + esc(t("noLines")) + "</p>";
    const once = estimate.onceHigh
      ? moneyHtml(estimate.onceLow) + " – " + moneyHtml(estimate.onceHigh)
      : "—";
    root.innerHTML = '<p class="eyebrow">' + esc(lang === "ar" ? "التقدير الحي" : "Live estimate") + "</p><h3>"
      + esc(t("estimateOnce")) + "</h3><p class=\"price-figure\">" + once + "</p><p class=\"soft\">"
      + esc(t("estimateMonth")) + ": " + (estimate.monthly ? moneyHtml(estimate.monthly) : "—") + "</p>"
      + rows + '<p class="soft">' + esc(t("planningNote")) + "</p>";
  }

  function renderTracks() {
    $$("[data-track]").forEach((button) => {
      const on = state.tracks.has(button.dataset.track);
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function showStep(step) {
    state.step = step;
    $$("[data-wizard-step]").forEach((panel) => panel.classList.toggle("is-on", Number(panel.dataset.wizardStep) === step));
    $$("[data-step-ind]").forEach((item) => item.classList.toggle("is-on", Number(item.dataset.stepInd) <= step));
    $("#wizBack").hidden = step === 1;
    $$(".when-next").forEach((node) => { node.hidden = step === 4; });
    $$(".when-save").forEach((node) => { node.hidden = step !== 4; });
    $("#wizardError").hidden = true;
    if (step === 4) renderReview();
    persistDraft();
  }

  function renderReview() {
    const root = $("#reviewBox");
    if (!root || state.step !== 4) return;
    const estimate = computeEstimate();
    const lang = state.lang;
    const name = $("#clientName").value.trim();
    const company = $("#clientCompany").value.trim();
    root.innerHTML = "<h3>" + esc(name || "—") + (company ? " · " + esc(company) : "") + "</h3>"
      + "<p>" + esc($("#clientPhone").value.trim()) + " · " + esc($("#clientEmail").value.trim()) + "</p>"
      + "<p>" + esc(optionLabel($("#clientCountry"))) + " · " + esc(optionLabel($("#clientIndustry"))) + "</p>"
      + "<p>" + esc(t("estimateOnce")) + ": " + moneyHtml(estimate.onceLow) + " – " + moneyHtml(estimate.onceHigh) + "</p>"
      + "<p>" + esc(t("estimateMonth")) + ": " + moneyHtml(estimate.monthly) + "</p>"
      + '<p class="soft">' + esc(lang === "ar"
        ? "بالضغط تحفظ الطلب في لوحة هذا المتصفح وتجهّز رسالة واتساب جاهزة للإرسال."
        : "Continue saves the request in this browser's panel and prepares a WhatsApp message.") + "</p>";
  }

  function setFieldError(id, bad) {
    const field = document.getElementById(id);
    if (!field) return;
    field.classList.toggle("is-bad", bad);
    field.setAttribute("aria-invalid", bad ? "true" : "false");
  }

  function validateContact() {
    const name = $("#clientName").value.trim();
    const phone = $("#clientPhone").value.trim();
    const email = $("#clientEmail").value.trim();
    const country = $("#clientCountry").value;
    const nameBad = name.length < 2;
    const phoneBad = !/^[0-9+\s()-]{8,}$/.test(phone);
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const countryBad = !country;
    setFieldError("clientName", nameBad);
    setFieldError("clientPhone", phoneBad);
    setFieldError("clientEmail", emailBad);
    setFieldError("clientCountry", countryBad);
    return !(nameBad || phoneBad || emailBad || countryBad);
  }

  function showWizardError(key) {
    const node = $("#wizardError");
    node.hidden = false;
    node.textContent = t(key);
  }

  function buildMessage(lead) {
    if (lead.briefText) return lead.briefText;
    const lang = lead.lang || state.lang;
    const labels = D.ui[lang];
    const lines = (lead.lines || []).map((line) => "- " + (line.name[lang] || line.name.ar) + ": " + line.amountText).join("\n");
    if (lang === "ar") {
      return [
        "طلب مشروع FlowFi | weflowfi.com",
        "الرقم: " + lead.id,
        "",
        "الاسم: " + lead.name,
        "الشركة: " + (lead.company || "—"),
        "الهاتف: " + lead.phone,
        "البريد: " + lead.email,
        "الدولة: " + lead.country,
        "المجال: " + lead.industry,
        "الحجم: " + lead.size,
        "الإيقاع: " + lead.timeline,
        "التواصل: " + lead.contactVia,
        "",
        "الوحدات:",
        lines || "—",
        "",
        labels.estimateOnce + ": " + lead.onceText,
        labels.estimateMonth + ": " + lead.monthText,
        "العملة المعروضة: " + lead.currency,
        "",
        "الملاحظات:",
        lead.notes || "—",
        "",
        "أُرسل من حاسبة weflowfi.com"
      ].join("\n");
    }
    return [
      "FlowFi project request | weflowfi.com",
      "ID: " + lead.id,
      "",
      "Name: " + lead.name,
      "Company: " + (lead.company || "—"),
      "Phone: " + lead.phone,
      "Email: " + lead.email,
      "Country: " + lead.country,
      "Industry: " + lead.industry,
      "Size: " + lead.size,
      "Pace: " + lead.timeline,
      "Contact: " + lead.contactVia,
      "",
      "Modules:",
      lines || "—",
      "",
      labels.estimateOnce + ": " + lead.onceText,
      labels.estimateMonth + ": " + lead.monthText,
      "Display currency: " + lead.currency,
      "",
      "Notes:",
      lead.notes || "—",
      "",
      "Sent from the weflowfi.com calculator"
    ].join("\n");
  }

  function linksFor(lead) {
    const message = buildMessage(lead);
    const wa = lead.waText || message;
    return {
      message,
      whatsapp: "https://wa.me/" + D.contact.whatsapp + "?text=" + encodeURIComponent(wa),
      telegram: "https://t.me/share/url?url=" + encodeURIComponent(D.contact.site) + "&text=" + encodeURIComponent(wa),
      email: "mailto:" + D.contact.email + "?cc=" + encodeURIComponent(D.contact.emailCc || "") + "&subject=" + encodeURIComponent("FlowFi " + lead.id) + "&body=" + encodeURIComponent(message)
    };
  }

  function actionButtons(lead) {
    const links = linksFor(lead);
    return '<a class="btn btn-gold btn-sm" target="_blank" rel="noopener noreferrer" href="' + esc(links.whatsapp) + '">' + esc(t("whatsapp")) + "</a>"
      + '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" href="' + esc(links.telegram) + '">' + esc(t("telegram")) + "</a>"
      + '<a class="btn btn-line btn-sm" href="' + esc(links.email) + '">' + esc(t("email")) + "</a>"
      + '<button type="button" class="btn btn-line btn-sm" data-copy-lead="' + esc(lead.id) + '">' + esc(t("copy")) + "</button>";
  }

  function submitLead() {
    if (state.saving) return;
    if ($("#hp").value.trim()) {
      $("#wizardSuccess").hidden = false;
      $("#wizardNav").hidden = true;
      $$(".wizard-step").forEach((panel) => panel.classList.remove("is-on"));
      return;
    }
    state.saving = true;
    try {
    const estimate = computeEstimate();
    const stamp = new Date();
    const id = "FF-" + stamp.getFullYear() + String(stamp.getMonth() + 1).padStart(2, "0") + String(stamp.getDate()).padStart(2, "0") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    const lead = {
      id,
      createdAt: stamp.toISOString(),
      lang: state.lang,
      currency: state.currency,
      name: $("#clientName").value.trim(),
      company: $("#clientCompany").value.trim(),
      phone: $("#clientPhone").value.trim(),
      email: $("#clientEmail").value.trim(),
      country: optionLabel($("#clientCountry")),
      industry: optionLabel($("#clientIndustry")),
      size: optionLabel($("#clientSize")),
      timeline: optionLabel($("#clientTimeline")),
      contactVia: optionLabel($("#clientContact")),
      notes: $("#clientNotes").value.trim(),
      internalNote: "",
      status: "new",
      tracks: Array.from(state.tracks),
      lines: estimate.lines.map((line) => ({
        id: line.id,
        name: line.name,
        monthly: line.monthly,
        amountKwd: line.amount,
        amountText: moneyParts(line.amount).text
      })),
      onceLowKwd: estimate.onceLow,
      onceHighKwd: estimate.onceHigh,
      monthlyKwd: estimate.monthly,
      onceText: moneyParts(estimate.onceLow).text + " – " + moneyParts(estimate.onceHigh).text,
      monthText: moneyParts(estimate.monthly).text
    };
    const leads = getLeads();
    leads.unshift(lead);
    setLeads(leads);
    sessionStorage.removeItem(KEYS.draft);
    state.lastLead = lead;
    $("#successId").textContent = lead.id;
    $("#successActions").innerHTML = actionButtons(lead) + '<button type="button" class="btn btn-line btn-sm" id="newQuote">' + esc(t("newQuote")) + "</button>";
    $$(".wizard-step").forEach((panel) => panel.classList.remove("is-on"));
    $("#wizardNav").hidden = true;
    $("#wizardSuccess").hidden = false;
    toast(t("quoteReady"));
    const again = $("#newQuote");
    if (again) again.addEventListener("click", resetWizard);
    } finally {
      state.saving = false;
    }
  }

  function resetWizard() {
    state.tracks = new Set();
    state.modules = new Set();
    state.saving = false;
    $("#wizardForm").reset();
    fillSelectLabels();
    $("#wizardSuccess").hidden = true;
    $("#wizardNav").hidden = false;
    renderTracks();
    renderModules();
    renderEstimate();
    showStep(1);
  }

  function onNext() {
    if (state.step === 1) {
      if (!state.tracks.size) return showWizardError("needTrack");
      renderModules();
      return showStep(2);
    }
    if (state.step === 2) {
      if (!selectedModules().length) return showWizardError("needModule");
      return showStep(3);
    }
    if (state.step === 3) {
      if (!validateContact()) return showWizardError("needContact");
      return showStep(4);
    }
    submitLead();
  }

  function startQuote(tracks) {
    state.tracks = new Set(tracks);
    state.modules = new Set();
    $("#wizardSuccess").hidden = true;
    $("#wizardNav").hidden = false;
    renderTracks();
    renderModules();
    renderEstimate();
    showStep(2);
    document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
  }

  function persistDraft() {
    if (!$("#clientName")) return;
    const draft = {
      tracks: Array.from(state.tracks),
      modules: Array.from(state.modules),
      step: state.step,
      fields: {
        clientName: $("#clientName").value,
        clientCompany: $("#clientCompany").value,
        clientPhone: $("#clientPhone").value,
        clientEmail: $("#clientEmail").value,
        clientCountry: $("#clientCountry").value,
        clientIndustry: $("#clientIndustry").value,
        clientSize: $("#clientSize").value,
        clientTimeline: $("#clientTimeline").value,
        clientContact: $("#clientContact").value,
        clientNotes: $("#clientNotes").value
      }
    };
    sessionStorage.setItem(KEYS.draft, JSON.stringify(draft));
  }

  function restoreDraft() {
    try {
      const raw = sessionStorage.getItem(KEYS.draft);
      if (!raw) return;
      const draft = JSON.parse(raw);
      state.tracks = new Set(draft.tracks || []);
      state.modules = new Set(draft.modules || []);
      Object.entries(draft.fields || {}).forEach(([id, value]) => {
        const field = document.getElementById(id);
        if (field) field.value = value;
      });
      renderTracks();
      renderModules();
      renderEstimate();
      showStep(draft.step || 1);
    } catch (err) {
      sessionStorage.removeItem(KEYS.draft);
    }
  }

  function formatWhen(iso) {
    try {
      return new Intl.DateTimeFormat(state.lang === "ar" ? "ar-KW" : "en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kuwait"
      }).format(new Date(iso));
    } catch (err) {
      return iso;
    }
  }

  function filteredLeads() {
    const query = state.leadQuery.trim().toLowerCase();
    return getLeads().filter((lead) => {
      if (state.leadStatus !== "all" && lead.status !== state.leadStatus) return false;
      if (!query) return true;
      return [lead.id, lead.name, lead.company, lead.phone, lead.email, lead.service, lead.idea, lead.briefText].join(" ").toLowerCase().includes(query);
    });
  }

  function renderAdmin() {
    if (!state.admin || !state.authed) return;
    renderLeadStats();
    renderStatusFilters();
    renderLeads();
    if (state.adminTab === "pricing") renderPricingEditor();
    if (state.adminTab === "work") renderWorkAdmin();
  }

  function renderLeadStats() {
    const leads = getLeads();
    const counts = { all: leads.length, new: 0, reviewing: 0, building: 0, done: 0 };
    leads.forEach((lead) => { if (counts[lead.status] != null) counts[lead.status] += 1; });
    const order = ["all", "new", "reviewing", "building", "done"];
    $("#leadStats").innerHTML = order.map((key) => {
      const label = key === "all" ? t("all") : t("status")[key];
      return "<div><strong>" + counts[key] + "</strong><span>" + esc(label) + "</span></div>";
    }).join("");
  }

  function renderStatusFilters() {
    const keys = ["all", "new", "reviewing", "building", "done"];
    $("#statusFilters").innerHTML = keys.map((key) => {
      const label = key === "all" ? t("filterAll") : t("status")[key];
      return '<button type="button" data-lead-status="' + key + '"' + (state.leadStatus === key ? ' class="is-on"' : "") + ">" + esc(label) + "</button>";
    }).join("");
  }

  function renderLeads() {
    const root = $("#leadList");
    const leads = filteredLeads();
    if (!leads.length) {
      root.innerHTML = '<div class="empty-studio"><p>' + esc(state.leadQuery || state.leadStatus !== "all" ? t("emptySearch") : t("emptyLeads")) + "</p></div>";
      return;
    }
    root.innerHTML = leads.map((lead) => {
      const open = state.openLead === lead.id;
      const options = Object.keys(t("status")).map((key) => {
        return '<option value="' + key + '"' + (lead.status === key ? " selected" : "") + ">" + esc(t("status")[key]) + "</option>";
      }).join("");
      const detail = open ? leadDetail(lead) : "";
      return '<article class="lead"><div class="lead-top"><div class="lead-main"><strong>' + esc(lead.name) + "</strong><span dir=\"ltr\">" + esc(lead.id) + "</span><span class=\"soft\">"
        + esc(formatWhen(lead.createdAt)) + " · " + esc(lead.company || lead.phone) + '</span></div><div class="row-actions"><select class="status-select" data-status-for="'
        + esc(lead.id) + '">' + options + '</select><button type="button" class="btn btn-line btn-sm" data-open-lead="' + esc(lead.id) + '">'
        + esc(open ? (state.lang === "ar" ? "إخفاء" : "Hide") : (state.lang === "ar" ? "التفاصيل" : "Details")) + "</button></div></div>" + detail + "</article>";
    }).join("");
  }

  function leadDetail(lead) {
    const lang = state.lang;
    const note = '<label class="field"><span>' + esc(lang === "ar" ? "ملاحظة داخلية" : "Internal note") + '</span><textarea data-internal="' + esc(lead.id) + '">' + esc(lead.internalNote || "") + "</textarea></label>";
    const actions = '<div class="row-actions">' + actionButtons(lead) + '<button type="button" class="btn btn-line btn-sm" data-delete-lead="' + esc(lead.id) + '">' + esc(lang === "ar" ? "حذف" : "Delete") + "</button></div>";
    if (lead.briefText || lead.transcript) {
      const scope = (lead.scope && (lead.scope[lang] || lead.scope.ar)) || [];
      const scopeHtml = scope.length ? '<ul class="ticks">' + scope.map((item) => "<li>" + esc(item) + "</li>").join("") + "</ul>" : "";
      const transcript = (lead.transcript || []).map((entry) => {
        const who = entry.role === "agent" ? "FlowFi" : (lead.name || "Client");
        const text = entry[lang] || entry.ar || entry.en || entry.text || "";
        return '<p class="transcript-line"><strong>' + esc(who) + "</strong><br>" + esc(text) + "</p>";
      }).join("");
      const service = (lead.serviceLabel && (lead.serviceLabel[lang] || lead.serviceLabel.ar)) || lead.service || "";
      const timeline = (lead.timelineLabel && (lead.timelineLabel[lang] || lead.timelineLabel.ar)) || lead.timeline || "";
      const channels = lead.channels ? '<p class="soft">' + esc(Object.entries(lead.channels).map(([key, value]) => key + ": " + value).join(" · ")) + "</p>" : "";
      return '<div class="detail"><p>' + esc(lead.phone || "") + " · " + esc(lead.email || "") + "</p><p>" + esc(service) + "</p><p>" + esc(lead.budgetText || "") + "</p><p>" + esc(timeline) + "</p>" + scopeHtml + '<div class="transcript">' + transcript + "</div>" + channels + note + actions + "</div>";
    }
    const lines = lead.lines || [];
    return '<div class="detail"><p>' + esc(lead.email || "") + " · " + esc(lead.country || "") + " · " + esc(lead.industry || "") + "</p><p>"
      + esc(lead.size || "") + " · " + esc(lead.timeline || "") + "</p><p>" + esc(t("estimateOnce")) + ": " + esc(lead.onceText || "—") + "</p><p>"
      + esc(t("estimateMonth")) + ": " + esc(lead.monthText || "—") + '</p><ul class="ticks">'
      + lines.map((line) => "<li>" + esc((line.name && (line.name[lang] || line.name.ar)) || "") + " — " + esc(line.amountText || "") + "</li>").join("")
      + "</ul><p>" + esc(lead.notes || "—") + "</p>" + note + actions + "</div>";
  }

  function renderPricingEditor() {
    const lang = state.lang;
    $("#pricingEditor").innerHTML = getPricing().map((item) => {
      return '<form class="editor-card" data-price-id="' + esc(item.id) + '"><h3>' + esc(item.name[lang]) + "</h3><div class=\"fields\">"
        + numField("priceKwd", lang === "ar" ? "سعر العرض" : "Display price", item.priceKwd)
        + numField("setupKwd", lang === "ar" ? "سعر الإطلاق" : "Launch price", item.setupKwd)
        + numField("monthlyKwd", lang === "ar" ? "السعر الشهري" : "Monthly price", item.monthlyKwd)
        + '<label class="field"><span>' + esc(lang === "ar" ? "الاسم بالعربية" : "Arabic name") + '</span><input data-f="nameAr" value="' + esc(item.name.ar) + '"></label>'
        + '<label class="field"><span>' + esc(lang === "ar" ? "الاسم بالإنجليزية" : "English name") + '</span><input data-f="nameEn" value="' + esc(item.name.en) + '"></label>'
        + '<label class="field full"><span>' + esc(lang === "ar" ? "الوصف بالعربية" : "Arabic line") + '</span><textarea data-f="tagAr">' + esc(item.tagline.ar) + "</textarea></label>"
        + '<label class="field full"><span>' + esc(lang === "ar" ? "الوصف بالإنجليزية" : "English line") + '</span><textarea data-f="tagEn">' + esc(item.tagline.en) + "</textarea></label>"
        + '<label class="field"><span>' + esc(lang === "ar" ? "المزايا العربية" : "Arabic features") + '</span><textarea data-f="featAr">' + esc((item.features.ar || []).join("\n")) + "</textarea></label>"
        + '<label class="field"><span>' + esc(lang === "ar" ? "المزايا الإنجليزية" : "English features") + '</span><textarea data-f="featEn">' + esc((item.features.en || []).join("\n")) + "</textarea></label>"
        + '<label class="field"><span><input type="checkbox" data-f="from"' + (item.from ? " checked" : "") + "> " + esc(t("from")) + "</span></label>"
        + '<label class="field"><span><input type="checkbox" data-f="featured"' + (item.featured ? " checked" : "") + "> " + esc(t("featured")) + "</span></label>"
        + "</div></form>";
    }).join("");
  }

  function numField(name, label, value) {
    return '<label class="field"><span>' + esc(label) + '</span><input data-f="' + name + '" type="number" min="0" step="1" value="' + esc(value || 0) + '"></label>';
  }

  function savePricing() {
    const next = getPricing().map((item) => {
      const card = document.querySelector('[data-price-id="' + item.id + '"]');
      if (!card) return item;
      const read = (name) => card.querySelector('[data-f="' + name + '"]');
      const priceKwd = Number(read("priceKwd").value);
      const setupKwd = Number(read("setupKwd").value);
      const monthlyKwd = Number(read("monthlyKwd").value);
      if ([priceKwd, setupKwd, monthlyKwd].some((num) => Number.isNaN(num) || num < 0)) return null;
      return {
        ...item,
        priceKwd,
        setupKwd,
        monthlyKwd,
        from: read("from").checked,
        featured: read("featured").checked,
        name: { ar: read("nameAr").value.trim() || item.name.ar, en: read("nameEn").value.trim() || item.name.en },
        tagline: { ar: read("tagAr").value.trim(), en: read("tagEn").value.trim() },
        features: { ar: linesOf(read("featAr").value), en: linesOf(read("featEn").value) }
      };
    });
    if (next.some((item) => !item)) return toast(t("priceInvalid"));
    persist(KEYS.pricing, next);
    renderPricing();
    toast(t("pricingSaved"));
  }

  function clearWorkForm() {
    $("#workForm").reset();
    $("#workId").value = "";
  }

  function renderWorkAdmin() {
    const lang = state.lang;
    $("#workAdminList").innerHTML = getPortfolio().map((item) => {
      return '<article class="lead"><div class="lead-top"><div><strong>' + esc(item.title[lang]) + '</strong><div class="soft">' + esc(item.category) + "</div></div>"
        + '<div class="row-actions"><button type="button" class="btn btn-line btn-sm" data-edit-work="' + esc(item.id) + '">' + esc(lang === "ar" ? "تعديل" : "Edit") + "</button>"
        + '<button type="button" class="btn btn-line btn-sm" data-delete-work="' + esc(item.id) + '">' + esc(lang === "ar" ? "حذف" : "Delete") + "</button></div></div></article>";
    }).join("");
  }

  function saveWork(event) {
    event.preventDefault();
    const titleAr = $("#workTitleAr").value.trim();
    const titleEn = $("#workTitleEn").value.trim();
    if (!titleAr || !titleEn) return toast(t("workNeedTitle"));
    const id = $("#workId").value || ("work-" + Date.now().toString(36));
    const item = {
      id,
      category: $("#workCat").value,
      title: { ar: titleAr, en: titleEn },
      summary: { ar: $("#workSumAr").value.trim(), en: $("#workSumEn").value.trim() },
      points: { ar: linesOf($("#workPointsAr").value), en: linesOf($("#workPointsEn").value) },
      stack: $("#workStack").value.split(",").map((bit) => bit.trim()).filter(Boolean)
    };
    const list = getPortfolio();
    const index = list.findIndex((entry) => entry.id === id);
    if (index >= 0) list[index] = item;
    else list.unshift(item);
    persist(KEYS.portfolio, list);
    clearWorkForm();
    renderWork();
    renderWorkAdmin();
    toast(t("workSaved"));
  }

  function editWork(id) {
    const item = getPortfolio().find((entry) => entry.id === id);
    if (!item) return;
    $("#workId").value = item.id;
    $("#workCat").value = item.category;
    $("#workTitleAr").value = item.title.ar || "";
    $("#workTitleEn").value = item.title.en || "";
    $("#workSumAr").value = item.summary.ar || "";
    $("#workSumEn").value = item.summary.en || "";
    $("#workPointsAr").value = (item.points.ar || []).join("\n");
    $("#workPointsEn").value = (item.points.en || []).join("\n");
    $("#workStack").value = (item.stack || []).join(", ");
    $("#workForm").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function updateLead(id, mutate) {
    const leads = getLeads();
    const lead = leads.find((entry) => entry.id === id);
    if (!lead) return;
    mutate(lead);
    setLeads(leads);
    renderAdmin();
  }

  function showAdminApp() {
    state.authed = true;
    $("#adminGate").hidden = true;
    $("#adminApp").hidden = false;
    $("#pinHint").hidden = Boolean(localStorage.getItem(KEYS.pin));
    setAdminTab(state.adminTab);
  }

  function openAdmin() {
    state.admin = true;
    $("#admin").classList.add("is-open");
    setMenu(false);
    document.body.classList.add("lock");
    const sessionOk = sessionStorage.getItem(KEYS.session) === "ok";
    $("#pinHint").hidden = Boolean(localStorage.getItem(KEYS.pin));
    if (sessionOk) showAdminApp();
    else {
      state.authed = false;
      $("#adminGate").hidden = false;
      $("#adminApp").hidden = true;
      setTimeout(() => $("#pinInput").focus(), 40);
    }
  }

  function closeAdmin() {
    state.admin = false;
    $("#admin").classList.remove("is-open");
    document.body.classList.remove("lock");
  }

  function setAdminTab(tab) {
    state.adminTab = tab;
    $$("[data-admin-tab]").forEach((button) => button.classList.toggle("is-on", button.dataset.adminTab === tab));
    $$("[data-admin-view]").forEach((view) => view.classList.toggle("is-on", view.dataset.adminView === tab));
    renderAdmin();
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    toast(t("exported"));
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
  }

  function exportCsv() {
    const header = ["id", "createdAt", "name", "phone", "email", "service", "status", "budget", "timeline", "idea"];
    const rows = getLeads().map((lead) => [lead.id, lead.createdAt, lead.name, lead.phone, lead.email, (lead.serviceLabel && lead.serviceLabel.ar) || lead.service || lead.industry, lead.status, lead.budgetText || lead.onceText, (lead.timelineLabel && lead.timelineLabel.ar) || lead.timeline, lead.idea || lead.notes].map(csvCell).join(","));
    download("flowfi-leads.csv", [header.join(",")].concat(rows).join("\n"), "text/csv");
  }

  function tickClock() {
    const node = $("#kwClock");
    if (!node) return;
    node.textContent = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: "Asia/Kuwait"
    }).format(new Date());
  }

  function spyNav() {
    let current = "";
    $$("#navPanel a[href^='#']").forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target || target.offsetParent === null) return;
      if (target.getBoundingClientRect().top < 180) current = id;
    });
    $$("#navPanel a[href^='#']").forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === "#" + current);
    });
  }

  function applyHash() {
    const id = location.hash.replace("#", "");
    if (!id) return;
    if (id === "admin") return openAdmin();
    if (id === "saas" || id === "automation" || id === "marketing") setPillar(id);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bind() {
    document.addEventListener("click", (event) => {
      const lang = event.target.closest("[data-set-lang]");
      if (lang) setLang(lang.dataset.setLang);
      const currency = event.target.closest("[data-set-currency]");
      if (currency) setCurrency(currency.dataset.setCurrency);
      const hero = event.target.closest("[data-hero]");
      if (hero) setHero(hero.dataset.hero);
      const saas = event.target.closest("[data-saas-tab]");
      if (saas) setSaasTab(saas.dataset.saasTab);
      const tg = event.target.closest("[data-tg]");
      if (tg) setTg(tg.dataset.tg);
      const pillar = event.target.closest("[data-pillar]");
      if (pillar) {
        setPillar(pillar.dataset.pillar);
        history.replaceState(null, "", "#" + pillar.dataset.pillar);
      }
      const track = event.target.closest("[data-track]");
      if (track) {
        const id = track.dataset.track;
        if (state.tracks.has(id)) state.tracks.delete(id);
        else state.tracks.add(id);
        Array.from(state.modules).forEach((moduleId) => {
          const module = D.modules.find((item) => item.id === moduleId);
          if (module && !state.tracks.has(module.track)) state.modules.delete(moduleId);
        });
        renderTracks();
        renderModules();
        renderEstimate();
        persistDraft();
      }
      const quote = event.target.closest("[data-quote]");
      if (quote) {
        const map = {
          marketing: ["marketing"],
          automation: ["automation"],
          software: ["software"],
          full: ["software", "automation", "marketing"]
        };
        startQuote(map[quote.dataset.quote] || ["software"]);
      }
      const industry = event.target.closest("[data-industry]");
      if (industry) renderStudio(industry.dataset.industry);
      const filter = event.target.closest("[data-filter]");
      if (filter) {
        state.filter = filter.dataset.filter;
        $$("[data-filter]").forEach((button) => button.classList.toggle("is-on", button.dataset.filter === state.filter));
        renderWork();
      }
      if (event.target.closest("[data-open-admin]")) openAdmin();
      if (event.target.closest("[data-close-admin]")) closeAdmin();
      const adminTab = event.target.closest("[data-admin-tab]");
      if (adminTab) setAdminTab(adminTab.dataset.adminTab);
      const leadStatus = event.target.closest("[data-lead-status]");
      if (leadStatus) {
        state.leadStatus = leadStatus.dataset.leadStatus;
        renderAdmin();
      }
      const openLead = event.target.closest("[data-open-lead]");
      if (openLead) {
        state.openLead = state.openLead === openLead.dataset.openLead ? "" : openLead.dataset.openLead;
        renderLeads();
      }
      const copyLead = event.target.closest("[data-copy-lead]");
      if (copyLead) {
        const lead = getLeads().find((entry) => entry.id === copyLead.dataset.copyLead) || state.lastLead;
        if (!lead) return;
        navigator.clipboard.writeText(buildMessage(lead)).then(() => toast(t("copied"))).catch(() => toast(t("copied")));
      }
      const removeLead = event.target.closest("[data-delete-lead]");
      if (removeLead && window.confirm(t("confirmDelete"))) {
        setLeads(getLeads().filter((lead) => lead.id !== removeLead.dataset.deleteLead));
        state.openLead = "";
        renderAdmin();
        toast(t("deleted"));
      }
      const edit = event.target.closest("[data-edit-work]");
      if (edit) editWork(edit.dataset.editWork);
      const removeWork = event.target.closest("[data-delete-work]");
      if (removeWork && window.confirm(t("confirmDelete"))) {
        persist(KEYS.portfolio, getPortfolio().filter((item) => item.id !== removeWork.dataset.deleteWork));
        renderWork();
        renderWorkAdmin();
        toast(t("deleted"));
      }
      const navLink = event.target.closest("#navPanel a");
      if (navLink) setMenu(false);
    });

    document.addEventListener("change", (event) => {
      const moduleBox = event.target.closest("[data-module]");
      if (moduleBox) {
        if (moduleBox.checked) state.modules.add(moduleBox.dataset.module);
        else state.modules.delete(moduleBox.dataset.module);
        renderEstimate();
        if (state.step === 4) renderReview();
        persistDraft();
      }
      if (event.target.matches("#clientSize, #clientTimeline, #clientIndustry, #clientCountry, #clientContact")) {
        renderEstimate();
        if (state.step === 4) renderReview();
        persistDraft();
      }
      const status = event.target.closest("[data-status-for]");
      if (status) updateLead(status.dataset.statusFor, (lead) => { lead.status = status.value; });
    });

    document.addEventListener("input", (event) => {
      if (event.target.matches("#clientName, #clientCompany, #clientPhone, #clientEmail, #clientNotes")) persistDraft();
      if (event.target.id === "leadSearch") {
        state.leadQuery = event.target.value;
        renderLeads();
      }
    });

    document.addEventListener("focusout", (event) => {
      const note = event.target.closest("[data-internal]");
      if (!note) return;
      const leads = getLeads();
      const lead = leads.find((entry) => entry.id === note.dataset.internal);
      if (!lead) return;
      const value = note.value.trim();
      if ((lead.internalNote || "") === value) return;
      lead.internalNote = value;
      setLeads(leads);
      toast(t("internalSaved"));
    });

    const wizard = $("#wizardForm");
    if (wizard) {
      wizard.addEventListener("submit", (event) => {
        event.preventDefault();
        onNext();
      });
      $("#wizBack").addEventListener("click", () => {
        if (state.step > 1) showStep(state.step - 1);
      });
    }
    $("#menuBtn").addEventListener("click", () => setMenu(!state.menu));
    $("#cycleCover").addEventListener("click", cycleCover);
    $("#adminGate").addEventListener("submit", (event) => {
      event.preventDefault();
      const value = $("#pinInput").value.trim();
      if (value && value === getPin()) {
        sessionStorage.setItem(KEYS.session, "ok");
        $("#pinInput").value = "";
        $("#pinError").hidden = true;
        showAdminApp();
      } else {
        $("#pinError").hidden = false;
        $("#pinError").textContent = t("pinWrong");
        toast(t("pinWrong"));
      }
    });
    const savePricingBtn = $("#savePricing");
    if (savePricingBtn) savePricingBtn.addEventListener("click", savePricing);
    $("#workForm").addEventListener("submit", saveWork);
    $("#workCancel").addEventListener("click", clearWorkForm);
    $("#savePin").addEventListener("click", () => {
      const first = $("#newPin").value.trim();
      const second = $("#newPin2").value.trim();
      if (first.length < 4) return toast(t("pinShort"));
      if (first !== second) return toast(t("pinMismatch"));
      localStorage.setItem(KEYS.pin, first);
      $("#newPin").value = "";
      $("#newPin2").value = "";
      $("#pinHint").hidden = true;
      toast(t("pinChanged"));
    });
    $("#exportJson").addEventListener("click", () => download("flowfi-leads.json", JSON.stringify(getLeads(), null, 2), "application/json"));
    $("#exportCsv").addEventListener("click", exportCsv);
    $("#resetDefaults").addEventListener("click", () => {
      if (!window.confirm(t("confirmReset"))) return;
      localStorage.removeItem(KEYS.pricing);
      localStorage.removeItem(KEYS.portfolio);
      renderPricing();
      renderWork();
      renderAdmin();
      toast(t("resetDone"));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (state.admin) closeAdmin();
        else setMenu(false);
      }
    });
    window.addEventListener("hashchange", applyHash);
    window.addEventListener("scroll", () => {
      if (spyNav.frame) return;
      spyNav.frame = requestAnimationFrame(() => {
        spyNav();
        spyNav.frame = 0;
      });
    }, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((node) => observer.observe(node));
  }

  function init() {
    const storedCurrency = localStorage.getItem(KEYS.currency);
    state.currency = D.rates[storedCurrency] ? storedCurrency : "KWD";
    $("#year").textContent = String(new Date().getFullYear());
    setLang(state.lang);
    setCurrency(state.currency);
    setHero("saas");
    setSaasTab("finance");
    setTg("text");
    setPillar("saas");
    renderWork();
    renderIndustries();
    if ($("#wizardForm")) {
      restoreDraft();
      if (!sessionStorage.getItem(KEYS.draft)) showStep(1);
    }
    window.FlowFiRoom = {
      refresh: renderAdmin,
      toast,
      lang: function () { return state.lang; },
      currency: function () { return state.currency; }
    };
    bind();
    tickClock();
    setInterval(tickClock, 30000);
    spyNav();
    if (location.hash) applyHash();
  }

  init();
})();
