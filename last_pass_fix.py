import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the most obvious remaining ones
specific_fixes = [
    ("title: 'sleek',\n    content: 'sleek", "title: 'clean',\n    content: 'sleek"),
    ("title: 'pockets',\n    content: 'cargo pockets", "title: 'functional',\n    content: 'cargo pockets"),
    ("title: 'ripstop fabric'", "title: 'tough fabric'"),
    ("title: 'wear weekly'", "title: 'weekly wear'"),
    ("title: 'durable',\n    content: 'durable as hell", "title: 'built tough',\n    content: 'durable as hell"),
    ("title: 'drawstring',\n    content: 'drawstring is thick", "title: 'quality drawstring',\n    content: 'drawstring is thick"),
    ("title: 'technical fabric'", "title: 'tech fabric'"),
    ("title: 'tapered leg',\n    content: 'tapered leg fit", "title: 'slim taper',\n    content: 'tapered leg fit"),
    ("title: 'brushed fleece'", "title: 'plush fleece'"),
    ("title: '450 gsm'", "title: 'perfect weight'"),
    ("title: 'elastic waist',\n    content: 'elastic waist with drawstring", "title: 'comfy waist',\n    content: 'elastic waist with drawstring"),
    ("title: 'side pockets'", "title: 'deep pockets'"),
    ("title: 'brushed inside'", "title: 'soft inside'"),
]

count = 0
for old, new in specific_fixes:
    before = content
    content = content.replace(old, new)
    if content != before:
        count += 1

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {count} last duplicates")
