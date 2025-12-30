
/* ============================================================================
   scripts.js — Portfolio interactions (theme, data renderers, tabs)
   Author: Sanket Sanap (S.S.)
   ============================================================================ */


/* ============================================================================
   1) THEME: data-theme + localStorage + OS sync + toggle
   ============================================================================ */
(function initTheme() {
  const root = document.documentElement;
  const storageKey = "theme";                 // "light" | "dark"

  // Safe matchMedia setup (works on modern + legacy with guards)
  const mql = (typeof window.matchMedia === "function")
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  const systemPrefersDark = !!mql && !!mql.matches;
  const savedTheme = safeGetLocalStorage(storageKey);  // may be null

  // Apply theme and emit optional event for other components
  function applyTheme(mode, source = "init") {
    // Ensure only "light" or "dark" are applied
    if (mode !== "light" && mode !== "dark") mode = "light";
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode; // improves native form controls in browsers
    // Optional: notify other parts of the app
    try {
      root.dispatchEvent(new CustomEvent("themechange", { detail: { mode, source } }));
    } catch (_) {
      // CustomEvent may not exist in very old browsers—ignore
    }
  }

  // Initial apply: prefer saved theme; else fallback to system preference
  applyTheme(savedTheme ?? (systemPrefersDark ? "dark" : "light"), "init");

  // Keep syncing to OS if user hasn't stored a preference
  if (!savedTheme && mql) {
    // Modern browsers
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", (e) => {
        applyTheme(e.matches ? "dark" : "light", "system");
      });
    }
    // Legacy browsers
    else if (typeof mql.addListener === "function") {
      mql.addListener((e) => {
        applyTheme(e.matches ? "dark" : "light", "system");
      });
    }
  }

  // Toggle button (class=".theme-toggle")
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-label", "Toggle theme");
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      applyTheme(next, "manual");
      safeSetLocalStorage(storageKey, next);
    });
  }

  // Safe localStorage helpers
  function safeGetLocalStorage(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeSetLocalStorage(key, value) {
    try { localStorage.setItem(key, value); } catch { /* storage may be blocked */ }
  }
})();


/* ============================================================================
   2) YEAR: inject current year in <span id="year">
   ============================================================================ */
(function injectYear() {
  const node = document.getElementById("year");
  if (node) node.textContent = new Date().getFullYear();
})();


/* ============================================================================
   3) DATA: central content source
   ============================================================================ */
