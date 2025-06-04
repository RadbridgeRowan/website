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
  console.log('DOM Content Loaded');
  
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

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  console.log('Mobile Menu Button:', mobileMenuButton);
  console.log('Mobile Menu:', mobileMenu);
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Mobile menu button clicked');
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
      }
    });

    // Prevent menu from closing when clicking inside the menu
    mobileMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
      }
    });
  }

  // Add ESC key support for closing modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      // Also close mobile menu when pressing ESC
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
      }
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
