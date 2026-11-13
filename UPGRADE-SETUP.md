# Cityscape Greenery frontend upgrade

## What changed
- Product listings, product details, and category results now fetch products from the backend API.
- Phone OTP login/signup now calls the backend and stores the returned JWT.
- Checkout creates orders through the API; order history and success page read backend orders.
- Promo code field validates codes against the backend.
- Contact form posts to the backend, so messages appear under Admin → Contact messages.
- Testimonials load from the database.
- About, Privacy and Terms content loads from the admin-managed Pages API.
- WhatsApp, contact details, social links, shipping fee and threshold can be managed from Admin → Settings.

## Setup
1. Keep the frontend `.env.example` as a reference; optionally create `.env` with `VITE_API_URL=http://localhost:5000/api`.
2. Install dependencies with `npm install`.
3. Start frontend with `npm run dev`.

The default API URL is `http://localhost:5000/api`. For deployment, set `VITE_API_URL` to your deployed backend API URL and rebuild the frontend.

Cart and favorites remain in browser local storage by design. User accounts, products, contact messages, testimonials, promo validation, pages and orders are backed by the API/database.