const data = {
  stats: [
    { value: 3000, label: "Automated Scripts Built" },
    { value: 67,   label: "Test Requirement Coverage (%)" },
    { value: 916,    label: "Issues found using Automation"},
    { value: 3.6,  label: "Years Experience" },
    { value: 5,    label: "Major OEM Programs" }
  ],

  journey: [
    {
      year: "2020",
      text: "Graduated with a Bachelor of Engineering (Electrical) from Savitribai Phule Pune University (SPPU), Pune."
    },
    {
      year: "2021",
      text: "Completed Post Graduate Diploma in Advanced Computing (DAC) from CDAC, Thiruvananthapuram, with specialization aligned to the Bangalore region."
    },
    {
      year: "2022",
      text: "Joined Visteon Corporation — Software Test Engineer (L1), contributing to advanced infotainment testing and automation for Mahindra’s flagship programs, including XUV700, Scorpio N, and XUV400."
    },
    {
      year: "2023–2025",
      text: "Software Test Engineer (L2), specializing in advanced infotainment testing and automation for leading automotive programs. Key contributions include Skoda Kushaq, Mahindra Thar Rox, XUV300, Tata Punch and Punch EV, Harley‑Davidson, Jaguar, and Land Rover platforms."
    },
    {
      year: "Now",
      text: "Software Test Engineer (L2), specializing in advanced infotainment testing and automation for leading automotive programs. Key contributions include Mahindra XUV700 (latest)."
    }
  ],

  projects: [
    {
      title: "Tata Punch (base and upgrade version)",
      meta: "Led infotainment integration at Tata Motors, Test Cases implementing Android Auto, Apple CarPlay, advanced navigation, touchscreen UX test cases, and Reverse Camera Display to enhance connectivity, safety, and user experience.",
      img: "event_tata.png",
      link: "https://cars.tatamotors.com/punch/ice.html"
    },
    {
      title: "Skoda — kylaq",
      meta: "Skoda infotainment systems were developed with requirement‑based test cases, ensuring robust multimedia integration for entertainment, navigation, and connectivity. The platform introduced a touchscreen interface with complete media and power handling options, including tuner, USB, Bluetooth, Android Auto, and Apple CarPlay.",
      img: "event_skoda.png",
      link: "https://www.skoda-auto.co.in/shopping/skoda-kylaq-accessories"
    },
    {
      title: "Mahindra — XUV-300, XUV-400. XUV- 700 (old and latest), Thar-Roxx",
      meta: "A modern vehicle infotainment system featuring a high‑resolution touchscreen, smartphone integration, GPS navigation, and multiple connectivity options. Enhanced with front/rear cameras for safety and validated through comprehensive test suites covering performance, stability, and boot operations.",
      img: "event_mahindra.png",
      link: "https://auto.mahindra.com/press-release/mahindra-launches-the-suv-thar-roxx.html"
    },
    {
      title: "Jaguar Land Rover",
      meta: "Performed API testing and validation of infotainment connectivity features such as Bluetooth, Wi‑Fi, and smartphone integration. Conducted performance and reliability testing under diverse automotive conditions, including GPS navigation with real‑time traffic updates, while also contributing to Arms and Echoforge test case development.",
      img: "event_jlr.png",
      link: "https://www.landrover.in/ownership/infotainment-systems/infotainment/pivi-pro-setup-guide/index.html"
    },
    {
      title: "Harley Davidson",
      meta: "Performed API testing and validation of Harley‑Davidson infotainment connectivity features including Bluetooth, Wi‑Fi, and smartphone integration. Conducted performance and reliability testing under varied riding conditions, with built‑in GPS navigation and real‑time traffic updates, while also working on Arms and Echoforge related test cases.",
      img: "event_hd.png",
      link: "https://serviceinfo.harley-davidson.com/documents/2097391584475296360?hideTree=false"
    }
  ],

  skills: {
    automation: ["Python", "Java", "Selenium", "Robot Framework"],
    process:    ["BDD (Cucumber)", "JIRA", "Appium", "RTC", "Git", "CI/CD (Jenkins)"],
    testing:    ["API Testing", "Performance & Reliability", "UI Functional & Regression", "Sanity & Smoke Test", "Issues Prone Test"],
    extras:     ["KPI Testing", "log analysis", "Result Reporting"]
  },

  achievements: [
    {
      title: "67+ % test coverage improvement",
      meta: "Achieved via 3000+ Test scripts across projects",
      img: "ach1.jpg",
    },
    {
      title: "Issue Reporting Using Automation",
      meta: "915+ % Issue Reporting Using Automation",
      img: "ach4.jpg",
    },
    {
      title: "Automation Frameworks",
      meta: "Continuous validation integrated job testing with CI/CD pipelines",
      img: "ach2.jpg",
    },
    {
      title: "Connectivity & Media, Power Requirement Test",
      meta: "AA/CarPlay (Wired / Wirelss), Bluetooth, USB, Navigation, RVC, Power",
      img: "ach3.jpg",
    }
  ],

  social: [
    {
      title: "LinkedIn",
      meta: "Connect with Sanket",
      img: "social_linkedin.jpg",
      link: "https://in.linkedin.com/in/sanket-sanap-a24a71121"
    },
    {
      title: "YouTube",
      meta: "Coming soon: QA videos and MoTo - Vlogs",
      img: "social_youtube.jpg",
      link: "https://www.youtube.com/@sanketsanap3824/playlists"
    },
    {
      title: "PortFolio",
      meta: "Connect with PortFolio",
      img: "social_portfolio.jpg",
      link: "https://sanketsanap01.github.io/Sanket_portFolio/"
    },
    {
      title: "Resume",
      meta: "Download Resume",
      img: "social_Resume.jpg",
      link: "SanketSanap_AutomationTestEngg.pdf"
    }
  ]
};


/* ============================================================================
   4) STATS: render grid + animate counters when visible
   ============================================================================ */
