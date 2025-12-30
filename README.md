1) Project Overview
Title: Personal Portfolio / QA Automation Showcase
Goal: A single‑page, responsive portfolio that presents your professional summary, skills, quantified achievements, project highlights across OEMs, and contact links—optimized for modern browsers with light/dark theme support, keyboard‑accessible tabs, and animated stats. [index | HTML]
Key Sections surfaced in UI:

Hero & Identity (name, role, contact, quick actions, resume) [index | HTML]
Impact in Numbers (Stats)—animated counters for scripts, coverage, issues, experience, OEM programs [visteon-my...epoint.com]
Journey Timeline—education and career milestones (SPPU, CDAC, Visteon L1→L2, program contributions) [visteon-my...epoint.com]
Tabs (“Project Discover”)—projects, achievements, social links rendered as cards with CTAs [index | HTML], [visteon-my...epoint.com]
Experience & Achievements—detailed bullets (tools, CI/CD, BDD, API, performance, KPI reporting) with highlighted coverage and issue counts [index | HTML]
Education & Languages—PG-DAC, B.E., language proficiencies [index | HTML]
Contact & Footer—call to action, mail/phone/LinkedIn, copyright [index | HTML]


2) What This Portfolio Is Used For (“Uses”)


Professional Branding & Discovery

Quickly communicates your experience (Automotive Infotainment QA), core tools, and quantified impact (e.g., 3000+ scripts, 67% coverage, 916 issues via automation). [visteon-my...epoint.com]



Stakeholder Readiness

Designed to help hiring managers, clients, and teammates assess capabilities: Python, Robot Framework, Selenium, Appium; CI/CD via Jenkins; BDD with Cucumber; Git/JIRA/RTC. [index | HTML]



Portfolio of Projects (OEM Programs)

Card-based summaries + outbound references for Tata Punch, Skoda, Mahindra (XUV300/400/700, Thar Roxx), JLR, Harley—giving credible context to your test domains. [visteon-my...epoint.com]



Demonstration of Front‑End Engineering Hygiene

Shows accessibility (ARIA tabs, keyboard nav), performance (IntersectionObserver, requestAnimationFrame), and UX polish (theme toggle synced to OS, CSS tokens). [visteon-my...epoint.com], [visteon-my...epoint.com]



Lead Capture & Conversion

Clear contact CTAs: Email, Phone, LinkedIn, Resume download. [index | HTML]




3) Technologies & Design System
Front‑End Stack

HTML: Semantically structured single page with sections for navigation, hero, stats, tabs, experience, education, contact. [index | HTML]
CSS:

Design tokens via CSS custom properties for color theming and surfaces (dark/light).
Modern layout: responsive grid, card components, badges, sticky header, backdrop blur, radial/linear gradients. [visteon-my...epoint.com]


JavaScript (Vanilla):

Theme bootstrap with OS sync (matchMedia) + localStorage persistence; robust guards for legacy browsers.
Data-driven rendering (stats, timeline, projects, achievements, socials, skills).
ARIA tabs with keyboard support (ArrowLeft/Right), focus management.
Performance-friendly animations (IntersectionObserver + requestAnimationFrame). [visteon-my...epoint.com]



Components & Patterns

Theme Toggle: Controlled by data-theme on <html>; updates color-scheme for native controls; persists choice in localStorage. [visteon-my...epoint.com]
Cards & Grids: Generic renderCards() builds reusable content blocks. [visteon-my...epoint.com]
Stats Counter: Animated easing to target values upon visibility. [visteon-my...epoint.com]
Timeline: Simple list renderer (<li> with year + text). [visteon-my...epoint.com]
Skills: Grouped badges rendered from arrays (Automation, Process & Tools, Testing Areas, Utilities). [visteon-my...epoint.com]
Tabs: role="tab" + .tabpanel with aria-controls, aria-selected, keyboard navigation, initial activation. [visteon-my...epoint.com]


4) Detailed How‑It‑Works (Runtime Flow)


Bootstrapping

On DOM ready, boot() hydrates the page: stats grid, timeline, project/achievement/social cards, skills, then sets up tabs. [visteon-my...epoint.com]



Theming

