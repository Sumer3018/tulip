const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const loveMessage = document.getElementById("love-message");
const bearImg = document.querySelector(".bear-container img");
const bgMusic = document.getElementById("bgMusic");
const loveCard = document.querySelector(".love-card");
const nextStory = document.getElementById("nextStory");


function moveNoButton() {
  const maxX = 120;
  const maxY = 80;

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

if (noBtn) {
  // Desktop: move BEFORE cursor reaches
  noBtn.addEventListener("mouseenter", moveNoButton);

  // Mobile: move on touch proximity
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    loveMessage.innerHTML = `
  <p class="journey-line">
    Confession → Celebration
  </p>
    <div class="love-line-main">
    I knew it… 💖
  </div>
  <div class="love-line-soft">
    In every lifetime, in every universe,<br/>
    I will always be with <b>you</b>. You belong to me My Beautiful Little Princess👸🌷
  </div>
`;

    loveMessage.classList.add("show");

    // Swap bear image
    bearImg.src = "assets/images/mocha-bear-heart.png";
    
    loveCard.classList.add("glow");


    if (bgMusic) {
  bgMusic.currentTime = 0;
  bgMusic.volume = 0.05;   // START LOW (valid)
  bgMusic.muted = false;

  bgMusic.play().catch(err => {
    console.log("Audio play failed:", err);
  });


  let vol = 0.05;
  const fadeIn = setInterval(() => {
    if (vol < 0.4) {       // MAX SAFE VOLUME
      vol += 0.02;
      bgMusic.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 200);
}

    if (nextStory) {
  nextStory.classList.remove("hidden");
}

document.querySelector(".next-btn").addEventListener("click", () => {
  window.location.href = "video.html";
});

  });
}
