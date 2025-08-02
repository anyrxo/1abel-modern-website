# 1ABEL LOGO - PERFECT IMPLEMENTATION

## Visual Description
Perfect logo with:
- Large red "1" at 50vh size with glowing animation
- White "ABEL" letters positioned vertically on the right side
- Black starry background with animated sparkles
- Red glow effect around the "1"
- Scroll-based animations for smooth transitions

## Complete Logo Code Implementation

### Main Logo Section (src/app/page.tsx)
```tsx
{/* Logo Section */}
<section className="fixed inset-0 flex items-center justify-center">        
  <motion.div
    style={{ scale: logoScale, opacity: logoOpacity }}
    className="relative z-10"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="text-[50vh] font-bold leading-none text-red-600 relative"
    >
      <motion.span
        animate={{
          textShadow: [
            '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
            '0 0 120px rgba(220, 38, 38, 0.8), 0 0 240px rgba(220, 38, 38, 0.5)',
            '0 0 80px rgba(220, 38, 38, 0.5), 0 0 160px rgba(220, 38, 38, 0.3)',
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        1
      </motion.span>
    </motion.div>
    
    <motion.div
      style={{ opacity: labelOpacity }}
      className="absolute top-[12%] left-[58%] flex flex-col text-[5vh] font-black leading-[1.1] tracking-wide text-white z-20 h-[38vh] justify-between items-center"
    >
      {['A', 'B', 'E', 'L'].map((letter, index) => (
        <motion.span
          key={letter}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 + index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          className="cursor-pointer"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  </motion.div>
</section>
```

### Scroll Animations
```tsx
const { scrollY } = useScroll()
const scrollProgress = useTransform(scrollY, [0, 1500], [0, 1])

// Logo animations - very quick transitions
const logoScale = useTransform(scrollProgress, [0, 0.05, 0.1], [1, 1, 0])
const logoOpacity = useTransform(scrollProgress, [0, 0.04, 0.1], [1, 1, 0])
const labelOpacity = useTransform(scrollProgress, [0, 0.02, 0.08], [0, 1, 0])
```

### Background Stars Animation
```tsx
{/* Background Stars */}
<section className="fixed inset-0 overflow-hidden pointer-events-none">
  {[...Array(100)].map((_, i) => (
    <motion.div
      key={`star-${i}`}
      className="absolute text-white text-xs"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        opacity: [0.1, 0.8, 0.1],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }}
    >
      ✦
    </motion.div>
  ))}
</section>
```

### Navigation Logo (Smaller Version)
```tsx
<Link href="/">
  <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-red-600 cursor-pointer">
    1ABEL
  </motion.div>
</Link>
```

## Key Styling Details

### Colors
- Red "1": `text-red-600` (#dc2626)
- ABEL letters: `text-white` 
- Glow effect: `rgba(220, 38, 38, 0.5)` to `rgba(220, 38, 38, 0.8)`

### Positioning
- "1" size: `text-[50vh]` (50% of viewport height)
- ABEL letters size: `text-[5vh]` (5% of viewport height)
- ABEL position: `top-[12%] left-[58%]`
- ABEL height container: `h-[38vh]`

### Animations
- Initial load: 1.5s ease-out animation
- Glow pulse: 3s infinite cycle
- Letter cascade: 0.15s delay between each letter
- Scroll fade: Disappears at 4-10% scroll progress

### Typography
- Font weight: `font-bold` for "1", `font-black` for ABEL
- Letter spacing: `tracking-wide` for ABEL
- Line height: `leading-[1.1]` for ABEL

## Implementation Notes
- Logo is fixed positioned and stays centered
- Scroll-based opacity transitions
- Individual letter animations with staggered delays
- Glowing text shadow animation on the "1"
- Stars background for cosmic effect
- Responsive and works on all screen sizes

## Perfect Working State
This implementation creates the exact logo shown in the image:
- Large glowing red "1" 
- Vertical white "ABEL" letters on the right
- Starry animated background
- Smooth scroll-based transitions
- Perfect positioning and animations

DO NOT MODIFY - This is the working perfect state!