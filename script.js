/* ❤️ Hearts animation */
const heartsContainer = document.querySelector('.hearts');

if (heartsContainer) {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = Math.random() > 0.5 ? '💗' : '🤍';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 700);
}

/* ❌ NO button escape (index page only) */
const noBtn = document.querySelector('.no');

function moveNoButtonAnywhere() {
  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  noBtn.style.left = Math.random() * maxX + 'px';
  noBtn.style.top = Math.random() * maxY + 'px';
}

if (noBtn) {
  noBtn.addEventListener('mouseenter', moveNoButtonAnywhere);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButtonAnywhere();
  });
}

/* ✅ YES button redirect */
const yesBtn = document.querySelector('.yes');

if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    window.location.href = 'surprise.html';
  });
}

/* 🎞 Slider + swipe + auto-slide */
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const sliderWindow = document.querySelector('.slider-window');
let index = 0;

const music = document.getElementById('bg-music');
const musicList = [
  'music/1.mp3',
  'music/2.mp3',
  'music/3.mp3'
];

function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;

  slides.forEach(slide => {
    const p = slide.querySelector('p');
    p.style.animation = 'none';
    p.offsetHeight;
    p.style.animation = 'fadeInText 1.5s ease forwards';
  });
}

function playMusic() {
  if (!music) return;
  music.src = musicList[index];
  music.volume = 0.4;
  music.play();
}

if (track && slides.length > 0 && sliderWindow) {
  updateSlide();

  let autoSlide = setInterval(nextSlide, 5000);

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
    playMusic();
  }

  ['click', 'touchstart'].forEach(evt => {
    sliderWindow.addEventListener(evt, () => {
      clearInterval(autoSlide);
    });
  });

  // 📱 Swipe
  let startX = 0;

  sliderWindow.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  sliderWindow.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50 && index < slides.length - 1) index++;
    if (diff < -50 && index > 0) index--;
    updateSlide();
    playMusic();
  });
}

/* 🔓 Unlock music after first interaction */
document.body.addEventListener('click', () => {
  if (music && music.paused) playMusic();
}, { once: true });
