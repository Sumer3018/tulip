import { getNextBirthday } from "./dateLogic.js";

const timer = document.querySelector(".countdown-timer");

if (timer) {
  const target = getNextBirthday();

  const updateCountdown = () => {
    const now = new Date();
    let diff = target - now;

    // If birthday reached
    if (diff <= 0) {
      timer.innerHTML = `
        <div class="count-card">
          <span class="count-number">🎉</span>
          <span class="count-label">Today</span>
        </div>
      `;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timer.innerHTML = `
      <div class="count-card">
        <span class="count-number">${String(days).padStart(2, "0")}</span>
        <span class="count-label">Days</span>
      </div>

      <div class="count-card">
        <span class="count-number">${String(hours).padStart(2, "0")}</span>
        <span class="count-label">Hours</span>
      </div>

      <div class="count-card">
        <span class="count-number">${String(minutes).padStart(2, "0")}</span>
        <span class="count-label">Minutes</span>
      </div>

      <div class="count-card">
        <span class="count-number">${String(seconds).padStart(2, "0")}</span>
        <span class="count-label">Seconds</span>
      </div>
    `;
  };

  // Initial render (important)
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);
}
