const rsvpForm = document.getElementById("rsvp-form");
const rsvpStatus = document.getElementById("rsvp-status");
const rsvpButton = document.getElementById("rsvp-submit");

const RSVP_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzecAkaIQ7nbVd_SwPv4wpCQnMIc50YfjlFvskH6Ia0Vg82RqaP9Q0ZgbEhxrQNUjOR/exec";

const setStatus = (message, isError = false) => {
  if (!rsvpStatus) return;
  rsvpStatus.textContent = message;
  rsvpStatus.style.color = isError ? "#b64b60" : "#8f7aa8";
};

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (rsvpButton) rsvpButton.disabled = true;
    setStatus("Sending...");

    const formData = new FormData(rsvpForm);
    const payload = new URLSearchParams({
      name: formData.get("name"),
      phone: formData.get("phone"),
      attendance: formData.get("attendance"),
      guestCount: formData.get("guestCount"),
      message: formData.get("message"),
    });

    try {
      const response = await fetch(RSVP_WEBHOOK_URL, {
        method: "POST",
        body: payload,
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : { success: response.ok };
      if (result.success) {
        setStatus("RSVP received. Thank you!");
        rsvpForm.reset();
      } else {
        setStatus("Sorry, something went wrong.", true);
      }
    } catch (error) {
      setStatus("Unable to submit. Please try again.", true);
    } finally {
      if (rsvpButton) rsvpButton.disabled = false;
    }
  });
}
