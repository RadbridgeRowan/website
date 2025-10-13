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

window.openRequestModal = (e) => {
  if (e) e.preventDefault();
  const modal = document.getElementById('requestModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

window.closeRequestModal = () => {
  const modal = document.getElementById('requestModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
};

// Simple smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Parkbeat modal functionality
  const parkbeatModal = document.getElementById('parkbeat-modal');
  const closeParkbeatModal = document.getElementById('close-parkbeat-modal');

  if (parkbeatModal && closeParkbeatModal) {
    // Show modal after a delay if it hasn't been closed
    if (sessionStorage.getItem('parkbeatModalClosed') !== 'true') {
      setTimeout(() => {
        parkbeatModal.classList.remove('hidden');
        // Add class to trigger transition
        setTimeout(() => {
          parkbeatModal.classList.add('visible');
        }, 10);
      }, 2000);
    }

    // Close and remember
    closeParkbeatModal.addEventListener('click', () => {
      parkbeatModal.classList.remove('visible');
      setTimeout(() => {
        parkbeatModal.classList.add('hidden');
      }, 300); // Wait for transition to finish
      sessionStorage.setItem('parkbeatModalClosed', 'true');
    });
  }

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
      closeRequestModal();
      // Also close mobile menu when pressing ESC
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
      }
    }
  });

  // Close modal when clicking outside
  const contactModal = document.getElementById('contactModal');
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  const requestModal = document.getElementById('requestModal');
  if (requestModal) {
    requestModal.addEventListener('click', (e) => {
      if (e.target === requestModal) {
        closeRequestModal();
      }
    });
  }

  // Sidebar navigation active state on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
});

// Park size selector for pricing
window.selectParkSize = (size) => {
  // Update prices
  const prices = {
    small: { single: '3,000', two: '5,000' },
    medium: { single: '3,500', two: '6,000' },
    large: { single: '4,000', two: '7,000' }
  };

  document.getElementById('price-single').textContent = prices[size].single;
  document.getElementById('price-two').textContent = prices[size].two;
};

// FAQ accordion functionality
window.toggleFaq = (id) => {
  const content = document.getElementById(`faq-content-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    icon.style.transform = 'rotate(45deg)';
  } else {
    content.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
};
