# 🧭 Routing Guide

## Overview

The app now uses **Next.js App Router** with proper page-based routing instead of state management. This provides:

- ✅ **Better UX** - Browser back/forward buttons work
- ✅ **Shareable URLs** - Each page has its own URL
- ✅ **Better performance** - Code splitting per route
- ✅ **Cleaner code** - Separation of concerns

---

## 📁 Route Structure

```
/                    → Root (redirects to /password or /landing)
/password            → Password gate screen
/landing             → Landing page with music and photos
/coupons             → Coupons grid with filtering
```

---

## 🔐 Route Protection

All routes are protected with client-side checks:

### `/password`
- **Public** - Anyone can access
- Sets `localStorage.hasAccess = "true"` on success
- Redirects to `/landing` after successful authentication

### `/landing`
- **Protected** - Requires authentication
- Checks `localStorage.hasAccess === "true"`
- Redirects to `/password` if not authenticated
- Has "Ver cupones" button that navigates to `/coupons`

### `/coupons`
- **Protected** - Requires authentication
- Checks `localStorage.hasAccess === "true"`
- Redirects to `/password` if not authenticated
- Has back button (←) that navigates to `/landing`

---

## 🚀 Navigation Flow

### First Visit (No Authentication)
```
1. User visits / (root)
   ↓
2. Redirects to /password
   ↓
3. User enters password (081125)
   ↓
4. localStorage.hasAccess = "true"
   ↓
5. Navigates to /landing
   ↓
6. User clicks "Ver cupones"
   ↓
7. Navigates to /coupons
```

### Returning Visit (Already Authenticated)
```
1. User visits / (root)
   ↓
2. Checks localStorage.hasAccess === "true"
   ↓
3. Redirects to /landing
   ↓
4. User can navigate to /coupons
```

### Navigation Between Pages
```
/landing ←→ /coupons
   ↑
   └─ Both protected, can navigate freely
```

---

## 📝 File Structure

### Pages (Routes)
```
app/
├── page.tsx              # Root - handles initial redirect
├── password/
│   └── page.tsx         # Password gate page
├── landing/
│   └── page.tsx         # Landing page
└── coupons/
    └── page.tsx         # Coupons page
```

### Components (Reusable)
```
components/
├── PasswordGate.tsx      # Password form component
├── LandingHero.tsx       # Landing screen component
├── CouponsSection.tsx    # Coupons grid component
├── CouponCard.tsx        # Individual coupon card
└── CouponModal.tsx       # Coupon detail modal
```

---

## 🔧 How It Works

### Root Page (`app/page.tsx`)
```typescript
// Checks authentication and redirects
useEffect(() => {
  const hasAccess = localStorage.getItem("hasAccess");
  if (hasAccess === "true") {
    router.push("/landing");
  } else {
    router.push("/password");
  }
}, [router]);
```

### Password Page (`app/password/page.tsx`)
```typescript
const handlePasswordSuccess = () => {
  localStorage.setItem("hasAccess", "true");
  router.push("/landing");
};
```

### Landing Page (`app/landing/page.tsx`)
```typescript
// Protect route
useEffect(() => {
  const hasAccess = localStorage.getItem("hasAccess");
  if (hasAccess !== "true") {
    router.push("/password");
  }
}, [router]);

// Navigate to coupons
const handleEnter = () => {
  router.push("/coupons");
};
```

### Coupons Page (`app/coupons/page.tsx`)
```typescript
// Protect route
useEffect(() => {
  const hasAccess = localStorage.getItem("hasAccess");
  if (hasAccess !== "true") {
    router.push("/password");
  }
}, [router]);

// Show back button
<CouponsSection showBackButton={true} />
```

---

## 🎨 UI Changes

### Back Button on Coupons Page
- Located at top-left of coupons page
- Animated entrance (slides from left)
- Shows "← Volver" text
- Navigates back to `/landing`

### Navigation is Seamless
- All transitions use Next.js router (no page reload)
- Framer Motion animations still work
- Music continues playing during navigation
- localStorage persists across routes

---

## 🧪 Testing the Routes

### Manual Testing
1. Visit `http://localhost:3000/`
   - Should redirect to `/password`
2. Enter wrong password
   - Should show error message
3. Enter correct password (`081125`)
   - Should redirect to `/landing`
4. Click "Ver cupones"
   - Should navigate to `/coupons`
5. Click "← Volver"
   - Should navigate back to `/landing`
6. Use browser back button
   - Should work correctly
7. Refresh page on `/coupons`
   - Should stay on `/coupons` (authenticated)
8. Clear localStorage and refresh
   - Should redirect to `/password`

---

## 🚨 Important Notes

1. **localStorage is client-side only**
   - Route protection happens in `useEffect` on client
   - Server-side middleware can't access localStorage
   - This is normal for client-side auth

2. **No flash of wrong content**
   - Each protected page shows loading state while checking auth
   - Prevents showing protected content before redirect

3. **Music player state**
   - Music will restart when navigating between pages
   - This is expected behavior with page-based routing
   - Could be improved with global state management if needed

4. **Redeemed coupons persist**
   - Stored in localStorage
   - Survives navigation between pages
   - Survives page refreshes

---

## 🎯 Benefits of This Approach

✅ **Better UX** - Browser navigation works naturally
✅ **Shareable** - Can share direct links to pages
✅ **SEO-friendly** - Each page has its own URL
✅ **Cleaner code** - No complex state management
✅ **Scalable** - Easy to add more pages
✅ **Standard** - Follows Next.js best practices

---

## 🔮 Future Enhancements

Possible improvements:
- Add page transitions with Framer Motion
- Persist music player state across routes
- Add loading skeletons instead of "Cargando..."
- Add 404 page for invalid routes
- Add metadata for each page (title, description)

