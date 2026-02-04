const menuToggle = document.getElementById("menuToggle");
const overlayMenu = document.getElementById("overlayMenu");
const menuClose = document.getElementById("menuClose");

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
