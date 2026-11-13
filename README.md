# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## API-driven storefront

The original storefront visual design and section components are retained. The frontend loads products, hero slides, homepage section copy/cards, categories, testimonials, store settings, blog posts, promo validation and contact submissions from the backend API. Configure `VITE_API_URL` in `.env` (default: `http://localhost:5000/api`).

Homepage copy and section order/visibility are managed from Admin → Homepage personal tabs. The heading tab includes Featured/category, Our Bestsellers, Our Products, New Arrivals, and hero stats/features. The frontend uses local fallback copy when the CMS API is unavailable.


## API configuration

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_URL` to the Express API base URL, including `/api`.
3. The backend should expose `/api/health`; the frontend uses the configured API base for JSON requests and media URLs.
4. For production deployments, configure `VITE_API_URL` in your hosting provider before building the frontend. Vite environment variables are embedded at build time, so rebuild after changing them.
5. Do not commit `.env` files or credentials.
