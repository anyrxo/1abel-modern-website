// Color definitions
export const COLORS = {
  ARC_2: {
    VOID: { name: 'VOID', hex: '#0a0a0a', description: 'Pure black' },
    STEEL: { name: 'STEEL', hex: '#3a3a3a', description: 'Dark grey' },
    BLOOD: { name: 'BLOOD', hex: '#4a1a1a', description: 'Deep burgundy' },
    MOSS: { name: 'MOSS', hex: '#1a2a1a', description: 'Dark forest green' },
    EARTH: { name: 'EARTH', hex: '#2a1a0a', description: 'Dark brown' }
  },
  ARC_3: {
    SAKURA: { name: 'SAKURA', hex: '#ffd4e5', description: 'Light pink' },
    MIST: { name: 'MIST', hex: '#d4e5ff', description: 'Soft blue' },
    CLOUD: { name: 'CLOUD', hex: '#ffffff', description: 'White' },
    SAND: { name: 'SAND', hex: '#f5f0e8', description: 'Cream' },
    LILAC: { name: 'LILAC', hex: '#e8d4ff', description: 'Soft lavender' }
  }
}

// Base product types
export type ProductCategory = 'TOPS' | 'BOTTOMS' | 'ACCESSORIES'
export type Arc = 'ARC_2' | 'ARC_3'

export interface BaseProduct {
  id: string
  name: string
  category: ProductCategory
  description: string
  details: string[]
  story: string
  arc2Price: number
  arc3Price: number
  sizes: string[]
}

export interface ColorVariant {
  productId: string
  arc: Arc
  colorKey: string
  pairsWith: {
    productId: string
    colorKey: string
    arc: Arc
    reason: string
  }[]
}

