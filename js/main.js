/* =========================================================
   DOM ELEMENT REFERENCES
   ========================================================= */
const logo = document.querySelector(".logo img");
const hamburger = document.querySelector(".hamburger");
const navWrapper = document.querySelector(".nav-wrapper");
const megaMenu = document.querySelector(".mega-menu");
const hItems = document.querySelectorAll(".h-item");
const accordionHeaders = document.querySelectorAll(".accordion-header");

const navbar = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-menu li[data-mega]');
const panels = document.querySelectorAll('.mega-content');
const megaInner = document.querySelector('.mega-inner');
const toggle = document.getElementById("themeToggle");

let activePanel = document.querySelector('.mega-content.active');
let isHoveringNav = false;
let isHoveringMega = false;

let menuOpen = false;

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   HERO LOAD ANIMATIONS
   ========================================================= */
gsap.from(".hero h1", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero p", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out"
});

/* =========================================================
   LOGO + TAGLINE ANIMATIONS
   ========================================================= */
gsap.from(".logo img", {
    y: -10,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".logo-tagline", {
    y: 6,
    opacity: 0,
    duration: 0.6,
    delay: 0.1,
    ease: "power2.out"
});

/* =========================================================
   TEAM REVEAL ANIMATION 
   ========================================================= */

gsap.from(".team-card", {
    scrollTrigger: {
        trigger: ".team-section",
        start: "top 80%"
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

/* =========================================================
   TOUCH TOGGLE 
   ========================================================= */

document.querySelectorAll(".team-card").forEach(card => {
    card.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
            card.classList.toggle("active");
        }
    });
});


/* Logo hover feedback */
if (logo) {
    logo.addEventListener("mouseenter", () => {
        gsap.to(logo, { scale: 1.05, duration: 0.25, ease: "power2.out" });
    });

    logo.addEventListener("mouseleave", () => {
        gsap.to(logo, { scale: 1, duration: 0.25, ease: "power2.out" });
    });
}

/* =========================================================
   HORIZONTAL ACCORDION (FIXED BEHAVIOR)
   - Heading always visible
   - Paragraph animates on hover
   ========================================================= */
hItems.forEach(item => {
    const content = item.querySelector(".h-content p");

    item.addEventListener("mouseenter", () => {
        gsap.to(item, {
            scale: 1.02,
            duration: 0.35,
            ease: "power3.out"
        });

        gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out"
        });
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out"
        });

        gsap.to(content, {
            opacity: 0,
            y: 10,
            duration: 0.25,
            ease: "power2.out"
        });
    });
});

/* =========================================================
   VERTICAL ACCORDION — AUTO-CLOSE OTHERS (GSAP)
   ========================================================= */

accordionHeaders.forEach(header => {
    const item = header.parentElement;
    const body = item.querySelector(".accordion-body");

    // Ensure closed state on load
    gsap.set(body, { height: 0 });

    header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        /* -----------------------------------------
           CLOSE ALL OTHER ACCORDIONS
           ----------------------------------------- */
        accordionHeaders.forEach(otherHeader => {
            const otherItem = otherHeader.parentElement;
            const otherBody = otherItem.querySelector(".accordion-body");

            if (otherItem !== item && otherItem.classList.contains("active")) {
                gsap.to(otherBody, {
                    height: 0,
                    duration: 0.35,
                    ease: "power2.inOut"
                });
                otherItem.classList.remove("active");
            }
        });

        /* -----------------------------------------
           TOGGLE CURRENT ACCORDION
           ----------------------------------------- */
        if (isOpen) {
            // CLOSE current
            gsap.to(body, {
                height: 0,
                duration: 0.35,
                ease: "power2.inOut"
            });
            item.classList.remove("active");
        } else {
            // OPEN current
            gsap.set(body, { height: "auto" });
            const height = body.scrollHeight;

            gsap.fromTo(".team-card", { opacity: 0, y: 30 }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".team-section",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            item.classList.add("active");
        }
    });
});

/* =========================================================
   MEGA MENU — CLEAN SINGLE SYSTEM
========================================================= */

/* =========================
   OPEN
========================= */
function openMega() {
  gsap.to(megaMenu, {
    opacity: 1,
    y: 0,
    duration: 0.35,
    ease: "power3.out",
    onStart: () => {
      megaMenu.style.visibility = "visible";
    }
  });
}

/* =========================
   CLOSE
========================= */
function closeMega() {
  gsap.to(megaMenu, {
    opacity: 0,
    y: 15,
    duration: 0.25,
    ease: "power2.in",
    onComplete: () => {
      megaMenu.style.visibility = "hidden";
    }
  });
}

/* =========================
   SWITCH PANEL
========================= */
function switchPanel(targetClass) {
  const newPanel = document.querySelector(`.mega-content.${targetClass}`);
  if (!newPanel || newPanel === activePanel) return;

  gsap.to(activePanel, {
    opacity: 0,
    y: 10,
    duration: 0.2,
    onComplete: () => {
      activePanel.classList.remove('active');

      newPanel.classList.add('active');
      gsap.set(newPanel, { opacity: 0, y: -10 });

      gsap.to(newPanel, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out"
      });

      activePanel = newPanel;
    }
  });
}

/* =========================
   NAV HOVER
========================= */
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    isHoveringNav = true;
    openMega();
    switchPanel(item.dataset.mega);
  });

  item.addEventListener('mouseleave', () => {
    isHoveringNav = false;
    setTimeout(checkClose, 50);
  });
});

/* =========================
   MEGA PANEL HOVER
========================= */
megaInner.addEventListener('mouseenter', () => {
  isHoveringMega = true;
});

megaInner.addEventListener('mouseleave', () => {
  isHoveringMega = false;
  setTimeout(checkClose, 50);
});

/* =========================
   CLOSE CHECK
========================= */
function checkClose() {
  if (!isHoveringNav && !isHoveringMega) {
    closeMega();
  }
}


/* =========================================================
   HAMBURGER MENU (FIXED)
   ========================================================= */
if (hamburger) {
    hamburger.addEventListener("click", () => {
        menuOpen = !menuOpen;

        /* Toggle menu visibility */
        navWrapper.classList.toggle("open");

        /* Animate hamburger icon */
        gsap.to(".hamburger span:first-child", {
            rotate: menuOpen ? 45 : 0,
            y: menuOpen ? 6 : 0,
            duration: 0.3
        });

        gsap.to(".hamburger span:last-child", {
            rotate: menuOpen ? -45 : 0,
            y: menuOpen ? -6 : 0,
            duration: 0.3
        });
    });
}


/* =========================================================
   MOBILE MEGA MENU TOGGLE
   ========================================================= */

/* =========================================================
   MOBILE NAV DROPDOWN TOGGLE
   ========================================================= */

document.querySelectorAll(".has-dropdown > a").forEach(link => {
    link.addEventListener("click", e => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            link.parentElement.classList.toggle("open");
        }
    });
});

/* =========================================================
   RESET STATES ON RESIZE
   ========================================================= */
window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
        navWrapper.classList.remove("open");
        // megaTrigger.classList.remove("open");
        menuOpen = false;

        gsap.set(".hamburger span", {
            rotate: 0,
            y: 0
        });
    }
});

/* =========================================================
   TOGGLE DARK MODE
   ========================================================= */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark-mode") ? "dark" : "light"
        );
    });
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
}

/* =========================================================
   TOUCH / MOBILE DEVICE
   ========================================================= */
document.querySelectorAll(".team-card").forEach(card => {
    card.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
            card.classList.toggle("active");
        }
    });
});