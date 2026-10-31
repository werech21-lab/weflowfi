(function () {
  const API_BASE = (function () {
    try {
      if (window.FLOWFI_API_BASE) return String(window.FLOWFI_API_BASE).replace(/\/$/, "");
      if (location.port === "8787" || location.pathname.indexOf("flowfi") !== -1) {
        return location.origin.replace(/\/$/, "");
      }
      // When opened as static file or GitHub Pages, talk to local empire API.
      if (location.protocol === "file:" || /weflowfi\.com$/i.test(location.hostname)) {
        return "http://127.0.0.1:8787";
      }
      return location.origin.replace(/\/$/, "");
    } catch (err) {
      return "http://127.0.0.1:8787";
    }
  })();

  const $ = (sel, root) => (root || document).querySelector(sel);

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function lang() {
    return document.documentElement.lang === "en" ? "en" : "ar";
  }

  async function loadProducts() {
    const grid = $("#foundryGrid");
    const meta = $("#foundryMeta");
    if (!grid) return;
    meta.textContent = lang() === "en" ? "Loading live products…" : "جارٍ تحميل المنتجات الحية…";
    try {
      const response = await fetch(API_BASE + "/v1/products", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      const products = data.products || [];
      meta.textContent =
        (lang() === "en" ? "Live products: " : "منتجات حية: ") +
        products.length +
        " · API " +
        API_BASE;
      if (!products.length) {
        grid.innerHTML =
          '<p class="muted">' +
          (lang() === "en"
            ? "No generated products yet. Send /new_venture on Telegram."
            : "لا توجد منتجات بعد. أرسل /new_venture على تيليجرام.") +
          "</p>";
        return;
      }
      grid.innerHTML = products
        .map((p) => {
          return (
            '<article class="foundry-card">' +
            '<p class="eyebrow">' +
            esc(p.stack || "fastapi") +
            "</p>" +
            "<h3>" +
            esc(p.name) +
            "</h3>" +
            "<p>" +
            esc(p.one_liner || "") +
            "</p>" +
            '<p class="muted"><code>' +
            esc(p.id) +
            "</code></p>" +
            '<button type="button" class="btn btn-gold" data-try-product="' +
            esc(p.id) +
            '" data-try-name="' +
            esc(p.name) +
            '">' +
            (lang() === "en" ? "Try live" : "جرّب الآن") +
            "</button>" +
            "</article>"
          );
        })
        .join("");
    } catch (err) {
      meta.textContent =
        (lang() === "en" ? "Could not reach API at " : "تعذّر الوصول للـ API على ") + API_BASE;
      grid.innerHTML =
        '<p class="muted">' +
        esc(String(err && err.message ? err.message : err)) +
        "</p>";
    }
  }

  function openTry(id, name) {
    const panel = $("#foundryTry");
    if (!panel) return;
    $("#tryProductId").value = id;
    $("#foundryTryTitle").textContent =
      (lang() === "en" ? "Live try · " : "تجربة حية · ") + (name || id);
    $("#foundryResult").hidden = true;
    $("#foundryResult").textContent = "";
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function submitTry(event) {
    event.preventDefault();
    const id = $("#tryProductId").value;
    const result = $("#foundryResult");
    result.hidden = false;
    result.textContent = lang() === "en" ? "Running…" : "جارٍ التشغيل…";
    const payload = {
      name: $("#tryName").value.trim() || "زائر",
      company: $("#tryCompany").value.trim(),
      message: $("#tryMessage").value.trim(),
      language: lang()
    };
    try {
      const response = await fetch(API_BASE + "/v1/products/" + encodeURIComponent(id) + "/try", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      result.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      result.textContent = String(err && err.message ? err.message : err);
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
      status.textContent =
        lang() === "en" ? "Email or phone is required." : "البريد أو الهاتف مطلوب.";
      status.dataset.state = "error";
      return;
    }
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: email,
      phone: phone,
      company: String(fd.get("company") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      source: "weflowfi.com/portal",
      consent: fd.get("consent") === "on"
    };
    status.textContent = lang() === "en" ? "Sending…" : "جارٍ الإرسال…";
    status.dataset.state = "pending";
    try {
      const response = await fetch(API_BASE + "/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "HTTP " + response.status);
      status.textContent =
        (lang() === "en" ? "Stored. Telegram: " : "تم الحفظ. تيليجرام: ") +
        ((data.telegram && data.telegram.status) || "—") +
        (lang() === "en" ? " · Cloud: " : " · السحابة: ") +
        ((data.cloud && data.cloud.status) || "—");
      status.dataset.state = "ok";
      form.reset();
      form.querySelector('[name="consent"]').checked = true;
    } catch (err) {
      status.textContent = String(err && err.message ? err.message : err);
      status.dataset.state = "error";
    }
  }

  function bind() {
    const refresh = $("#foundryRefresh");
    if (refresh) refresh.addEventListener("click", loadProducts);
    document.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-try-product]");
      if (!btn) return;
      openTry(btn.getAttribute("data-try-product"), btn.getAttribute("data-try-name"));
    });
    const close = $("#foundryTryClose");
    if (close) close.addEventListener("click", () => {
      $("#foundryTry").hidden = true;
    });
    const tryForm = $("#foundryTryForm");
    if (tryForm) tryForm.addEventListener("submit", submitTry);
    const leadForm = $("#portalLeadForm");
    if (leadForm) leadForm.addEventListener("submit", submitLead);
    loadProducts();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
