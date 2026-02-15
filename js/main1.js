const menuToggle = document.getElementById("menuToggle");
const overlayMenu = document.getElementById("overlayMenu");
const menuClose = document.getElementById("menuClose");
const hero = document.querySelector('.hero-parallax');
const heroVideo = document.querySelector(".hero-video-bg");
const heroText = document.querySelector(".hero-content");

/* WHO WE ARE — MEDIA DRIFT */
const whoVideo = document.querySelector(".who-visual video");

/* WHAT WE DO — ASYMMETRIC DRIFT */
const serviceCols = document.querySelectorAll(".service-col");

function closeMenu() {
    overlayMenu.classList.remove("active");
    menuToggle.classList.remove("active");
}

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    overlayMenu.classList.toggle("active");
});

menuClose.addEventListener("click", closeMenu);

document.querySelectorAll(".overlay-menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// window.addEventListener("scroll", () => {
//   if (!hero) return;

//   const scrollY = window.scrollY;
//   const heroHeight = hero.offsetHeight;

//   if (scrollY <= heroHeight) {
//     const progress = scrollY / heroHeight;

//     /* STRONGER, visible parallax */
//     heroVideo.style.transform = `
//       translateY(${progress * 120}px)
//       scale(1.12)
//     `;

//     heroText.style.transform = `
//       translateY(${progress * 40}px)
//     `;
//   }
// });

window.addEventListener("scroll", () => {
  if (!hero) return;

  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  // Only animate while hero is in view
  if (scrollY <= heroHeight) {
    const progress = scrollY / heroHeight;

    /* PARALLAX (dominant effect) */
    heroVideo.style.transform = `
      translateY(${progress * 120}px)
      scale(1.12)
    `;

    heroText.style.transform = `
      translateY(${progress * 40}px)
    `;

    /* OPACITY (secondary, subtle) */
    heroVideo.style.opacity = `${0.55 - progress * 0.3}`; // 0.55 → 0.25
    heroText.style.opacity = `${0.55 - progress * 1.1}`;     // 1 → 0
  }
});

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  serviceCols.forEach((col, i) => {
    const intensity = i === 1 ? 0.035 : 0.02;
    col.style.transform = `translateY(${y * intensity}px)`;
  });
});