document.addEventListener("DOMContentLoaded", () => {
  const particlesContainer = document.querySelector(".particles");
  if (particlesContainer) {
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;

      const size = 2 + Math.random() * 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const duration = 8 + Math.random() * 12;
      particle.style.animationDuration = `${duration}s`;

      particle.style.animationDelay = `${Math.random() * 10}s`;
      particlesContainer.appendChild(particle);
    }
  }

  // =========================
  // Mobile menu
  // =========================
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // Typing Effect
  // =========================
  const texts = [
    "Wave, point, and command — your hands are the controller!",
    "Gesture your way to a smarter workflow — effortless and fun!",
    "Take control with just a wave — unlock the power of gestures!",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 40;
  const deletingSpeed = 25;
  const delayBetween = 1500;

  const typingEl = document.getElementById("typing-text");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function typeEffect() {
    if (!typingEl) return;

    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingEl.textContent = currentText.slice(0, charIndex++);
      if (charIndex > currentText.length) {
        setTimeout(() => (isDeleting = true), delayBetween);
      }
    } else {
      typingEl.textContent = currentText.slice(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeEffect();

  // =========================
  // Scroll spy for nav links
  // =========================
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) current = section.getAttribute("id");
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // =========================
  // Smooth Scroll
  // =========================
  const root = document.documentElement;
  function headerHeight() {
    const v = getComputedStyle(root).getPropertyValue("--headerH").trim();
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 72;
  }

  function scrollToId(id) {
    const el = document.querySelector(id);
    if (!el) return;

    const prevSnap = root.style.scrollSnapType;
    root.style.scrollSnapType = "none";

    const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight();
    window.scrollTo({ top: y, behavior: "smooth" });

    setTimeout(() => {
      root.style.scrollSnapType = prevSnap || "";
    }, 700);
  }

  const installAction = document.querySelector(".install-action");
  const guideCheckbox = document.getElementById("guideCheck");
  const installNote = document.querySelector(".install-note");

    function updateInstallState() {
      if (!guideCheckbox || !installAction) return;

      if (guideCheckbox.checked) {
        installAction.classList.remove("disabled");
        installNote.classList.add("hide");
      } else {
        installAction.classList.add("disabled");
        installNote.classList.remove("hide");
      }
    }

    updateInstallState();
    guideCheckbox.addEventListener("change", updateInstallState);

  const aboutImgs = Array.from(document.querySelectorAll(".about-gesture"));
  if (aboutImgs.length) {
    const pool = [
      "assets/images/gesture-1.png",
      "assets/images/gesture-2.png",
      "assets/images/gesture-3.png",
      "assets/images/gesture-4.png",
    ];

    let start = 0;

    setInterval(() => {
      start = (start + 1) % pool.length;

      aboutImgs.forEach((img) => (img.style.opacity = "0"));

      setTimeout(() => {
        aboutImgs.forEach((img, i) => {
          img.src = pool[(start + i) % pool.length];
        });
        aboutImgs.forEach((img) => (img.style.opacity = "1"));
      }, 250);
    }, 4000);
  }
});