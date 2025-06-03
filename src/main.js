// Simple smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle (basic implementation)
  const mobileMenuButton = document.querySelector('.md\\:hidden button');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      // This would expand the mobile menu
      console.log('Mobile menu clicked');
    });
  }
});

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50; // Change this value to adjust when the navbar changes color

function updateNavbar() {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.remove('navbar-transparent');
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.add('navbar-transparent');
    navbar.classList.remove('navbar-scrolled');
  }
}

// Initial check
updateNavbar();

// Add scroll event listener
window.addEventListener('scroll', updateNavbar);
