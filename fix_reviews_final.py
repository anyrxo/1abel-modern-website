#!/usr/bin/env python3
import random
from datetime import datetime, timedelta

# Read original
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Generators
AUTHORS = ['Marcus', 'Sarah', 'Jason', 'alex_nyc', 'David', 'Emma', 'ChrisM', 'nina_k', 'jake_m', 'Rachel P', 'Tommy', 'Mia', 'ben_r', 'Ashley K', 'kyle_t', 'Olivia', 'Matt', 'sophia_m', 'Derek W', 'lauren_b', 'Jared', 'Chloe', 'nathan_r', 'Maya', 'Brandon', 'zoe_k', 'Adam', 'Isabella', 'Tyler R', 'Haley', 'Chris', 'grace_m', 'Jordan', 'Sam', 'lily_p', 'Kevin', 'Nicole', 'Dan', 'ava_r', 'Lucas', 'Jasmine', 'Ethan', 'ruby_k', 'Blake', 'Hannah', 'Austin', 'Nate', 'Lily', 'Jesse', 'Cole', 'Mila', 'Owen', 'Leah', 'Ian', 'Luke', 'Ella', 'Noah', 'Jack', 'Dylan', 'Grace', 'Gavin', 'Carter', 'Mason', 'Harper', 'Wyatt', 'Logan', 'Aiden', 'Hayden', 'Carson', 'Parker', 'Chase', 'Landon', 'Cooper', 'Evan']
HEIGHTS = ["'5\\'3\\\"-5\\'5\\\"'", "'5\\'5\\\"-5\\'8\\\"'", "'5\\'8\\\"-5\\'10\\\"'", "'5\\'10\\\"-6\\'0\\\"'", "'6\\'0\\\"-6\\'2\\\"'"]
SIZES_APP = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
FITS = ['true', 'true', 'true', 'large', 'small']
RATS = [4, 5, 5, 5, 5]
HELPS = [0, 0, 0, 1, 1, 2, 3]
TITLES = ['love it', 'perfect', 'amazing', 'so good', 'quality', 'best one', 'worth it', 'obsessed', 'fire', 'solid']

COLORS = {
    'thermal': ['void', 'moss', 'steel', 'cloud', 'blood', 'sakura', 'earth'],
    'hoodie': ['void', 'steel', 'lilac', 'cloud', 'moss', 'sand', 'sakura'],
    'denim': ['void', 'cloud', 'mist', 'earth', 'sand', 'blood', 'sakura'],
    'tee': ['void', 'steel', 'cloud', 'moss', 'sand', 'blood', 'sakura'],
    'longsleeve': ['void', 'steel', 'cloud', 'moss', 'sand', 'blood', 'sakura'],
    'crewneck': ['void', 'steel', 'cloud', 'moss', 'sand', 'lilac', 'sakura'],
    'overshirt': ['void', 'steel', 'moss', 'cloud', 'earth', 'sand'],
    'coach-jacket': ['void', 'steel', 'moss', 'cloud', 'earth', 'sand'],
    'puffer': ['void', 'steel', 'moss', 'cloud', 'earth', 'blood'],
    'cargo': ['void', 'steel', 'moss', 'earth', 'sand', 'blood'],
    'joggers': ['void', 'steel', 'moss', 'cloud', 'earth', 'sand'],
    'sweats': ['void', 'steel', 'moss', 'cloud', 'sand', 'blood'],
    'shorts': ['void', 'steel', 'moss', 'cloud', 'sand', 'blood'],
    'wide-pants': ['void', 'steel', 'moss', 'cloud', 'earth', 'sand'],
    'beanie': ['void', 'steel', 'moss', 'cloud', 'blood', 'sakura'],
    'cap': ['void', 'steel', 'moss', 'cloud', 'sand', 'blood'],
    'belt': ['void', 'steel', 'earth', 'blood'],
    'gloves': ['void', 'steel', 'moss', 'cloud', 'earth'],
    'socks': ['void', 'steel', 'moss', 'cloud', 'mist', 'blood'],
    'ring': ['void', 'steel', 'cloud'],
    'chain': ['cloud', 'silver', 'void'],
    'tote-bag': ['void', 'cloud', 'moss', 'steel']
}

def make_date(idx):
    start = datetime(2024, 12, 26)
    d = start - timedelta(days=idx * 2)
    return f"'{d.strftime('%Y-%m-%d')}'"

