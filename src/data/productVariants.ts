// This file contains all color-specific stories and pairing recommendations

// Arc 2 Shadow - Color Stories for each base product
export const ARC2_COLOR_STORIES: Record<string, Record<string, string>> = {
  THERMAL: {
    VOID: "Born from late nights in the studio. This thermal in VOID embodies the weight of creation—heavy, substantial, grounding. Pure black that absorbs light and attention. It's not what you wear when you're trying to impress. It's what you wear when you're focused on the work.",
    STEEL: "The STEEL colorway bridges darkness and light. Dark grey that shifts with the light—sometimes charcoal, sometimes smoke. This thermal grounds you without the severity of pure black. For those who move between worlds.",
    BLOOD: "BLOOD runs deep. This thermal in deep burgundy carries intensity without aggression. A color that commands presence—rich, layered, unapologetic. For those who understand that power doesn't need to shout.",
    MOSS: "The MOSS colorway connects you to earth. Dark forest green that darkens with wear, lightens with wash. This thermal grounds you in nature while maintaining the Shadow aesthetic. Heavy, organic, alive.",
    EARTH: "EARTH tone that anchors everything. Dark brown that develops character with time—creases, fades, patina. This thermal is the foundation. Neutral enough to pair with anything, substantial enough to stand alone."
  },
  HOODIE: {
    VOID: "For those who understand that presence doesn't require volume. The VOID hoodie creates negative space around you—a field of calm in chaos. Pure black that commands attention through absence.",
    STEEL: "STEEL grey that moves between shadows. This hoodie in dark charcoal bridges the gap between stealth and style. Wear it when you need to be seen and unseen at the same time.",
    BLOOD: "The BLOOD hoodie carries quiet intensity. Deep burgundy that speaks without shouting. This is power wrapped in comfort—substantial, grounded, unapologetic.",
    MOSS: "MOSS brings nature into the shadow. Dark forest green that grounds you in earth while keeping the heavy aesthetic. Organic color, architectural construction.",
    EARTH: "EARTH tones for those who build from the ground up. This hoodie in dark brown develops character with every wear—fades, creases, tells your story."
  },
  // Similar structures for other products...
  // Using generic template for efficiency
}

// Arc 3 Light - Color Stories
export const ARC3_COLOR_STORIES: Record<string, Record<string, string>> = {
  THERMAL: {
    SAKURA: "The SAKURA thermal brings softness to structure. Light pink that catches morning light. This is strength in gentleness—heavyweight construction in an ethereal colorway. For those who understand that power doesn't need to be dark.",
    MIST: "MIST blue like early morning fog. This thermal breathes—soft blue that calms and centers. Lightweight aesthetic, heavyweight construction. The contradiction is the point.",
    CLOUD: "CLOUD white that reflects everything. This thermal in pure white is the canvas. Clean, minimal, essential. It shows every wear, every wash, every moment.",
    SAND: "SAND brings warmth to minimalism. Cream thermal that works with earth tones and pastels alike. This is the bridge—warm enough to ground you, light enough to elevate.",
    LILAC: "LILAC for the in-between hours. Soft lavender that exists in the space between day and night. This thermal is ethereal structure—light color, heavy build."
  }
}

