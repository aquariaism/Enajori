// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let testimonialInterval;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

// ===== DOM CONTENT LOADED EVENT =====
document.addEventListener('DOMContentLoaded', function() {
  initializeWebsite();
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
  hideLoadingScreen();
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initializeWebsite() {
  initializeNavigation();
  initializeScrollEffects();
  initializeTestimonialSlider();
  initializeLightbox();
  initializeContactForm();
  initializeScrollToTop();
  initializeSmoothScrolling();
  initializeAnimationObserver();
  initializeParallaxEffects();
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000);
  }
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
  const mobileMenu = document.getElementById('mobile-menu');
  const navItems = document.getElementById('nav-items');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenu && navItems) {
    mobileMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      navItems.classList.toggle('active');
      document.body.style.overflow = navItems.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navItems.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !navItems.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navItems.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    if (pageYOffset >= (section.offsetTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
    window.addEventListener('scroll', function() {
      scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    });
  }
}

// ===== TESTIMONIAL SLIDER =====
function initializeTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (!track || !dots.length) return;

  function updateSlider() {
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    testimonials.forEach((card, i) => card.classList.toggle('active', i === currentTestimonial));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentTestimonial));
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateSlider();
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    currentTestimonial = i;
    updateSlider();
    resetAutoPlay();
  }));

  function startAutoPlay() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function resetAutoPlay() {
    clearInterval(testimonialInterval);
    startAutoPlay();
  }

  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    slider.addEventListener('mouseleave', startAutoPlay);
  }

  updateSlider();
  startAutoPlay();
}

// ===== LIGHTBOX =====
function initializeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImage = document.getElementById('lightbox-image');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImage || !closeBtn) return;

  function closeLightbox() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalImage.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', e => { if (e.target === modal) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeLightbox();
  });
}

function openLightbox(imageSrc, caption) {
  const modal = document.getElementById('lightbox-modal');
  const modalImage = document.getElementById('lightbox-image');
  const modalCaption = document.getElementById('lightbox-caption');
  if (modal && modalImage) {
    modalImage.src = imageSrc;
    if (modalCaption && caption) modalCaption.textContent = caption;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// ===== SCROLL TO TOP =====
function initializeScrollToTop() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (!scrollToTopBtn) return;
  window.addEventListener('scroll', function() {
    scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    scrollToTopBtn.style.opacity = window.pageYOffset > 300 ? '1' : '0';
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ANIMATION OBSERVER =====
function initializeAnimationObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-aos], .product-card, .artisan-card, .testimonial-card, .shop-card')
    .forEach(el => observer.observe(el));
}

// ===== PARALLAX =====
function initializeParallaxEffects() {
  const elements = document.querySelectorAll('.hero');
  window.addEventListener('scroll', () => {
    const offset = window.pageYOffset * -0.5;
    elements.forEach(el => el.style.transform = `translateY(${offset}px)`);
  });
}
