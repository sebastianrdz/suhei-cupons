# 🚨 Important Setup Notes

## Node.js Version Requirement

**IMPORTANT:** This project requires Node.js version **20.9.0 or higher**.

Your current Node.js version (18.14.2) is too old for Next.js 16.

### How to Update Node.js

#### Option 1: Using nvm (Recommended)

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 20
nvm install 20
nvm use 20

# Verify the version
node --version  # Should show v20.x.x
```

#### Option 2: Download from nodejs.org

Visit [nodejs.org](https://nodejs.org/) and download the LTS version (20.x or higher).

### After Updating Node.js

Once you have Node.js 20+, you can run:

```bash
cd cupones-amor
npm install  # Reinstall dependencies
npm run dev  # Start development server
npm run build  # Build for production
```

## Quick Start (After Node Update)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Go to http://localhost:3000
   - Password: **081125**

## Before Deployment

### 1. Add Your Music File

- Place your music file in `public/music/lofi-christmas.mp3`
- Or update the path in `components/LandingHero.tsx`

### 2. Add Your Photos (Optional)

- Add photos to `public/images/`
- Update `components/LandingHero.tsx` to use real images instead of placeholders

### 3. Customize Content

- Edit `data/coupons.ts` to modify coupons
- Edit `components/PasswordGate.tsx` to change the password
- Update colors and styling as needed

## Deployment to Vercel

Vercel's servers have Node.js 20+, so deployment will work even if your local machine doesn't:

1. Push code to GitHub
2. Connect to Vercel
3. Deploy!

The site will work perfectly on Vercel regardless of your local Node version.

## Troubleshooting

### "Node.js version >=20.9.0 is required"

Update your Node.js version (see above).

### Music doesn't play

- Make sure the file exists at `public/music/lofi-christmas.mp3`
- Music only plays after user interaction (browser security)
- Check browser console for errors

### Photos don't show

- Make sure images are in `public/images/`
- Update the Image components in `LandingHero.tsx`
- Check file paths and extensions

### Coupons don't save

- Check browser localStorage is enabled
- Try clearing browser cache
- Check browser console for errors

## Important: Tailwind CSS v4

This project uses **Tailwind CSS v4**, which has different syntax than v3:

- ✅ Use `bg-linear-to-br` instead of `bg-gradient-to-br`
- ✅ Use `bg-linear-to-r` instead of `bg-gradient-to-r`
- ✅ No `tailwind.config.js` file needed
- ✅ Configuration is in `globals.css` with `@import "tailwindcss"`

If you see styling issues, make sure you're using the v4 syntax!

## Project Structure

```
cupones-amor/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page with state management
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── PasswordGate.tsx   # Password screen
│   ├── LandingHero.tsx    # Landing page with music
│   ├── CouponsSection.tsx # Coupons grid
│   ├── CouponCard.tsx     # Individual coupon card
│   └── CouponModal.tsx    # Coupon detail modal
├── data/
│   └── coupons.ts         # Coupon data
├── hooks/
│   └── useRedeemedCoupons.ts  # localStorage hook
└── public/
    ├── music/             # Add music file here
    └── images/            # Add photos here
```

## Need Help?

Check the main README.md for detailed documentation!

