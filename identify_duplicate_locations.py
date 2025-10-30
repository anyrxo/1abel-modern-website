import re

# Read the file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find product sections and their reviews
current_product = None
review_data = []

for i, line in enumerate(lines, 1):
    # Check for product review exports
    if 'export const' in line and 'Reviews' in line:
        # Extract product name
        match = re.search(r'export const (\w+Reviews[^:]*)', line)
        if match:
            current_product = match.group(1)

    # Check for review content
    if "content: '" in line or 'content: "' in line:
        content_match = re.search(r"content: ['\"]([^'\"]+)['\"]", line)
        if content_match:
            content = content_match.group(1)
            review_data.append({
                'line': i,
                'product': current_product,
                'content': content
            })

# Find duplicates with product info
from collections import defaultdict
content_to_products = defaultdict(list)

for review in review_data:
    content_to_products[review['content']].append({
        'product': review['product'],
        'line': review['line']
    })

# Report duplicates
duplicates = {text: locs for text, locs in content_to_products.items() if len(locs) > 1}

print(f"DUPLICATES ACROSS PRODUCTS:\n")
print("="*80)

sorted_dups = sorted(duplicates.items(), key=lambda x: len(x[1]), reverse=True)

for text, locations in sorted_dups[:20]:  # Show top 20 worst offenders
    print(f"\n'{text}'")
    print(f"  Appears {len(locations)} times across products:")
    products = set(loc['product'] for loc in locations)
    for product in sorted(products):
        lines = [loc['line'] for loc in locations if loc['product'] == product]
        print(f"    - {product}: lines {lines}")

print(f"\n" + "="*80)
print(f"Total unique contents with duplicates: {len(duplicates)}")
print(f"Total duplicate instances: {sum(len(locs) for locs in duplicates.values()) - len(duplicates)}")