def make_review(pk, rev_id, idx):
    author = random.choice(AUTHORS)
    rating = random.choice(RATS)
    title = random.choice(TITLES)
    color = random.choice(COLORS.get(pk, ['void', 'steel']))
    content = f'{color} {random.choice(["perfect", "amazing", "fire", "so good"])}.  {random.choice(["fits perfect", "love it", "wear all the time", "quality amazing"])}'

    if pk in ['chain', 'tote-bag', 'beanie', 'cap']:
        size = 'ONE SIZE'
    elif pk == 'ring':
        size = str(random.randint(6, 12))
    elif pk == 'belt':
        size = random.choice(['S', 'M', 'L', 'XL'])
    elif pk in ['socks', 'gloves']:
        size = random.choice(['S', 'M', 'L'])
    elif pk == 'denim':
        size = str(random.randint(26, 34))
    else:
        size = random.choice(SIZES_APP)

    has_height = pk not in ['chain', 'tote-bag', 'belt', 'ring']
    height_line = f"    height: {random.choice(HEIGHTS)},\\n" if has_height else ""

    return f"""  {{
    id: '{rev_id}',
    author: '{author}',
    rating: {rating},
    title: '{title}',
    content: '{content}',
{height_line}    sizeOrdered: '{size}',
    usualSize: '{size}',
    fitRating: '{random.choice(FITS)}',
    helpfulCount: {random.choice(HELPS)},
    notHelpfulCount: 0,
    verified: true,
    date: {make_date(idx)}
  }}"""

# Define what to add - these are the EXACT patterns to find and how many to add
TASKS = [
    # (search_pattern, product_key, id_prefix, start_num, total_needed)
    ("id: 'rev-hoodie-010',", 'hoodie', 'rev-hoodie', 11, 87),
    ("id: 'rev-denim-008',", 'denim', 'rev-denim', 9, 34),
    ("id: 'rev-chain-arc3-005',", 'chain', 'rev-chain-arc3', 6, 24),
    ("id: 'rev-chain-arc2-004',", 'chain', 'rev-chain-arc2', 5, 14),
    ("id: 'rev-tote-bag-000',", 'tote-bag', 'rev-tote-bag', 1, 28),
    ("id: 'rev-tee-010',", 'tee', 'rev-tee', 11, 30),
    ("id: 'rev-longsleeve-000',", 'longsleeve', 'rev-longsleeve', 1, 25),
    ("id: 'rev-crewneck-000',", 'crewneck', 'rev-crewneck', 1, 35),
    ("id: 'rev-overshirt-000',", 'overshirt', 'rev-overshirt', 1, 22),
    ("id: 'rev-coach-jacket-000',", 'coach-jacket', 'rev-coach-jacket', 1, 28),
    ("id: 'rev-puffer-008',", 'puffer', 'rev-puffer', 9, 32),
    ("id: 'rev-cargo-008',", 'cargo', 'rev-cargo', 9, 27),
    ("id: 'rev-joggers-000',", 'joggers', 'rev-joggers', 1, 24),
    ("id: 'rev-sweats-009',", 'sweats', 'rev-sweats', 10, 31),
    ("id: 'rev-shorts-000',", 'shorts', 'rev-shorts', 1, 20),
    ("id: 'rev-wide-pants-000',", 'wide-pants', 'rev-wide-pants', 1, 18),
    ("id: 'rev-beanie-008',", 'beanie', 'rev-beanie', 9, 26),
    ("id: 'rev-cap-008',", 'cap', 'rev-cap', 9, 29),
    ("id: 'rev-belt-008',", 'belt', 'rev-belt', 9, 23),
    ("id: 'rev-gloves-000',", 'gloves', 'rev-gloves', 1, 19),
    ("id: 'rev-sock-008',", 'socks', 'rev-sock', 9, 24),
    ("id: 'rev-ring-008',", 'ring', 'rev-ring', 9, 21),
]

# Process each task
for search_pattern, pk, id_prefix, start_num, total_needed in TASKS:
    count_to_add = total_needed - start_num + 1

    # Skip if pattern doesn't exist (like the -000 ones which don't exist yet)
    if search_pattern not in content:
        print(f"SKIP {pk}: Pattern not found (will need manual creation)")
        continue

    # Find the pattern
    pos = content.find(search_pattern)
    if pos == -1:
        continue

    # Find the closing "}" of this review object
    close_pos = content.find('\\n  }', pos)
    if close_pos == -1:
        continue

    # Move to after the "}"
    insert_pos = close_pos + len('\\n  }')

    # Generate reviews
    reviews = []
    for i in range(count_to_add):
        num = start_num + i
        rev_id = f"{id_prefix}-{num:03d}"
        rev = make_review(pk, rev_id, i)
        reviews.append(rev)

    # Insert
    new_content = ',\\n' + ',\\n'.join(reviews)
    content = content[:insert_pos] + new_content + content[insert_pos:]

    print(f"Added {count_to_add} reviews to {pk}")

# Write
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\\nDone!")
