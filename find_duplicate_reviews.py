import re
from collections import defaultdict

# Read the file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all review content
review_pattern = r"content: '([^']+)'|content: \"([^\"]+)\""
reviews = re.findall(review_pattern, content)

# Flatten the tuples (regex returns tuple with one match)
review_texts = [r[0] if r[0] else r[1] for r in reviews]

# Find duplicates
content_to_locations = defaultdict(list)
for idx, text in enumerate(review_texts):
    content_to_locations[text].append(idx + 1)  # 1-indexed

# Report duplicates (appearing more than once)
duplicates = {text: locs for text, locs in content_to_locations.items() if len(locs) > 1}

if duplicates:
    print(f"FOUND {len(duplicates)} DUPLICATE REVIEW CONTENTS:\n")

    # Sort by number of occurrences
    sorted_dups = sorted(duplicates.items(), key=lambda x: len(x[1]), reverse=True)

    for text, locations in sorted_dups:
        print(f"'{text}'")
        print(f"  Appears {len(locations)} times at review positions: {locations}")
        print()
else:
    print("No duplicate reviews found!")

print(f"\nTotal reviews checked: {len(review_texts)}")
print(f"Unique reviews: {len(set(review_texts))}")
print(f"Duplicate reviews: {len(review_texts) - len(set(review_texts))}")
