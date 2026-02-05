const menuToggle = document.getElementById("menuToggle");
const overlayMenu = document.getElementById("overlayMenu");
const menuClose = document.getElementById("menuClose");
const hero = document.querySelector('.hero-parallax');
const parallaxStack = document.querySelector('.parallax-stack');

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

// parallax scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  let progress = Math.min(scrollY / heroHeight, 1);

  hero.style.opacity = 1 - progress * 0.6;
  hero.style.transform = `scale(${1 - progress * 0.05})`;
});

window.addEventListener('scroll', () => {
  const stackBottom =
    parallaxStack.offsetTop + parallaxStack.offsetHeight;

  if (window.scrollY > stackBottom) {
    hero.style.opacity = 1;
    hero.style.transform = 'none';
  }
});
