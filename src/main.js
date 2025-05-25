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
