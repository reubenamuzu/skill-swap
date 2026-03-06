// const menuToggle = document.getElementById("menu-toggle");
// const navLinks = document.getElementById("nav-links");
// const siteNav = document.querySelector(".site-nav");

// if (siteNav) {
//   window.addEventListener("scroll", () => {
//     siteNav.classList.toggle("window-scroll", window.scrollY > 20);
//   });
// }

// if (menuToggle && navLinks) {
//   menuToggle.addEventListener("click", () => {
//     const isOpen = navLinks.classList.toggle("open");
//     menuToggle.classList.toggle("is-open", isOpen);
//     menuToggle.setAttribute("aria-expanded", String(isOpen));
//     menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
//   });

//   navLinks.querySelectorAll("a").forEach((link) => {
//     link.addEventListener("click", () => {
//       navLinks.classList.remove("open");
//       menuToggle.classList.remove("is-open");
//       menuToggle.setAttribute("aria-expanded", "false");
//       menuToggle.setAttribute("aria-label", "Open menu");
//     });
//   });
// }

// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", (event) => {
//     const targetId = anchor.getAttribute("href");
//     if (!targetId || targetId === "#") {
//       return;
//     }

//     const target = document.querySelector(targetId);
//     if (!target) {
//       return;
//     }

//     event.preventDefault();
//     target.scrollIntoView({ behavior: "smooth", block: "start" });
//   });
// });

// localStorage.setItem("school", "Reuben Korsi");

// let userNameS = localStorage.getItem("school");
// console.log(userNameS);

let student = localStorage.setItem("names", JSON.stringify(["Ben", "Mark", "John", "Mary", "Jane"]));

console.log(student);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const mainNav = document.getElementById('main-nav');

  if (burgerMenu && mainNav) {
    burgerMenu.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }
});
