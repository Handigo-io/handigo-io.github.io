document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Typing Effect
  // =========================
  const texts = [
    "Wave, point, and command — your hands are the controller!",
    "Gesture your way to a smarter workflow — effortless and fun!",
    "Take control with just a wave — unlock the power of gestures!"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 40;
  const deletingSpeed = 25;
  const delayBetween = 1500;

  const typingEl = document.getElementById("typing-text");

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
  // Smooth Scroll + Header Fix
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

  // =========================
  // INSTALL LOCK SYSTEM
  // =========================
  const guideCheck = document.getElementById("guideCheck");
  const guideLabel = document.querySelector(".guide-check");
  const installSection = document.getElementById("install");

  function isInstallUnlocked() {
    return guideCheck && guideCheck.checked;
  }

  function showLockWarning() {
    if (guideLabel) {
      guideLabel.classList.remove("shake");
      void guideLabel.offsetWidth;
      guideLabel.classList.add("shake");
    }
  }

  // Block menu navigation
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      if (href === "#install" && !isInstallUnlocked()) {
        e.preventDefault();
        scrollToId("#guide");
        showLockWarning();
        return;
      }

      e.preventDefault();
      scrollToId(href);
    });
  });

  // Block scroll into install
  window.addEventListener("scroll", () => {
    if (!installSection || isInstallUnlocked()) return;

    const installTop = installSection.getBoundingClientRect().top;

    if (installTop < headerHeight() + 20) {
      scrollToId("#guide");
      showLockWarning();
    }
  }, { passive: true });

  // =========================
  // ABOUT Image Swap
  // =========================
  const aboutImgs = Array.from(document.querySelectorAll(".about-gesture"));

  if (aboutImgs.length) {
    const pool = [
      "gesture-1.png",
      "gesture-2.png",
      "gesture-3.png",
      "gesture-4.png"
    ];

    let start = 0;

    setInterval(() => {
      start = (start + 1) % pool.length;

      aboutImgs.forEach(img => img.style.opacity = "0");

      setTimeout(() => {
        aboutImgs.forEach((img, i) => {
          img.src = pool[(start + i) % pool.length];
        });

        aboutImgs.forEach(img => img.style.opacity = "1");
      }, 250);

    }, 4000);
  }

});