initTheme() reads localStorage["theme"]; if empty, detects OS preference via matchMedia("(prefers-color-scheme: dark)") and applies "light" or "dark" to document.documentElement.
Synchronizes to OS changes when no saved preference; manual toggle writes to storage. [visteon-my...epoint.com]
CSS responds through theme token sets (:root[data-theme="light"] vs :root[data-theme="dark"]) to change background, text, primary/accent colors, and shadows. [visteon-my...epoint.com]



Data Rendering

A single data object centralizes all content (stats, journey, projects, skills, achievements, social).
Each renderer builds DOM nodes programmatically and appends them to target containers (#statsGrid, #timeline, #projectsGrid, #achievementsGrid, #socialGrid, #skillsGrid). [visteon-my...epoint.com]



Animation & Visibility

IntersectionObserver waits until stats grid is ~40% visible, then animates values using requestAnimationFrame, with easeOutCubic progression. [visteon-my...epoint.com]



Accessibility & Interaction

Tabs implement aria-selected, aria-controls, and support keyboard arrows to move focus/selection; initial tab activation occurs on load. [visteon-my...epoint.com]




5) Data Model (JavaScript data Object)
JavaScriptdata = {  stats: [{ value, label }, ...],              // Counters (scripts, coverage, issues, exp, OEMs)  journey: [{ year, text }, ...],              // Timeline entries (education & roles)  projects: [{ title, meta, img, link }, ...], // OEM project cards with external references  skills: { automation: [], process: [], testing: [], extras: [] }, // Badge groups  achievements: [{ title, meta, img }, ...],   // Achievement cards  social: [{ title, meta, img, link }, ...]    // Social/Resume cards}Show more lines
 [visteon-my...epoint.com]
This structure enables simple content updates without touching markup—swap values in one place and re‑render.

6) Visual Design & Layout Details

Background: Layered gradients (radial + linear) providing subtle depth, tuned per theme. [visteon-my...epoint.com]
Header: Sticky with backdrop blur; brand/logo; nav links show above 768px. [visteon-my...epoint.com]
Hero: Full‑bleed image with overlay; identity card (avatar, roles, contacts); responsive grid shifting at ≥960px. [visteon-my...epoint.com]
Cards & Badges: Rounded, subtle shadows, hover/focus states, ghost/primary buttons. [visteon-my...epoint.com]
Timeline: Dashed vertical guide line, accent dots with glow ring. [visteon-my...epoint.com]
Full‑bleed section helper (.ss-fullbleed-100vw): Breakout utility for edge‑to‑edge sections within centered layouts. [visteon-my...epoint.com]


7) Accessibility & UX Considerations

Keyboard‑Accessible Tabs: Arrow navigation, focus management, ARIA attributes for state and controls. [visteon-my...epoint.com]
Theme Toggle: Button labeled via aria-label="Toggle theme"; respects OS preference when unset. [visteon-my...epoint.com]
Color Contrast & color-scheme: Sets root.style.colorScheme to improve native control rendering per theme; contrasted token sets for light/dark. [visteon-my...epoint.com], [visteon-my...epoint.com]


8) Performance Approach

IntersectionObserver: Defers expensive DOM updates (counter animations) until visible—reduces unnecessary work. [visteon-my...epoint.com]
requestAnimationFrame: Smooth animation synced to browser compositor; easeOutCubic for natural feel. [visteon-my...epoint.com]
No frameworks: Lightweight vanilla JS and CSS minimize payload and runtime. [visteon-my...epoint.com], [visteon-my...epoint.com]


9) Deployment & Running Locally
Local Preview:

Put all three files in the same folder (plus referenced images and SanketSanap_AutomationTestEngg.pdf). [index | HTML], [visteon-my...epoint.com]
Open index.html in any modern browser. [index | HTML]

Static Hosting Options:

GitHub Pages, Netlify, Vercel, or organization web server—suits this static SPA (single HTML + assets). No build step required. [index | HTML], [visteon-my...epoint.com]

Asset Notes:

Ensure images referenced by img fields (event_tata.png, etc.) exist in your hosting folder. External links in cards already point to OEM resources. [visteon-my...epoint.com]


