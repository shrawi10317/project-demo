/* ProjectForge: script.js. Edit PROJECTS and TYPES below. Everything else just works.
   video : Google Drive share link (Anyone with the link > Viewer). Videos play from Drive only.
   poster: cover image in your assests/ folder. If missing, Drive's thumbnail is used.
   logo  : [Font Awesome icon, gradient] for the project's logo badge. */
const PROJECTS = [
  {
    title: "Smart Internship Portal",
    category: "Internship & Recruitment Management System",
    desc: "A web-based platform that connects students and companies for internship discovery, applications and recruitment management.",
    video: "https://drive.google.com/file/d/13ZYN6HseBkACguCIDFVVl0WaCX_iDda9/view?usp=drive_link",
    poster: "assests/smart-portal.png",
    logo: ["fa-briefcase", "linear-gradient(135deg,#d9822b,#c4513f)"],
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript", "Bootstrap"],
    features: ["Student registration and login", "Company registration", "Internship posting", "Internship search and filtering",
      "Resume upload", "Internship applications", "Company dashboard", "Email notifications"]
  },
  {
    title: "ShopSphere",
    category: "Smart E-Commerce Web Application",
    desc: "A complete e-commerce web application with product management, shopping cart, wishlist, orders and personalized shopping features.",
    video: "https://drive.google.com/file/d/1g2LL-sgSI_gzU21cKX5_xG7TelPhU4NJ/view?usp=drive_link",
    poster: "assests/E-commerce.png",
    logo: ["fa-bag-shopping", "linear-gradient(135deg,#5f6fe0,#3b82a8)"],
    tech: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript", "Bootstrap"],
    features: ["User authentication", "Product browsing", "Category filtering", "Product details", "Shopping cart",
      "Wishlist", "Order management", "Personalized recommendations", "Responsive design"]
  },
  {
    title: "KrishiMitra AI",
    category: "Multilingual Farmer Advisory System",
    desc: "A voice-based agricultural advisory web application that helps farmers interact with an AI assistant using multiple languages.",
    video: "https://drive.google.com/file/d/1yj2JDSXt_ig_xxWufQthyyS_GpH6rpC9/view?usp=drive_link",
    poster: "assests/krishi.png",
    logo: ["fa-seedling", "linear-gradient(135deg,#3d9a68,#4aa7b5)"],
    tech: ["Python", "Flask", "AI", "Speech Recognition", "Text-to-Speech", "SQLite", "APIs", "JavaScript", "Generative AI"],
    features: ["Voice input", "AI-powered responses", "Multilingual support", "Speech-to-text", "Text-to-speech",
      "Weather information", "Location-based assistance", "Farmer-friendly interface"]
  }
];

const TECH_ICON = {
  Python: "fa-brands fa-python", Flask: "fa-solid fa-flask", Django: "fa-solid fa-leaf", SQLite: "fa-solid fa-database",
  HTML: "fa-brands fa-html5", CSS: "fa-brands fa-css3-alt", JavaScript: "fa-brands fa-js", Bootstrap: "fa-brands fa-bootstrap",
  AI: "fa-solid fa-microchip", "Generative AI": "fa-solid fa-wand-magic-sparkles", "Speech Recognition": "fa-solid fa-microphone",
  "Text-to-Speech": "fa-solid fa-volume-high", APIs: "fa-solid fa-plug"
};

const TYPES = [
  ["fa-user-graduate", "Student Management Systems"], ["fa-book", "Library Management Systems"],
  ["fa-cart-shopping", "E-Commerce Websites"], ["fa-briefcase", "Internship Portals"],
  ["fa-calendar-check", "College Event Management"], ["fa-comment-dots", "Complaint Management Systems"],
  ["fa-id-badge", "Job Portals"], ["fa-hospital", "Hospital Management Systems"], ["fa-robot", "AI-Based Web Applications"],
  ["fa-file-pen", "Online Examination Systems"], ["fa-clipboard-user", "Attendance Management Systems"],
  ["fa-globe", "Any Other Web-Based Project"]
];

/* Set to true to open the video in Google Drive's own player (new tab) on phones instead of the pop-up. */
const OPEN_DRIVE_ON_PHONE = false;

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

