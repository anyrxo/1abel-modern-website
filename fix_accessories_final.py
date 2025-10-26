import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

fixes = [
    (r"author: '([a-zA-Z]+)_([a-zA-Z0-9]+)'", r"author: '\1\2'"),
    (r"content: '([^'\.]+)\. ([^']+)'", r"content: '\1, \2'"),
    (r"content: 'I absolutely love", r"content: 'love"),
    (r"content: 'I love", r"content: 'love"),
    (r"content: 'So ", r"content: 'so "),
    (r"content: 'Very ", r"content: 'very "),
    (r"content: 'The ", r"content: 'the "),
    (r"content: 'This ", r"content: 'this "),
    (r"content: 'These ", r"content: 'these "),
    (r"content: 'Super ", r"content: 'super "),
    (r"!!+", ""),
]

for pattern, replacement in fixes:
    content = re.sub(pattern, replacement, content)

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all accessory reviews")
