const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => revealObserver.observe(el));

const typing = document.getElementById('typing');
const phrases = ['build --next', 'ship --production', 'learn --always'];
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop(){
  const p = phrases[phraseIndex];
  typing.textContent = deleting ? p.slice(0, charIndex--) : p.slice(0, charIndex++);
  if (!deleting && charIndex > p.length + 5) deleting = true;
  if (deleting && charIndex < 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; charIndex = 0; }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('pointermove', e => {
    if (window.innerWidth < 800) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
