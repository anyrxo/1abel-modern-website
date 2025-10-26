import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix color-based duplicates
replacements = [
    ("title: 'sand color',\n    content: 'sand color",
     "title: 'warm beige',\n    content: 'sand color"),
    
    ("title: 'earth color',\n    content: 'earth color",
     "title: 'brown tone',\n    content: 'earth color"),
    
    ("title: 'sakura',\n    content: 'got the sakura",
     "title: 'soft pink',\n    content: 'got the sakura"),
    
    # Arc 3 specific
    ("title: 'sand beige',\n    content: 'sand color from arc 3",
     "title: 'warm neutral',\n    content: 'sand color from arc 3"),
    
    # Quality duplicates
    ("title: 'quality',\n    content: 'quality great",
     "title: 'great build',\n    content: 'quality great"),
    
    ("title: 'quality',\n    content: 'quality amazing",
     "title: 'amazing build',\n    content: 'quality amazing"),
]

count = 0
for old, new in replacements:
    occurrences = content.count(old)
    if occurrences > 0:
        content = content.replace(old, new)
        count += occurrences
        print(f"Fixed {occurrences}x: {old[:40]}...")

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nTotal: {count} fixes")
