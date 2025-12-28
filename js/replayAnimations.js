// Replay CSS animations on every page load
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".index-wrapper, .letter-page, .video-page, .love-page, .love-card, .letter-container"
  );

  animatedElements.forEach(el => {
    el.style.animation = "none";
    // Force reflow
    el.offsetHeight;
    el.style.animation = "";
  });
});
