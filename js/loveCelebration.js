// loveCelebration.js

if (typeof yesBtn !== "undefined") {
  yesBtn.addEventListener("click", () => {
    celebrateLove();
  });
}

function celebrateLove() {
  const total = 120; // BIG swarm

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      spawnFloating("hearts.svg", "heart-float");
      spawnFloating("tulip.png", "tulip-float");
    }, i * 35); // staggered = natural flow
  }
}

function spawnFloating(src, className) {
  const img = document.createElement("img");
  img.src = `assets/images/${src}`;
  img.classList.add(className);

  const size = Math.random() * 30 + 20; // 20–50px
  const startX = Math.random() * 100;
  const drift = Math.random() * 80 - 40;

  img.style.width = `${size}px`;
  img.style.left = `${startX}vw`;
  img.style.setProperty("--drift", `${drift}px`);
  img.style.animationDuration = `${Math.random() * 2 + 4}s`;
  img.style.opacity = Math.random() * 0.5 + 0.4;

  document.body.appendChild(img);

  setTimeout(() => img.remove(), 7000);
}
