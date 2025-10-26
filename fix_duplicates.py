import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("title: 'heavyweight',\n    content: 'ribbed hem keeps it in place, heavyweight",
     "title: 'quality build',\n    content: 'ribbed hem keeps it in place, heavyweight"),
    
    ("title: 'steel color',\n    content: 'got the steel color",
     "title: 'neutral steel',\n    content: 'got the steel color"),
    
    ("title: 'void color',\n    content: 'got the void color",
     "title: 'deep black',\n    content: 'got the void color"),
    
    ("title: 'blood red',\n    content: 'got the blood red",
     "title: 'bold red',\n    content: 'got the blood red"),
    
    ("title: 'mist color',\n    content: 'the mist color",
     "title: 'light blue',\n    content: 'the mist color"),
    
    ("title: 'moss green',\n    content: 'got the moss green",
     "title: 'earthy green',\n    content: 'got the moss green"),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {count} title/content duplicates")
