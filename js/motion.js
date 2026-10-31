(function () {
  if (!window.gsap) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function bindSpotlight() {
    document.querySelectorAll(".spotlight-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - rect.left + "px");
        card.style.setProperty("--my", e.clientY - rect.top + "px");
      });
    });
  }

  function reveal() {
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".reveal").forEach((el, index) => {
      const delay = el.classList.contains("delay-1") ? 0.12 : el.classList.contains("delay-2") ? 0.22 : 0;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        }
      });
      // stagger hero items slightly even without scroll
      if (index < 3) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, delay: 0.15 + index * 0.1, ease: "power3.out" }
        );
      }
    });
  }

  function runTerminal() {
    const el = document.getElementById("liveTerminal");
    if (!el) return;
    const linesAr = [
      { t: "$ flowfi agents boot --crew diwaniya", c: "cmd" },
      { t: "→ scanning market wedge…", c: "dim" },
      { t: "✓ opportunity locked: Lead Reply Copilot", c: "ok" },
      { t: "$ foundry build --stack fastapi", c: "cmd" },
      { t: "→ writing app.py · quality_gate…", c: "dim" },
      { t: "✓ QA 100% · product staged", c: "ok" },
      { t: "$ growth launch --channel owned", c: "cmd" },
      { t: "→ drafting campaign · Telegram alert…", c: "dim" },
      { t: "✓ venture live in lab · /v1/foundry/products", c: "ok" }
    ];
    const linesEn = [
      { t: "$ flowfi agents boot --crew diwaniya", c: "cmd" },
      { t: "→ scanning market wedge…", c: "dim" },
      { t: "✓ opportunity locked: Lead Reply Copilot", c: "ok" },
      { t: "$ foundry build --stack fastapi", c: "cmd" },
      { t: "→ writing app.py · quality_gate…", c: "dim" },
      { t: "✓ QA 100% · product staged", c: "ok" },
      { t: "$ growth launch --channel owned", c: "cmd" },
      { t: "→ drafting campaign · Telegram alert…", c: "dim" },
      { t: "✓ venture live in lab · /v1/foundry/products", c: "ok" }
    ];

    let i = 0;
    el.innerHTML = "";
    function next() {
      const pack = (window.FLOWFI_LANG || "ar") === "en" ? linesEn : linesAr;
      if (i >= pack.length) {
        setTimeout(() => {
          el.innerHTML = "";
          i = 0;
          next();
        }, 2600);
        return;
      }
      const row = document.createElement("p");
      row.className = "terminal-line";
      row.innerHTML = '<span class="' + pack[i].c + '">' + pack[i].t + "</span>";
      el.appendChild(row);
      el.scrollTop = el.scrollHeight;
      i += 1;
      setTimeout(next, reduce ? 80 : 520);
    }
    next();
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindSpotlight();
    reveal();
    runTerminal();
  });
})();
