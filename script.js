// === PAGE LOADER ===
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.page-loader').classList.add('loaded');
  }, 1400);
});

// === NAVBAR SCROLL ===
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// === MOBILE NAV ===
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// === SMOOTH ANCHOR SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// === HERO 3D MOUSE TRACKING ===
const heroVisual = document.querySelector('.hero-visual-inner');
if (heroVisual) {
  const heroSection = document.querySelector('.hero');
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroVisual.style.transform = 'rotateY(0deg) rotateX(0deg)';
    heroVisual.style.transition = 'transform 0.6s ease';
    setTimeout(() => { heroVisual.style.transition = 'transform 0.1s linear'; }, 600);
  });
}

// === SERVICE CARD 3D TILT ===
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(800px) rotateY(0) rotateX(0)';
  });
});

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Open clicked if it was closed
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// === PARALLAX BACKGROUND GRADIENTS ===
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const gradients = document.querySelectorAll('.hero-bg-gradient, .hero-bg-gradient-2');
  gradients.forEach((g, i) => {
    g.style.transform = `translateY(${scrollY * (0.15 + i * 0.05)}px)`;
  });
});

// === SHOWCASE HORIZONTAL DRAG SCROLL ===
const showcase = document.querySelector('.showcase-scroll');
if (showcase) {
  let isDown = false, startX, scrollLeft;
  showcase.addEventListener('mousedown', (e) => {
    isDown = true; showcase.style.cursor = 'grabbing';
    startX = e.pageX - showcase.offsetLeft;
    scrollLeft = showcase.scrollLeft;
  });
  showcase.addEventListener('mouseleave', () => { isDown = false; showcase.style.cursor = 'grab'; });
  showcase.addEventListener('mouseup', () => { isDown = false; showcase.style.cursor = 'grab'; });
  showcase.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - showcase.offsetLeft;
    showcase.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}
