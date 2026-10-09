/* =========================================================
   ProjectForge: script.js
   EDIT THE TWO CONFIG BLOCKS BELOW. Everything else just works.
========================================================= */

/* 1) YOUR PROJECTS: paste each Google Drive share link into "video".
      (Drive: right-click the video > Share > "Anyone with the link" > Copy link)
      "poster" is an optional cover image for the card (assets/images/...). */
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

/* ---------- Build the project cards and the types grid ---------- */
$("#projectList").innerHTML = PROJECTS.map((p, i) => `
  <article class="proj rv" data-i="${i}">
    <div class="media">
      <div class="ph" style="--poster:url('${p.poster}')">
        <span class="num">0${i + 1}</span>
        <button data-play aria-label="Play ${p.title} demo"><i class="fa-solid fa-play"></i></button>
        <small>Demo video preview</small>
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

/* ---------- Video modal (plays a Google Drive video in an iframe) ---------- */
const modal = $("#modal"), frame = $("#modalFrame");
let lastFocus = null;

/* Turns any Google Drive share link into an embeddable /preview link */
function driveEmbed(link) {
  const m = link.match(/\/d\/([^/?#]+)/) || link.match(/[?&]id=([^&]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : "about:blank";
}

function openModal(project) {
  lastFocus = document.activeElement;
  $("#modalTitle").textContent = project.title + " Demo";
  frame.src = driveEmbed(project.video);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  frame.src = "about:blank";                            // stops the video
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

document.addEventListener("click", e => {
  const watch = e.target.closest("[data-watch]");
  if (watch) openModal(PROJECTS[watch.closest(".proj").dataset.i]);
});
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });   // click dark overlay
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

/* ---------- Play the video inside the card when the round play button is clicked ---------- */
document.addEventListener("click", e => {
  const play = e.target.closest("[data-play]");
  if (!play) return;
  const card = play.closest(".proj");
  const p = PROJECTS[card.dataset.i];
  $(".media", card).innerHTML =
    `<iframe src="${driveEmbed(p.video)}" title="${p.title} demo" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
});

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