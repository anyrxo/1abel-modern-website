export interface ProductDescription {
  productId: string
  description: string
  fitDetails: string[]
  fabrication: {
    composition: string
    weight: string
    care: string[]
    features: string[]
  }
}

export const productDescriptions: Record<string, ProductDescription> = {
  // THERMAL
  'thermal': {
    productId: 'thermal',
    description: 'Our Thermal is the foundation of your wardrobe. Designed for the entrepreneur who needs versatility without sacrificing quality, this heavyweight thermal bridges the gap between comfort and intention. The 400 GSM cotton-elastane blend provides substantial warmth while maintaining breathability, making it perfect for layering or wearing on its own. Garment-dyed and enzyme-washed for an ultra-soft hand feel from day one, this piece gets better with every wear. The minimal branding philosophy means you can wear it anywhere—from client meetings to late-night creative sessions—without overthinking it.',
    fitDetails: [
      'Model is 6\'0" and wears size M',
      'Relaxed fit with slight drop shoulder',
      'Long sleeve with ribbed cuffs',
      'Ribbed hem for structure',
      'Runs true to size, size up for oversized fit'
    ],
    fabrication: {
      composition: '95% Cotton, 5% Elastane',
      weight: '400 GSM heavyweight thermal',
      care: [
        'Machine wash cold with like colors',
        'Tumble dry low or lay flat to dry',
        'Do not bleach',
        'Cool iron if needed',
        'Garment-dyed for soft vintage feel'
      ],
      features: [
        'Enzyme washed for ultra-soft hand feel',
        'Tone-on-tone embroidered logo (1 shade darker)',
        'Double-needle stitching for durability',
        'Pre-shrunk fabric',
        'Interior woven label at back neck'
      ]
    }
  },

  // HOODIE
  'hoodie': {
    productId: 'hoodie',
    description: 'The ultimate expression of comfort meeting craft. Our Hoodie is built with an uncompromising 550 GSM cotton fleece that redefines what premium should feel like. This isn\'t just another hoodie—it\'s the piece you reach for when you need to feel grounded. The oversized fit creates a cocoon of calm without looking sloppy, while the double-lined hood and reinforced kangaroo pocket add functional luxury. Designed for the decision-maker who refuses to compromise on quality, this hoodie eliminates the noise and lets you focus on what matters. Wear it on focused work days, travel days, or those rare moments when you actually have time to do nothing.',
    fitDetails: [
      'Model is 6\'0" and wears size M',
      'Oversized relaxed fit',
      'Drop shoulder construction',
      'Ribbed cuffs and hem',
      'Double-lined hood with metal-tipped drawcords',
      'Kangaroo pocket with reinforced bartacks',
      'Size down for true-to-size fit, or stay true for oversized'
    ],
    fabrication: {
      composition: '100% Cotton Fleece',
      weight: '550 GSM ultra-heavyweight',
      care: [
        'Machine wash cold inside out',
        'Tumble dry low',
        'Do not bleach',
        'Do not iron embroidered logo',
        'Wash with like colors'
      ],
      features: [
        'Brushed fleece interior for softness',
        'Double-needle topstitch throughout',
        'Metal-tipped drawcords (gunmetal finish)',
        'Tone-on-tone embroidered chest logo',
        '1x1 ribbed cuffs and waistband',
        'Pre-shrunk to minimize shrinkage',
        'Interior woven label'
      ]
    }
  },

  // DENIM
  'denim': {
    productId: 'denim',
    description: 'Denim that respects your time. Our Denim is crafted from 14oz Japanese selvage denim with just enough stretch to move with you, not against you. The relaxed straight fit offers comfort without the baggy silhouette—intentional ease for the modern builder. Each pair is garment-dyed to achieve our signature colorways, from the deep VOID black to the soft CLOUD light wash. No distressing, no artificial aging, just honest construction that gets better with wear. These jeans work as hard as you do, transitioning seamlessly from focused work sessions to client dinners without a second thought.',
    fitDetails: [
      'Model is 6\'0" and wears size 32',
      'Relaxed straight leg fit',
      'Mid-rise waist (sits at natural waist)',
      'Inseam: 32" (unhemmed 34" available)',
      'Leg opening: 16"',
      'Front rise: 11", Back rise: 15"',
      'True to size fit'
    ],
    fabrication: {
      composition: '98% Cotton, 2% Elastane',
      weight: '14oz Japanese selvage denim',
      care: [
        'Machine wash cold inside out (first 3 washes recommended)',
        'Hang dry or tumble dry low',
        'Wash infrequently to preserve color and shape',
        'Do not bleach',
        'Warm iron if needed'
      ],
      features: [
        'Japanese selvage denim with signature selvedge ID',
        'Garment-dyed for unique colorways',
        'YKK zipper fly',
        'Reinforced belt loops and pocket seams',
        'Leather patch at back waist',
        'Antique brass hardware',
        'Chain-stitched hem',
        'Interior micro "1" logo on coin pocket'
      ]
    }
  },

  // CHAIN
  'chain': {
    productId: 'chain',
    description: 'A statement of restraint. Our Chain is the only jewelry you need—nothing more, nothing less. Crafted from solid sterling silver (Arc 3) or PVD-coated stainless steel (Arc 2), this 22-inch chain sits perfectly at the collarbone without demanding attention. The minimal "1" logo charm is deliberately small, visible only to those who look closely. This isn\'t about flash—it\'s about knowing quality when you see it. Wear it daily and forget about it; that\'s the point.',
    fitDetails: [
      'Chain length: 22 inches',
      'Chain width: 4mm curb link',
      'Lobster clasp closure',
      'Micro "1" logo charm (8mm x 25mm)',
      'One size fits all',
      'Unisex design'
    ],
    fabrication: {
      composition: 'Arc 3: Solid Sterling Silver (.925) | Arc 2: PVD-Coated Stainless Steel',
      weight: 'Approximately 45g',
      care: [
        'Sterling Silver: Clean with silver polishing cloth',
        'PVD Coating: Wipe with soft dry cloth',
        'Avoid harsh chemicals and abrasive materials',
        'Remove before swimming or showering',
        'Store in provided dust bag when not wearing'
      ],
      features: [
        'Arc 3: Solid .925 sterling silver',
        'Arc 2: Black PVD coating (scratch-resistant)',
        'Lobster clasp with "1" engraving',
        'Micro logo charm with hidden "ABEL" detail',
        'Comes in branded dust bag',
        'Hypoallergenic materials'
      ]
    }
  },

  // TOTE BAG
  'tote-bag': {
    productId: 'tote-bag',
    description: 'Function without fuss. Our Tote Bag is built from 16oz cotton canvas that can handle whatever you throw in it—laptop, gym gear, groceries, or all three. The reinforced shoulder straps and double-stitched seams mean this bag will outlast trends and seasons. Sized to fit a 15-inch laptop with room for everything else you actually need, it\'s the bag for people who don\'t think about bags. The minimal "1" embroidery keeps it clean, while the spacious interior keeps you organized. From coffee shop to conference room, this tote just works.',
    fitDetails: [
      'Dimensions: 16"W x 15"H x 5"D',
      'Shoulder strap drop: 11 inches',
      'Fits up to 15" laptop',
      'Interior slip pocket (8"W x 7"H)',
      'Open top with magnetic snap closure (optional)',
      'Reinforced bottom panel'
    ],
    fabrication: {
      composition: '100% Cotton Canvas',
      weight: '16oz heavyweight canvas',
      care: [
        'Spot clean with damp cloth',
        'Hand wash cold if needed',
        'Air dry only',
        'Do not machine wash or tumble dry',
        'Do not bleach'
      ],
      features: [
        'Double-stitched reinforced seams',
        'Heavy-duty cotton webbing straps',
        'Riveted stress points at strap attachments',
        'Interior slip pocket for organization',
        'Tone-on-tone embroidered "1" logo (front)',
        'Flat bottom for stability',
        'Interior woven label'
      ]
    }
  }
}
