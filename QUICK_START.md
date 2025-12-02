# ⚡ Quick Start Guide

## 🚨 FIRST: Update Node.js

Your current Node.js (18.14.2) is too old. You need 20.9.0+

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Verify
node --version  # Should show v20.x.x
```

## 🎯 Run Locally (3 Steps)

```bash
# 1. Navigate to project
cd cupones-amor

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open http://localhost:3000

Password: **081125**

## 🎵 Add Your Music

```bash
# Copy your music file to:
public/music/lofi-christmas.mp3
```

## 📸 Add Photos (Optional)

```bash
# Add photos to:
public/images/photo1.jpg
public/images/photo2.jpg
# etc.

# Then edit:
components/LandingHero.tsx
# (See README.md for details)
```

## 🚀 Deploy to Vercel (5 Steps)

```bash
# 1. Initialize git (if not already)
git init
git add .
git commit -m "Cupones de Amor"

# 2. Create GitHub repo and push
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# 3. Go to vercel.com
# 4. Click "New Project"
# 5. Import your GitHub repo → Deploy
```

Done! You'll get a URL like: `cupones-amor.vercel.app`

## 🎁 Create QR Code

1. Go to https://www.qr-code-generator.com/
2. Paste your Vercel URL
3. Download QR code
4. Print on Christmas card

## ✅ Checklist

- [ ] Update Node.js to 20+
- [ ] Run `npm install`
- [ ] Test locally with `npm run dev`
- [ ] Add music file to `public/music/`
- [ ] (Optional) Add photos to `public/images/`
- [ ] (Optional) Customize coupons in `data/coupons.ts`
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Create QR code
- [ ] Print QR code on card
- [ ] Give to girlfriend 💕

## 🆘 Need Help?

- **Full docs:** See README.md
- **Setup issues:** See SETUP_NOTES.md
- **Project overview:** See PROJECT_SUMMARY.md

## 🎄 You're Almost Done!

Just update Node, add music, deploy, and create the QR code.

She's going to love it! 💝