10) Detailed Use Cases (“Uses Information in Detailed”)


Candidate Portfolio for QA Automation Roles

What it shows: Tooling breadth (Python, Java, Selenium, Robot, Appium, Cucumber BDD), CI/CD integration (Jenkins), version control (Git), test suite types (sanity/smoke/regression/performance/API/KPI). [index | HTML]
Why it matters: Quickly proves you can design scalable frameworks, integrate in pipelines, and communicate coverage/defect yield with numbers. Animated stats visually reinforce your impact. [visteon-my...epoint.com]



Client‑Facing Capability Deck (Automotive OEMs)

What it shows: Specific programs—Tata Punch (ICE/upgrade), Skoda (Kylaq), Mahindra (XUV series, Thar Roxx), JLR, Harley—with media/connectivity/power/RVC/navigation test emphasis described per card. [visteon-my...epoint.com]
Why it matters: Establishes domain credibility in infotainment systems—Android Auto/CarPlay, Bluetooth/USB/Wi‑Fi, cameras, GPS—backed by structured test suites. [index | HTML]



Internal Stakeholder Briefing / Performance Reviews

What it shows: Achievements (e.g., 67% coverage improvement, 915+ issues via automation, 3000+ scripts), and responsibilities (integration in Jenkins, log parsing, KPI measurement, result reporting). [index | HTML], [visteon-my...epoint.com]
Why it matters: Offers quantifiable evidence for promotion or role change discussions; can be extended to include trend charts if needed.



Networking & Outreach

What it shows: One-click email, call, LinkedIn, resume—lowering friction for recruiters and collaborators. [index | HTML]



Showcasing Engineering Quality in Front‑End

What it shows: Accessible interactions, theme persistence, performance‑aware animations, tokenized design—useful if you ever interview with teams valuing engineering polish beyond QA. [visteon-my...epoint.com], [visteon-my...epoint.com]




11) Extensibility & Future Enhancements

Content CMS Split: Move data to a JSON file and fetch it—keeping your HTML/JS cleaner and enabling non‑developer content edits. [visteon-my...epoint.com]
Analytics: Add basic page analytics to track visits and link clicks (resume, LinkedIn, OEM links). (Your code is static-ready and can embed this easily.) [index | HTML]
Search/Filter in Tabs: For large project lists, add tag filters and search box bound to data.projects. [visteon-my...epoint.com]
Accessibility Audits: Add alt text to all images (your renderer sets alt="" currently—consider dynamic titles for better screen reader support). [visteon-my...epoint.com]
Internationalization: Externalize strings (e.g., labels like “Product Details”) to enable language toggles (Marathi/Hindi/English). [visteon-my...epoint.com]
Performance Micro‑tweaks:

Lazy‑load images by adding loading="lazy".
Prefer prefers-reduced-motion to reduce animation for sensitive users. [visteon-my...epoint.com], [visteon-my...epoint.com]




12) Quick Reference (Feature → File Mapping)

Navigation, Hero, Experience, Contact markup: index.html [index | HTML]
Theme tokens, layout grids, cards, badges, timeline styles, full‑bleed helper: styles.css [visteon-my...epoint.com]
Theme init & toggle, year injection, data content, renderers (stats/timeline/cards/skills), tabs, boot: scripts.js [visteon-my...epoint.com]


13) Executive Summary (for sharing)

Sanket Sanap’s QA Automation Portfolio is a static, accessible, and theme‑aware single‑page site that showcases automotive infotainment testing expertise across leading OEM programs. It uses a centralized data model to render animated stats, project and achievement cards, skills badges, and a career timeline. Vanilla JS provides robust theming (OS sync + persistence), keyboard‑navigable tabs, and performance‑friendly animations; CSS tokens deliver consistent light/dark styling with responsive grids and polished components. The portfolio doubles as a professional brand site and client‑facing capability deck, emphasizing measurable impact (coverage, issues found, scripts authored) and modern QA practices (Python/Java, Robot/Appium/Selenium, BDD with Cucumber, CI/CD via Jenkins, Git/JIRA/RTC). [index | HTML], [visteon-my...epoint.com], [visteon-my...epoint.com]