/* ---------- Splash: logo, letters appear one by one, live %, then the site opens ---------- */
(function () {
  const s = $("#splash"), root = document.documentElement;
  if (!s) { root.classList.remove("splashing"); return; }
  const T = still ? [0, 150, 300, 1400] : [80, 1000, 1900, 3300];       // s1, s2, s3, leave (ms)
  const timers = [];
  let done = false;
  const nm = $(".s-name b"), a = [74, 90, 208], b = [42, 143, 158];     // letters fade violet -> teal
  nm.innerHTML = [...nm.textContent].map((c, i, all) => {
    const t = i / (all.length - 1), col = a.map((v, k) => Math.round(v + (b[k] - v) * t));
    return `<i style="--d:${i};color:rgb(${col})">${c}</i>`;
  }).join("");
  const pct = $("#sPct"), st = $("#sStatus"), msgs = ["Starting up…", "Loading ideas…", "Wiring the database…", "Polishing the UI…", "Launching!"];
  let n = 0;
  const iv = setInterval(() => {
    n = Math.min(100, n + 2); pct.textContent = n + "%";
    st.textContent = msgs[Math.min(4, Math.floor(n / 21))];
    if (n >= 100) clearInterval(iv);
  }, T[3] / 55);
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  function finish() {
    if (done) return; done = true;
    clearInterval(iv); timers.forEach(clearTimeout);
    s.classList.add("leave"); root.classList.add("go");
    setTimeout(() => { s.remove(); root.classList.remove("splashing"); }, still ? 50 : 800);
  }
  at(T[0], () => s.classList.add("s1"));
  at(T[1], () => s.classList.add("s2"));
  at(T[2], () => s.classList.add("s3"));
  at(T[3], finish);
  $("#sSkip").addEventListener("click", finish);
  addEventListener("keydown", e => { if (e.key === "Escape") finish(); });
})();

