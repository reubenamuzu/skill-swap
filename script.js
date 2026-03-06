
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const mainNav = document.getElementById('main-nav');

  if (burgerMenu && mainNav) {
    burgerMenu.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // Hide Navbar on Scroll Down, Show on Scroll Up
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', () => {
      // If mobile menu is open, don't hide the header
      if (mainNav && mainNav.classList.contains('open')) return;
      
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling down & past 80px
        header.classList.add('nav-hidden');
      } else {
        // Scrolling up
        header.classList.remove('nav-hidden');
      }
      lastScrollY = window.scrollY;
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});
