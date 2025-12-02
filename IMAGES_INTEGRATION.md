# 📸 Images Integration Guide

## Overview

Your personal photos have been integrated into the LandingHero component as beautiful floating polaroid-style photos!

---

## 🖼️ Images Used

The following images from `/public/images/` are displayed:

1. **img1.jpg** - Top left, rotated -8°, caption: "💕"
2. **img2.jpg** - Top right, rotated 5°, caption: "Nosotros"
3. **img3.jpg** - Bottom left, rotated 12°, caption: "Juntos"
4. **img4.jpg** - Bottom right, rotated -5°, caption: "Siempre"
5. **img5.jpg** - Middle left, rotated -12°, caption: "🎄"
6. **img6.JPG** - Middle right, rotated 8°, caption: "Amor"
7. **img7.jpg** - Top center, rotated -3°, caption: "💖"
8. **img8.jpg** - Bottom center, rotated 6°, caption: "Forever"

**Note:** img9.jpg is available but not currently used (you have 8 floating positions)

---

## 🎨 Design Features

### Desktop View (md and up)
- **8 floating polaroids** scattered across the screen
- **Large size** - 160px × 192px polaroid frames
- **Gentle floating animation** - Each photo floats up and down (20px range)
- **Staggered entrance** - Photos appear one by one with delays
- **Rotation variety** - Each photo has a unique tilt
- **Hover effect** - Photos scale up slightly on hover
- **White polaroid frame** with shadow
- **Custom captions** below each photo

### Mobile View (small screens)
- **4 floating polaroids** - First 4 photos from the array
- **Smaller size** - 96px × 112px polaroid frames (60% of desktop)
- **Same positions** - Uses same x/y coordinates as desktop
- **Gentle floating** - 15px movement range (smaller than desktop)
- **Same animations** - Entrance and floating effects
- **No hover effect** - Touch-friendly
- **Compact captions** - Smaller text for mobile

---

## 🎯 Photo Positions

```
Desktop Layout (approximate):

    [7]                    
[1]         [2]            
                           
[5]                   [6]  
                           
[3]         [8]       [4]  
```

### Position Details

| Photo | X Position | Y Position | Rotation | Delay |
|-------|-----------|-----------|----------|-------|
| img1  | 8%        | 10%       | -8°      | 0.2s  |
| img2  | 78%       | 15%       | 5°       | 0.3s  |
| img3  | 12%       | 75%       | 12°      | 0.4s  |
| img4  | 72%       | 70%       | -5°      | 0.5s  |
| img5  | 5%        | 45%       | -12°     | 0.6s  |
| img6  | 85%       | 45%       | 8°       | 0.7s  |
| img7  | 40%       | 8%        | -3°      | 0.8s  |
| img8  | 45%       | 85%       | 6°       | 0.9s  |

---

## 🎬 Animations

### Entrance Animation
```typescript
initial: { opacity: 0, scale: 0.8 }
animate: { opacity: 1, scale: 1 }
transition: { delay: photo.delay, duration: 0.8 }
```

### Floating Animation
```typescript
animate: { y: [0, -20, 0] }
transition: {
  delay: photo.delay + 0.8,
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut"
}
```

### Hover Effect
```css
hover:scale-105 transition-transform duration-300
```

---

## 🎨 Polaroid Styling

### Frame
- **Background:** White
- **Padding:** 12px (p-3)
- **Shadow:** Extra large (shadow-2xl)
- **Border radius:** Small (rounded-sm)
- **Size:** 160px × 192px (w-40 h-48)

### Photo Area
- **Size:** 160px × 144px (w-full h-36)
- **Background:** Gray-100 (fallback)
- **Border radius:** Small (rounded-sm)
- **Overflow:** Hidden
- **Image fit:** Cover (fills entire area)

### Caption
- **Alignment:** Center
- **Size:** Extra small (text-xs)
- **Margin top:** 8px (mt-2)
- **Color:** Gray-700
- **Font weight:** Medium

---

## 🔧 Customization

### Change Photo Positions
Edit the `photos` array in `components/LandingHero.tsx`:
```typescript
const photos = [
  {
    id: 1,
    src: "/images/img1.jpg",
    x: "8%",      // Horizontal position
    y: "10%",     // Vertical position
    rotation: -8, // Rotation in degrees
    delay: 0.2,   // Entrance delay
    caption: "💕" // Caption text
  },
  // ... more photos
];
```

### Change Captions
Update the `caption` property for each photo:
```typescript
{ id: 1, ..., caption: "Your custom text" }
```

### Add img9.jpg
Add another entry to the `photos` array:
```typescript
{
  id: 9,
  src: "/images/img9.jpg",
  x: "50%",
  y: "50%",
  rotation: 0,
  delay: 1.0,
  caption: "Extra"
}
```

### Change Polaroid Size
Modify the className in the polaroid div:
```typescript
className="bg-white p-3 shadow-2xl rounded-sm w-40 h-48"
//                                                 ↑    ↑
//                                              width height
```

### Adjust Floating Speed
Change the `duration` in the floating animation:
```typescript
y: {
  duration: 4, // Change this (higher = slower)
  repeat: Infinity,
  ease: "easeInOut"
}
```

---

## 📱 Responsive Behavior

### Desktop (md: 768px and up)
- ✅ 8 floating polaroids visible (all photos)
- ✅ Large size (160px × 192px)
- ✅ Full animations (20px float range)
- ✅ Hover effects enabled
- ❌ Mobile polaroids hidden

### Mobile (< 768px)
- ✅ 4 floating polaroids visible (first 4 photos)
- ✅ Smaller size (96px × 112px)
- ✅ Gentle animations (15px float range)
- ✅ Main content clearly visible
- ✅ Better performance (fewer photos)
- ❌ Desktop polaroids hidden

---

## 🎁 User Experience

When your girlfriend views the landing page:

1. **Page loads** → Gradient background appears
2. **Photos fade in** → One by one with staggered delays
3. **Photos float** → Gentle up and down motion
4. **Hover effect** → Photos grow slightly when hovered
5. **Romantic atmosphere** → Personal photos create emotional connection
6. **Main message** → Clear and readable over the photos

---

## 🖼️ Image Optimization

### Next.js Image Component
- **Automatic optimization** - Images are optimized by Next.js
- **Lazy loading** - Images load as needed
- **Responsive** - Correct sizes served to different devices
- **WebP format** - Modern format used when supported

### Benefits
- ✅ Faster page load
- ✅ Better performance
- ✅ Automatic caching
- ✅ Optimized file sizes

---

## 🎨 Visual Hierarchy

The layout ensures the main message is always readable:

1. **Background** - Gradient (lowest layer)
2. **Floating photos** - Scattered around (middle layer)
3. **Main content** - Center, z-10 (highest layer)
4. **Music toggle** - Fixed top-right, z-50 (always on top)

---

## ✨ Final Result

Your landing page now features:
- ✅ 8 personal photos as floating polaroids
- ✅ Smooth entrance animations
- ✅ Gentle floating motion
- ✅ Romantic captions
- ✅ Hover interactions
- ✅ Mobile-friendly grid
- ✅ Optimized images
- ✅ Beautiful polaroid frames

**The perfect romantic introduction to your coupon world!** 💕🎄

