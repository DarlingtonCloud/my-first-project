/* Bright Future Secondary School — script.js */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });

  /* ── Hamburger mobile menu ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    const open = mobileMenu.classList.contains("open");
    spans[0].style.transform = open ? "rotate(45deg) translate(5px,5px)" : "";
    spans[1].style.opacity = open ? "0" : "1";
    spans[2].style.transform = open ? "rotate(-45deg) translate(5px,-5px)" : "";
  });

  /* ── Close mobile menu on link click ── */
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    });
  });

  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal:not(.visible)"));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(idx * 80, 400) + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  reveals.forEach(el => observer.observe(el));

  /* ── Back to top button ── */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ── Active nav link highlight ── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }, { passive: true });

  /* ── Contact form submit ── */
  const btn = document.querySelector(".btn-navy");
  if (btn) {
    btn.addEventListener("click", () => {
      btn.textContent = "✓ Message Sent!";
      btn.style.background = "#16a34a";
      setTimeout(() => {
        btn.textContent = "Send Message";
        btn.style.background = "";
      }, 3000);
    });
  }

});
