/* =========================================================
   DOM ELEMENT REFERENCES
   ========================================================= */
const hamburger        = document.getElementById("hamburger");
const navWrapper       = document.getElementById("navWrapper");
const megaMenu         = document.getElementById("megaMenu");
const megaInner        = document.getElementById("megaInner");
const hItems           = document.querySelectorAll(".h-item");
const accordionHeaders = document.querySelectorAll(".accordion-header");
const navItems         = document.querySelectorAll(".nav-menu li[data-mega]");
const themeToggle      = document.getElementById("themeToggle");

let activePanel    = document.querySelector(".mega-content.active");
let isHoveringNav  = false;
let isHoveringMega = false;
let menuOpen       = false;

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   HERO CANVAS ANIMATION
   ========================================================= */
   (function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles, animId;

    const isDark = () => document.body.classList.contains('dark-mode');

    // RSX logo colour palette — blue, purple, pink, red, yellow, green
    const LOGO_COLORS = [
        '#4A90D9', // blue
        '#6B4FBB', // purple
        '#C94085', // pink/magenta
        '#E63A1e', // brand red
        '#F5C400', // yellow-gold
        '#7AB648', // green
        '#3ABFCF', // cyan-teal
    ];
    const COLORS = () => LOGO_COLORS;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function randomBetween(a, b) { return a + Math.random() * (b - a); }

    /* --- Particles --- */
    function initParticles() {
        particles = [];
        const count = Math.floor(W / 8);
        for (let i = 0; i < count; i++) {
            const cols = COLORS();
            particles.push({
                x:     randomBetween(0, W),
                y:     randomBetween(0, H),
                r:     randomBetween(1, 2.5),
                color: cols[Math.floor(Math.random() * cols.length)],
                            alpha: randomBetween(0.08, 0.35),
                            vx:    randomBetween(-0.15, 0.15),
                            vy:    randomBetween(-0.25, -0.05),
                        });
        }
    }

    /* --- Grid lines --- */
    function drawGrid() {
        ctx.save();
        ctx.strokeStyle = 'rgba(100,130,255,0.04)';
        ctx.lineWidth = 1;
        const spacing = 60;
        for (let x = 0; x < W; x += spacing) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += spacing) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        ctx.restore();
    }

    /* --- Gradient orbs --- */
    function drawOrbs() {
        const intensity = 1;
    
        const g1 = ctx.createRadialGradient(W * 0.05, H * 0.85, 0, W * 0.05, H * 0.85, W * 0.45);
        g1.addColorStop(0, `rgba(230,58,30,${0.18 * intensity})`);
        g1.addColorStop(1, 'rgba(230,58,30,0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, W, H);
    
        const g2 = ctx.createRadialGradient(W * 0.9, H * 0.1, 0, W * 0.9, H * 0.1, W * 0.35);
        g2.addColorStop(0, `rgba(230,58,30,${0.08 * intensity})`);
        g2.addColorStop(1, 'rgba(230,58,30,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, W, H);
    }

    /* --- Diagonal slash accent (PDF-inspired) --- */
    function drawSlashes() {
        ctx.save();
        ctx.strokeStyle = isDark()
        ? 'rgba(230,58,30,0.12)'
        : 'rgba(230,58,30,0.07)';
        ctx.lineWidth = 60;
        ctx.lineCap = 'round';

        // Slash 1
        ctx.beginPath();
        ctx.moveTo(W * 0.72, -H * 0.1);
        ctx.lineTo(W * 0.58, H * 1.1);
        ctx.stroke();

        // Slash 2
        ctx.strokeStyle = 'rgba(230,58,30,0.07)';
        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.moveTo(W * 0.82, -H * 0.1);
        ctx.lineTo(W * 0.68, H * 1.1);
        ctx.stroke();

        ctx.restore();
    }

    /* --- Main render loop --- */
    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Base background — dark or light
        ctx.fillStyle = '#0d0d0d';
        ctx.fillRect(0, 0, W, H);

        drawGrid();
        drawOrbs();
        drawSlashes();

        // Particles
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -5) { p.y = H + 5; p.x = randomBetween(0, W); }
            if (p.x < -5) p.x = W + 5;
            if (p.x > W + 5) p.x = -5;
        });

        animId = requestAnimationFrame(draw);
    }

    function init() {
        resize();
        initParticles();
        draw();
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    // Start after GSAP hero timeline begins
    init();
})();

