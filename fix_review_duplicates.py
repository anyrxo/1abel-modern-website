import re

# Read the file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacement rules for common title/content duplicates
# Format: (search_pattern, replacement_title, replacement_content_pattern)
fixes = [
    # When title matches start of content exactly
    (r"title: 'heavyweight',\s*content: 'heavyweight", "title: 'quality build',\n    content: 'heavyweight"),
    (r"title: 'steel color',\s*content: 'got the steel color", "title: 'neutral steel',\n    content: 'got the steel color"),
    (r"title: 'void color',\s*content: 'got the void color", "title: 'deep black',\n    content: 'got the void color"),
    (r"title: 'blood red',\s*content: 'got the blood red", "title: 'bold red',\n    content: 'got the blood red"),
    (r"title: 'mist color',\s*content: 'the mist color", "title: 'light blue',\n    content: 'the mist color"),
    (r"title: 'moss green',\s*content: 'got the moss green", "title: 'earthy green',\n    content: 'got the moss green"),
    (r"title: 'best layering piece',\s*content: 'best layering piece", "title: 'perfect layer',\n    content: 'best layering piece"),
    (r"title: '400gsm weight',\s*content: 'the 400gsm weight", "title: 'perfect weight',\n    content: 'the 400gsm weight"),
    (r"title: 'void thermal',\s*content: 'void thermal", "title: 'black thermal',\n    content: 'void thermal"),
    (r"title: 'enzyme wash',\s*content: 'the enzyme wash", "title: 'soft wash',\n    content: 'the enzyme wash"),
    (r"title: 'drop shoulder fit',\s*content: 'the drop shoulder fit", "title: 'relaxed fit',\n    content: 'the drop shoulder fit"),
]

# Apply fixes
for pattern, new_title, new_content in fixes:
    content = re.sub(pattern, f"{new_title}\n    {new_content}", content)

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed common title/content duplicates")