/* ---------- Drive helpers ---------- */
const driveId = l => ((l || "").match(/\/d\/([^/?#]+)/) || (l || "").match(/[?&]id=([^&]+)/) || [])[1] || "";
const driveEmbed = l => driveId(l) ? `https://drive.google.com/file/d/${driveId(l)}/preview` : "about:blank";
const driveThumb = p => `https://drive.google.com/thumbnail?id=${driveId(p.video)}&sz=w1280`;
const imgTag = (p, cls, alt) => `<img src="${p.poster}" alt="${alt}" ${cls ? `class="${cls}"` : ""} loading="lazy" onerror="this.onerror=null;this.src='${driveThumb(p)}'">`;

/* ---------- Cards ---------- */
$("#projectList").innerHTML = PROJECTS.map((p, i) => `
  <article class="proj rv" data-i="${i}">
    <div class="media">
      ${imgTag(p, "", p.title + " screenshot")}
      <div class="ph">
        <span class="num">0${i + 1}</span>
        <button class="play" data-watch aria-label="Watch ${p.title} demo"><i class="fa-solid fa-play"></i></button>
        <small>Click to watch the demo</small>
      </div>
    </div>
    <div class="body">
      <div class="logo-row"><span class="plogo" style="--g:${p.logo[1]}"><i class="fa-solid ${p.logo[0]}"></i></span><span class="cat">${p.category}</span></div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tech.map(t => `<span><i class="${TECH_ICON[t] || "fa-solid fa-code"}"></i>${t}</span>`).join("")}</div>
      <ul class="feat">${p.features.slice(0, 4).map(f => `<li>${f}</li>`).join("")}</ul>
      <ul class="feat more" id="more${i}">${p.features.slice(4).map(f => `<li>${f}</li>`).join("")}</ul>
      <div class="pbtns">
        <button class="btn btn-accent" data-watch><i class="fa-solid fa-play"></i> Watch Demo</button>
        <button class="btn btn-line" data-details aria-expanded="false" aria-controls="more${i}">View Details</button>
      </div>
    </div>
  </article>`).join("");

$("#typeGrid").innerHTML = TYPES.map(([ic, t]) => `<div class="type rv"><i class="fa-solid ${ic}"></i>${t}</div>`).join("");

document.addEventListener("click", e => {
  const btn = e.target.closest("[data-details]");
  if (!btn) return;
  const open = document.getElementById(btn.getAttribute("aria-controls")).classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "Hide Details" : "View Details";
});

/* ---------- Video pop-up (created here; nothing needed in index.html) ----------
   Plays the Google Drive video in a frame that is scaled to fit small screens. */
document.body.insertAdjacentHTML("beforeend", `
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>
  <div class="modal-box">
    <div class="modal-head">
      <h3 id="modalTitle"></h3>
      <div class="mh-btns">
        <button id="modalFs" aria-label="Fullscreen"><i class="fa-solid fa-expand"></i></button>
        <button id="modalClose" aria-label="Close video"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    <div class="modal-frame">
      <iframe id="modalFrame" title="Project demo video" allow="autoplay; fullscreen" allowfullscreen></iframe>
      <div class="spin" id="modalSpin"></div>
    </div>
    <p class="tip">Tap the expand button above for landscape fullscreen, or <a class="open-drive" href="#" target="_blank" rel="noopener">open in Google Drive</a>.</p>
    <p class="vmiss" id="modalSlow" hidden>Taking long? <a class="open-drive" href="#" target="_blank" rel="noopener">Open in Google Drive</a></p>
  </div>
</div>`);

const modal = $("#modal"), box = $(".modal-box"), frame = $("#modalFrame"), spin = $("#modalSpin"), slow = $("#modalSlow");
let lastFocus = null, loadedUrl = "", slowTimer = null;
const fbox = $(".modal-frame");
function fit() {          /* Drive lays its player out for the iframe size. On a phone that is too small, so we
                             give it 640px (desktop layout) and shrink it with CSS scale to fit the pop-up. */
  const w = fbox.clientWidth, h = fbox.clientHeight, B = 640;
  if (!w) return;
  if (w >= B) { Object.assign(frame.style, { width: "100%", height: "100%", transform: "none" }); return; }
  const s = w / B;
  Object.assign(frame.style, { width: B + "px", height: (h / s) + "px", transform: `scale(${s})` });
}
new ResizeObserver(fit).observe(fbox);

function prime(p) {                                    // warm up the Drive player on hover / touch
  const url = driveEmbed(p.video);
  if (url === "about:blank" || url === loadedUrl) return;
  frame.hidden = false;                                  // frame must be displayed while it loads
  fit();
  loadedUrl = url; frame.dataset.ready = "0"; frame.src = url;
}
frame.addEventListener("load", () => {
  if (loadedUrl && frame.getAttribute("src") === loadedUrl) {
    frame.dataset.ready = "1"; spin.hidden = true; slow.hidden = true; clearTimeout(slowTimer);
  }
});
function useDrive(p) {                                 // Drive player (also the fallback)
  frame.hidden = false;
  const url = driveEmbed(p.video);
  if (url !== loadedUrl) { fit(); loadedUrl = url; frame.dataset.ready = "0"; frame.src = url; }
  if (frame.dataset.ready === "1") spin.hidden = true;
  else { spin.hidden = false; clearTimeout(slowTimer); slowTimer = setTimeout(() => slow.hidden = false, 8000); }
}
function openModal(p) {
  lastFocus = document.activeElement;
  $("#modalTitle").textContent = p.title + " Demo";
  $$(".open-drive").forEach(a => a.href = p.video);
  slow.hidden = true; clearTimeout(slowTimer);
  useDrive(p);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}
function closeModal() {
  if (document.fullscreenElement) document.exitFullscreen();
  clearTimeout(slowTimer);
  frame.src = "about:blank"; loadedUrl = ""; frame.dataset.ready = "0";
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
["pointerover", "touchstart", "focusin"].forEach(ev => document.addEventListener(ev, e => {
  const w = e.target.closest && e.target.closest("[data-watch]");
  if (w) prime(PROJECTS[w.closest(".proj").dataset.i]);
}, { passive: true }));
document.addEventListener("click", e => {
  const w = e.target.closest("[data-watch]");
  if (!w) return;
  const p = PROJECTS[w.closest(".proj").dataset.i];
  if (OPEN_DRIVE_ON_PHONE && matchMedia("(max-width:760px)").matches) window.open(p.video, "_blank", "noopener");
  else openModal(p);
});
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden && !document.fullscreenElement) closeModal(); });

$("#modalFs").addEventListener("click", async () => {   // fullscreen the whole pop-up, then rotate (Android Chrome)
  try {
    if (document.fullscreenElement) { await document.exitFullscreen(); return; }
    await box.requestFullscreen();
    if (screen.orientation && screen.orientation.lock) await screen.orientation.lock("landscape").catch(() => {});
  } catch (err) { /* iPhone Safari: rotate the phone instead */ }
});
document.addEventListener("fullscreenchange", () => {
  const fs = !!document.fullscreenElement;
  setTimeout(fit, 60);
  $("#modalFs i").className = fs ? "fa-solid fa-compress" : "fa-solid fa-expand";
  if (!fs && screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
});

/* ---------- Mobile navigation ---------- */
const burger = $("#burger"), links = $("#links");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", links.classList.toggle("open")));
$$("#links a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
}));

/* ---------- Active nav link ---------- */
const navLinks = $$("#links a:not(.btn)");
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.hash === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
navLinks.forEach(a => { const s = $(a.hash); if (s) spy.observe(s); });

/* ---------- Scroll reveal ---------- */
$$(".card, .steps li, .why li, .center h2").forEach(el => el.classList.add("rv"));
/* stagger: items in the same row/list appear one after another */
[".grid3", ".steps", ".why ul", ".reach"].forEach(sel => $$(sel).forEach(g =>
  [...g.children].forEach((c, i) => c.style.setProperty("--i", i))));
const reveal = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) {
    const t = en.target;
    t.style.transitionDelay = (t.style.getPropertyValue("--i") || 0) * 70 + "ms";
    t.classList.add("in"); reveal.unobserve(t);
    setTimeout(() => { t.style.transitionDelay = ""; }, 1300);   // so hover effects are not delayed
  }
}), { threshold: 0.12 });
$$(".rv").forEach(el => reveal.observe(el));

