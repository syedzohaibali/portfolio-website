// ===== Sidebar drawer (mobile)
const sidebar = document.getElementById("sidebar");
const burger  = document.getElementById("burger");     // inside sidebar (desktop)
const burgerFab = document.getElementById("burgerFab"); // floating (mobile)
const scrim = document.getElementById("scrim");

function toggleSidebar(state){
  const open = state !== undefined ? state : !sidebar.classList.contains("open");
  sidebar.classList.toggle("open", open);
  burger?.setAttribute("aria-expanded", String(open));
  burgerFab?.setAttribute("aria-expanded", String(open));
  scrim?.classList.toggle("show", open);
}

burger?.addEventListener("click", () => toggleSidebar());
burgerFab?.addEventListener("click", () => toggleSidebar());
scrim?.addEventListener("click", () => toggleSidebar(false));

// Close drawer after clicking a nav item (good mobile UX)
document.querySelectorAll(".sidebar__nav .navlink").forEach(link => {
  link.addEventListener("click", () => toggleSidebar(false));
});

// ===== Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href")?.slice(1);
    const el = id && document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior:"smooth", block:"start" }); }
  });
});

// ===== Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("reveal--show"); io.unobserve(e.target); }});
  }, { threshold:0.12 });
  revealEls.forEach(el => io.observe(el));
}

// ===== Filters
const grid = document.getElementById("projectGrid");
const chips = document.querySelectorAll(".filters .chip");
if (grid && chips.length){
  chips.forEach(btn => btn.addEventListener("click", () => {
    chips.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter || "all";
    grid.querySelectorAll(".card").forEach(card => {
      const tags = card.dataset.tags || "";
      card.style.display = (f === "all" || tags.includes(f)) ? "" : "none";
    });
  }));
}

// ===== Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved === "light") root.classList.add("light");
themeToggle?.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
});

// ===== Back to top
const totop = document.getElementById("totop");
if (totop){
  const onScroll = () => window.scrollY > 500 ? totop.classList.add("show") : totop.classList.remove("show");
  window.addEventListener("scroll", onScroll, { passive:true });
  totop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth"}));
  onScroll();
}
