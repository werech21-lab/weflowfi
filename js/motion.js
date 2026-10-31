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
      { t: "$ flowfi boot --crew gemini,grok,openai,apollo", c: "cmd" },
      { t: "→ Grok: live trends · Gemini: strategy · OpenAI: copy", c: "dim" },
      { t: "✓ wedge locked: Lead Reply Copilot", c: "ok" },
      { t: "$ apollo hunt --titles CEO,Founder --geo GCC", c: "cmd" },
      { t: "→ enriching inbound lead · /people/match…", c: "dim" },
      { t: "✓ prospect card → Telegram command center", c: "ok" },
      { t: "$ foundry build && media studio render", c: "cmd" },
      { t: "→ personalized pitch · reel storyboard…", c: "dim" },
      { t: "✓ live on /v1/foundry/products + /v1/media/studio", c: "ok" }
    ];
    const linesEn = [
      { t: "$ flowfi boot --crew gemini,grok,openai,apollo", c: "cmd" },
      { t: "→ Grok: live trends · Gemini: strategy · OpenAI: copy", c: "dim" },
      { t: "✓ wedge locked: Lead Reply Copilot", c: "ok" },
      { t: "$ apollo hunt --titles CEO,Founder --geo GCC", c: "cmd" },
      { t: "→ enriching inbound lead · /people/match…", c: "dim" },
      { t: "✓ prospect card → Telegram command center", c: "ok" },
      { t: "$ foundry build && media studio render", c: "cmd" },
      { t: "→ personalized pitch · reel storyboard…", c: "dim" },
      { t: "✓ live on /v1/foundry/products + /v1/media/studio", c: "ok" }
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
