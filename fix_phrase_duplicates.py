import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Specific phrase replacements where title phrase appears in content
replacements = [
    ("title: '550 gsm'", "title: 'heavyweight quality'"),
    ("title: 'literally my favorite'", "title: 'top tier'"),
    ("title: 'double lined hood'", "title: 'quality hood'"),
    ("title: 'oversized fit'", "title: 'roomy fit'"),
    ("title: 'kangaroo pocket'", "title: 'deep pockets'"),
    ("title: 'worth the hype'", "title: 'lives up'"),
    ("title: 'favorite piece'", "title: 'go-to'"),
    ("title: 'drop shoulder'", "title: 'relaxed cut'"),
    ("title: 'no pilling'", "title: 'durable fabric'"),
    ("title: 'reinforced stitching'", "title: 'quality construction'"),
    ("title: 'fleece lined'", "title: 'warm lining'"),
    ("title: 'ribbed cuffs'", "title: 'stays in place'"),
    ("title: 'cotton blend'", "title: 'soft fabric'"),
    ("title: 'true to size'", "title: 'perfect fit'"),
    ("title: 'size up'", "title: 'went larger'"),
    ("title: 'size down'", "title: 'went smaller'"),
    ("title: 'runs big'", "title: 'oversized'"),
    ("title: 'runs small'", "title: 'snug fit'"),
    ("title: 'tapered fit'", "title: 'slim taper'"),
    ("title: 'straight fit'", "title: 'classic cut'"),
    ("title: 'water resistant'", "title: 'weather proof'"),
    ("title: 'breathable'", "title: 'good airflow'"),
    ("title: '14oz denim'", "title: 'heavy denim'"),
    ("title: '12oz cotton'", "title: 'quality cotton'"),
    ("title: 'selvedge denim'", "title: 'premium denim'"),
    ("title: 'raw denim'", "title: 'unwashed denim'"),
    ("title: 'zip pockets'", "title: 'secure pockets'"),
    ("title: 'snap buttons'", "title: 'snap closure'"),
    ("title: 'adjustable strap'", "title: 'custom fit'"),
    ("title: 'one size'", "title: 'universal'"),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {count} phrase duplicates")
