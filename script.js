/* =========================================================
   ProjectForge: script.js
   EDIT THE TWO CONFIG BLOCKS BELOW. Everything else just works.
========================================================= */

/* 1) YOUR PROJECTS
      video : your Google Drive share link (Anyone with the link > Viewer)
      poster: OPTIONAL cover image. If you leave it, the card uses Drive's own video thumbnail. */
const PROJECTS = [
  {
    title: "Smart Internship Portal",
    category: "Internship & Recruitment Management System",
    desc: "A web-based platform that connects students and companies for internship discovery, applications and recruitment management.",
    video: "https://drive.google.com/file/d/13ZYN6HseBkACguCIDFVVl0WaCX_iDda9/view?usp=drive_link",
    poster: "assests/smart-portal.png",
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
    tech: ["Python", "Flask", "AI", "Speech Recognition", "Text-to-Speech", "SQLite", "APIs", "JavaScript", "Generative AI"],
    features: ["Voice input", "AI-powered responses", "Multilingual support", "Speech-to-text", "Text-to-speech",
      "Weather information", "Location-based assistance", "Farmer-friendly interface"]
  }
];

/* "Types of projects" grid: [Font Awesome icon, label] */
const TYPES = [
  ["fa-user-graduate", "Student Management Systems"], ["fa-book", "Library Management Systems"],
  ["fa-cart-shopping", "E-Commerce Websites"], ["fa-briefcase", "Internship Portals"],
  ["fa-calendar-check", "College Event Management"], ["fa-comment-dots", "Complaint Management Systems"],
  ["fa-id-badge", "Job Portals"], ["fa-hospital", "Hospital Management Systems"], ["fa-robot", "AI-Based Web Applications"],
  ["fa-file-pen", "Online Examination Systems"], ["fa-clipboard-user", "Attendance Management Systems"],
  ["fa-globe", "Any Other Web-Based Project"]
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
document.documentElement.classList.add("js");

/* ---------- Google Drive helpers ---------- */
function driveId(link) {
  const m = (link || "").match(/\/d\/([^/?#]+)/) || (link || "").match(/[?&]id=([^&]+)/);
  return m ? m[1] : "";
}
const driveEmbed = link => driveId(link) ? `https://drive.google.com/file/d/${driveId(link)}/preview` : "about:blank";
/* Card cover: your own poster if you set one, otherwise Drive's automatic thumbnail */
const thumb = p => p.poster || `https://drive.google.com/thumbnail?id=${driveId(p.video)}&sz=w1280`;

/* ---------- Build the project cards and the types grid ---------- */
$("#projectList").innerHTML = PROJECTS.map((p, i) => `
  <article class="proj rv" data-i="${i}">
    <div class="media">
      <div class="ph" style="--poster:url('${thumb(p)}')">
        <span class="num">0${i + 1}</span>
        <button data-watch aria-label="Watch ${p.title} demo"><i class="fa-solid fa-play"></i></button>
        <small>Click to watch the demo</small>
      </div>
    </div>
    <div class="body">
      <span class="cat">${p.category}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
      <ul class="feat">${p.features.slice(0, 4).map(f => `<li>${f}</li>`).join("")}</ul>
      <ul class="feat more" id="more${i}">${p.features.slice(4).map(f => `<li>${f}</li>`).join("")}</ul>
      <div class="pbtns">
        <button class="btn btn-accent" data-watch><i class="fa-solid fa-play"></i> Watch Demo</button>
        <button class="btn btn-line" data-details aria-expanded="false" aria-controls="more${i}">View Details</button>
      </div>
    </div>
  </article>`).join("");

$("#typeGrid").innerHTML = TYPES.map(([ic, t]) =>
  `<div class="type rv"><i class="fa-solid ${ic}"></i>${t}</div>`).join("");

/* ---------- "View Details" toggle (shows the remaining features) ---------- */
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-details]");
  if (!btn) return;
  const panel = document.getElementById(btn.getAttribute("aria-controls"));
  const open = panel.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "Hide Details" : "View Details";
});

/* ---------- Video modal (Google Drive player) ----------
   Speed trick: the Drive player starts loading as soon as the visitor hovers or touches
   a play button, so it is usually ready by the time the pop-up opens. */
/* The pop-up is created here, so you do NOT need any modal code in index.html */
const MODAL_HTML = `
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>
  <div class="modal-box">
    <div class="modal-head">
      <h3 id="modalTitle"></h3>
      <button id="modalClose" aria-label="Close video"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="modal-frame">
      <iframe id="modalFrame" title="Project demo video" allow="autoplay; fullscreen" allowfullscreen></iframe>
      <div class="spin" id="modalSpin"></div>
    </div>
    <p class="vmiss" id="modalSlow" hidden>Taking long? <a id="modalOpen" href="#" target="_blank" rel="noopener">Open in Google Drive</a></p>
  </div>
</div>`;
const oldModal = $("#modal");
if (oldModal) oldModal.remove();                        // remove any old pop-up from index.html
document.body.insertAdjacentHTML("beforeend", MODAL_HTML);

const modal = $("#modal"), frame = $("#modalFrame"), spin = $("#modalSpin");
const slow = $("#modalSlow"), openLink = $("#modalOpen");
let lastFocus = null, loadedUrl = "", slowTimer = null;

function prime(project) {                               // start loading early
  const url = driveEmbed(project.video);
  if (url === "about:blank" || url === loadedUrl) return;
  loadedUrl = url;
  frame.dataset.ready = "0";
  frame.src = url;
}

frame.addEventListener("load", () => {                  // the Drive player finished loading
  if (loadedUrl && frame.getAttribute("src") === loadedUrl) {
    frame.dataset.ready = "1";
    spin.hidden = true;
    slow.hidden = true;
    clearTimeout(slowTimer);
  }
});

function openModal(project) {
  lastFocus = document.activeElement;
  $("#modalTitle").textContent = project.title + " Demo";
  prime(project);
  openLink.href = project.video;
  slow.hidden = true;
  clearTimeout(slowTimer);
  if (frame.dataset.ready === "1") spin.hidden = true;
  else {
    spin.hidden = false;
    slowTimer = setTimeout(() => { slow.hidden = false; }, 8000);   // still loading after 8 s: offer a Drive link
  }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  clearTimeout(slowTimer);
  frame.src = "about:blank";                            // stops the video
  loadedUrl = "";
  frame.dataset.ready = "0";
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

/* Warm up the player on hover / touch / keyboard focus */
["pointerover", "touchstart", "focusin"].forEach(ev =>
  document.addEventListener(ev, e => {
    const w = e.target.closest && e.target.closest("[data-watch]");
    if (w) prime(PROJECTS[w.closest(".proj").dataset.i]);
  }, { passive: true }));

document.addEventListener("click", e => {
  const watch = e.target.closest("[data-watch]");
  if (watch) openModal(PROJECTS[watch.closest(".proj").dataset.i]);
});
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });   // click dark overlay
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

/* ---------- Mobile navigation ---------- */
const burger = $("#burger"), links = $("#links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
$$("#links a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}));
/* Smooth scrolling is done in CSS (scroll-behavior: smooth) */

/* ---------- Active nav link while scrolling ---------- */
const navLinks = $$("#links a:not(.btn)");
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.hash === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
navLinks.forEach(a => { const s = $(a.hash); if (s) spy.observe(s); });

/* ---------- Scroll reveal ---------- */
$$(".sec .card, .steps li, .why li").forEach(el => el.classList.add("rv"));
const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); }
}), { threshold: 0.12 });
$$(".rv").forEach(el => reveal.observe(el));

/* ---------- Back-to-top button ---------- */
const topBtn = $("#top");
window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 600), { passive: true });
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));