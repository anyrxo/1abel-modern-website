import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all review blocks and fix title/content duplicates
pattern = r"(\s+id: '[^']+',\s+author: '[^']+',\s+rating: \d+,\s+title: ')([^']+)(',\s+content: ')([^']+)(')"

def fix_duplicate(match):
    prefix = match.group(1)
    title = match.group(2)
    middle = match.group(3)
    content_text = match.group(4)
    suffix = match.group(5)
    
    title_lower = title.lower().strip()
    content_lower = content_text.lower().strip()
    
    # Check if title appears in content
    if title_lower not in content_lower:
        return match.group(0)  # No duplicate, keep as-is
    
    # Title appears in content - need to change title
    # Create alternative titles based on common patterns
    alternatives = {
        'quality': 'great build',
        'perfect': 'love it',
        'best': 'top quality',
        'amazing': 'so good',
        'obsessed': 'favorite',
        'fire': 'heat',
        'solid': 'quality',
        'love': 'obsessed',
        'great': 'excellent',
        'good': 'nice',
        'comfortable': 'comfy',
        'cozy': 'warm',
        'soft': 'plush',
        'warm': 'cozy',
        'heavyweight': 'quality build',
        'pricey': 'worth it',
    }
    
    # Check if title is in our alternatives
    new_title = title
    for key, val in alternatives.items():
        if title_lower == key:
            new_title = val
            break
        elif title_lower.startswith(key + ' '):
            new_title = val + title[len(key):]
            break
    
    # If still same, try other strategies
    if new_title == title:
        # If title is a color name that appears in content, make it more descriptive
        if any(color in title_lower for color in ['void', 'steel', 'moss', 'blood', 'earth', 'sand', 'mist', 'sakura']):
            if 'void' in title_lower:
                new_title = 'deep black'
            elif 'steel' in title_lower:
                new_title = 'neutral grey'
            elif 'moss' in title_lower:
                new_title = 'forest green'
            elif 'blood' in title_lower:
                new_title = 'deep red'
            elif 'earth' in title_lower:
                new_title = 'rich brown'
            elif 'sand' in title_lower:
                new_title = 'warm beige'
            elif 'mist' in title_lower:
                new_title = 'soft blue'
            elif 'sakura' in title_lower:
                new_title = 'light pink'
    
    return f"{prefix}{new_title}{middle}{content_text}{suffix}"

# Apply fixes
new_content = re.sub(pattern, fix_duplicate, content)

# Count how many were changed
original_count = len(re.findall(pattern, content))
changes = sum(1 for old, new in zip(re.findall(pattern, content), re.findall(pattern, new_content)) if old != new)

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Checked {original_count} reviews, fixed {changes} title/content duplicates")
