import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Final batch of specific replacements
replacements = [
    # Construction/quality features
    ("title: 'double hood'", "title: 'warm hood'"),
    ("title: 'incredibly soft'", "title: 'super plush'"),
    ("title: 'premium quality'", "title: 'top tier'"),
    ("title: 'so cozy'", "title: 'cozy vibes'"),
    
    # Denim specific
    ("title: '14oz japanese selvedge'", "title: 'quality selvedge'"),
    ("title: 'regular fit'", "title: 'classic fit'"),
    ("title: 'indigo denim'", "title: 'classic indigo'"),
    ("title: 'selvedge detail'", "title: 'nice detail'"),
    ("title: 'black denim'", "title: 'deep black'"),
    ("title: 'japanese denim'", "title: 'premium fabric'"),
    ("title: '14oz weight'", "title: 'perfect weight'"),
    ("title: 'indigo wash'", "title: 'classic wash'"),
    ("title: 'black selvedge'", "title: 'black denim'"),
    ("title: 'indigo denim perfect'", "title: 'perfect denim'"),
    
    # Bag/tote specific
    ("title: 'holds everything'", "title: 'super spacious'"),
    ("title: 'heavy duty canvas'", "title: 'durable canvas'"),
    ("title: 'use it daily'", "title: 'everyday bag'"),
    ("title: 'spacious'", "title: 'roomy'"),
    
    # Fabric/fit specific
    ("title: 'so soft'", "title: 'super soft'"),
    ("title: 'boxy fit'", "title: 'relaxed boxy'"),
    ("title: 'enzyme wash'", "title: 'vintage wash'"),
    ("title: 'thick fabric'", "title: 'quality fabric'"),
    ("title: 'ribbed collar'", "title: 'holds shape'"),
    ("title: '240 gsm weight'", "title: 'thick material'"),
    ("title: 'lilac color'", "title: 'light purple'"),
    ("title: 'tapered sleeves'", "title: 'slim sleeves'"),
    ("title: 'layers perfectly'", "title: 'great layer'"),
    ("title: 'lightweight'", "title: 'light fabric'"),
    ("title: 'wear this weekly'", "title: 'weekly rotation'"),
    
    # Additional patterns
    ("title: 'cropped fit'", "title: 'shorter cut'"),
    ("title: 'snap closures'", "title: 'easy on/off'"),
    ("title: 'water resistant'", "title: 'sheds water'"),
    ("title: 'windproof'", "title: 'blocks wind'"),
    ("title: 'pocket placement'", "title: 'good pockets'"),
    ("title: 'relaxed fit'", "title: 'roomy cut'"),
    ("title: 'slim fit'", "title: 'fitted cut'"),
    ("title: 'athletic fit'", "title: 'sporty cut'"),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {count} remaining duplicates")
