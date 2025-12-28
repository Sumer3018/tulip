// 🔓 DEV PREVIEW MODE (set false before final deploy)
const PREVIEW_UNLOCK = false;

// 🔐 UNLOCK DATE
const UNLOCK_DATE = new Date(2025, 11, 30, 0, 0); // Dec 30, 00:00

let overlay;
let countdownBoxes;

// Start lock ONLY if not unlocked
if (!localStorage.getItem("siteUnlocked")) {
  createLock();
  setInterval(updateLock, 1000);
}

function isMoonMinute(diff) {
  return diff <= 60000 && diff > 0; // last 60 seconds
}


function createLock() {
  overlay = document.createElement("div");
  overlay.className = "lock-overlay";

  overlay.innerHTML = `
    <div class="lock-card">

      <h1 class="lock-title">Almost There 🌷</h1>

      <p class="lock-line">
        A story written with patience, love,<br/>
        and a thousand heartbeats… 💖
      </p>

      <p class="lock-line-soft" data-moon>
  The night is holding its breath For you Babygirl🌙
</p>


      <div class="lock-countdown">
        <div class="lock-box"><span class="num">00</span><span class="label">Days</span></div>
        <div class="lock-box"><span class="num">00</span><span class="label">Hours</span></div>
        <div class="lock-box"><span class="num">00</span><span class="label">Minutes</span></div>
        <div class="lock-box"><span class="num">00</span><span class="label">Seconds</span></div>
      </div>

      <p class="lock-footer">
        Something beautiful is waiting…
      </p>

    </div>
  `;

  document.body.classList.add("locked");
  document.body.appendChild(overlay);
  countdownBoxes = document.querySelectorAll(".lock-box .num");
}

function updateLock() {
  if (PREVIEW_UNLOCK) {
    unlockSite();
    return;
  }

  const now = new Date();
  const diff = UNLOCK_DATE - now;

  if (isMoonMinute(diff)) {
    document.body.classList.add("moon-mode");
    for (let i = 0; i < 2; i++) spawnMoonParticle();
    
    if(isMoonMinute(diff) && window.innerWidth < 768)
    {
      heartbeatVibrate();
    }
  } 
  else {
    document.body.classList.remove("moon-mode");
  }
  
  if (diff <= 0) {
    unlockSite();
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const values = [d, h, m, s].map(v => String(v).padStart(2, "0"));

  countdownBoxes.forEach((el, i) => {
    el.textContent = values[i];
  });
  
}

function unlockSite() {
  document.body.classList.remove("locked");

  if (localStorage.getItem("siteUnlocked")) return;

  localStorage.setItem("siteUnlocked", "true");

  // Transform countdown boxes
  document.querySelectorAll(".lock-box").forEach((box, i) => {
    setTimeout(() => {
      box.classList.add("transform");
      box.querySelector(".num").style.opacity = "0";
      box.querySelector(".label").style.opacity = "0";
    }, i * 120);
  });

  // Dissolve card
  const card = document.querySelector(".lock-card");
  setTimeout(() => card.classList.add("lock-dissolve"), 600);

  // Petals + hearts
  spawnHeartBloom();

  for(let i = 0; i < 30; i++) {
    setTimeout(spawnPetal, i* 60);
  }

  setTimeout(() => {
    overlay.remove();
  }, 1800);
}

function spawnPetal() {
  const img = document.createElement("img");
  img.src = Math.random() > 0.5
    ? "assets/images/tulip.png"
    : "assets/images/hearts.svg";

  img.style.position = "fixed";
  img.style.left = Math.random() * 100 + "vw";
  img.style.bottom = "0";
  img.style.width = "34px";
  img.style.opacity = 0.85;
  img.style.zIndex = 9999;
  img.style.animation = "floatUp 4.8s ease-in-out forwards";

  document.body.appendChild(img);
  setTimeout(() => img.remove(), 5000);
}

function spawnMoonParticle() {
  const dot = document.createElement("div");
  dot.className = "moon-particle";

  dot.style.left = Math.random() * 100 + "vw";
  dot.style.top = Math.random() * 100 + "vh";
  dot.style.animationDuration = 6 + Math.random() * 4 + "s";

  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 10000);
}

function heartbeatVibrate() {
  if (!navigator.vibrate) return;

  navigator.vibrate([80, 120, 80]);
}

function spawnHeartBloom() {
  const points = [
    [50, 40], [45, 35], [40, 30], [45, 25], [50, 30],
    [55, 25], [60, 30], [55, 35],
    [50, 55], [45, 60], [50, 65], [55, 60]
  ];

  points.forEach(([x, y], i) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = Math.random() > 0.5
        ? "assets/images/tulip.png"
        : "assets/images/hearts.svg";

      img.style.position = "fixed";
      img.style.left = x + "vw";
      img.style.top = y + "vh";
      img.style.width = "36px";
      img.style.opacity = 0;
      img.style.animation = "heartBloom 2.5s ease forwards";
      img.style.zIndex = 9999;

      document.body.appendChild(img);
      setTimeout(() => img.remove(), 4000);
    }, i * 120);
  });
}

// 🔧 DEV DEBUG HELPERS (remove later)
window.spawnPetal = spawnPetal;
window.unlockSite = unlockSite;