/* ---------- Back to top + scroll progress line under the nav ---------- */
const topBtn = $("#top");
addEventListener("scroll", () => {
  topBtn.classList.toggle("show", scrollY > 600);
  const max = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty("--p", max > 0 ? Math.min(scrollY / max, 1) : 0);
}, { passive: true });
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Typing line in the hero ---------- */
const words = [
  "Any type of web-based project", "From idea to working application", "Custom features, real database",
  "Built around your requirements", "Demo-ready and easy to present", "Your idea, live as a web app"
];
const typer = $("#typer");
let wi = 0, ci = 0, del = false;
(function tick() {
  const w = words[wi];
  if (still) { typer.textContent = w; wi = (wi + 1) % words.length; return setTimeout(tick, 2500); }
  ci += del ? -1 : 1;
  typer.textContent = w.slice(0, ci);
  let d = del ? 35 : 80;
  if (!del && ci === w.length) { del = true; d = 1400; }
  else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 300; }
  setTimeout(tick, d);
})();

/* ---------- Hero showcase: your screenshots in a laptop + phone ---------- */
(function () {
  const show = $("#heroShow"), n = PROJECTS.length;
  show.innerHTML = `
    <div class="stage">
      <div class="lap"><div class="lap-bar"><i></i><i></i><i></i></div>
        <div class="lap-scr">${PROJECTS.map((p, i) => imgTag(p, i ? "" : "on", p.title + " preview")).join("")}</div></div>
      <div class="lap-base"></div>
      <div class="phone"><div class="phone-scr">${PROJECTS.map((p, i) => imgTag(PROJECTS[(i + 1) % n], i ? "" : "on", PROJECTS[(i + 1) % n].title + " preview")).join("")}</div></div>
    </div>
    <div class="cap"><div><b id="capT"></b><span id="capC"></span></div><a href="#projects">Watch the demos <i class="fa-solid fa-arrow-down"></i></a></div>
    <ul class="pills"><li><i class="fa-solid fa-mobile-screen"></i>Responsive UI</li><li><i class="fa-solid fa-database"></i>Database included</li><li><i class="fa-solid fa-sliders"></i>Custom features</li><li><i class="fa-solid fa-circle-play"></i>Demo-ready</li></ul>`;
  const L = $$(".lap-scr img", show), P = $$(".phone-scr img", show);
  let k = 0;
  function set(i) {
    k = i;
    L.forEach((e, x) => e.classList.toggle("on", x === i));
    P.forEach((e, x) => e.classList.toggle("on", x === i));
    $("#capT").textContent = PROJECTS[i].title;
    $("#capC").textContent = PROJECTS[i].category;
  }
  set(0);
  if (!still) setInterval(() => set((k + 1) % n), 3800);
})();