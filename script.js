// ─── MOBILE MENU ───
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  const spans = mobileMenuBtn.querySelectorAll('span');
  if (mainNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// ─── HERO SLIDER ───
const dots = document.querySelectorAll('.slider-dots .dot');
let heroInterval = null;

function activateDot(index) {
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    activateDot(i);
    resetHeroInterval(i);
  });
});

function resetHeroInterval(current) {
  if (heroInterval) clearInterval(heroInterval);
  let i = current || 0;
  heroInterval = setInterval(() => {
    i = (i + 1) % dots.length;
    activateDot(i);
  }, 5000);
}

resetHeroInterval(0);

// ─── COFFEE SLIDER ───
const coffeeSlides = document.querySelector('.coffee-slides');
const csPrev = document.querySelector('.cs-prev');
const csNext = document.querySelector('.cs-next');
const totalSlides = document.querySelectorAll('.coffee-slide').length;
let csIndex = 0;

function moveCoffeeSlider(dir) {
  csIndex = (csIndex + dir + totalSlides) % totalSlides;
  coffeeSlides.style.transform = `translateX(-${csIndex * 100}%)`;
}

csPrev.addEventListener('click', () => moveCoffeeSlider(-1));
csNext.addEventListener('click', () => moveCoffeeSlider(1));

setInterval(() => moveCoffeeSlider(1), 4000);

// ─── STICKY HEADER SHADOW ───
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(0,0,0,0.4)'
    : 'none';
});

// ─── SMOOTH FADE-IN ON SCROLL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.product-card, .stat, .service-item, .engagement-card, .cafes-list, .cafes-map'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
