# Supply Chain Visibility Platform (Prototype)

A proof-of-concept platform designed to bridge the visibility gap between wholesalers and small retailers (kirana stores). This platform replaces blind ordering and intuition with real-time, data-driven stock signals, ultimately reducing locked working capital and preventing stockouts.

## Key Features

- **Dynamic Stock Colour Codes**: Instead of raw numbers, retailers see contextual availability signals (Green, Orange, Red) tailored to their order sizes.
- **Two-Sided Dashboard**: Separate portals for retailers to place requests and wholesalers to review them.
- **The Tier System**: Retailers are assigned tiers (Gold, Silver, Bronze) based on reliability, unlocking priority fulfilment.
- **Wholesaler Trust Scores**: Data-driven, public profiles for wholesalers showing Order Accuracy, On-Time Rate, and Dispute Rate.
- **Real-Time Order Flow**: Integrated mock backend that connects the Retailer and Wholesaler views instantly using React Context.
- **Bilingual Support**: Full English and Hindi localization (via `react-i18next`).

## Tech Stack

- React 19 (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- React Router (Routing)
- Lucide React (Icons)
- React-i18next (Internationalization)

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the local URL (usually `http://localhost:5173`).

## Project Structure

- `src/components`: UI components (Navbar, Hero, Problem/Solution sections, etc.)
- `src/pages`: Main views (`LandingPage`, `RetailerDashboard`, `WholesalerDashboard`)
- `src/context`: Shared global state (`OrderContext`)
- `src/i18n`: Translation JSON dictionaries for English and Hindi.
