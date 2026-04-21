const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const navToggle = document.getElementById("navToggle");
const navCollapse = document.getElementById("navbarNav");

if (navToggle && navCollapse) {
  navToggle.addEventListener("click", () => {
    const isOpen = navCollapse.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navCollapse.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navCollapse.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


const eventDetails = {
  title: "Ishini & Dineth Wedding",
  description: "Join us for the wedding celebration.",
  location: "Saminro Grand Palace, 287 Makola Rd, Kiribathgoda",
  start: "20260724T100000",
  end: "20260724T170000",
};

const googleCalendarLink = document.getElementById("google-calendar-link");
const icsButton = document.getElementById("download-ics");

if (googleCalendarLink) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventDetails.title,
    details: eventDetails.description,
    location: eventDetails.location,
    dates: `${eventDetails.start}/${eventDetails.end}`,
  });
  googleCalendarLink.href = `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const downloadICS = () => {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Luxury Wedding//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description}`,
    `LOCATION:${eventDetails.location}`,
    `DTSTART:${eventDetails.start}`,
    `DTEND:${eventDetails.end}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-invitation.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

if (icsButton) {
  icsButton.addEventListener("click", downloadICS);
}

const musicToggle = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");

if (musicToggle && bgMusic) {
  bgMusic.volume = 0.05; // Start with very low volume for a gentle fade-in

  const setPlayingState = (isPlaying) => {
    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.querySelector(".music-text").textContent = isPlaying
      ? "Pause Music"
      : "Play Music";
  };

  const tryAutoPlay = async () => {
    try {
      await bgMusic.play();
      setPlayingState(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleFirstInteraction = async () => {
    const started = await tryAutoPlay();
    if (started) {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    }
  };

  tryAutoPlay();
  document.addEventListener("click", handleFirstInteraction, { once: false });
  document.addEventListener("touchstart", handleFirstInteraction, { once: false });

  musicToggle.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        setPlayingState(true);
      } catch (error) {
        // Autoplay may be blocked until a user gesture.
      }
    } else {
      bgMusic.pause();
      setPlayingState(false);
    }
  });
}
