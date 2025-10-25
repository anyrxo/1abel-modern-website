# NEW PRODUCT SYSTEM - IMPLEMENTATION PLAN

## Overview
Transform from 38 individual products → 22 base products × 5 colors × 2 arcs = 220 SKUs

## Color Palettes

### Arc 2 — Shadow
- **VOID** (pure black #0a0a0a)
- **STEEL** (dark grey #3a3a3a)
- **BLOOD** (deep burgundy #4a1a1a)
- **MOSS** (dark forest green #1a2a1a)
- **EARTH** (dark brown #2a1a0a)

### Arc 3 — Light
- **SAKURA** (light pink #ffd4e5)
- **MIST** (soft blue #d4e5ff)
- **CLOUD** (white #ffffff)
- **SAND** (cream #f5f0e8)
- **LILAC** (soft lavender #e8d4ff)

## Base Products (22 total)

### Tops (8)
1. THERMAL - $185/$182
2. HOODIE - $195/$192
3. COACH JACKET - $205/$202
4. CREWNECK - $175/$172
5. LONG-SLEEVE TEE - $95/$92
6. TEE - $75/$72
7. OVERSHIRT - $165/$162
8. PUFFER - $285/$275

### Bottoms (6)
1. CARGO PANTS - $165/$162
2. SWEATPANTS - $135/$132
3. DENIM - $185/$178
4. JOGGERS - $145/$142
5. SHORTS - $95/$92
6. WIDE PANTS - $155/$152

### Accessories (8)
1. CHAIN - $145/$142
2. RING - $95/$92
3. BEANIE - $55/$52
4. GLOVES - $85/$82
5. BELT - $125/$122
6. CAP - $65/$62
7. SOCKS (3-pack) - $45/$42
8. TOTE BAG - $85/$82

## Product Page Structure

### URL Structure
- `/arc-2/tops/thermal` (shows all 5 Arc 2 colors)
- `/arc-3/tops/thermal` (shows all 5 Arc 3 colors)

### Page Features
1. **Color Selector** - Visual swatches, click to switch
2. **Dynamic Pricing** - Updates based on Arc
3. **Size Selector** - Adapts to product (clothing sizes vs accessories)
4. **"Pairs With" Section** - 3-4 recommendations based on color theory
5. **Product Story** - Ties garment + color together

## Color Pairing Logic

### Cross-Arc Power Pairings
- MOSS (Arc 2) + SAND (Arc 3) - Natural earth harmony
- VOID (Arc 2) + CLOUD (Arc 3) - Classic monochrome
- STEEL (Arc 2) + MIST (Arc 3) - Tonal cool
- BLOOD (Arc 2) + SAND (Arc 3) - Warm rich depth
- EARTH (Arc 2) + SAND (Arc 3) - Full earth tone
- VOID (Arc 2) + SAKURA (Arc 3) - Stark contrast
- STEEL (Arc 2) + LILAC (Arc 3) - Cool gradient
- MOSS (Arc 2) + CLOUD (Arc 3) - Fresh minimal

### Same-Arc Pairings
**Arc 2:**
- VOID + STEEL (tonal dark)
- MOSS + EARTH (natural harmony)
- BLOOD + VOID (classic depth)

**Arc 3:**
- CLOUD + SAKURA (soft tonal)
- SAND + MIST (warm meets cool)
- LILAC + SAKURA (pastel harmony)

## Implementation Phases

### Phase 1: Proof of Concept ✓
- Created base product data structure
- Defined color palettes
- Mapped color pairings

### Phase 2: Build One Complete Example
- THERMAL product (Arc 2 + Arc 3)
- Full color selector
- Pairs With recommendations
- Test build

### Phase 3: Roll Out to All Products
- Replicate system across 22 base products
- Update category pages
- Full build and test

### Phase 4: Deploy
- Commit and push
- Verify live site

## Next Steps
1. Build THERMAL product page as proof of concept
2. Test functionality
3. Roll out to remaining 21 products
