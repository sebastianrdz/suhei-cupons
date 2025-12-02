# 📝 Changelog

## [2025-12-02] - Personal Photos Integration

### ✨ Added
- **Personal photos** - 8 real photos integrated as floating polaroids
  - Replaced placeholder gradients with actual images
  - Each photo has unique position, rotation, and caption
  - Optimized with Next.js Image component
- **Mobile photo grid** - Background grid for small screens
  - 3x2 grid at 20% opacity
  - Maintains atmosphere without overwhelming content
- **Hover effects** - Photos scale up on hover
- **Custom captions** - Romantic text below each photo
- **Documentation** - `IMAGES_INTEGRATION.md` with complete guide

### 🔧 Changed
- **LandingHero component** - Now uses real images instead of placeholders
- **Photo count** - Increased from 4 to 8 floating polaroids
- **Responsive design** - Different layouts for desktop and mobile

### 🎨 Improvements
- ✅ More personal and romantic atmosphere
- ✅ Better visual interest with real photos
- ✅ Optimized image loading
- ✅ Mobile-friendly design

---

## [2025-12-02] - Music Persistence

### ✨ Added
- **Global music context** - Music state managed at app level
  - `contexts/MusicContext.tsx` - React Context for music state
  - `components/MusicToggle.tsx` - Reusable music toggle button
- **Music persists across pages** - No restart when navigating
- **Music toggle on all pages** - Password, Landing, and Coupons
- **Auto-start music on first interaction** - Starts automatically on first click/keypress
  - Bypasses browser autoplay restrictions
  - Seamless experience without manual toggle
  - Works reliably in all modern browsers
- **Volume control** - Set to 70% by default for comfortable listening
- **Documentation** - `MUSIC_PERSISTENCE.md` with complete guide

### 🔧 Changed
- **Removed local audio element** from `LandingHero.tsx`
- **Music state lifted** to app-level context
- **Single audio element** shared across all pages
- **Layout updated** with `<MusicProvider>` wrapper

### 🎯 Benefits
- ✅ Music never restarts during navigation
- ✅ Seamless user experience
- ✅ Better performance (single audio element)
- ✅ Consistent music controls on every page

---

## [2025-12-02] - Routing Implementation

### ✨ Added
- **Page-based routing** using Next.js App Router
  - `/` - Root page with smart redirect logic
  - `/password` - Password gate page
  - `/landing` - Landing page with music and photos
  - `/coupons` - Coupons grid page
- **Back button** on coupons page (← Volver)
- **Route protection** - All pages check authentication
- **Navigation flow** - Proper redirects based on auth state
- **Middleware** setup for future server-side protection
- **Documentation**:
  - `ROUTING_GUIDE.md` - Comprehensive routing documentation
  - Navigation flow diagram (Mermaid)
  - Updated README with routing information

### 🔧 Changed
- **Removed state management** from main `page.tsx`
  - No more `useState` for `hasAccess`, `showLanding`, `showCoupons`
  - Cleaner, simpler code
- **Components now accept router props**
  - `CouponsSection` has optional `showBackButton` prop
  - Components use `useRouter()` for navigation
- **Better UX**
  - Browser back/forward buttons now work
  - Each page has its own URL
  - Can refresh on any page without losing state

### 🐛 Fixed
- **Tailwind CSS v4 gradient syntax** (previous update)
  - All `bg-gradient-to-*` → `bg-linear-to-*`
  - All gradients now render correctly
- **React effect warnings** (previous update)
  - Batched state updates in effects
  - Removed unused imports

### 📚 Files Created
- `app/password/page.tsx` - Password page
- `app/landing/page.tsx` - Landing page
- `app/coupons/page.tsx` - Coupons page
- `middleware.ts` - Route middleware
- `ROUTING_GUIDE.md` - Routing documentation
- `CHANGELOG.md` - This file

### 📝 Files Modified
- `app/page.tsx` - Now handles redirects only
- `components/CouponsSection.tsx` - Added back button support
- `README.md` - Added routing information

### 🎯 Benefits
- ✅ Better user experience with browser navigation
- ✅ Shareable URLs for each page
- ✅ Cleaner, more maintainable code
- ✅ Follows Next.js best practices
- ✅ Easier to add new pages in the future

---

## [2025-12-02] - Initial Release

### ✨ Features
- Password-protected access (081125)
- Landing page with floating polaroid photos
- Background music player
- 20 romantic coupons across 3 categories
- Coupon filtering by category
- Redeem/unredeemed tracking
- Confetti celebration on redeem
- Glassmorphism UI design
- Smooth Framer Motion animations
- localStorage persistence

### 🛠️ Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- canvas-confetti

### 📦 Components
- `PasswordGate` - Password authentication
- `LandingHero` - Landing screen with music
- `CouponsSection` - Coupons grid with filtering
- `CouponCard` - Individual coupon card
- `CouponModal` - Coupon detail modal

### 🎨 Design
- Romantic purple/pink gradient backgrounds
- Glassmorphism effects (backdrop blur)
- Smooth animations and transitions
- Responsive design (mobile-first)
- Custom scrollbar styling

### 💾 Data
- 10 Activity coupons (Monterrey locations)
- 8 Food coupons (restaurants and meals)
- 6 Extra coupons (special moments)
- All data in `data/coupons.ts`

---

## Future Enhancements

Possible improvements for future versions:

- [ ] Page transitions with Framer Motion
- [ ] Persist music player state across routes
- [ ] Add loading skeletons
- [ ] Add 404 page
- [ ] Add metadata for SEO
- [ ] Add Open Graph images
- [ ] Add PWA support (installable app)
- [ ] Add dark/light mode toggle
- [ ] Add coupon expiration dates
- [ ] Add coupon usage history
- [ ] Add photo upload for polaroids
- [ ] Add custom music upload
- [ ] Add admin panel to manage coupons
- [ ] Add email notifications on redeem
- [ ] Add calendar integration

