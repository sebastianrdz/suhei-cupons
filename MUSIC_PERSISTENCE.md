# 🎵 Music Persistence Guide

## Overview

The music player now persists across all pages using **React Context**. The music will continue playing seamlessly when navigating between pages without restarting.

---

## 🎯 How It Works

### Global Music State
- Music state is managed by `MusicContext` at the app level
- A single `<audio>` element is created and reused across all pages
- Music playback state persists during navigation

### Architecture

```
app/layout.tsx
  └─ <MusicProvider>
       ├─ Manages global audio element
       ├─ Provides music controls to all pages
       └─ Children (all pages)
            ├─ /password
            ├─ /landing
            └─ /coupons
```

---

## 📁 Files

### Context Provider
**`contexts/MusicContext.tsx`**
- Creates and manages the global `<audio>` element
- Provides music controls: `isPlaying`, `toggleMusic`, `startMusic`, `stopMusic`
- Ensures audio element is created only on client-side

### Music Toggle Component
**`components/MusicToggle.tsx`**
- Reusable music toggle button
- Shows 🔊 when playing, 🔇 when paused
- Fixed position (top-right corner)
- Glassmorphism styling

### Updated Components
- **`app/layout.tsx`** - Wraps app with `<MusicProvider>`
- **`components/LandingHero.tsx`** - Uses `useMusic()` hook
- **`components/CouponsSection.tsx`** - Includes `<MusicToggle />`
- **`components/PasswordGate.tsx`** - Includes `<MusicToggle />`

---

## 🎮 Music Controls

### Available Functions

```typescript
const { isPlaying, toggleMusic, startMusic, stopMusic } = useMusic();
```

- **`isPlaying`** - Boolean indicating if music is currently playing
- **`toggleMusic()`** - Toggle between play/pause
- **`startMusic()`** - Start playing music
- **`stopMusic()`** - Stop/pause music

### Usage Example

```typescript
import { useMusic } from "@/contexts/MusicContext";

function MyComponent() {
  const { isPlaying, startMusic } = useMusic();
  
  const handleClick = () => {
    if (!isPlaying) {
      startMusic();
    }
  };
  
  return <button onClick={handleClick}>Play Music</button>;
}
```

---

## 🎨 Music Toggle Button

The `<MusicToggle />` component is displayed on all pages:

### Features
- **Fixed position** - Always visible in top-right corner
- **Animated entrance** - Fades in smoothly
- **Glassmorphism** - Backdrop blur with transparency
- **Visual feedback** - Shows current state (🔊/🔇)
- **Accessible** - Includes aria-label

### Styling
```css
position: fixed
top: 1.5rem (24px)
right: 1.5rem (24px)
z-index: 50
background: white/20 with backdrop-blur
```

---

## 🔄 Navigation Flow

### Music Behavior During Navigation

1. **Password Page → Landing Page**
   - Music can be toggled on password page
   - If playing, continues to landing page
   - Landing page can start music on "Ver cupones" click

2. **Landing Page → Coupons Page**
   - Music continues playing seamlessly
   - No restart or interruption
   - Toggle button remains functional

3. **Coupons Page → Landing Page**
   - Music state preserved
   - Playback continues uninterrupted

4. **Page Refresh**
   - Music stops (browser limitation)
   - User can restart with toggle button

---

## 🎵 Auto-Start Behavior

### Automatic Playback on First Interaction
Music automatically starts on the **first user interaction** (click or keypress):

```typescript
// In MusicContext.tsx
useEffect(() => {
  const tryAutoplay = () => {
    if (!hasTriedAutoplay.current && audioRef.current && !isPlaying) {
      hasTriedAutoplay.current = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Autoplay blocked:", error));
    }
  };

  // Listen for first user interaction
  document.addEventListener("click", tryAutoplay, { once: true });
  document.addEventListener("keydown", tryAutoplay, { once: true });
}, [isPlaying]);
```

### How It Works
1. **User opens the app** - Music is ready but not playing
2. **User clicks anywhere** (e.g., password input, submit button) - Music starts automatically
3. **Music continues** - Plays throughout entire experience
4. **No interruption** - Persists across all page navigation

### Why This Approach?
- ✅ **Bypasses browser restrictions** - User interaction allows autoplay
- ✅ **Seamless experience** - Starts naturally when user engages
- ✅ **No manual toggle needed** - Automatic on first click
- ✅ **Reliable** - Works in all modern browsers

---

## 🛠️ Technical Details

### Client-Side Only
```typescript
useEffect(() => {
  if (typeof window !== "undefined" && !audioRef.current) {
    audioRef.current = new Audio("/music/lofi-christmas.mp3");
    audioRef.current.loop = true;
  }
}, []);
```

- Audio element created only in browser (not during SSR)
- Prevents hydration mismatches
- Ensures compatibility with Next.js

### Cleanup
```typescript
return () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current = null;
  }
};
```

- Properly cleans up audio element on unmount
- Prevents memory leaks

---

## 🎯 Benefits

✅ **Seamless Experience**
- Music never restarts during navigation
- Smooth transitions between pages

✅ **User Control**
- Toggle button on every page
- Can start/stop music anytime

✅ **Performance**
- Single audio element (not one per page)
- Efficient memory usage

✅ **Clean Code**
- Centralized music logic
- Reusable components
- Easy to maintain

---

## 🎨 Customization

### Change Music File
Update the audio source in `contexts/MusicContext.tsx`:
```typescript
audioRef.current = new Audio("/music/your-file.mp3");
```

### Change Toggle Button Position
Edit `components/MusicToggle.tsx`:
```typescript
className="fixed top-6 right-6 ..." // Change top/right values
```

### Change Toggle Button Style
Modify the className in `MusicToggle.tsx`:
```typescript
className="fixed ... bg-white/20 backdrop-blur-md ..."
```

### Disable Auto-Start
Remove auto-start from `LandingHero.tsx`:
```typescript
const handleEnter = () => {
  // Remove the startMusic() call
  onEnter();
};
```

---

## 🐛 Troubleshooting

### Music Doesn't Play
- Check that `/public/music/lofi-christmas.mp3` exists
- Browser may block autoplay - user must interact first
- Check browser console for errors

### Music Restarts on Navigation
- Ensure `MusicProvider` is in `layout.tsx`
- Check that components use `useMusic()` hook
- Verify no local audio elements in components

### Toggle Button Not Visible
- Check z-index (should be 50)
- Verify component is imported correctly
- Check for CSS conflicts

---

## 📊 State Management

### Context Structure
```typescript
interface MusicContextType {
  isPlaying: boolean;      // Current playback state
  toggleMusic: () => void; // Toggle play/pause
  startMusic: () => void;  // Start playing
  stopMusic: () => void;   // Stop playing
}
```

### Provider Hierarchy
```
<html>
  <body>
    <MusicProvider>
      {/* All pages have access to music context */}
      <YourPage />
    </MusicProvider>
  </body>
</html>
```

---

## 🎉 Result

Music now plays continuously across all pages, providing a cohesive romantic atmosphere throughout the entire experience! 💕🎵