// Pairing recommendations based on color theory
export const ARC2_PAIRINGS: Record<string, Record<string, any[]>> = {
  THERMAL: {
    VOID: [
      { product: 'CARGO PANTS', color: 'STEEL', arc: 'Arc 2', reason: 'Tonal dark layering', price: 165 },
      { product: 'CARGO PANTS', color: 'CLOUD', arc: 'Arc 3', reason: 'High contrast monochrome', price: 162 },
      { product: 'BEANIE', color: 'STEEL', arc: 'Arc 2', reason: 'Grounded grey accent', price: 55 }
    ],
    STEEL: [
      { product: 'CARGO PANTS', color: 'VOID', arc: 'Arc 2', reason: 'Classic dark tonal', price: 165 },
      { product: 'DENIM', color: 'MIST', arc: 'Arc 3', reason: 'Cool blue harmony', price: 178 },
      { product: 'BEANIE', color: 'CLOUD', arc: 'Arc 3', reason: 'Soft contrast', price: 52 }
    ],
    BLOOD: [
      { product: 'CARGO PANTS', color: 'VOID', arc: 'Arc 2', reason: 'Classic depth pairing', price: 165 },
      { product: 'DENIM', color: 'EARTH', arc: 'Arc 2', reason: 'Warm rich tones', price: 185 },
      { product: 'CARGO PANTS', color: 'SAND', arc: 'Arc 3', reason: 'Warm neutral balance', price: 162 }
    ],
    MOSS: [
      { product: 'CARGO PANTS', color: 'EARTH', arc: 'Arc 2', reason: 'Natural earth harmony', price: 165 },
      { product: 'SWEATS', color: 'SAND', arc: 'Arc 3', reason: 'Cross-arc earth tones', price: 132 },
      { product: 'BEANIE', color: 'VOID', arc: 'Arc 2', reason: 'Grounded black accent', price: 55 }
    ],
    EARTH: [
      { product: 'CARGO PANTS', color: 'MOSS', arc: 'Arc 2', reason: 'Organic green + brown', price: 165 },
      { product: 'DENIM', color: 'SAND', arc: 'Arc 3', reason: 'Full earth tone flow', price: 178 },
      { product: 'BEANIE', color: 'EARTH', arc: 'Arc 2', reason: 'Tonal warm layering', price: 55 }
    ]
  }
}

