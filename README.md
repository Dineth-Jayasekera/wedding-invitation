# Dineth & Ishini Wedding Invitation

## Overview
A premium wedding invitation landing page built with HTML, Bootstrap 5, Tailwind utilities, and custom CSS. Includes countdown timer, RSVP form wired for Google Sheets, interactive map, and calendar actions.

## Setup
1. Open index.html in a browser.
2. Update the wedding date/time in js/countdown.js.
3. Replace RSVP webhook URL in js/rsvp.js with your Google Apps Script web app endpoint.
4. Update the WhatsApp number in index.html.
5. Update calendar details in js/script.js.

## Google Apps Script Webhook
Use a Google Apps Script web app that accepts POST requests and writes to Google Sheets. In js/rsvp.js, set RSVP_WEBHOOK_URL to the deployed Web App URL.

## Notes
- The design uses glassmorphism, shimmer effects, and AOS scroll animations.
- All text and venue details are placeholders. Replace with your final wedding information.
