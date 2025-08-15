// ========== Sidebar drawer (mobile)
const sidebar = document.getElementById("sidebar");
const burger = document.getElementById("burger");

if (burger && sidebar) {
  burger.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
}

// Close sidebar after clicking a nav link (mobile UX)
document.querySelectorAll(".sidebar__nav .navlink").forEach(link => {
  link.addEventListener("click", () => {
    if (sidebar?.classList.contains("open")) {
      sidebar.classList.remove("open");
      burger?.setAttribute("aria-expanded", "false");
    }
  });
});

// ========== Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========== Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href")?.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ========== Scroll reveal (matches .reveal/.reveal--show classes in CSS)
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal--show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// ========== Project filters (defensive if grid not present)
const grid = document.getElementById("projectGrid");
const filterChips = document.querySelectorAll(".filters .chip");

if (grid && filterChips.length) {
  filterChips.forEach(btn => {
    btn.addEventListener("click", () => {
      filterChips.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter || "all";
      grid.querySelectorAll(".card").forEach(card => {
        const tags = card.dataset.tags || "";
        card.style.display = (f === "all" || tags.includes(f)) ? "" : "none";
      });
    });
  });
}

// ========== Theme toggle (syncs with :root.light in CSS)
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved === "light") root.classList.add("light");

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
});

// ========== Back to top button
const totop = document.getElementById("totop");
if (totop) {
  const onScroll = () => {
    if (window.scrollY > 500) totop.classList.add("show");
    else totop.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  totop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  onScroll(); // initialize
}

// ========== Active nav highlight on scroll (optional but nice)
const sectionIds = ["home", "about", "projects", "skills", "consult", "contact"];
const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(document.querySelectorAll(".sidebar__nav .navlink"));

if (sections.length && navLinks.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = navLinks.find(a => a.getAttribute("href") === `#${id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });
  sections.forEach(s => spy.observe(s));
}

// ========== Avatar: lazy-load + graceful error hide
const avatar = document.querySelector(".avatar");
if (avatar) {
  avatar.setAttribute("loading", "lazy");
  avatar.addEventListener("error", () => {
    avatar.style.display = "none";
  });
}
