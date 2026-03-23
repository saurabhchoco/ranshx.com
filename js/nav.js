/* =========================================================
   SHARED NAV — used by careers.html, insights.html
   and any future sub-pages
   ========================================================= */

   const hamburger  = document.getElementById("hamburger");
   const navWrapper = document.getElementById("navWrapper");
   const megaMenu   = document.getElementById("megaMenu");
   const megaInner  = document.getElementById("megaInner");
   const navItems   = document.querySelectorAll(".nav-menu li[data-mega]");
   const themeToggle = document.getElementById("themeToggle");
   
   let activePanel    = document.querySelector(".mega-content.active");
   let isHoveringNav  = false;
   let isHoveringMega = false;
   let menuOpen       = false;
   
   /* ── MEGA MENU ── */
   function openMega() {
       if (!megaMenu) return;
       gsap.to(megaMenu, {
           opacity: 1, y: 0, duration: 0.3, ease: "power3.out",
           onStart: () => { megaMenu.style.visibility = "visible"; }
       });
   }
   
   function closeMega() {
       if (!megaMenu) return;
       gsap.to(megaMenu, {
           opacity: 0, y: 15, duration: 0.22, ease: "power2.in",
           onComplete: () => { megaMenu.style.visibility = "hidden"; }
       });
       navItems.forEach(li => li.classList.remove("mega-active"));
   }
   
   function switchPanel(targetClass) {
       if (!activePanel) return;
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
   
   if (navItems.length && megaMenu) {
       navItems.forEach(item => {
           item.addEventListener("mouseenter", () => {
               if (window.innerWidth <= 1024) return;
               isHoveringNav = true;
               navItems.forEach(li => li.classList.remove("mega-active"));
               item.classList.add("mega-active");
               openMega();
               switchPanel(item.dataset.mega);
           });
           item.addEventListener("mouseleave", () => {
               if (window.innerWidth <= 1024) return;
               isHoveringNav = false;
               setTimeout(checkClose, 60);
           });
       });
   
       if (megaInner) {
           megaInner.addEventListener("mouseenter", () => {
               if (window.innerWidth <= 1024) return;
               isHoveringMega = true;
           });
           megaInner.addEventListener("mouseleave", () => {
               if (window.innerWidth <= 1024) return;
               isHoveringMega = false;
               setTimeout(checkClose, 60);
           });
       }
   }
   
   function checkClose() {
       if (!isHoveringNav && !isHoveringMega) closeMega();
   }
   
   /* ── HAMBURGER ── */
   if (hamburger) {
       hamburger.addEventListener("click", () => {
           menuOpen = !menuOpen;
           navWrapper.classList.toggle("open", menuOpen);
           gsap.to(".hamburger span:nth-child(1)", { rotate: menuOpen ? 45  : 0, y: menuOpen ? 7  : 0, duration: 0.3 });
           gsap.to(".hamburger span:nth-child(2)", { rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0, duration: 0.3 });
       });
   }
   
   window.addEventListener("resize", () => {
       if (window.innerWidth > 1024) {
           if (navWrapper) navWrapper.classList.remove("open");
           menuOpen = false;
           gsap.set(".hamburger span", { rotate: 0, y: 0 });
       }
   });
   
   /* ── MOBILE NAV ITEM TAP ── */
   document.querySelectorAll(".nav-menu li[data-mega] > a").forEach(link => {
       link.addEventListener("click", e => {
           if (window.innerWidth > 1024) return;
           e.preventDefault();
           const li = link.parentElement;
           const targetClass = li.dataset.mega;
           const panel = document.querySelector(`.mega-content.${targetClass}`);
           if (!panel) return;
   
           document.querySelectorAll(".mega-content").forEach(p => {
               p.style.display = "none";
               p.classList.remove("active");
           });
           document.querySelectorAll(".nav-menu li[data-mega]").forEach(l => {
               l.classList.remove("mobile-open");
           });
   
           if (li.classList.contains("mobile-open")) {
               li.classList.remove("mobile-open");
           } else {
               li.classList.add("mobile-open");
               panel.style.display = "block";
               panel.classList.add("active");
           }
       });
   });
   
   /* ── DARK MODE ── */
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
   