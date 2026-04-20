const weddingDate = new Date("2026-07-24T06:00:00").getTime();
const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};
const completeEl = document.getElementById("countdown-complete");

const updateCountdown = () => {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    Object.values(countdownEls).forEach((el) => {
      if (el) {
        el.textContent = "00";
      }
    });
    if (completeEl) {
      completeEl.textContent = "We are Married 💍";
      completeEl.classList.add("is-visible");
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (countdownEls.days) countdownEls.days.textContent = String(days).padStart(2, "0");
  if (countdownEls.hours) countdownEls.hours.textContent = String(hours).padStart(2, "0");
  if (countdownEls.minutes)
    countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  if (countdownEls.seconds)
    countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
};

updateCountdown();
setInterval(updateCountdown, 1000);
