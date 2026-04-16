/* ===== STARS ===== */
(function () {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.012;
    for (const s of stars) {
      const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 80 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,245,230,${a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

/* ===== FLOATING PETALS ===== */
(function () {
  const container = document.getElementById('petals-container');
  const symbols = ['✿', '✾', '❀', '✽', '⚘', '❋'];
  const colors = ['rgba(212,84,126,0.55)', 'rgba(240,132,168,0.45)', 'rgba(201,169,110,0.4)', 'rgba(255,200,220,0.35)'];

  function spawnPetal() {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.fontSize = (Math.random() * 10 + 8) + 'px';
    const dur = Math.random() * 10 + 12;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 6 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 8) * 1000);
  }

  for (let i = 0; i < 16; i++) setTimeout(spawnPetal, i * 600);
  setInterval(spawnPetal, 1800);
})();

/* ===== INTRO MESSAGES ===== */
document.addEventListener('DOMContentLoaded', function () {
  const messages = [
    "Heyyy Jii... today is April 19th — your birthday 🌸",
    "And I really wanted to make it feel like more than just a normal day 💖",
    "You always carry so much inside you, yet somehow you still show up for everyone else...",
    "I don't think you fully see how much light you bring into the lives around you.",
    "But I do. And I wanted today to remind you of that 🥹",
    "So I made something — just for you.",
    "Something small, but full of everything I couldn't just say out loud...",
    "This one's for you, Jii ❤️"
  ];

  let index = 0, charIndex = 0;
  const textEl = document.getElementById('text');
  const btn = document.getElementById('nextBtn');

  function typeText() {
    if (charIndex < messages[index].length) {
      textEl.textContent += messages[index].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 38);
    } else {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }
  }

  function nextStep() {
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    index++;
    charIndex = 0;
    textEl.textContent = '';
    if (index < messages.length) {
      setTimeout(typeText, 350);
    } else {
      openMain();
    }
  }

  function openMain() {
    const intro = document.getElementById('intro');
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      const main = document.getElementById('mainContent');
      main.style.display = 'block';
      document.body.style.overflow = 'auto';
      startTyping();
    }, 1200);
  }

  btn.addEventListener('click', nextStep);
  typeText();
});

/* ===== HERO TYPING EFFECT ===== */
const heroText = "Today, the world is celebrating the day you were born — and so am I. You are someone who makes ordinary moments feel like they matter, who gives more than you ever take, and who carries a grace that most people spend a lifetime trying to find. This little corner of the internet exists just for you, today. 💫";

function startTyping() {
  let i = 0;
  const el = document.getElementById('typing');
  function type() {
    if (i < heroText.length) {
      el.textContent += heroText.charAt(i);
      i++;
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 500);
}

/* ===== AUTOPLAY MUSIC ===== */
window.addEventListener('load', function () {
  const music = document.getElementById('bgMusic');
  const play = music.play();
  if (play !== undefined) {
    play.catch(() => {
      document.addEventListener('click', () => music.play(), { once: true });
    });
  }
});

/* ===== SHOW SURPRISE ===== */
function showSurprise() {
  const s = document.getElementById('surprise');
  s.classList.remove('hidden');
  document.querySelector('.btn').style.display = 'none';
  setTimeout(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, 100);
}

/* ===== OPEN GIFT ===== */
function openGift() {
  document.getElementById('popup').classList.remove('hidden');
  launchConfetti();
  launchFireworks();
}

/* ===== CLOSE POPUP ===== */
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.opacity = '0';
  popup.style.transition = 'opacity 0.4s';
  setTimeout(() => {
    popup.classList.add('hidden');
    popup.style.opacity = '';
    popup.style.transition = '';
  }, 400);
}

/* ===== CONFETTI ===== */
function launchConfetti() {
  const colors = ['#d4547e', '#f084a8', '#c9a96e', '#e8c98a', '#ffffff', '#ffb3c6'];
  for (let i = 0; i < 140; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const size = Math.random() * 7 + 4;
    c.style.cssText = `
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      left:${Math.random() * 100}vw;
      top:-10px;
      opacity:1;
      transition: top ${2.5 + Math.random() * 1.5}s ease, opacity 0.5s ease ${2.5 + Math.random()}s, transform ${2.5 + Math.random() * 1.5}s ease;
      transform:rotate(0deg);
    `;
    document.body.appendChild(c);
    setTimeout(() => {
      c.style.top = (60 + Math.random() * 40) + 'vh';
      c.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
    }, 50);
    setTimeout(() => { c.style.opacity = '0'; }, 2600);
    setTimeout(() => c.remove(), 4200);
  }
}

/* ===== FIREWORKS ===== */
function launchFireworks() {
  const colors = ['#d4547e', '#f084a8', '#c9a96e', '#ffffff', '#ffb3c6', '#ffd6e7'];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    const size = Math.random() * 6 + 4;
    s.style.cssText = `
      position:fixed;
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:50%;
      top:${cy}px; left:${cx}px;
      z-index:9998;
      pointer-events:none;
      transition:all ${1.2 + Math.random() * 0.8}s cubic-bezier(0,0,0.5,1);
      opacity:1;
    `;
    document.body.appendChild(s);
    const angle = (Math.PI * 2 / 80) * i;
    const dist = Math.random() * 260 + 80;
    setTimeout(() => {
      s.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
      s.style.opacity = '0';
    }, 30);
    setTimeout(() => s.remove(), 2200);
  }
}