// Base Products - these are the core garments
export const BASE_PRODUCTS: Record<string, BaseProduct> = {
  // TOPS
  THERMAL: {
    id: 'THERMAL',
    name: 'THERMAL',
    category: 'TOPS',
    description: 'Heavyweight thermal constructed from brushed cotton-blend. Double-layered for depth. The foundational layering piece.',
    details: [
      '400 GSM heavyweight thermal cotton',
      'Reinforced ribbed collar and cuffs',
      'Oversized relaxed fit',
      'Pre-washed for minimal shrinkage',
      'Garment-dyed for rich color depth'
    ],
    story: 'Born from late nights in the studio. This thermal embodies the weight of creation—heavy, substantial, grounding. It\'s not what you wear when you\'re trying to impress. It\'s what you wear when you\'re focused on the work.',
    arc2Price: 185,
    arc3Price: 182,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  HOODIE: {
    id: 'HOODIE',
    name: 'HOODIE',
    category: 'TOPS',
    description: 'Premium heavyweight hoodie with architectural construction. The everyday staple that commands space.',
    details: [
      '450 GSM French terry cotton',
      'Triple-stitched paneling for structure',
      'Elongated drawstrings with metal aglets',
      'Kangaroo pocket with hidden internal pocket',
      'Dropped shoulder for relaxed fit'
    ],
    story: 'For those who understand that presence doesn\'t require volume. This hoodie creates negative space around you—a field of calm in chaos. Wear it when you need to disappear into focus.',
    arc2Price: 195,
    arc3Price: 192,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  COACH_JACKET: {
    id: 'COACH_JACKET',
    name: 'COACH JACKET',
    category: 'TOPS',
    description: 'Lightweight zip-up with utilitarian details. The transitional piece between seasons.',
    details: [
      'Water-resistant cotton-nylon blend',
      'YKK metal zipper with custom pull',
      'Snap-button closure',
      'Two side pockets, one internal pocket',
      'Adjustable snap-button cuffs'
    ],
    story: 'The piece you reach for when crossing thresholds. Studio to street. Day to night. This jacket bridges states—functional armor that looks intentional, not technical.',
    arc2Price: 205,
    arc3Price: 202,
    sizes: ['S', 'M', 'L', 'XL']
  },

  CREWNECK: {
    id: 'CREWNECK',
    name: 'CREWNECK',
    category: 'TOPS',
    description: 'Essential heavyweight crewneck. No logos, no graphics—just weight and construction.',
    details: [
      '420 GSM brushed fleece cotton',
      'Drop-shoulder construction',
      'Slightly oversized fit',
      'Ribbed collar, cuffs, and hem',
      'Preshrunk to maintain shape'
    ],
    story: 'Sometimes the most powerful statement is silence. The Crewneck is the piece you build your wardrobe around. Timeless, unbranded, essential.',
    arc2Price: 175,
    arc3Price: 172,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  LONGSLEEVE: {
    id: 'LONGSLEEVE',
    name: 'LONG-SLEEVE TEE',
    category: 'TOPS',
    description: 'Premium heavyweight long-sleeve tee. Reinforced construction. Designed to layer or stand alone.',
    details: [
      '260 GSM heavyweight cotton',
      'Slightly elongated body',
      'Tapered sleeves',
      'Double-needle stitching throughout',
      'Ribbed crew neck'
    ],
    story: 'The long-sleeve that actually fits. This isn\'t an afterthought—it\'s purpose-built. Layer it under hoodies or wear it solo. Either way, it holds its shape.',
    arc2Price: 95,
    arc3Price: 92,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  TEE: {
    id: 'TEE',
    name: 'TEE',
    category: 'TOPS',
    description: 'Essential heavyweight tee. Slightly oversized. Built to last, designed to fade with character.',
    details: [
      '220 GSM ring-spun cotton',
      'Relaxed boxy fit',
      'Reinforced shoulder seams',
      'Pre-shrunk and garment dyed',
      'Side-seamed construction'
    ],
    story: 'Your everyday foundational tee. This gets better with every wash—fabric softens, fit relaxes, character develops. This is the tee you\'ll still be wearing years from now.',
    arc2Price: 75,
    arc3Price: 72,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  OVERSHIRT: {
    id: 'OVERSHIRT',
    name: 'OVERSHIRT',
    category: 'TOPS',
    description: 'Structured button-up that works as a shirt or jacket. The shirt-jacket hybrid.',
    details: [
      '12oz heavyweight cotton twill',
      'Two chest pockets with flaps',
      'Corozo nut buttons',
      'Split hem with side vents',
      'Relaxed fit through body'
    ],
    story: 'Not quite a shirt, not quite a jacket. The Overshirt exists in the space between—perfect for layering or wearing solo. Built heavy enough to stand alone.',
    arc2Price: 165,
    arc3Price: 162,
    sizes: ['S', 'M', 'L', 'XL']
  },

  PUFFER: {
    id: 'PUFFER',
    name: 'PUFFER',
    category: 'TOPS',
    description: 'Oversized down puffer with matte finish. Statement outerwear that doesn\'t need to speak.',
    details: [
      'Water-resistant matte nylon shell',
      '700-fill responsibly sourced down',
      'Extreme oversized silhouette',
      'Internal storm flap and zipper garage',
      'Packable into its own pocket'
    ],
    story: 'When you need to block out the cold and the noise. The Puffer creates a cocoon—your personal atmosphere. It\'s excessive by design. Unapologetic in its volume.',
    arc2Price: 285,
    arc3Price: 275,
    sizes: ['S', 'M', 'L', 'XL']
  },

  // BOTTOMS
  CARGO: {
    id: 'CARGO',
    name: 'CARGO PANTS',
    category: 'BOTTOMS',
    description: 'Lightweight cargo with utility pockets. Function without the bulk.',
    details: [
      '10oz organic cotton twill',
      'Six utility pockets',
      'Elastic waist with drawstring',
      'Tapered fit through leg',
      'Garment-dyed for soft hand-feel',
      'GOTS certified'
    ],
    story: 'Cargos don\'t have to be heavy. This reimagines utility—keeping the function, losing the weight. Soft organic cotton that moves with you, pockets that hold what you need without adding bulk.',
    arc2Price: 165,
    arc3Price: 162,
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42']
  },

  SWEATS: {
    id: 'SWEATS',
    name: 'SWEATPANTS',
    category: 'BOTTOMS',
    description: 'Essential sweatpants in heavyweight French terry. Your new go-to.',
    details: [
      '320 GSM French terry cotton',
      'Enzyme-washed for softness',
      'Relaxed fit with tapered leg',
      'Elastic waist with flat drawcord',
      'Single back pocket',
      'Preshrunk'
    ],
    story: 'Some days you just need sweats. These are those sweats—soft enough to live in, clean enough to wear out. Pre-washed so they feel broken-in immediately. This is comfort without compromise.',
    arc2Price: 135,
    arc3Price: 132,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  DENIM: {
    id: 'DENIM',
    name: 'DENIM',
    category: 'BOTTOMS',
    description: 'Perfect fit jeans in raw selvedge denim. Designed to fade with character.',
    details: [
      '14oz Japanese selvedge denim',
      'Raw unwashed for natural fading',
      'Regular straight fit',
      'Button fly with copper rivets',
      'Leather patch at back waist',
      'Selvedge outseam detail'
    ],
    story: 'Good denim shouldn\'t fight you. This finds the perfect middle ground—not too slim, not too loose. Raw selvedge that fades to tell your story. The jeans you\'ll wear until they fall apart.',
    arc2Price: 185,
    arc3Price: 178,
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42']
  },

  JOGGERS: {
    id: 'JOGGERS',
    name: 'JOGGERS',
    category: 'BOTTOMS',
    description: 'Technical joggers with luxury fabrication. Designed for movement.',
    details: [
      'Four-way stretch technical fabric',
      'Water-resistant finish',
      'Articulated knees',
      'Zip side pockets',
      'Elasticated cuffs',
      'Drawstring waist'
    ],
    story: 'Movement shouldn\'t be complicated. These joggers are built for it—whether that\'s through the city or through your process. Technical without looking technical.',
    arc2Price: 145,
    arc3Price: 142,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  SHORTS: {
    id: 'SHORTS',
    name: 'SHORTS',
    category: 'BOTTOMS',
    description: 'Essential heavyweight shorts. The summer staple.',
    details: [
      '12oz heavyweight cotton',
      'Relaxed fit above knee',
      'Elastic waist with drawcord',
      'Two side pockets, one back pocket',
      'Garment-washed for softness'
    ],
    story: 'Shorts that don\'t feel like an afterthought. Heavy enough to have structure, comfortable enough to forget you\'re wearing them. Built for the warm months.',
    arc2Price: 95,
    arc3Price: 92,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  WIDE_PANTS: {
    id: 'WIDE_PANTS',
    name: 'WIDE PANTS',
    category: 'BOTTOMS',
    description: 'Relaxed wide-leg silhouette. Trend-proof, timeless.',
    details: [
      '11oz cotton twill',
      'Wide relaxed leg',
      'High-rise waist',
      'Pleated front',
      'Belt loops',
      'Zip fly with button closure'
    ],
    story: 'Not every pant needs to be slim. The Wide Pants offer breathing room—physically and visually. A relaxed silhouette that works now and will work in ten years.',
    arc2Price: 155,
    arc3Price: 152,
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42']
  },

  // ACCESSORIES
  CHAIN: {
    id: 'CHAIN',
    name: 'CHAIN',
    category: 'ACCESSORIES',
    description: 'Sterling silver chain with polished finish. Subtle elegance.',
    details: [
      '925 sterling silver',
      '5mm cable chain link',
      '24-inch length',
      'Spring ring clasp',
      'Hypoallergenic',
      'Comes in premium box'
    ],
    story: 'Jewelry should enhance, not overpower. This chain is refined silver that catches light quietly. It\'s the chain you wear every day because it works with everything.',
    arc2Price: 145,
    arc3Price: 142,
    sizes: ['ONE SIZE']
  },

  RING: {
    id: 'RING',
    name: 'RING',
    category: 'ACCESSORIES',
    description: 'Minimalist band ring. Understated piece that goes with everything.',
    details: [
      '316L stainless steel',
      '8mm wide band',
      'Brushed satin finish',
      'Water resistant',
      'Lifetime warranty'
    ],
    story: 'Simple rings are hard to find. This finds the balance—minimal enough to wear daily, substantial enough to feel quality. It\'s the ring you don\'t take off.',
    arc2Price: 95,
    arc3Price: 92,
    sizes: ['7', '8', '9', '10', '11', '12']
  },

  BEANIE: {
    id: 'BEANIE',
    name: 'BEANIE',
    category: 'ACCESSORIES',
    description: 'Heavyweight knit beanie. The beanie that just works.',
    details: [
      'Heavy merino wool',
      'Ribbed knit construction',
      'Oversized fit',
      'Foldable cuff',
      'One size fits all'
    ],
    story: 'A good beanie is hard to find. Most are too thin, too tight, or too trendy. This one is none of those things. Heavy merino wool that keeps you warm without overheating.',
    arc2Price: 55,
    arc3Price: 52,
    sizes: ['ONE SIZE']
  },

  GLOVES: {
    id: 'GLOVES',
    name: 'GLOVES',
    category: 'ACCESSORIES',
    description: 'Winter gloves with touchscreen compatibility. Warmth without bulk.',
    details: [
      'Merino wool exterior',
      'Fleece-lined interior',
      'Touchscreen compatible fingertips',
      'Elastic wrist',
      'Packable design'
    ],
    story: 'Winter doesn\'t have to slow you down. These gloves were built for movement—warm enough for the cold, light enough to forget you\'re wearing them. Technical without looking technical.',
    arc2Price: 85,
    arc3Price: 82,
    sizes: ['S/M', 'L/XL']
  },

  BELT: {
    id: 'BELT',
    name: 'BELT',
    category: 'ACCESSORIES',
    description: 'Full-grain leather belt. The belt you\'ll wear for decades.',
    details: [
      'Full-grain Italian leather',
      'Brushed metal buckle',
      '38mm width',
      'Single-piece construction',
      'Develops patina with wear',
      'Made in Italy'
    ],
    story: 'A belt should be something you buy once and wear forever. This is that belt. Full-grain Italian leather that gets better with age, developing a patina unique to your wear.',
    arc2Price: 125,
    arc3Price: 122,
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42']
  },

  CAP: {
    id: 'CAP',
    name: 'CAP',
    category: 'ACCESSORIES',
    description: 'Six-panel unstructured cap. Classic silhouette.',
    details: [
      'Heavyweight cotton twill',
      'Unstructured six-panel',
      'Adjustable strapback',
      'Curved brim',
      'Garment-washed for softness',
      'Minimal branding'
    ],
    story: 'Caps don\'t need to be complicated. Six panels, unstructured, garment-washed. This is the cap that goes with everything and gets better with time.',
    arc2Price: 65,
    arc3Price: 62,
    sizes: ['ONE SIZE']
  },

  SOCKS: {
    id: 'SOCKS',
    name: 'SOCKS',
    category: 'ACCESSORIES',
    description: 'Premium basics three-pack. The detail that gets overlooked.',
    details: [
      'Combed cotton blend',
      'Reinforced heel and toe',
      'Ribbed arch support',
      'Mid-calf length',
      'Three-pack',
      'Machine washable'
    ],
    story: 'Socks matter. Most people overlook them, but once you wear good socks, you can\'t go back. These are those socks—comfortable, durable, worth the upgrade.',
    arc2Price: 45,
    arc3Price: 42,
    sizes: ['S (6-8)', 'M (9-11)', 'L (12-14)']
  },

  TOTE: {
    id: 'TOTE',
    name: 'TOTE BAG',
    category: 'ACCESSORIES',
    description: 'Heavy canvas tote. Built to carry everything.',
    details: [
      '16oz heavyweight canvas',
      'Reinforced shoulder straps',
      'Internal zip pocket',
      'Flat bottom for stability',
      'Leather base reinforcement',
      'Fits 15" laptop'
    ],
    story: 'A tote should be indestructible. This one is built from 16oz canvas with leather-reinforced base. It carries your laptop, your gear, your life. And it looks better the more you use it.',
    arc2Price: 85,
    arc3Price: 82,
    sizes: ['ONE SIZE']
  }
}

// Color pairing recommendations based on fashion/color theory
export const COLOR_PAIRINGS: Record<string, ColorVariant[]> = {
  // Arc 2 - Shadow colors
  VOID: [
    // Pairs with everything being pure black
  ],
  STEEL: [
    // Grey pairs well with cool tones
  ],
  BLOOD: [
    // Burgundy pairs with earth tones and blacks
  ],
  MOSS: [
    // Green pairs with earth tones
  ],
  EARTH: [
    // Brown is neutral, pairs with greens and warm tones
  ],

  // Arc 3 - Light colors
  SAKURA: [
    // Pink pairs with neutrals and greys
  ],
  MIST: [
    // Blue pairs with neutrals and greys
  ],
  CLOUD: [
    // White pairs with everything
  ],
  SAND: [
    // Cream bridges all tones
  ],
  LILAC: [
    // Purple pairs with neutrals and pinks
  ]
}