// Generic pairing template that works for all products
export function getDefaultPairings(colorKey: string, arc: 'ARC_2' | 'ARC_3'): any[] {
  const pairings: Record<string, any[]> = {
    // Arc 2 pairings
    VOID: [
      { product: 'CARGO PANTS', color: 'STEEL', arc: 'Arc 2', reason: 'Tonal dark layering', price: 165 },
      { product: 'SWEATS', color: 'CLOUD', arc: 'Arc 3', reason: 'High contrast', price: 132 },
      { product: 'BEANIE', color: 'VOID', arc: 'Arc 2', reason: 'Monochrome depth', price: 55 }
    ],
    STEEL: [
      { product: 'DENIM', color: 'VOID', arc: 'Arc 2', reason: 'Dark tonal', price: 185 },
      { product: 'CARGO PANTS', color: 'MIST', arc: 'Arc 3', reason: 'Cool harmony', price: 162 },
      { product: 'CAP', color: 'STEEL', arc: 'Arc 2', reason: 'Tonal layering', price: 65 }
    ],
    BLOOD: [
      { product: 'DENIM', color: 'VOID', arc: 'Arc 2', reason: 'Rich depth', price: 185 },
      { product: 'CARGO PANTS', color: 'SAND', arc: 'Arc 3', reason: 'Warm neutrals', price: 162 },
      { product: 'BELT', color: 'EARTH', arc: 'Arc 2', reason: 'Earth tone accent', price: 125 }
    ],
    MOSS: [
      { product: 'CARGO PANTS', color: 'EARTH', arc: 'Arc 2', reason: 'Natural harmony', price: 165 },
      { product: 'SWEATS', color: 'SAND', arc: 'Arc 3', reason: 'Earth tones', price: 132 },
      { product: 'BEANIE', color: 'MOSS', arc: 'Arc 2', reason: 'Tonal green', price: 55 }
    ],
    EARTH: [
      { product: 'DENIM', color: 'MOSS', arc: 'Arc 2', reason: 'Green + brown', price: 185 },
      { product: 'CARGO PANTS', color: 'SAND', arc: 'Arc 3', reason: 'Full earth flow', price: 162 },
      { product: 'BELT', color: 'EARTH', arc: 'Arc 2', reason: 'Tonal warm', price: 125 }
    ],
    // Arc 3 pairings
    SAKURA: [
      { product: 'DENIM', color: 'CLOUD', arc: 'Arc 3', reason: 'Soft tonal', price: 178 },
      { product: 'SWEATS', color: 'SAND', arc: 'Arc 3', reason: 'Warm pastels', price: 132 },
      { product: 'CAP', color: 'STEEL', arc: 'Arc 2', reason: 'Modern edge', price: 65 }
    ],
    MIST: [
      { product: 'CARGO PANTS', color: 'CLOUD', arc: 'Arc 3', reason: 'Clean minimal', price: 162 },
      { product: 'DENIM', color: 'STEEL', arc: 'Arc 2', reason: 'Cool sophisticated', price: 185 },
      { product: 'BEANIE', color: 'MIST', arc: 'Arc 3', reason: 'Tonal blue', price: 52 }
    ],
    CLOUD: [
      { product: 'CARGO PANTS', color: 'VOID', arc: 'Arc 2', reason: 'High contrast', price: 165 },
      { product: 'SWEATS', color: 'SAND', arc: 'Arc 3', reason: 'Warm neutrals', price: 132 },
      { product: 'CAP', color: 'CLOUD', arc: 'Arc 3', reason: 'Tonal white', price: 62 }
    ],
    SAND: [
      { product: 'CARGO PANTS', color: 'MOSS', arc: 'Arc 2', reason: 'Earth harmony', price: 165 },
      { product: 'DENIM', color: 'EARTH', arc: 'Arc 2', reason: 'Full earth', price: 185 },
      { product: 'BELT', color: 'SAND', arc: 'Arc 3', reason: 'Tonal warm', price: 122 }
    ],
    LILAC: [
      { product: 'SWEATS', color: 'CLOUD', arc: 'Arc 3', reason: 'Ethereal pairing', price: 132 },
      { product: 'DENIM', color: 'SAKURA', arc: 'Arc 3', reason: 'Pastel harmony', price: 178 },
      { product: 'BEANIE', color: 'STEEL', arc: 'Arc 2', reason: 'Cool gradient', price: 55 }
    ]
  }

  return pairings[colorKey] || pairings.VOID
}

// Generic color story generator
export function getGenericColorStory(productName: string, colorKey: string, arc: 'ARC_2' | 'ARC_3'): string {
  const stories: Record<string, string> = {
    VOID: `The ${productName} in VOID is pure black intensity. This colorway embodies the Shadow philosophy—heavy, grounding, commanding. For those who find power in darkness.`,
    STEEL: `STEEL brings sophistication to the ${productName}. Dark grey that bridges black and light. This colorway moves between worlds—grounded yet refined.`,
    BLOOD: `The ${productName} in BLOOD carries quiet power. Deep burgundy that commands without shouting. Rich, layered, unapologetic.`,
    MOSS: `MOSS connects the ${productName} to earth. Dark forest green that grounds you in nature. Organic color, substantial construction.`,
    EARTH: `The ${productName} in EARTH develops character over time. Dark brown that fades, creases, tells your story. Foundation piece.`,
    SAKURA: `SAKURA brings ethereal softness to the ${productName}. Light pink that catches morning light. Strength in gentleness.`,
    MIST: `The ${productName} in MIST breathes calm. Soft blue like early morning fog. This colorway centers and grounds in lightness.`,
    CLOUD: `CLOUD white is the canvas. The ${productName} in pure white reflects everything. Clean, minimal, essential. Shows every moment.`,
    SAND: `SAND brings warmth to the ${productName}. Cream that bridges earth tones and pastels. The foundation for building layers.`,
    LILAC: `The ${productName} in LILAC exists between day and night. Soft lavender that's ethereal yet grounded. Light color, substantial build.`
  }

  return stories[colorKey] || stories.VOID
}
