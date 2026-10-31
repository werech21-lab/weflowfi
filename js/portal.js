(function () {
  const API_BASE = (function () {
    try {
      if (window.FLOWFI_API_BASE) return String(window.FLOWFI_API_BASE).replace(/\/$/, "");
      if (location.port === "8787") return location.origin.replace(/\/$/, "");
      if (location.protocol === "file:") return "http://127.0.0.1:8787";
      return location.origin.replace(/\/$/, "");
    } catch (err) {
      return "http://127.0.0.1:8787";
    }
  })();

  const PRODUCTS_PATH = "/v1/foundry/products";
  const $ = (sel, root) => (root || document).querySelector(sel);

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  function lang() {
    return window.FLOWFI_LANG || document.documentElement.lang || "ar";
  }

  function icons() {
    if (window.lucide) window.lucide.createIcons();
  }

  async function loadProducts() {
    const grid = $("#foundryGrid");
    const meta = $("#foundryMeta");
    if (!grid) return;
    meta.textContent = lang() === "en" ? "Loading live products…" : "جارٍ تحميل المنتجات الحية…";
    try {
      const response = await fetch(API_BASE + PRODUCTS_PATH, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      const products = data.products || [];
      meta.textContent =
        (lang() === "en" ? "Live · " : "حي · ") +
        products.length +
        (lang() === "en" ? " products" : " منتجات") +
        " · " +
        API_BASE +
        PRODUCTS_PATH;
      if (!products.length) {
        grid.innerHTML =
          '<p class="text-white/40 text-sm">' +
          (lang() === "en"
            ? "No products yet. Send /new_venture on Telegram."
            : "لا توجد منتجات بعد. أرسل /new_venture على تيليجرام.") +
          "</p>";
        icons();
        return;
      }
      grid.innerHTML = products
        .map(
          (p) =>
            '<article class="foundry-card spotlight-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">' +
            '<div class="flex items-start justify-between gap-3 mb-4">' +
            '<div class="rounded-2xl bg-cyan-electric/10 p-2.5 text-cyan-electric"><i data-lucide="cpu" class="h-5 w-5"></i></div>' +
            '<span class="text-[11px] text-white/30">' +
            esc(p.stack || "fastapi") +
            "</span></div>" +
            '<h3 class="text-lg font-semibold mb-2">' +
            esc(p.name) +
            "</h3>" +
            '<p class="text-sm text-white/45 mb-4 min-h-[3rem]">' +
            esc(p.one_liner || "") +
            "</p>" +
            '<p class="text-[11px] text-white/25 font-mono mb-4 truncate">' +
            esc(p.id) +
            "</p>" +
            '<button type="button" class="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 text-sm hover:bg-white/[0.08] transition" data-try-product="' +
            esc(p.id) +
            '" data-try-name="' +
            esc(p.name) +
            '">' +
            (lang() === "en" ? "Try live" : "جرّب الآن") +
            "</button></article>"
        )
        .join("");
      icons();
      // rebind spotlight on new cards
      grid.querySelectorAll(".spotlight-card").forEach((card) => {
        card.addEventListener("pointermove", (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", e.clientX - rect.left + "px");
          card.style.setProperty("--my", e.clientY - rect.top + "px");
        });
      });
    } catch (err) {
      meta.textContent =
        (lang() === "en" ? "API unreachable · " : "تعذّر الوصول للـ API · ") + API_BASE;
      grid.innerHTML = '<p class="text-rose-300/80 text-sm">' + esc(err.message || err) + "</p>";
    }
  }

  function openTry(id, name) {
    const modal = $("#tryModal");
    $("#tryProductId").value = id;
    $("#foundryTryTitle").textContent = name || id;
    $("#foundryResult").classList.add("hidden");
    $("#foundryResult").textContent = "";
    modal.classList.remove("hidden");
    icons();
  }

  function closeTry() {
    $("#tryModal").classList.add("hidden");
  }

  async function submitTry(event) {
    event.preventDefault();
    const id = $("#tryProductId").value;
    const result = $("#foundryResult");
    result.classList.remove("hidden");
    result.textContent = lang() === "en" ? "Running…" : "جارٍ التشغيل…";
    const payload = {
      name: $("#tryName").value.trim() || "زائر",
      company: $("#tryCompany").value.trim(),
      message: $("#tryMessage").value.trim(),
      language: lang()
    };
    try {
      const response = await fetch(
        API_BASE + "/v1/foundry/products/" + encodeURIComponent(id) + "/try",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }
      );
      const data = await response.json();
      result.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      result.textContent = String(err.message || err);
    }
  }

  async function submitLead(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#portalLeadStatus");
    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!email && !phone) {
      status.textContent = lang() === "en" ? "Email or phone required." : "البريد أو الهاتف مطلوب.";
      return;
    }
    status.textContent = lang() === "en" ? "Sending…" : "جارٍ الإرسال…";
    try {
      const response = await fetch(API_BASE + "/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") || "").trim(),
          email,
          phone,
          company: String(fd.get("company") || "").trim(),
          message: String(fd.get("message") || "").trim(),
          source: "weflowfi.com",
          consent: fd.get("consent") === "on"
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "HTTP " + response.status);
      status.textContent =
        (lang() === "en" ? "Stored · Telegram " : "تم الحفظ · تيليجرام ") +
        ((data.telegram && data.telegram.status) || "—");
      form.reset();
      form.querySelector('[name="consent"]').checked = true;
    } catch (err) {
      status.textContent = String(err.message || err);
    }
  }

  function mediaUrl(imagePath) {
    const rel = String(imagePath || "").replace(/^outputs\/media_studio\//, "");
    return API_BASE + "/media-studio/" + rel.split("\\").join("/");
  }

  async function loadStudio() {
    const grid = $("#studioGrid");
    const meta = $("#studioMeta");
    if (!grid) return;
    meta.textContent = lang() === "en" ? "Loading studio…" : "جارٍ تحميل الاستوديو…";
    try {
      const response = await fetch(API_BASE + "/v1/media/studio", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      const assets = data.assets || [];
      meta.textContent =
        (lang() === "en" ? "Live assets · " : "أصول حية · ") + assets.length;
      if (!assets.length) {
        grid.innerHTML =
          '<p class="text-white/40 text-sm">' +
          (lang() === "en"
            ? "No campaigns yet. Send /create_campaign on Telegram."
            : "لا حملات بعد. أرسل /create_campaign على تيليجرام.") +
          "</p>";
        return;
      }
      grid.innerHTML = assets
        .map((a) => {
          const src = mediaUrl(a.image);
          return (
            '<article class="spotlight-card foundry-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">' +
            '<img src="' +
            esc(src) +
            '" alt="" class="w-full aspect-[4/5] object-cover bg-black/40" loading="lazy">' +
            '<div class="p-4">' +
            '<p class="text-[11px] text-cyan-soft/80 mb-1">' +
            esc(a.topic || "") +
            "</p>" +
            '<h3 class="text-base font-semibold mb-2">' +
            esc(a.headline || "FlowFi") +
            "</h3>" +
            '<p class="text-sm text-white/45 line-clamp-3">' +
            esc(a.caption || "") +
            "</p></div></article>"
          );
        })
        .join("");
      icons();
    } catch (err) {
      meta.textContent = String(err.message || err);
    }
  }

  function bind() {
    const playLoud = $("#playPromoLoud");
    const promo = $("#flowfiPromo");
    if (playLoud && promo) {
      playLoud.addEventListener("click", async () => {
        try {
          promo.muted = false;
          promo.volume = 1;
          await promo.play();
        } catch (err) {
          promo.controls = true;
        }
      });
    }
    const refresh = $("#foundryRefresh");
    if (refresh) refresh.addEventListener("click", loadProducts);
    document.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-try-product]");
      if (btn) openTry(btn.getAttribute("data-try-product"), btn.getAttribute("data-try-name"));
    });
    const close = $("#foundryTryClose");
    if (close) close.addEventListener("click", closeTry);
    const modal = $("#tryModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeTry();
      });
    }
    const tryForm = $("#foundryTryForm");
    if (tryForm) tryForm.addEventListener("submit", submitTry);
    const leadForm = $("#portalLeadForm");
    if (leadForm) leadForm.addEventListener("submit", submitLead);
    loadProducts();
    loadStudio();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
