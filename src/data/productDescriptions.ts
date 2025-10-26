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
  },

  // TEE
  'tee': {
    productId: 'tee',
    description: 'The tee you\'ll reach for every day. Our Tee is constructed from 220 GSM ring-spun cotton with a slightly boxy, relaxed fit that looks intentional without trying too hard. Garment-dyed and pre-washed, it feels broken-in from the first wear and only gets better with time. The weight hits that sweet spot between substantial and breathable—thick enough to hold its shape, light enough for layering. This isn\'t a throwaway basic; it\'s the foundation piece that anchors your rotation. Wear it under overshirts, layer it with thermals, or let it stand alone. It just works.',
    fitDetails: [
      'Relaxed boxy fit',
      'Slightly dropped shoulders',
      'Ribbed crew neck',
      'Side-seamed construction for durability',
      'True to size'
    ],
    fabrication: {
      composition: '100% Ring-Spun Cotton',
      weight: '220 GSM midweight',
      care: [
        'Machine wash cold with like colors',
        'Tumble dry low',
        'Do not bleach',
        'Cool iron if needed',
        'Fabric softens with each wash'
      ],
      features: [
        'Garment-dyed for rich color depth',
        'Pre-washed for minimal shrinkage',
        'Double-needle stitching at shoulders and hem',
        'Reinforced neck seam',
        'Tone-on-tone embroidered "1" at chest (subtle)',
        'Interior woven label at back neck',
        'Side-seamed body for better fit'
      ]
    }
  },

  // LONGSLEEVE
  'longsleeve': {
    productId: 'longsleeve',
    description: 'A long-sleeve that actually fits right. Our Long-Sleeve Tee is built from 260 GSM heavyweight cotton with a slightly elongated body and tapered sleeves that don\'t bunch up when you layer. The crew neck sits clean without stretching out, and the pre-washed fabric means it holds its shape wear after wear. This is the piece you throw on for morning coffee runs, late-night studio sessions, or layering under crewnecks when the temperature drops. It transitions seamlessly from base layer to standalone—doing the work without drawing attention to itself.',
    fitDetails: [
      'Slim through body with slight taper',
      'Elongated torso (adds ~2" length)',
      'Tapered sleeves for clean layering',
      'Ribbed crew neck',
      'True to size, size up for relaxed fit'
    ],
    fabrication: {
      composition: '100% Combed Cotton',
      weight: '260 GSM heavyweight',
      care: [
        'Machine wash cold inside out',
        'Tumble dry low or hang dry',
        'Do not bleach',
        'Warm iron if needed',
        'Pre-washed to prevent shrinkage'
      ],
      features: [
        'Double-needle topstitch throughout',
        'Reinforced shoulder and side seams',
        'Ribbed cuffs that maintain shape',
        'Tone-on-tone embroidered logo at left chest',
        'Garment-dyed for soft vintage feel',
        'Pre-shrunk fabric',
        'Interior woven label'
      ]
    }
  },

  // CREWNECK
  'crewneck': {
    productId: 'crewneck',
    description: 'The Crewneck is what happens when you strip away everything unnecessary. Built from 420 GSM brushed fleece cotton, this piece has the weight and structure to stand on its own without relying on graphics or branding. The drop-shoulder construction and slightly oversized fit create clean lines that work whether you\'re at your desk or out in the world. Pre-shrunk and enzyme-washed, it feels lived-in from day one. This is the sweatshirt you build your wardrobe around—the one that makes everything else easier.',
    fitDetails: [
      'Slightly oversized fit',
      'Drop-shoulder construction',
      'Ribbed crew neckline',
      'Ribbed cuffs and hem',
      'True to size for relaxed fit, size down for fitted'
    ],
    fabrication: {
      composition: '100% Cotton Fleece',
      weight: '420 GSM heavyweight',
      care: [
        'Machine wash cold inside out',
        'Tumble dry low',
        'Do not bleach',
        'Do not iron directly on logo',
        'Wash with like colors'
      ],
      features: [
        'Brushed fleece interior for warmth',
        'Enzyme-washed for ultra-soft hand feel',
        'Double-needle stitching throughout',
        'Pre-shrunk to maintain size',
        '1x1 ribbed collar, cuffs, and waistband',
        'Minimal tone-on-tone embroidered logo',
        'Interior woven label at back neck'
      ]
    }
  },

  // OVERSHIRT
  'overshirt': {
    productId: 'overshirt',
    description: 'Not quite a shirt, not quite a jacket. Our Overshirt occupies the space in between—built from 12oz cotton twill with enough structure to layer over hoodies but comfortable enough to wear solo. The relaxed fit through the body and split hem construction allow for natural movement, while dual chest pockets add utility without clutter. Button closures use natural corozo nut buttons that develop character over time. This is the piece you grab when you need something more than a tee but don\'t want the commitment of a jacket. Layer it, wear it open, or button it up. It adapts.',
    fitDetails: [
      'Relaxed fit through body',
      'Drop shoulder for ease of movement',
      'Split hem with side vents',
      'Two chest pockets with button flaps',
      'True to size, size up for heavy layering'
    ],
    fabrication: {
      composition: '100% Cotton Twill',
      weight: '12oz heavyweight',
      care: [
        'Machine wash cold inside out',
        'Hang dry or tumble dry low',
        'Warm iron if needed',
        'Do not bleach',
        'Garment will soften with wear'
      ],
      features: [
        'Natural corozo nut buttons',
        'Double chest pockets with button-flap closure',
        'Split hem with side vents for mobility',
        'Triple-needle stitching at stress points',
        'Garment-washed for broken-in feel',
        'Interior hanging loop at back neck',
        'Subtle interior label detail'
      ]
    }
  },

  // COACH JACKET
  'coach-jacket': {
    productId: 'coach-jacket',
    description: 'The transitional piece that works between seasons and situations. Our Coach Jacket is built from a water-resistant cotton-nylon blend that sheds light rain without looking technical. The clean zip-up front with snap-button closure adds wind resistance, while the lightweight construction means you can pack it down when you don\'t need it. Two exterior pockets and one interior pocket keep essentials accessible. This is the jacket you throw on for early mornings, unpredictable weather, or anytime you need a clean outer layer that doesn\'t overthink it.',
    fitDetails: [
      'Standard fit with slight ease',
      'Adjustable snap-button cuffs',
      'Straight hem with slight drop tail',
      'Two side pockets, one internal zip pocket',
      'True to size'
    ],
    fabrication: {
      composition: '65% Cotton, 35% Nylon',
      weight: 'Lightweight shell (approx. 180 GSM)',
      care: [
        'Machine wash cold on gentle cycle',
        'Hang dry only',
        'Do not tumble dry',
        'Do not iron',
        'Do not bleach'
      ],
      features: [
        'Water-resistant DWR coating',
        'YKK metal zipper with custom "1" pull',
        'Snap-button front closure over zipper',
        'Adjustable snap-button cuffs',
        'Interior zip security pocket',
        'Packable design',
        'Mesh lining for breathability',
        'Embroidered "1" logo at chest'
      ]
    }
  },

  // PUFFER
  'puffer': {
    productId: 'puffer',
    description: 'When warmth is non-negotiable. Our Puffer is built with 700-fill responsibly sourced down and a matte water-resistant shell that handles the elements without looking like outdoor gear. The oversized silhouette creates a deliberate volume—this isn\'t about fitting in, it\'s about blocking out the cold and the noise. Internal storm flaps, a zipper garage, and elastic cuffs seal in warmth, while the packable design means you can stow it when temperatures shift. This is the coat for when you need serious insulation but refuse to sacrifice style.',
    fitDetails: [
      'Oversized boxy fit',
      'Drop shoulder construction',
      'Elastic cuffs and hem',
      'High collar with internal storm flap',
      'Size down for true fit, stay true for extreme oversized'
    ],
    fabrication: {
      composition: 'Shell: 100% Nylon | Fill: 700-Fill Down (90% Down, 10% Feathers)',
      weight: 'Lightweight shell with high-loft insulation',
      care: [
        'Dry clean only recommended',
        'Or machine wash cold on delicate cycle',
        'Tumble dry low with tennis balls to restore loft',
        'Do not bleach',
        'Store uncompressed when not in use'
      ],
      features: [
        'Water-resistant matte nylon shell',
        '700-fill responsibly sourced down (RDS certified)',
        'Oversized baffle construction',
        'YKK zipper with internal storm flap',
        'Zipper garage at collar',
        'Elastic cuffs and adjustable hem',
        'Two side zip pockets, one internal zip pocket',
        'Packable into internal pocket',
        'Embroidered logo at chest'
      ]
    }
  },

  // CARGO
  'cargo': {
    productId: 'cargo',
    description: 'Cargo pants without the bulk. Our Cargo is built from 10oz organic cotton twill that\'s been garment-dyed and washed for a soft hand feel from day one. Six utility pockets provide function without adding visual weight, while the tapered leg keeps the silhouette clean. The elastic waistband with drawstring means comfort without compromise—no belt needed. These are the pants for people who need their clothing to work as hard as they do, holding what matters without looking loaded down.',
    fitDetails: [
      'Relaxed through hip and thigh',
      'Tapered from knee to ankle',
      'Elastic waistband with flat drawcord',
      'Inseam: 32" (unhemmed 34" available)',
      'True to size'
    ],
    fabrication: {
      composition: '100% Organic Cotton Twill (GOTS certified)',
      weight: '10oz midweight',
      care: [
        'Machine wash cold inside out',
        'Tumble dry low or hang dry',
        'Warm iron if needed',
        'Do not bleach',
        'Fabric softens with each wash'
      ],
      features: [
        'Six utility pockets (2 side, 2 cargo, 2 back)',
        'Garment-dyed for unique color variation',
        'Enzyme-washed for soft broken-in feel',
        'YKK zippers on cargo pockets',
        'Reinforced bartacks at stress points',
        'Flat drawcord with metal aglets',
        'Interior micro "1" logo detail'
      ]
    }
  },

  // JOGGERS
  'joggers': {
    productId: 'joggers',
    description: 'Movement without restriction. Our Joggers are built from a four-way stretch technical fabric with a water-resistant finish that handles whatever your day throws at you. Articulated knees and elasticated cuffs allow natural range of motion, while zip pockets keep essentials secure. These aren\'t gym pants trying to be streetwear—they\'re built for the person who refuses to choose between function and form. Wear them on travel days, active days, or days when you just need clothing that moves with you.',
    fitDetails: [
      'Slim tapered fit',
      'Articulated knees for mobility',
      'Elastic waistband with flat drawcord',
      'Elasticated ankle cuffs',
      'True to size'
    ],
    fabrication: {
      composition: '88% Nylon, 12% Elastane',
      weight: 'Lightweight technical fabric (approx. 240 GSM)',
      care: [
        'Machine wash cold',
        'Hang dry or tumble dry low',
        'Do not bleach',
        'Do not iron',
        'Do not dry clean'
      ],
      features: [
        'Four-way stretch for mobility',
        'DWR water-resistant finish',
        'Articulated knees and gusset',
        'YKK zip side pockets (secure closure)',
        'One zip back pocket',
        'Reflective "1" logo at leg',
        'Elastic waistband with internal drawcord',
        'Abrasion-resistant fabric'
      ]
    }
  },

  // SWEATS
  'sweats': {
    productId: 'sweats',
    description: 'Sweatpants that don\'t feel like giving up. Our Sweatpants are built from 320 GSM French terry cotton that\'s been enzyme-washed to feel broken-in immediately. The relaxed fit with tapered leg creates a clean silhouette that works at home or out in the world. A single back pocket adds utility without disrupting the minimal aesthetic. Pre-shrunk and soft from day one, these are the sweats you\'ll wear until they fall apart—and then wish you could wear longer.',
    fitDetails: [
      'Relaxed fit through hip and thigh',
      'Tapered from knee to ankle',
      'Elastic waistband with flat drawcord',
      'Single back pocket (zip closure)',
      'True to size'
    ],
    fabrication: {
      composition: '100% Cotton French Terry',
      weight: '320 GSM heavyweight',
      care: [
        'Machine wash cold inside out',
        'Tumble dry low',
        'Do not bleach',
        'Cool iron if needed',
        'Wash with like colors'
      ],
      features: [
        'Enzyme-washed for ultra-soft hand feel',
        'Brushed interior for warmth',
        'Pre-shrunk to maintain size',
        'Elastic waistband with flat cotton drawcord',
        'Single zip back pocket',
        'Ribbed ankle cuffs',
        'Embroidered "1" logo at thigh',
        'Interior woven label'
      ]
    }
  },

  // SHORTS
  'shorts': {
    productId: 'shorts',
    description: 'Summer essentials that don\'t feel like an afterthought. Our Shorts are built from 12oz heavyweight cotton with a relaxed fit that hits just above the knee. Garment-washed for immediate softness, they have enough structure to look intentional without feeling stiff. Two side pockets and one back pocket provide function without clutter. These are the shorts you\'ll wear all season—substantial enough to feel like real clothing, comfortable enough to forget you\'re wearing them.',
    fitDetails: [
      'Relaxed fit through leg',
      'Inseam: 9 inches (hits above knee)',
      'Elastic waistband with flat drawcord',
      'Two side pockets, one back pocket',
      'True to size'
    ],
    fabrication: {
      composition: '100% Cotton',
      weight: '12oz heavyweight',
      care: [
        'Machine wash cold',
        'Tumble dry low or hang dry',
        'Warm iron if needed',
        'Do not bleach',
        'Fabric softens with wear'
      ],
      features: [
        'Garment-washed for broken-in feel',
        'Double-needle stitching throughout',
        'Elastic waistband with flat cotton drawcord',
        'Metal aglets on drawcord',
        'Reinforced pocket seams',
        'Back pocket with button closure',
        'Embroidered "1" logo at leg',
        'Interior woven label'
      ]
    }
  },

  // WIDE PANTS
  'wide-pants': {
    productId: 'wide-pants',
    description: 'Not every pant needs to be slim. Our Wide Pants offer breathing room with a relaxed wide-leg silhouette and high-rise waist that creates clean, timeless proportions. Built from 11oz cotton twill with a pleated front, they bring structure without stiffness. These are the pants that work now and will still work in ten years—a silhouette that transcends trend cycles. Wear them with tucked tees, oversized hoodies, or layered tops. The wide leg balances everything.',
    fitDetails: [
      'Wide relaxed leg',
      'High-rise waist (sits above natural waist)',
      'Pleated front for drape',
      'Inseam: 32" (unhemmed 34" available)',
      'Leg opening: 22"',
      'True to size'
    ],
    fabrication: {
      composition: '100% Cotton Twill',
      weight: '11oz midweight',
      care: [
        'Machine wash cold inside out',
        'Hang dry or tumble dry low',
        'Warm iron to maintain pleats',
        'Do not bleach',
        'Dry clean for best results (optional)'
      ],
      features: [
        'Pleated front for drape and movement',
        'YKK zipper fly with button closure',
        'Belt loops (accommodates up to 40mm belt)',
        'Two side pockets, two back welt pockets',
        'Garment-dyed for unique color depth',
        'Chain-stitched hem',
        'Interior woven label',
        'Subtle "1" embroidery at back pocket'
      ]
    }
  },

  // BEANIE
  'beanie': {
    productId: 'beanie',
    description: 'A beanie that actually works. Our Beanie is knit from heavyweight merino wool in a ribbed construction that provides warmth without overheating. The oversized fit can be worn slouchy or cuffed, adapting to however you need it. Most beanies are too thin, too tight, or too trendy. This one is none of those things. It\'s the beanie you grab every morning during cold months—the one that becomes part of your routine.',
    fitDetails: [
      'One size fits all',
      'Oversized fit (can be worn slouchy or cuffed)',
      'Ribbed knit construction',
      'Foldable cuff (approximately 3" when folded)',
      'Unisex design'
    ],
    fabrication: {
      composition: '100% Merino Wool',
      weight: 'Heavyweight knit',
      care: [
        'Hand wash cold with wool detergent',
        'Lay flat to dry',
        'Do not wring or twist',
        'Do not bleach',
        'Cool iron if needed (use pressing cloth)'
      ],
      features: [
        'Premium merino wool (naturally moisture-wicking)',
        'Ribbed knit for stretch and structure',
        'Foldable cuff design',
        'Woven "1" label at cuff',
        'Naturally odor-resistant',
        'Temperature-regulating fabric',
        'Soft against skin (non-itchy)'
      ]
    }
  },

  // CAP
  'cap': {
    productId: 'cap',
    description: 'The cap that goes with everything. Our Cap is an unstructured six-panel design made from heavyweight cotton twill that\'s been garment-washed for immediate softness. The curved brim and adjustable strapback create a classic silhouette that doesn\'t try too hard. Minimal branding means it works with any outfit, any day. This is the cap you wear until it\'s perfectly broken in, then keep wearing for years after.',
    fitDetails: [
      'One size fits all',
      'Unstructured six-panel construction',
      'Curved brim (pre-curved)',
      'Adjustable strapback closure',
      'Crown height: 3.5 inches',
      'Brim length: 2.75 inches'
    ],
    fabrication: {
      composition: '100% Cotton Twill',
      weight: 'Heavyweight twill (approx. 280 GSM)',
      care: [
        'Spot clean with damp cloth',
        'Hand wash cold if needed',
        'Air dry only',
        'Do not machine wash or tumble dry',
        'Do not bleach'
      ],
      features: [
        'Garment-washed for soft broken-in feel',
        'Unstructured crown for natural shape',
        'Pre-curved brim',
        'Adjustable self-fabric strapback with antique brass buckle',
        'Embroidered eyelets for ventilation',
        'Minimal "1" embroidery at front (tone-on-tone)',
        'Interior taping for comfort'
      ]
    }
  },

  // BELT
  'belt': {
    productId: 'belt',
    description: 'The belt you buy once and wear forever. Our Belt is crafted from full-grain Italian leather with a brushed metal buckle that develops character over time. Single-piece construction means no laminated layers—just solid leather that ages beautifully, developing a unique patina with your wear. At 38mm width, it works with jeans, cargos, and wide pants without adding bulk. This is the kind of quality you feel every time you put it on.',
    fitDetails: [
      'Width: 38mm (1.5 inches)',
      'Thickness: 3.5mm full-grain leather',
      'Single-piece construction (no laminate)',
      'Five adjustment holes (2" spacing)',
      'Size guide: Order your pant size (belt measures 4-6" longer)',
      'Available in standard and extended lengths'
    ],
    fabrication: {
      composition: 'Full-Grain Italian Leather | Hardware: Brushed Stainless Steel',
      weight: 'Substantial (approx. 180g)',
      care: [
        'Wipe clean with dry soft cloth',
        'Condition with leather conditioner every 6 months',
        'Avoid prolonged exposure to water',
        'Store flat or hung when not in use',
        'Natural patina will develop with wear'
      ],
      features: [
        'Full-grain vegetable-tanned Italian leather',
        'Single-piece construction (no laminated layers)',
        'Brushed stainless steel buckle',
        'Stitched edges with waxed thread',
        'Beveled and burnished edges',
        'Subtle "1" debossed stamp (interior)',
        'Made in Italy',
        'Lifetime leather guarantee'
      ]
    }
  },

  // GLOVES
  'gloves': {
    productId: 'gloves',
    description: 'Winter doesn\'t have to slow you down. Our Gloves are built from merino wool with a fleece-lined interior that provides warmth without bulk. Touchscreen-compatible fingertips mean you can stay connected without exposing your hands to the cold. The elastic wrist creates a secure fit that seals in warmth, while the packable design means you can stow them when temperatures shift. Technical function without looking technical—just warm, functional gloves that work.',
    fitDetails: [
      'Available in S/M and L/XL',
      'S/M fits hand circumference 7.5-8.5 inches',
      'L/XL fits hand circumference 8.5-9.5 inches',
      'Elastic wrist for secure fit',
      'Touchscreen-compatible index finger and thumb'
    ],
    fabrication: {
      composition: 'Exterior: 100% Merino Wool | Lining: Polyester Fleece',
      weight: 'Lightweight (approx. 60g per pair)',
      care: [
        'Hand wash cold with wool detergent',
        'Lay flat to dry',
        'Do not wring or twist',
        'Do not bleach',
        'Do not tumble dry'
      ],
      features: [
        'Premium merino wool exterior',
        'Soft fleece lining for warmth',
        'Touchscreen-compatible fingertips (thumb and index)',
        'Elastic wrist for secure fit',
        'Conductive thread maintains sensitivity',
        'Embroidered "1" logo at wrist',
        'Packable design',
        'Naturally moisture-wicking and odor-resistant'
      ]
    }
  },

  // SOCKS
  'socks': {
    productId: 'socks',
    description: 'Socks matter more than you think. Our Socks are built from a combed cotton blend with reinforced heels and toes that resist wear. Ribbed arch support provides all-day comfort, while the mid-calf length works with any footwear. Sold in three-packs because once you wear good socks, cheap ones don\'t cut it anymore. These are the socks that make you wonder why you settled for less for so long.',
    fitDetails: [
      'Available in S (6-8), M (9-11), L (12-14)',
      'Mid-calf length (approximately 8-10 inches from heel)',
      'Ribbed arch support band',
      'Reinforced heel and toe',
      'Sold in 3-pack'
    ],
    fabrication: {
      composition: '75% Combed Cotton, 20% Polyester, 5% Elastane',
      weight: 'Midweight',
      care: [
        'Machine wash cold with like colors',
        'Tumble dry low',
        'Do not bleach',
        'Do not iron',
        'Turn inside out before washing for longevity'
      ],
      features: [
        'Combed cotton for softness and durability',
        'Reinforced heel and toe for extended wear',
        'Ribbed arch support for comfort',
        'Seamless toe closure (no irritation)',
        'Elastic cuff (stays up without being tight)',
        'Embroidered "1" logo at ankle',
        'Three-pack in complementary colors',
        'Moisture-wicking blend'
      ]
    }
  },

  // RING
  'ring': {
    productId: 'ring',
    description: 'Simple rings are hard to find. Our Ring is an 8mm band in 316L stainless steel with a brushed satin finish that resists scratches and tarnish. Substantial enough to feel quality, minimal enough to wear daily without thinking about it. Water-resistant and backed by a lifetime warranty, this is the ring you don\'t take off—the one that becomes part of you. No stones, no engravings, just clean lines and solid construction.',
    fitDetails: [
      'Available in sizes 7, 8, 9, 10, 11, 12',
      'Band width: 8mm',
      'Band thickness: 2mm',
      'Comfort-fit interior (slightly domed)',
      'Unisex design',
      'Ring sizing guide available'
    ],
    fabrication: {
      composition: '316L Surgical-Grade Stainless Steel',
      weight: 'Approximately 8-12g (varies by size)',
      care: [
        'Wipe clean with soft dry cloth',
        'Wash with mild soap and water if needed',
        'Water-resistant (can be worn while washing hands)',
        'Avoid harsh chemicals',
        'Remove during heavy manual work to prevent scratches'
      ],
      features: [
        '316L surgical-grade stainless steel (hypoallergenic)',
        'Brushed satin finish (resists scratches)',
        'Comfort-fit interior for all-day wear',
        'Water and tarnish resistant',
        'Minimal "1" engraving (interior)',
        'Lifetime warranty against defects',
        'Comes in premium ring box',
        'Won\'t change color or fade'
      ]
    }
  }
}
