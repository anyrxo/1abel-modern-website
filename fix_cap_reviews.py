import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find CAP reviews section
cap_start = content.find("// CAP REVIEWS")
cap_end = content.find("// BELT REVIEWS")
cap_section = content[cap_start:cap_end]

# Common fixes for cap reviews
fixes = [
    # Username fixes
    (r"author: '([a-z]+)_([a-z0-9]+)'", r"author: '\1\2'"),
    
    # Period to comma fixes in content
    (r"content: '([^']+)\. ([^']+)'", r"content: '\1, \2'"),
    
    # Capitalization fixes
    (r"content: 'I absolutely", r"content: 'i absolutely"),
    (r"content: 'So ", r"content: 'so "),
    (r"content: 'Very ", r"content: 'very "),
    (r"content: 'The ", r"content: 'the "),
    (r"content: 'This ", r"content: 'this "),
    
    # Remove exclamation marks (replace with nothing or period based on position)
    (r"!+", ""),
]

# Apply fixes to cap section
fixed_cap = cap_section
for pattern, replacement in fixes:
    fixed_cap = re.sub(pattern, replacement, fixed_cap)

# Replace in original content
new_content = content[:cap_start] + fixed_cap + content[cap_end:]

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed CAP reviews - usernames, periods, capitalization, exclamations")
