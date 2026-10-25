# Bites of Paradise — website

React 18 + Vite 5 + Framer Motion. No UI framework; all styling is in `src/styles/global.css`.

```bash
npm install
npm run dev      # local
npm run build    # production build in dist/
```

## Where to change things

| What | File |
| --- | --- |
| WhatsApp number, phone, Instagram, map, opening hours, promo banner | `src/config.js` |
| Dishes, prices, descriptions, categories, house favourites | `src/data/menu.js` |
| Dish photos (square-ish WebP) | `src/assets/dishes/` |

Set `RESTAURANT.whatsapp` (digits only, e.g. `2348012345678`) to send orders and table requests straight to WhatsApp. Until it is set, customers get a "Copy" button instead.

`vercel.json` rewrites every path to `index.html`, so deep links like `/menu/pasta` work on refresh. Old links (`/home`, `/menus/...`, `/book`) redirect to the new pages.
