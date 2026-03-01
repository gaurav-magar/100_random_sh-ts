const spotlight = document.querySelector('.spotlight');
const sections = document.querySelectorAll('section');

const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  spotlight.style.background = `
    radial-gradient(
      circle 180px at ${x}px ${y}px,
      transparent 0%,
      rgba(0,0,0,0.2) 40%,
      rgba(0,0,0,0.97) 100%
    )
  `;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    const inside =
      x > rect.left &&
      x < rect.right &&
      y > rect.top &&
      y < rect.bottom;

    section.classList.toggle('active', inside);
  });
});