/* =========================================================
   HERO — LOAD ANIMATIONS
   ========================================================= */
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl
    .from(".hero h1",       { y: 50, opacity: 0, duration: 0.9 })
    .from(".hero-sub",      { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
    .from(".btn-primary",   { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
    .from(".hero-pill--a",  { x: 40, opacity: 0, duration: 0.7 }, "-=0.6")
    .from(".hero-pill--b",  { x: 40, opacity: 0, duration: 0.6 }, "-=0.5");

    gsap.from(".ticker-strip", {
        scrollTrigger: { trigger: ".ticker-strip", start: "top 95%" },
        opacity: 0, duration: 0.6, ease: "power2.out"
    });


/* =========================================================
   LOGO HOVER
   ========================================================= */
const logo = document.querySelector(".logo");
if (logo) {
    logo.addEventListener("mouseenter", () => gsap.to(logo, { scale: 1.04, duration: 0.2, ease: "power2.out" }));
    logo.addEventListener("mouseleave", () => gsap.to(logo, { scale: 1,    duration: 0.2, ease: "power2.out" }));
}


/* =========================================================
   ABOUT / WHAT WE DO — SCROLL REVEAL
   ========================================================= */
gsap.from(".about-left", {
    scrollTrigger: { trigger: ".about-section", start: "top 78%" },
    x: -40, opacity: 0, duration: 0.8, ease: "power3.out"
});
gsap.from(".value-card", {
    scrollTrigger: { trigger: ".about-section", start: "top 72%" },
    x: 40, opacity: 0, duration: 0.65, stagger: 0.14, ease: "power3.out"
});


/* =========================================================
   VERTICALS SECTION — SCROLL REVEAL
   ========================================================= */
   gsap.from(".verticals-header", {
    scrollTrigger: { trigger: ".verticals-section", start: "top 85%" },
    y: 30, opacity: 0, duration: 0.7, ease: "power3.out"
});

gsap.from(".v-card", {
    scrollTrigger: { trigger: ".verticals-grid", start: "top 82%" },
    y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
    clearProps: "opacity,transform"
});
gsap.from(".h-item", {
    scrollTrigger: { trigger: ".h-accordion", start: "top 82%" },
    y: 20, opacity: 0, duration: 0.55, stagger: 0.08, ease: "power3.out",
    clearProps: "opacity,transform"
});


/* =========================================================
   MODEL SECTION — SCROLL REVEAL
   ========================================================= */
gsap.from(".model-header", {
    scrollTrigger: { trigger: ".model-section", start: "top 82%" },
    y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
});
gsap.from(".model-step", {
    scrollTrigger: { trigger: ".model-steps", start: "top 80%" },
    y: 36, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power3.out"
});


/* =========================================================
   TEAM — SCROLL REVEAL
   ========================================================= */
gsap.from(".team-container .eyebrow, .team-container .section-display, .section-rule", {
    scrollTrigger: { trigger: ".team-section", start: "top 82%" },
    y: 24, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out"
});
gsap.from(".team-card", {
    scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
    y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out"
});


/* =========================================================
   CONTACT — SCROLL REVEAL
   ========================================================= */
gsap.from(".contact-left", {
    scrollTrigger: { trigger: ".contact-section", start: "top 82%" },
    y: 40, opacity: 0, duration: 0.7, ease: "power3.out"
});
gsap.from(".contact-item", {
    scrollTrigger: { trigger: ".contact-card", start: "top 82%" },
    x: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out"
});


/* =========================================================
   TOUCH TOGGLE — TEAM CARDS (mobile / tablet)
   ========================================================= */
document.querySelectorAll(".team-card").forEach(card => {
    card.addEventListener("click", () => {
        if (window.innerWidth <= 1024) card.classList.toggle("active");
    });
});

/* =========================================================
   VERTICAL ACCORDION — AUTO-CLOSE OTHERS (GSAP)
   ========================================================= */
accordionHeaders.forEach(header => {
    const item = header.parentElement;
    const body = item.querySelector(".accordion-body");
    gsap.set(body, { height: 0, overflow: "hidden" });

    header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // close all
        accordionHeaders.forEach(h => {
            const i = h.parentElement;
            const b = i.querySelector(".accordion-body");
            if (i.classList.contains("active")) {
                gsap.to(b, { height: 0, duration: 0.35, ease: "power2.inOut" });
                i.classList.remove("active");
            }
        });

        if (!isOpen) {
            gsap.from(body, { height: 0, duration: 0.35, ease: "power2.inOut" });
            gsap.set(body, { height: "auto" });
            item.classList.add("active");
        }
    });
});


/* =========================================================
   MEGA MENU
   ========================================================= */
function openMega() {
    gsap.to(megaMenu, {
        opacity: 1, y: 0, duration: 0.3, ease: "power3.out",
        onStart: () => { megaMenu.style.visibility = "visible"; }
    });
}

function closeMega() {
    gsap.to(megaMenu, {
        opacity: 0, y: 15, duration: 0.22, ease: "power2.in",
        onComplete: () => { megaMenu.style.visibility = "hidden"; }
    });
    navItems.forEach(li => li.classList.remove("mega-active"));
}

function switchPanel(targetClass) {
    const newPanel = document.querySelector(`.mega-content.${targetClass}`);
    if (!newPanel || newPanel === activePanel) return;

    gsap.to(activePanel, {
        opacity: 0, y: 8, duration: 0.18,
        onComplete: () => {
            activePanel.classList.remove("active");
            activePanel.style.display = "none";

            newPanel.style.display = "block";
            newPanel.classList.add("active");
            gsap.fromTo(newPanel,
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }
            );
            activePanel = newPanel;
        }
    });
}

navItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        isHoveringNav = true;
        navItems.forEach(li => li.classList.remove("mega-active"));
        item.classList.add("mega-active");
        openMega();
        switchPanel(item.dataset.mega);
    });
    item.addEventListener("mouseleave", () => {
        isHoveringNav = false;
        setTimeout(checkClose, 60);
    });
});

megaInner.addEventListener("mouseenter", () => { isHoveringMega = true; });
megaInner.addEventListener("mouseleave", () => {
    isHoveringMega = false;
    setTimeout(checkClose, 60);
});

function checkClose() {
    if (!isHoveringNav && !isHoveringMega) closeMega();
}


/* =========================================================
   HAMBURGER
   ========================================================= */
if (hamburger) {
    hamburger.addEventListener("click", () => {
        menuOpen = !menuOpen;
        navWrapper.classList.toggle("open", menuOpen);
        gsap.to(".hamburger span:nth-child(1)", { rotate: menuOpen ? 45  : 0, y: menuOpen ? 7  : 0, duration: 0.3 });
        gsap.to(".hamburger span:nth-child(2)", { rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0, duration: 0.3 });
    });
}

document.querySelectorAll(".has-dropdown > a").forEach(link => {
    link.addEventListener("click", e => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            link.parentElement.classList.toggle("open");
        }
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
        navWrapper.classList.remove("open");
        menuOpen = false;
        gsap.set(".hamburger span", { rotate: 0, y: 0 });
    }
});


/* =========================================================
   DARK MODE
   ========================================================= */
if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
    }
    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
}
