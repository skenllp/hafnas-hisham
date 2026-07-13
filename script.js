// Countdown to 14 August 2026, 7:00 PM (venue local time)
const target = new Date("2026-08-14T19:00:00");

const els = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  mins: document.getElementById("cd-mins"),
  secs: document.getElementById("cd-secs"),
};

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    els.days.textContent = "00";
    els.hours.textContent = "00";
    els.mins.textContent = "00";
    els.secs.textContent = "00";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);
  const secs = Math.floor(diff / 1000);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.mins.textContent = pad(mins);
  els.secs.textContent = pad(secs);
}

tick();
const timer = setInterval(tick, 1000);

// Cover Overlay & Background Music Control
const music = document.getElementById("bg-music");
const cover = document.getElementById("cover-overlay");
const openBtn = document.getElementById("open-btn");
const musicToggle = document.getElementById("music-toggle");
const playIcon = document.getElementById("music-playing-icon");
const pauseIcon = document.getElementById("music-paused-icon");

if (openBtn && cover && music) {
  openBtn.addEventListener("click", () => {
    // Fade out overlay
    cover.classList.add("fade-out");
    document.body.classList.remove("no-scroll");
    
    // Play background music
    music.play().then(() => {
      musicToggle.classList.remove("hidden");
    }).catch((err) => {
      console.warn("Audio playback failed or was blocked by browser autoplay rules:", err);
      musicToggle.classList.remove("hidden");
      // If browser blocked audio, show paused icon state initially
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    });
    
    // Hide overlay completely after fade animation completes
    setTimeout(() => {
      cover.style.display = "none";
    }, 800);
  });
}

if (musicToggle && music) {
  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play().then(() => {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
      });
    } else {
      music.pause();
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    }
  });
}

// Floating flower petals (decorative, respects reduced-motion)
(function initFloatingFlowers(){
  const container = document.getElementById("floating-flowers");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const colors = ["#D8BB74", "#B8923F", "#3B6656"]; // gold-light, gold, green-soft
  const PETAL_COUNT = 14;

  function flowerSVG(color) {
    return `
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <g fill="${color}" opacity="0.8">
          <ellipse cx="20" cy="10" rx="6" ry="10"/>
          <ellipse cx="20" cy="10" rx="6" ry="10" transform="rotate(72 20 20)"/>
          <ellipse cx="20" cy="10" rx="6" ry="10" transform="rotate(144 20 20)"/>
          <ellipse cx="20" cy="10" rx="6" ry="10" transform="rotate(216 20 20)"/>
          <ellipse cx="20" cy="10" rx="6" ry="10" transform="rotate(288 20 20)"/>
          <circle cx="20" cy="20" r="4.5" fill="#F0E2C3"/>
        </g>
      </svg>`;
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement("div");
    petal.className = "flower-petal";

    const size = 12 + Math.random() * 14;       // 12–26px
    const left = Math.random() * 100;            // 0–100%
    const duration = 16 + Math.random() * 12;    // 16–28s
    const delay = -Math.random() * duration;     // stagger start
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.innerHTML = flowerSVG(color);

    container.appendChild(petal);
  }
})();
