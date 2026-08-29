# Backend (ERPNext / `alicia_reviews`) — client requests, Aug 2026

Backend lives in the WSL bench: `~/frappe-bench/apps/alicia_reviews`, site
`alicia.boraerp.co.ke` (Frappe v15). Frontend posts bookings to
`POST /api/method/alicia_reviews.api.website_bookings` → **Website Booking** doc.

## Done — branch `feat/booking-weekend-and-notifications` on `alicia_reviews`

All controlled from a new single **Alicia Booking Settings**
(Desk → search "Alicia Booking Settings"). Seeded with defaults by a migrate patch.

| Request | What was built |
|---|---|
| Fri/Sat = walk-in only, no appointments | `Website Booking.validate` + the website API reject a new booking whose preferred date is a Friday/Saturday, with a message you can edit in settings. |
| Cancel already-booked Fri/Sat | Daily scheduled job `cancel_weekend_bookings` sets **upcoming** open Fri/Sat bookings to Cancelled with a comment. Past bookings are left alone. |
| System should show a count for new bookings | Every new website booking creates a desk **Notification Log** (the bell) for each user listed in `notify_recipients` (default: Judy + Maggie). |
| SMS the client when Confirmed / Cancelled | On status change to Confirmed or Cancelled, an SMS is sent to the client's phone using the editable templates. Salon can also opt into an SMS on every new booking. |
| Booking "didn't appear in the system" | Was already fixed before this change (bookings show in the Website Booking list). |

Tests: `bench --site alicia.boraerp.co.ke run-tests --module alicia_reviews.alicia_reviews.doctype.website_booking.test_website_booking` (14 cases).

## Operator steps to finish activation

1. **Deploy the branch**: merge `feat/booking-weekend-and-notifications` → `develop`,
   `bench --site alicia.boraerp.co.ke migrate`, then restart `bench start`
   (the running honcho session) so the scheduler registers the daily job.
   Scheduler has been enabled (`bench --site alicia.boraerp.co.ke enable-scheduler`).
2. **SMS gateway (required for the client texts to actually send)** — still a blocker.
   Until this is set, confirm/cancel just write a line to `logs/alicia_reviews.log`
   and `sms_enabled` stays off.
   - Get an SMS provider from the client (Africa's Talking or similar): gateway URL,
     API key/params, sender ID.
   - Configure **SMS Settings** in Desk (gateway URL + parameters + the message/number
     param names).
   - Tick **Send SMS to clients on Confirm / Cancel** in Alicia Booking Settings.
   - Test: set a test Website Booking to Confirmed, confirm the text arrives.
3. **Check the recipient list** in Alicia Booking Settings (`notify_recipients`, one
   user email per line) matches who should get the bell alerts.

## Still blocked — card payments via KCB

Needs KCB merchant onboarding / IPG authorization. Nothing to build until the bank
issues credentials; then add a payment step to checkout / booking.

## Note

`~/frappe-bench/apps/AHB` is a copy of this frontend repo, not a Frappe app and not
installed on the site — ignore it; the live frontend is the Vercel deploy.
