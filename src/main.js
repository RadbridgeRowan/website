// Modal functionality
window.openContactModal = (e) => {
  if (e) e.preventDefault();
  const modal = document.getElementById('contactModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

window.closeContactModal = () => {
  const modal = document.getElementById('contactModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
};

// Simple smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
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

  // Add ESC key support for closing modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
    }
  });

  // Close modal when clicking outside
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeContactModal();
      }
    });
  }
});
