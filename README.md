# 💕 Cupones de Amor - Christmas Gift 2025

A romantic, password-protected coupon website built as a Christmas gift. This is a personal portal of special moments to share together, accessed via a QR code.

## 🎁 What is this?

This is a Next.js web application that presents a collection of romantic "coupons" for activities, meals, and special moments. Each coupon can be redeemed and tracked using localStorage.

### ✨ Features

- 🔐 **Password-protected** access with your special date
- 🎵 **Background music** player (lofi Christmas vibes)
  - Persists across all pages without restarting
  - Toggle button on every page
  - Auto-starts when entering coupons section
- 🖼️ **Floating polaroid photos** on landing page
- 🎟️ **20 romantic coupons** across 3 categories
- 🎨 **Beautiful gradients** and glassmorphism effects
- ✨ **Smooth animations** with Framer Motion
- 🎉 **Confetti celebration** when redeeming coupons
- 💾 **Persistent state** - redeemed coupons are saved
- 🧭 **Page-based routing** - proper URLs for each screen

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher (20.9.0+ recommended for Next.js 16)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd cupones-amor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The password to access the site is: **081125** (the date you became boyfriend & girlfriend)

## 🎨 Customization

### Changing the Password

Edit `components/PasswordGate.tsx` and change the `CORRECT_PASSWORD` constant:

```typescript
const CORRECT_PASSWORD = "081125"; // Change this to your desired password
```

### Adding/Editing Coupons

Edit `data/coupons.ts` to add, remove, or modify coupons. Each coupon has:
- `id`: Unique identifier
- `category`: "Actividades", "Comida", or "Extras"
- `title`: Main title with emoji
- `subtitle`: Short description
- `description`: Full description shown in the modal

### Replacing Photos

The floating polaroid photos in the landing screen are currently placeholders. To add real photos:

1. Add your images to the `public/images/` folder (create it if it doesn't exist)
2. Edit `components/LandingHero.tsx`
3. Replace the placeholder div with actual images:

```tsx
<Image
  src="/images/photo1.jpg"
  alt="Us"
  fill
  className="object-cover rounded-sm"
/>
```

### Adding Background Music

1. Add your music file to `public/music/` (e.g., `lofi-christmas.mp3`)
2. The file is already referenced in `components/LandingHero.tsx`
3. Supported formats: MP3, WAV, OGG

**Note:** The music will only play after user interaction (clicking the "Enter" button) due to browser autoplay policies.

### Changing Colors & Styling

- Main gradient backgrounds are in each component (search for `bg-gradient-to-br`)
- Category colors are defined in `components/CouponCard.tsx` and `components/CouponModal.tsx`
- Global styles are in `app/globals.css`

## 📦 Building for Production

Build the optimized production version:

```bash
npm run build
```

Test the production build locally:

```bash
npm start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

Your site will be live in minutes! You'll get a URL like `your-project.vercel.app`

### Other Deployment Options

This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- Render
- Any platform that supports Node.js

## 📱 Creating a QR Code

Once deployed:

1. Get your deployment URL (e.g., `https://cupones-amor.vercel.app`)
2. Use a QR code generator like:
   - [QR Code Generator](https://www.qr-code-generator.com/)
   - [QRCode Monkey](https://www.qrcode-monkey.com/)
3. Generate a QR code with your URL
4. Download and print it on your Christmas card!

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Confetti:** canvas-confetti
- **Routing:** Next.js App Router (page-based)
- **State:** React Hooks + localStorage

## 🧭 Navigation & Routes

The app uses Next.js App Router with the following pages:

- **`/`** - Root page (redirects to `/password` or `/landing`)
- **`/password`** - Password gate screen
- **`/landing`** - Landing page with music and photos
- **`/coupons`** - Coupons grid with filtering

All routes are protected and check for authentication. See [ROUTING_GUIDE.md](./ROUTING_GUIDE.md) for detailed information.

## 💾 Data Persistence

- Password access is stored in `localStorage` as `hasAccess`
- Redeemed coupons are stored in `localStorage` as `redeemedCoupons`
- Data persists across browser sessions and page navigation
- Clearing browser data will reset everything

## 📝 License

This is a personal project. Feel free to use it as inspiration for your own romantic gifts! 💕

## 🎄 Merry Christmas!

Made with love for someone special.