function renderStatsGrid(containerId = "statsGrid", stats = data.stats) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  // Render cards
  stats.forEach(({ value, label }) => {
    const card = document.createElement("div");
    card.className = "stat-card";

    const v = document.createElement("div");
    v.className = "stat-value";
    v.setAttribute("data-target", String(value));
    v.textContent = "0";

    const l = document.createElement("div");
    l.className = "stat-label";
    l.textContent = label;

    card.append(v, l);
    grid.appendChild(card);
  });

  // Animate when grid becomes visible
  const animate = () => {
    const values = grid.querySelectorAll(".stat-value");
    values.forEach((node) => {
      const target = parseFloat(node.getAttribute("data-target") || "0");
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        node.textContent = (target % 1 !== 0)
          ? current.toFixed(1)
          : Math.floor(current).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  };

  // Intersection observer with guard
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate();
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });

  obs.observe(grid);
}


/* ============================================================================
   5) TIMELINE: render journey as <li>
   ============================================================================ */
function renderTimeline(listId = "timeline", items = data.journey) {
  const list = document.getElementById(listId);
  if (!list) return;

  items.forEach(({ year, text }) => {
    const li = document.createElement("li");

    const strong = document.createElement("strong");
    strong.textContent = year;

    li.appendChild(strong);
    li.appendChild(document.createTextNode(" — " + text));
    list.appendChild(li);
  });
}


/* ============================================================================
   6) GENERIC CARD RENDERER: projects/achievements/social
   ============================================================================ */
function renderCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) return;

  items.forEach((it) => {
    const card = document.createElement("article");
    card.className = "card";

    const media = document.createElement("div");
    media.className = "card__media";
    if (it.img) {
      const img = document.createElement("img");
      img.src = it.img;
      img.alt = "";
      media.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "card__body";

    const title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = it.title;

    const meta = document.createElement("p");
    meta.className = "card__meta";
    meta.textContent = it.meta;

    body.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "card__actions";

    const link = document.createElement("a");
    link.className = "btn ghost";
    link.href = it.link || "#";
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Product Details";

    actions.appendChild(link);

    card.append(media, body, actions);
    container.appendChild(card);
  });
}


/* ============================================================================
   7) SKILLS: render grouped badges
   ============================================================================ */
function renderSkills(containerId = "skillsGrid", skills = data.skills) {
  const root = document.getElementById(containerId);
  if (!root) return;

  function section(title, items) {
    const card = document.createElement("div");
    card.className = "skill-card";

    const h = document.createElement("h4");
    h.textContent = title;

    const badges = document.createElement("div");
    badges.className = "skill-badges";

    items.forEach((txt) => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = txt;
      badges.appendChild(b);
    });

    card.append(h, badges);
    root.appendChild(card);
  }

  section("Automation", skills.automation);
  section("Process & Tools", skills.process);
  section("Testing Areas", skills.testing);
  section("Utilities", skills.extras);
}


/* ============================================================================
   8) TABS: ARIA + keyboard navigation
   ============================================================================ */
function setupTabs() {
  const tabsNode = document.querySelectorAll('[role="tab"]');
  const panelsNode = document.querySelectorAll('.tabpanel');
  if (!tabsNode.length || !panelsNode.length) return;

  const tabs = Array.from(tabsNode);
  const panels = Array.from(panelsNode);

  function activate(tab) {
    tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");

    panels.forEach((p) => p.classList.remove("is-active"));
    const id = tab.getAttribute("aria-controls");
    if (!id) return;
    const panel = document.getElementById(id);
    if (panel) panel.classList.add("is-active");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);
      if (i === -1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = tabs[(i + 1) % tabs.length];
        next.focus(); activate(next);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = tabs[(i - 1 + tabs.length) % tabs.length];
        prev.focus(); activate(prev);
      }
    });
  });

  // Activate preselected tab or the first one
  const preselected = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
  if (preselected) activate(preselected);
}


/* ============================================================================
   9) BOOTSTRAP: run after DOM is ready
   ============================================================================ */
function boot() {
  renderStatsGrid("statsGrid", data.stats);
  renderTimeline("timeline", data.journey);
  renderCards("projectsGrid", data.projects);
  renderCards("achievementsGrid", data.achievements);
  renderCards("socialGrid", data.social);
  renderSkills("skillsGrid", data.skills);
  setupTabs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
