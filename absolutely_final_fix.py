import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    # Last batch
    ("title: 'holds shape',\n    content: 'ribbed collar holds shape", 
     "title: 'keeps form',\n    content: 'ribbed collar holds shape"),
    
    ("title: 'favorite longsleeve'", "title: 'top longsleeve'"),
    ("title: 'literally obsessed'", "title: 'obsessed fr'"),
    ("title: 'sleek',\n    content: 'sleek...", "title: 'clean look',\n    content: 'sleek..."),
    ("title: 'sized down'", "title: 'went smaller'"),
    ("title: '500 gsm'", "title: 'heavy weight'"),
    ("title: 'fleece lining'", "title: 'warm lining'"),
    ("title: 'ribbed hem'", "title: 'quality hems'"),
    ("title: 'fleece inside'", "title: 'soft interior'"),
    ("title: 'layers great'", "title: 'good layer'"),
    ("title: 'wear it constantly'", "title: 'always wearing'"),
    ("title: 'versatile piece'", "title: 'multi-use'"),
    ("title: 'so clean',\n    content: 'so clean...", "title: 'clean',\n    content: 'so clean..."),
    ("title: 'insulated'", "title: 'warm fill'"),
    ("title: 'baffle construction'", "title: 'quality baffles'"),
    ("title: 'so warm',\n    content: 'so warm...", "title: 'very warm',\n    content: 'so warm..."),
    ("title: 'insulation'", "title: 'warm fill'"),
    ("title: 'baffle quilting'", "title: 'quilted design'"),
    ("title: '700 fill down'", "title: 'quality down'"),
    ("title: 'pockets for days'", "title: 'lots of pockets'"),
    ("title: 'cargo pockets'", "title: 'utility pockets'"),
    ("title: 'reinforced knees'", "title: 'durable knees'"),
    ("title: 'drawstring waist'", "title: 'adjustable waist'"),
    ("title: 'elastic cuffs'", "title: 'snug cuffs'"),
    ("title: '9 inch inseam'", "title: 'perfect inseam'"),
    ("title: 'cotton twill'", "title: 'quality twill'"),
    ("title: 'high rise'", "title: 'sits high'"),
    ("title: 'pleated front'", "title: 'front pleats'"),
    ("title: 'wide leg'", "title: 'roomy legs'"),
    ("title: 'canvas material'", "title: 'sturdy canvas'"),
    ("title: 'leather handles'", "title: 'quality handles'"),
    ("title: 'interior pocket'", "title: 'inside pocket'"),
    ("title: 'structured fit'", "title: 'holds form'"),
    ("title: 'adjustable strap'", "title: 'custom fit'"),
    ("title: 'silver chain'", "title: 'metal chain'"),
    ("title: 'lobster clasp'", "title: 'secure clasp'"),
    ("title: 'oxidized finish'", "title: 'dark finish'"),
    ("title: 'stainless steel'", "title: 'quality metal'"),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {count} final duplicates")
