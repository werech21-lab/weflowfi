(function () {
  const TOKEN = "8924237619:AAG6_Jk0hWDFO8hv5rF2qZWj3XJM4iug8_A";
  const CHAT_ID = "8342451016";
  const EMAIL = "senshy1500@gmail.com";
  const INBOXES = ["senshy1500@gmail.com", "werech21@gmail.com"];
  const WHATSAPP = "96597378148";
  const LEADS = "flowfi.leads.v1";
  const HOOK = "flowfi.webhook.v1";
  const DRAFT = "flowfi.agent.v1";

  const $ = (id) => document.getElementById(id);
  const lang = () => (document.documentElement.lang === "en" ? "en" : "ar");
  const currency = () => (window.FlowFiRoom && window.FlowFiRoom.currency()) || localStorage.getItem("flowfi.currency.v1") || "KWD";
  const rates = () => window.FLOWFI.rates;
  const say = (ar, en) => (lang() === "ar" ? ar : en);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));

  const session = {
    step: "service",
    services: [],
    idea: "",
    answers: { features: [], autoCaps: [], marketingBits: ["copy", "covers", "video"] },
    phased: false,
    quote: null,
    contact: { name: "", phone: "", email: "" },
    messages: [],
    busy: false,
    sending: false
  };

  const SERVICE = {
    saas: { ar: "برمجة نظام SaaS أو برنامج خاص", en: "Custom SaaS or software" },
    automation: { ar: "أتمتة أعمال وبوتات ذكية", en: "Automation and smart bots" },
    marketing: { ar: "تسويق وكتابة وتصميم ريلز وفيديو", en: "Marketing, copy, reels, and video" },
    mixed: { ar: "النظام + الأتمتة + التسويق معاً", en: "Software, automation, and marketing together" }
  };
  const SCALE = {
    solo: { ar: "مؤسس أو نشاط فردي", en: "Founder or solo" },
    team: { ar: "فريق صغير", en: "Small team" },
    company: { ar: "شركة", en: "Company" },
    group: { ar: "مجموعة أو عدة فروع", en: "Group or several branches" }
  };
  const FEATURES = {
    billing: { add: 700, ar: "اشتراكات وحسابات متعددة", en: "Subscriptions and accounts" },
    dashboards: { add: 360, ar: "لوحات مالية وتشغيلية", en: "Finance and operations dashboards" },
    payments: { add: 280, ar: "دفع: KNET أو MyFatoorah أو Stripe", en: "Payments: KNET, MyFatoorah, or Stripe" },
    mobile: { add: 420, ar: "تجربة جوال", en: "Mobile experience" },
    roles: { add: 180, ar: "صلاحيات وأدوار", en: "Roles and permissions" },
    intel: { add: 620, ar: "استخبارات سوق من مصادر علنية", en: "Market intelligence from public sources" },
    branches: { add: 260, ar: "تعدد فروع", en: "Multiple branches" }
  };
  const CAPS = {
    wa: { add: 170, ar: "واتساب ضمن النطاق", en: "WhatsApp within scope" },
    voice: { add: 90, ar: "رسائل صوتية", en: "Voice notes" },
    receipt: { add: 120, ar: "صور فواتير وإيصالات", en: "Receipt and invoice images" },
    ledger: { add: 150, ar: "مبيعات ومصاريف وفواتير", en: "Sales, expenses, and invoices" },
    stock: { add: 140, ar: "مخزون وموردون", en: "Inventory and suppliers" },
    sheets: { add: 100, ar: "Excel أو Google Sheets", en: "Excel or Google Sheets" },
    agents: { add: 540, ar: "وكلاء لمهام محددة مع مراجعة", en: "Agents for defined tasks, with review" }
  };
  const BITS = {
    copy: { ar: "كتابة المحتوى والنصوص البيعية", en: "Copy and sales scripts" },
    covers: { ar: "تصميم أغلفة الريلز والبوستات", en: "Reel covers and posts" },
    video: { ar: "إنتاج ومونتاج الفيديو القصير", en: "Short-video production and edit" }
  };

  function has(service) {
    return session.services.includes(service);
  }

  function money(kwd) {
    const code = rates()[currency()] ? currency() : "KWD";
    const amount = Number(kwd || 0) * rates()[code];
    const digits = code === "KWD" ? 3 : 2;
    const formatted = amount.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return formatted + " " + window.FLOWFI.currencyLabel[lang()][code];
  }

  function kwd(n) {
    return Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " د.ك";
  }

  function wait(ms) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return new Promise((resolve) => setTimeout(resolve, reduce ? 0 : ms));
  }

  function saveSession() {
    const copy = JSON.parse(JSON.stringify(session));
    delete copy.busy;
    delete copy.sending;
    sessionStorage.setItem(DRAFT, JSON.stringify(copy));
  }

  function push(role, ar, en) {
    session.messages.push({ role, ar, en: en || ar });
  }

  function clientLabel(ar, en) {
    push("client", ar, en || ar);
  }

  function questions() {
    return {
      idea: {
        ar: "صف الفكرة كما تريدها، حتى لو كانت كبيرة أو غير تقليدية. ماذا يجب أن يشتغل في أول نسخة؟",
        en: "Describe the idea as you want it, even if it is large or unusual. What must work in the first version?"
      },
      scale: {
        ar: "ما حجم التشغيل الذي سيُبنى النظام أو البوت من أجله؟",
        en: "What size of operation should the system or bot be built for?"
      },
      features: {
        ar: "ما الذي يلزم في النسخة الأولى من البرنامج؟ اختر ما تحتاجه ثم اضغط متابعة. الأساس يكفي إذا لم تختر شيئاً.",
        en: "What does the first software release need? Choose what you need, then continue. The base is enough if you choose nothing."
      },
      channels: {
        ar: "أين يعمل المساعد؟ تيليجرام مشمول في الأساس.",
        en: "Where should the assistant work? Telegram is included in the base."
      },
      caps: {
        ar: "ماذا يجب أن يفهم ويسجّل؟ اختر ثم تابع.",
        en: "What should it understand and record? Choose, then continue."
      },
      reels: {
        ar: "كم فيديو قصير / ريل تريد إنتاجه في الشهر؟",
        en: "How many short videos or reels should be produced each month?"
      },
      bits: {
        ar: "ماذا يشمل عمل المحتوى؟ اختر ثم تابع.",
        en: "What should the content work include? Choose, then continue."
      },
      horizon: {
        ar: "لأي مدة تريد محرك المحتوى؟",
        en: "How long should the content engine run?"
      },
      market: {
        ar: "أين السوق الذي نكتب له النظام أو المحتوى؟",
        en: "Which market is the system or the content for?"
      },
      pace: {
        ar: "ما الإيقاع المناسب؟ الأولوية ترفع التقدير لأنها تضغط التنفيذ.",
        en: "What pace fits? Priority raises the estimate because it compresses delivery."
      }
    };
  }

  function calculate() {
    const answers = session.answers;
    const scale = answers.scale || "team";
    const pace = answers.pace || "standard";
    const paceMul = { flexible: 1, standard: 1.08, rush: 1.26 }[pace] || 1;
    let low = 0;
    let high = 0;
    let mLow = 0;
    let mHigh = 0;
    const scopeAr = [];
    const scopeEn = [];
    if (session.idea) {
      scopeAr.push("الفكرة: " + session.idea);
      scopeEn.push("Idea: " + session.idea);
    }
    if (has("saas")) {
      const base = { solo: [1100, 1700], team: [2000, 3200], company: [3600, 5600], group: [6200, 9800] }[scale];
      low += base[0];
      high += base[1];
      scopeAr.push("بناء النظام من الصفر حتى إطلاق النسخة الأولى");
      scopeEn.push("Build the system from zero through the first release");
      (answers.features || []).forEach((id) => {
        const feature = FEATURES[id];
        if (!feature) return;
        low += feature.add;
        high += feature.add;
        scopeAr.push(feature.ar);
        scopeEn.push(feature.en);
      });
    }
    if (has("automation")) {
      const base = { solo: [520, 780], team: [780, 1200], company: [1100, 1700], group: [1600, 2400] }[scale];
      low += base[0];
      high += base[1];
      scopeAr.push("مساعد تشغيلي يسجّل العمل من المحادثة، وتيليجرام مشمول");
      scopeEn.push("An operations assistant that records work from chat, with Telegram included");
      const selected = new Set(answers.autoCaps || []);
      if (answers.channels === "wa" || answers.channels === "both") selected.add("wa");
      selected.forEach((id) => {
        const cap = CAPS[id];
        if (!cap) return;
        low += cap.add;
        high += cap.add;
        scopeAr.push(cap.ar);
        scopeEn.push(cap.en);
      });
    }
    if (has("marketing")) {
      const bands = { 4: [210, 290], 8: [340, 460], 12: [490, 660], 20: [760, 1040] };
      const band = bands[answers.reels || 8];
      let monthlyLow = band[0];
      let monthlyHigh = band[1];
      const bits = new Set(answers.marketingBits || ["copy", "covers", "video"]);
      if (!bits.has("video")) {
        monthlyLow *= 0.58;
        monthlyHigh *= 0.58;
      }
      const horizon = { month: 1, quarter: 0.93, retainer: 0.88 }[answers.horizon || "month"] || 1;
      mLow += Math.round(monthlyLow * horizon);
      mHigh += Math.round(monthlyHigh * horizon);
      scopeAr.push("محتوى وريلز: " + (answers.reels || 8) + " في الشهر");
      scopeEn.push("Content and reels: " + (answers.reels || 8) + " per month");
      bits.forEach((id) => {
        if (!BITS[id]) return;
        scopeAr.push(BITS[id].ar);
        scopeEn.push(BITS[id].en);
      });
    }
    low = Math.round(low * paceMul);
    high = Math.round(high * paceMul);
    if (session.phased && (low || high)) {
      low = Math.round(low * 0.55);
      high = Math.round(high * 0.68);
      scopeAr.unshift("هذه المرحلة الأولى فقط، وباقي البناء بعد إطلاقها");
      scopeEn.unshift("This is phase one only; the rest of the build follows after it ships");
    }
    return {
      low, high, mLow, mHigh,
      weeks: weeksFor(scale, pace),
      scopeAr, scopeEn, scale, pace,
      market: answers.market || "kw",
      phased: session.phased,
      services: session.services.slice()
    };
  }

  function weeksFor(scale, pace) {
    if (has("marketing") && !has("saas") && !has("automation")) {
      return { ar: "يبدأ خلال 7 أيام، ثم تسليم شهري", en: "Starts within 7 days, then monthly delivery" };
    }
    const table = has("saas")
      ? { flexible: [8, 14], standard: [6, 10], rush: [4, 7] }
      : { flexible: [3, 6], standard: [2, 4], rush: [1, 3] };
    const pair = table[pace] || table.standard;
    const bump = has("saas") && (scale === "company" || scale === "group") ? 2 : 0;
    const min = Math.max(1, (session.phased ? Math.round(pair[0] * 0.6) : pair[0]) + (session.phased ? 0 : bump));
    const max = Math.max(min + 1, (session.phased ? Math.round(pair[1] * 0.65) : pair[1]) + (session.phased ? 0 : bump));
    if (has("marketing")) {
      return {
        ar: min + "–" + max + " أسابيع للبناء، والمحتوى يبدأ خلال الأسبوع الأول",
        en: min + "–" + max + " weeks for the build, with content starting in the first week"
      };
    }
    return { ar: min + "–" + max + " أسابيع", en: min + "–" + max + " weeks" };
  }

  function serviceLine() {
    return session.services.map((id) => SERVICE[id] || SERVICE.mixed).filter(Boolean);
  }

  function quoteText(quote) {
    const once = quote.low || quote.high
      ? say("تنفيذ تقديري: ", "Build estimate: ") + money(quote.low) + " – " + money(quote.high)
      : "";
    const monthly = quote.mLow || quote.mHigh
      ? say("شهري تقديري: ", "Monthly estimate: ") + money(quote.mLow) + " – " + money(quote.mHigh)
      : "";
    const kwdLine = say("بالدينار، وهو أساس الاتفاق: ", "In dinars, the basis of the agreement: ")
      + (quote.low || quote.high ? kwd(quote.low) + " – " + kwd(quote.high) : "")
      + (quote.mLow || quote.mHigh ? (quote.low ? " + " : "") + kwd(quote.mLow) + " – " + kwd(quote.mHigh) + say(" شهرياً", " / month") : "");
    const head = session.phased
      ? say("هذه مرحلة أولى أخف. الباقي يُسعَّر بعد أن تشتغل النسخة.", "This is a lighter first phase. The rest is priced after that version is working.")
      : say("هذا نطاق تقديري حسب ما وصفته، لا خصماً ولا فاتورة.", "This is an estimate from what you described, not a charge and not an invoice.");
    return [head, once, monthly, kwdLine, say("المدة: ", "Timeline: ") + quote.weeks[lang()], say("إذا ناسبك النطاق اضغط أوافق. إذا كان أثقل من اللازم نبدأ بمرحلة أولى، أو اكتب ميزانيتك.", "If the scope fits, press agree. If it is heavier than you want, start with phase one, or type your budget.")]
      .filter(Boolean).join("\n");
  }

  function renderQuote(quote) {
    return esc(quoteText(quote));
  }

  function showTyping(on) {
    const node = $("agentTyping");
    if (node) node.hidden = !on;
  }

  function render() {
    const log = $("agentLog");
    const choices = $("agentChoices");
    const compose = $("agentCompose");
    if (!log || !choices || !compose) return;
    log.innerHTML = session.messages.map((message) => {
      const text = message.kind === "quote" ? renderQuote(message.quote) : esc(message[lang()] || message.ar || "");
      return '<div class="msg ' + message.role + '">' + text + "</div>";
    }).join("") + '<div class="msg agent typing" id="agentTyping" hidden>' + esc(say("يكتب…", "Writing…")) + "</div>";
    choices.innerHTML = choiceHtml();
    const input = $("agentInput");
    const textSteps = { idea: true, offer: true };
    compose.hidden = !textSteps[session.step];
    if (input) {
      input.placeholder = session.step === "offer"
        ? say("اكتب ميزانيتك أو ما تريد تعديله", "Type a budget or what you want changed")
        : say("اكتب فكرتك هنا", "Describe the idea here");
    }
    log.scrollTop = log.scrollHeight;
    saveSession();
  }

  function chip(action, value, ar, en, on) {
    return '<button type="button" class="choice-chip' + (on ? " is-on" : "") + '" data-agent="' + esc(action) + '" data-value="' + esc(value) + '">' + esc(say(ar, en)) + "</button>";
  }

  function choiceHtml() {
    const answers = session.answers;
    if (session.step === "service") {
      return ["saas", "automation", "marketing", "mixed"].map((id) => chip("service", id, SERVICE[id].ar, SERVICE[id].en, false)).join("");
    }
    if (session.step === "scale") {
      return Object.keys(SCALE).map((id) => chip("scale", id, SCALE[id].ar, SCALE[id].en, answers.scale === id)).join("");
    }
    if (session.step === "features") {
      const picked = new Set(answers.features || []);
      return Object.keys(FEATURES).map((id) => chip("toggle", "features:" + id, FEATURES[id].ar, FEATURES[id].en, picked.has(id))).join("")
        + chip("continue", "features", "متابعة", "Continue", false);
    }
    if (session.step === "channels") {
      return [
        chip("channels", "tg", "تيليجرام", "Telegram", answers.channels === "tg"),
        chip("channels", "wa", "واتساب", "WhatsApp", answers.channels === "wa"),
        chip("channels", "both", "الاثنان", "Both", answers.channels === "both")
      ].join("");
    }
    if (session.step === "caps") {
      const picked = new Set(answers.autoCaps || []);
      return Object.keys(CAPS).filter((id) => id !== "wa").map((id) => chip("toggle", "autoCaps:" + id, CAPS[id].ar, CAPS[id].en, picked.has(id))).join("")
        + chip("continue", "caps", "متابعة", "Continue", false);
    }
    if (session.step === "reels") {
      return [4, 8, 12, 20].map((count) => chip("reels", String(count), count + " ريلز", count + " reels", Number(answers.reels) === count)).join("");
    }
    if (session.step === "bits") {
      const picked = new Set(answers.marketingBits || []);
      return Object.keys(BITS).map((id) => chip("toggle", "marketingBits:" + id, BITS[id].ar, BITS[id].en, picked.has(id))).join("")
        + chip("continue", "bits", "متابعة", "Continue", false);
    }
    if (session.step === "horizon") {
      return [
        chip("horizon", "month", "شهر واحد", "One month", answers.horizon === "month"),
        chip("horizon", "quarter", "ثلاثة أشهر", "Three months", answers.horizon === "quarter"),
        chip("horizon", "retainer", "شراكة مستمرة", "Ongoing partner", answers.horizon === "retainer")
      ].join("");
    }
    if (session.step === "market") {
      return [
        chip("market", "kw", "الكويت", "Kuwait", answers.market === "kw"),
        chip("market", "gcc", "الخليج", "The Gulf", answers.market === "gcc"),
        chip("market", "us", "الولايات المتحدة", "United States", answers.market === "us"),
        chip("market", "global", "عالمي", "Worldwide", answers.market === "global")
      ].join("");
    }
    if (session.step === "pace") {
      return [
        chip("pace", "flexible", "مرن", "Flexible", answers.pace === "flexible"),
        chip("pace", "standard", "معتاد", "Standard", answers.pace === "standard"),
        chip("pace", "rush", "أولوية", "Priority", answers.pace === "rush")
      ].join("");
    }
    if (session.step === "offer") {
      const phase = session.phased || !(session.quote && (session.quote.low || session.quote.high))
        ? ""
        : chip("phase", "1", "ابدأ بمرحلة أولى أخف", "Start with a lighter first phase", false);
      return chip("agree", "1", "أوافق على هذا النطاق", "I agree to this scope", false) + phase;
    }
    if (session.step === "contact") {
      return '<div class="contact-card"><div class="fields">'
        + field("dealName", say("الاسم", "Name"), session.contact.name, "text")
        + field("dealPhone", say("واتساب / هاتف", "WhatsApp / phone"), session.contact.phone, "tel")
        + field("dealEmail", say("البريد", "Email"), session.contact.email, "email")
        + "</div>" + chip("save-contact", "1", "متابعة إلى الاتفاق", "Continue to the agreement", false) + "</div>";
    }
    if (session.step === "confirm") {
      return chip("confirm", "1", "تأكيد الاتفاق وإرسال الطلب", "Confirm and send the order", false);
    }
    if (session.step === "done") {
      return chip("restart", "1", "اتفاق جديد", "New agreement", false);
    }
    return "";
  }

  function field(id, label, value, type) {
    return '<label class="field"><span>' + esc(label) + '</span><input id="' + id + '" type="' + type + '" value="' + esc(value) + '" maxlength="120"></label>';
  }

  function nextStep(current) {
    const order = ["service", "idea", "scale", "features", "channels", "caps", "reels", "bits", "horizon", "market", "pace", "offer"];
    const need = {
      scale: () => has("saas") || has("automation"),
      features: () => has("saas"),
      channels: () => has("automation"),
      caps: () => has("automation"),
      reels: () => has("marketing"),
      bits: () => has("marketing"),
      horizon: () => has("marketing"),
      market: () => true,
      pace: () => true,
      offer: () => true
    };
    const index = order.indexOf(current);
    for (let i = index + 1; i < order.length; i += 1) {
      if (!need[order[i]] || need[order[i]]()) return order[i];
    }
    return "offer";
  }

  async function enter(step) {
    if (session.busy) return;
    session.busy = true;
    session.step = step;
    render();
    showTyping(true);
    await wait(380);
    showTyping(false);
    if (step === "offer") {
      session.quote = calculate();
      session.messages.push({ role: "agent", kind: "quote", quote: session.quote, ar: quoteText(session.quote), en: quoteText(session.quote) });
    } else {
      const prompt = questions()[step];
      if (prompt) push("agent", prompt.ar, prompt.en);
    }
    session.busy = false;
    render();
  }

  function detectServices(text) {
    const value = text.toLowerCase();
    const found = [];
    if (/saas|نظام|تطبيق|برنامج|منصة|موقع|app|platform|software/.test(value)) found.push("saas");
    if (/أتمت|بوت|تيليجرام|واتساب|telegram|whatsapp|automation|bot/.test(value)) found.push("automation");
    if (/ريل|محتوى|فيديو|تسويق|تصميم|reel|content|video|marketing/.test(value)) found.push("marketing");
    return found;
  }

  function onChoice(action, value) {
    if (session.busy || session.sending) return;
    if (action === "toggle") {
      const parts = value.split(":");
      const list = new Set(session.answers[parts[0]] || []);
      if (list.has(parts[1])) list.delete(parts[1]);
      else list.add(parts[1]);
      session.answers[parts[0]] = Array.from(list);
      render();
      return;
    }
    if (action === "continue") {
      clientLabel(say("تم الاختيار", "Selection done"), "Selection done");
      enter(nextStep(session.step));
      return;
    }
    if (action === "service") {
      session.services = value === "mixed" ? ["saas", "automation", "marketing"] : [value];
      clientLabel(SERVICE[value].ar, SERVICE[value].en);
      enter("idea");
      return;
    }
    if (action === "scale") {
      session.answers.scale = value;
      clientLabel(SCALE[value].ar, SCALE[value].en);
      enter(nextStep("scale"));
      return;
    }
    if (action === "channels") {
      session.answers.channels = value;
      const labels = { tg: ["تيليجرام", "Telegram"], wa: ["واتساب", "WhatsApp"], both: ["تيليجرام وواتساب", "Telegram and WhatsApp"] };
      clientLabel(labels[value][0], labels[value][1]);
      enter(nextStep("channels"));
      return;
    }
    if (action === "reels") {
      session.answers.reels = Number(value);
      clientLabel(value + " ريلز شهرياً", value + " reels a month");
      enter(nextStep("reels"));
      return;
    }
    if (action === "horizon") {
      session.answers.horizon = value;
      const labels = { month: ["شهر واحد", "One month"], quarter: ["ثلاثة أشهر", "Three months"], retainer: ["شراكة مستمرة", "Ongoing partner"] };
      clientLabel(labels[value][0], labels[value][1]);
      enter(nextStep("horizon"));
      return;
    }
    if (action === "market") {
      session.answers.market = value;
      const labels = { kw: ["الكويت", "Kuwait"], gcc: ["الخليج", "The Gulf"], us: ["الولايات المتحدة", "United States"], global: ["عالمي", "Worldwide"] };
      clientLabel(labels[value][0], labels[value][1]);
      enter(nextStep("market"));
      return;
    }
    if (action === "pace") {
      session.answers.pace = value;
      const labels = { flexible: ["إيقاع مرن", "Flexible pace"], standard: ["إيقاع معتاد", "Standard pace"], rush: ["أولوية", "Priority"] };
      clientLabel(labels[value][0], labels[value][1]);
      enter("offer");
      return;
    }
    if (action === "phase") {
      session.phased = true;
      clientLabel("أريد مرحلة أولى أخف", "I want a lighter first phase");
      enter("offer");
      return;
    }
    if (action === "agree") {
      clientLabel("أوافق على هذا النطاق", "I agree to this scope");
      session.step = "contact";
      push("agent", "ممتاز. أحتاج الاسم ورقم الواتساب والبريد لنكتب الاتفاق ونرسله.", "Good. I need a name, WhatsApp number, and email so the agreement can be written and sent.");
      render();
      return;
    }
    if (action === "save-contact") saveContact();
    if (action === "confirm") confirmOrder();
    if (action === "restart") restart();
  }

  function saveContact() {
    const name = ($("dealName") && $("dealName").value.trim()) || "";
    const phone = ($("dealPhone") && $("dealPhone").value.trim()) || "";
    const email = ($("dealEmail") && $("dealEmail").value.trim()) || "";
    session.contact = { name, phone, email };
    const badName = name.length < 2;
    const badPhone = !/^[0-9+\s()-]{8,}$/.test(phone);
    const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    ["dealName", "dealPhone", "dealEmail"].forEach((id) => {
      const node = $(id);
      if (!node) return;
      const bad = (id === "dealName" && badName) || (id === "dealPhone" && badPhone) || (id === "dealEmail" && badEmail);
      node.classList.toggle("is-bad", bad);
    });
    if (badName || badPhone || badEmail) {
      if (window.FlowFiRoom) window.FlowFiRoom.toast(say("أكمل الاسم ورقم الواتساب والبريد.", "Add a name, WhatsApp number, and email."));
      return;
    }
    clientLabel(name + " · " + phone, name + " · " + phone);
    session.quote = calculate();
    session.step = "confirm";
    push("agent", summaryFor(session.quote, session.contact).ar, summaryFor(session.quote, session.contact).en);
    render();
  }

  function summaryFor(quote, contact) {
    const services = serviceLine().map((item) => item.ar).join(" + ");
    const servicesEn = serviceLine().map((item) => item.en).join(" + ");
    const budget = budgetLine(quote);
    return {
      ar: "ملخص الاتفاق قبل الإرسال\n" + contact.name + " · " + contact.phone + "\n" + services + "\n" + budget.ar + "\n" + quote.weeks.ar + "\nإذا كان هذا هو الاتفاق، أكّد الإرسال.",
      en: "Agreement summary before sending\n" + contact.name + " · " + contact.phone + "\n" + servicesEn + "\n" + budget.en + "\n" + quote.weeks.en + "\nConfirm to send this agreement."
    };
  }

  function budgetLine(quote) {
    const onceAr = quote.low || quote.high ? "التنفيذ: " + kwd(quote.low) + " – " + kwd(quote.high) : "";
    const onceEn = quote.low || quote.high ? "Build: " + kwd(quote.low) + " – " + kwd(quote.high) : "";
    const monthAr = quote.mLow || quote.mHigh ? "الشهري: " + kwd(quote.mLow) + " – " + kwd(quote.mHigh) : "";
    const monthEn = quote.mLow || quote.mHigh ? "Monthly: " + kwd(quote.mLow) + " – " + kwd(quote.mHigh) : "";
    const shown = [money(quote.low), quote.high ? "– " + money(quote.high) : ""].join(" ");
    return {
      ar: [onceAr, monthAr, "العرض بعملة الصفحة: " + shown].filter(Boolean).join("\n"),
      en: [onceEn, monthEn, "On-page currency: " + shown].filter(Boolean).join("\n"),
      text: [onceAr, monthAr].filter(Boolean).join(" | ")
    };
  }

  function onText(text) {
    const value = text.trim();
    if (!value || session.busy || session.sending) return;
    if (session.step === "service") {
      const found = detectServices(value);
      if (!found.length) {
        clientLabel(value, value);
        push("agent", "اختر واحداً من الأزرار، أو اكتب مثلاً: نظام، بوت، أو ريلز.", "Choose one of the buttons, or write something like: system, bot, or reels.");
        render();
        return;
      }
      session.services = found.length > 1 ? ["saas", "automation", "marketing"] : found;
      clientLabel(value, value);
      enter("idea");
      return;
    }
    if (session.step === "idea") {
      if (value.length < 8) {
        clientLabel(value, value);
        push("agent", "زد سطرين عن المطلوب حتى يكون التقدير عادلاً.", "Add a little more detail so the estimate is fair.");
        render();
        return;
      }
      session.idea = value;
      clientLabel(value, value);
      enter(nextStep("idea"));
      return;
    }
    if (session.step === "offer") {
      clientLabel(value, value);
      negotiate(value);
    }
  }

  function negotiate(text) {
    const normalized = text.toLowerCase();
    const amount = (text.match(/(\d[\d,]*)/) || [])[1];
    const number = amount ? Number(amount.replace(/,/g, "")) : 0;
    const code = rates()[currency()] ? currency() : "KWD";
    const asKwd = number ? number / rates()[code] : 0;
    if (/موافق|تمام|نكمل|أوافق|agree|yes|ok|deal/.test(normalized) && !number) {
      onChoice("agree", "1");
      return;
    }
    if (/مرحلة|أخف|غالي|أقل|خصم|phase|lower|cheaper|expensive/.test(normalized) && !session.phased) {
      session.phased = true;
      enter("offer");
      return;
    }
    if (asKwd && session.quote) {
      const floor = Math.round(session.quote.low * (session.phased ? 1 : 0.55));
      if (asKwd + 1 >= session.quote.low) {
        push("agent", "الميزانية التي كتبتها تقع داخل النطاق أو فوقه. اضغط أوافق لنثبت الاتفاق.", "The budget you typed sits inside or above the range. Press agree to lock the agreement.");
        render();
        return;
      }
      if (asKwd >= floor) {
        session.phased = true;
        push("agent", "نقدر نبدأ بمرحلة أولى قريبة من هذا الرقم، وهذا هو الشكل الأخف.", "We can start with a first phase close to that figure. This is the lighter shape.");
        enter("offer");
        return;
      }
      push("agent", "أصغر مرحلة يمكن بناؤها بمسؤولية تبدأ من " + kwd(floor) + ". نقدر نثبتها كمرحلة أولى، أو نضيق الميزات.", "The smallest phase that can be built responsibly starts at " + kwd(floor) + ". We can lock that as phase one, or narrow the features.");
      render();
      return;
    }
    session.idea = session.idea ? session.idea + "\n" + text : text;
    enter("offer");
  }

  function brief(order) {
    const services = (order.serviceLabel && order.serviceLabel.ar) || "";
    const scope = (order.scope && order.scope.ar || []).map((line) => "- " + line).join("\n");
    const budget = order.budgetText;
    return [
      "🔔 طلب مشروع جديد من موقع WeFlowFi!",
      "رقم الطلب: " + order.id,
      "",
      "👤 الاسم: " + order.name,
      "📱 التواصل: " + order.phone,
      "✉️ الإيميل: " + order.email,
      "",
      "🛠 نوع الخدمة: " + services,
      "📋 تفاصيل الاتفاق والمواصفات:",
      scope || "-",
      "",
      "💰 الميزانية المتفق عليها:",
      budget,
      "⏱ المدة الزمنية: " + ((order.timelineLabel && order.timelineLabel.ar) || ""),
      "",
      "المحادثة مختصرة في غرفة الطلبات على الموقع."
    ].join("\n");
  }

  function waBrief(order) {
    return [
      "طلب FlowFi " + order.id,
      order.name + " | " + order.phone + " | " + order.email,
      (order.serviceLabel && order.serviceLabel.ar) || "",
      order.budgetText,
      (order.timelineLabel && order.timelineLabel.ar) || "",
      (order.scope && order.scope.ar || []).slice(0, 8).map((line) => "- " + line).join("\n")
    ].filter(Boolean).join("\n");
  }

  function chunks(text, size) {
    const parts = [];
    let rest = text;
    while (rest.length > size) {
      let cut = rest.lastIndexOf("\n", size);
      if (cut < size * 0.5) cut = size;
      parts.push(rest.slice(0, cut));
      rest = rest.slice(cut).trim();
    }
    if (rest) parts.push(rest);
    return parts;
  }

  async function sendTelegram(text) {
    const url = "https://api.telegram.org/bot" + TOKEN + "/sendMessage";
    for (const part of chunks(text, 3500)) {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({ chat_id: CHAT_ID, text: part })
      });
    }
    return "sent";
  }

  async function sendEmail(order) {
    const emails = order.notifyEmails && order.notifyEmails.length ? order.notifyEmails : INBOXES;
    const results = await Promise.all(emails.map((address) => sendEmailTo(address, order)));
    if (results.every((item) => item === "sent")) return "sent";
    if (results.some((item) => item === "sent" || item === "unconfirmed")) return "unconfirmed";
    return "failed";
  }

  function mailHref(order) {
    const recipients = order.notifyEmails && order.notifyEmails.length ? order.notifyEmails : INBOXES;
    const body = String(order.briefText || "").slice(0, 1400);
    return "mailto:" + recipients.join(",") + "?subject=" + encodeURIComponent("طلب WeFlowFi — " + (order.id || "new")) + "&body=" + encodeURIComponent(body);
  }

  function openMailbox(order) {
    const href = mailHref(order);
    const link = document.createElement("a");
    link.href = href;
    document.body.appendChild(link);
    link.click();
    link.remove();
    return href;
  }

  async function sendEmailTo(address, order) {
    const payload = {
      _subject: "طلب مشروع جديد من WeFlowFi — " + order.id,
      _template: "box",
      _captcha: "false",
      _replyto: order.email || EMAIL,
      name: order.name,
      phone: order.phone,
      email: order.email || "",
      service: (order.serviceLabel && order.serviceLabel.ar) || order.service || "",
      budget: order.budgetText || "",
      timeline: (order.timelineLabel && order.timelineLabel.ar) || order.timeline || "",
      message: order.briefText || ""
    };
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + address, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        if (data && (data.success === false || data.success === "false")) return "unconfirmed";
        return "sent";
      }
    } catch (err) {
      /* The JSON endpoint is blocked or down. The form post is the backup. */
    }
    try {
      await fetch("https://formsubmit.co/" + address, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload)
      });
      return "unconfirmed";
    } catch (err) {
      return "failed";
    }
  }

  function saveLead(order) {
    const leads = readLeads();
    leads.unshift(order);
    localStorage.setItem(LEADS, JSON.stringify(leads));
    if (window.FlowFiRoom) window.FlowFiRoom.refresh();
    return order;
  }

  async function notify(order) {
    const emails = Array.isArray(order.notifyEmails) && order.notifyEmails.length ? order.notifyEmails : INBOXES;
    const settled = await Promise.allSettled([
      sendTelegram(order.briefText || ""),
      sendWebhook(order)
    ].concat(emails.map((address) => sendEmailTo(address, order))));
    const telegram = settled[0].status === "fulfilled" ? "sent" : "failed";
    const webhook = settled[1].status === "fulfilled" ? settled[1].value : "failed";
    const emailStates = settled.slice(2).map((item) => item.status === "fulfilled" ? item.value : "failed");
    const email = emailStates.every((item) => item === "sent") ? "sent"
      : emailStates.some((item) => item === "sent" || item === "unconfirmed") ? "unconfirmed"
      : "failed";
    return { telegram, email, emailStates, webhook };
  }

  async function sendWebhook(order) {
    const hook = localStorage.getItem(HOOK);
    if (!hook) return "skipped";
    const response = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    if (!response.ok) throw new Error("webhook");
    return "sent";
  }

  function readLeads() {
    try {
      const parsed = JSON.parse(localStorage.getItem(LEADS));
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  async function confirmOrder() {
    if (session.sending || !session.quote) return;
    session.sending = true;
    push("client", "أؤكد الاتفاق وأرسل الطلب", "I confirm and send the order");
    render();
    const quote = session.quote;
    const budget = budgetLine(quote);
    const servicesAr = serviceLine().map((item) => item.ar).join(" + ");
    const servicesEn = serviceLine().map((item) => item.en).join(" + ");
    const stamp = new Date();
    const preview = {
      id: "FF-" + stamp.getFullYear() + String(stamp.getMonth() + 1).padStart(2, "0") + String(stamp.getDate()).padStart(2, "0") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
      name: session.contact.name,
      phone: session.contact.phone,
      email: session.contact.email,
      serviceLabel: { ar: servicesAr, en: servicesEn },
      scope: { ar: quote.scopeAr, en: quote.scopeEn },
      budgetText: budget.text,
      timelineLabel: quote.weeks
    };
    preview.briefText = brief(preview);
    preview.waText = waBrief(preview);
    preview.notifyEmails = INBOXES.slice();
    const waUrl = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(preview.waText);
    const mail = openMailbox(preview);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    const order = {
      id: preview.id,
      createdAt: stamp.toISOString(),
      lang: lang(),
      currency: currency(),
      name: session.contact.name,
      phone: session.contact.phone,
      email: session.contact.email,
      company: "",
      service: session.services.join("+"),
      serviceLabel: { ar: servicesAr, en: servicesEn },
      idea: session.idea,
      scope: { ar: quote.scopeAr, en: quote.scopeEn },
      quote: { low: quote.low, high: quote.high, mLow: quote.mLow, mHigh: quote.mHigh, phased: quote.phased },
      budgetText: budget.text,
      timelineLabel: quote.weeks,
      timeline: quote.weeks.ar,
      transcript: session.messages.map((message) => ({ role: message.role, ar: message.ar || "", en: message.en || "" })),
      status: "new",
      channels: { room: "saved", telegram: "pending", email: "pending", whatsapp: "pending", webhook: "pending" },
      internalNote: "",
      notifyEmails: INBOXES.slice()
    };
    order.briefText = brief(order);
    order.waText = waBrief(order);
    const leads = readLeads();
    leads.unshift(order);
    localStorage.setItem(LEADS, JSON.stringify(leads));
    if (window.FlowFiRoom) window.FlowFiRoom.refresh();

    const channels = { room: "saved", telegram: "sent", email: "sent", whatsapp: "opened", webhook: "skipped" };
    const [telegramResult, emailResult, webhookResult] = await Promise.allSettled([
      sendTelegram(order.briefText),
      sendEmail(order),
      sendWebhook(order)
    ]);
    if (telegramResult.status === "rejected") channels.telegram = "failed";
    if (emailResult.status === "fulfilled") channels.email = emailResult.value;
    else channels.email = "failed";
    if (webhookResult.status === "fulfilled") channels.webhook = webhookResult.value;
    else channels.webhook = "failed";
    order.channels = channels;
    const saved = readLeads();
    const index = saved.findIndex((item) => item.id === order.id);
    if (index >= 0) saved[index] = order;
    localStorage.setItem(LEADS, JSON.stringify(saved));
    if (window.FlowFiRoom) window.FlowFiRoom.refresh();

    session.step = "done";
    session.sending = false;
    const emailWord = channels.email === "sent"
      ? "تم عبر FormSubmit، وفُتح تطبيق البريد أيضاً"
      : "فُتح تطبيق البريد على هذا الجهاز بالرسالة جاهزة. FormSubmit لم يؤكد (" + channels.email + ")";
    const emailWordEn = channels.email === "sent"
      ? "sent through FormSubmit, and the mail app opened too"
      : "the mail app opened on this device with the message ready. FormSubmit did not confirm (" + channels.email + ")";
    push("agent",
      "تم تثبيت الاتفاق " + order.id + ".\nالغرفة: محفوظ\nتيليجرام: " + (channels.telegram === "sent" ? "تم" : "تعذر") + "\nالبريد: " + emailWord + "\nواتساب: فُتحت الرسالة",
      "Agreement " + order.id + " is locked.\nRoom: saved\nTelegram: " + channels.telegram + "\nEmail: " + emailWordEn + "\nWhatsApp: opened");
    sessionStorage.removeItem(DRAFT);
    render();
    const log = $("agentLog");
    if (log) {
      const nodes = log.querySelectorAll(".msg.agent:not(.typing)");
      const last = nodes[nodes.length - 1];
      if (last) {
        const link = document.createElement("a");
        link.className = "btn btn-gold btn-sm";
        link.href = waUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = say("فتح واتساب بالاتفاق", "Open WhatsApp with the agreement");
        const mailLink = document.createElement("a");
        mailLink.className = "btn btn-line btn-sm";
        mailLink.href = mail;
        mailLink.textContent = say("إرسال البريد من هذا الجهاز", "Send the email from this device");
        last.appendChild(document.createElement("br"));
        last.appendChild(link);
        last.appendChild(document.createTextNode(" "));
        last.appendChild(mailLink);
      }
    }
  }

  function restart() {
    session.step = "service";
    session.services = [];
    session.idea = "";
    session.answers = { features: [], autoCaps: [], marketingBits: ["copy", "covers", "video"] };
    session.phased = false;
    session.quote = null;
    session.contact = { name: "", phone: "", email: "" };
    session.messages = [];
    session.sending = false;
    greet();
  }

  function greet() {
    push("agent",
      "أهلاً بك في FlowFi.\nأنا مستشار المشروع: أفهم ما تريد بناءه، أضع نطاقاً فنياً وسعراً تقديرياً بالدينار، ثم نكتب الاتفاق.\n\nماذا تريد اليوم؟\n• برمجة نظام SaaS أو تطبيق أو برنامج خاص\n• أتمتة أعمال وبوتات ذكية\n• تسويق وكتابة وتصميم ريلز وإنتاج فيديو",
      "Welcome to FlowFi.\nI am the project architect: I learn what you want built, set a technical scope and a dinar estimate, then we write the agreement.\n\nWhat do you want today?\n• A SaaS system, app, or custom program\n• Business automation and smart bots\n• Marketing, copy, reel design, and video production");
    session.step = "service";
    render();
  }

  function restore() {
    try {
      const raw = sessionStorage.getItem(DRAFT);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.messages) || !saved.messages.length) return false;
      Object.assign(session, saved);
      session.busy = false;
      session.sending = false;
      render();
      return true;
    } catch (err) {
      sessionStorage.removeItem(DRAFT);
      return false;
    }
  }

  function bind() {
    document.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-agent]");
      if (choice) onChoice(choice.dataset.agent, choice.dataset.value || "");
      if (event.target.closest("#agentFab")) setFloat(true);
      if (event.target.closest("#closeFloat") || event.target.closest("[data-open-admin]")) setFloat(false);
    });
    const form = $("agentCompose");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = $("agentInput");
        if (!input) return;
        const value = input.value;
        input.value = "";
        onText(value);
      });
    }
    const test = $("testTelegram");
    if (test) {
      test.addEventListener("click", async () => {
        const note = $("channelStatus");
        if (note) note.textContent = say("جارٍ إرسال اختبار تيليجرام…", "Sending the Telegram test…");
        try {
          await sendTelegram("🔔 اختبار إشعار FlowFi\nغرفة الطلبات متصلة. هذه رسالة تجريبية من weflowfi.com");
          if (note) note.textContent = say("أُرسل اختبار تيليجرام.", "Telegram test sent.");
          if (window.FlowFiRoom) window.FlowFiRoom.toast(say("أُرسل اختبار تيليجرام.", "Telegram test sent."));
        } catch (err) {
          if (note) note.textContent = say("تعذر إرسال اختبار تيليجرام.", "The Telegram test could not be sent.");
        }
      });
    }
    const hook = $("webhookUrl");
    if (hook) {
      hook.value = localStorage.getItem(HOOK) || "";
      hook.addEventListener("change", () => {
        const value = hook.value.trim();
        if (value) localStorage.setItem(HOOK, value);
        else localStorage.removeItem(HOOK);
      });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && $("agentFloat") && !$("agentFloat").hidden) setFloat(false);
    });
  }

  function setFloat(open) {
    const app = $("agentApp");
    const home = $("agentHome");
    const body = $("agentFloatBody");
    const panel = $("agentFloat");
    const fab = $("agentFab");
    if (!app || !home || !body || !panel || !fab) return;
    if (open) {
      body.appendChild(app);
      panel.hidden = false;
      fab.hidden = true;
    } else {
      home.appendChild(app);
      panel.hidden = true;
      fab.hidden = false;
    }
  }

  window.FlowFiDeal = {
    refresh: render,
    testTelegram: sendTelegram,
    saveLead: saveLead,
    notify: notify,
    openMailbox: openMailbox
  };

  bind();
  if (!restore()) greet();
})();
