#!/usr/bin/env python3
"""
Script to add missing reviews to product Reviews.ts file.
This fixes the discrepancy between totalReviews counts in ProductPage.tsx
and actual review objects in productReviews.ts
"""

import re
import random

# Read original file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Review data generators
AUTHOR_POOL = ['Marcus', 'Sarah', 'Jason', 'alex_nyc', 'David', 'Emma', 'ChrisM', 'nina_k', 'jake_m', 'Rachel P', 'Tommy', 'Mia', 'ben_r', 'Ashley K', 'kyle_t', 'Olivia', 'Matt', 'sophia_m', 'Derek W', 'lauren_b', 'Jared', 'Chloe', 'nathan_r', 'Maya', 'Brandon', 'zoe_k', 'Adam', 'Isabella', 'Tyler R', 'Haley', 'Chris', 'grace_m', 'Jordan', 'Sam', 'lily_p', 'Kevin', 'Nicole', 'Dan', 'ava_r', 'Lucas', 'Jasmine', 'Ethan', 'ruby_k']
HEIGHTS = ["'5\\'3\\\"-5\\'5\\\"'", "'5\\'5\\\"-5\\'8\\\"'", "'5\\'8\\\"-5\\'10\\\"'", "'5\\'10\\\"-6\\'0\\\"'", "'6\\'0\\\"-6\\'2\\\"'"]
SIZES_APPAREL = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
FIT_RATINGS = ['true', 'true', 'true', 'large', 'small']
RATINGS = [4, 5, 5, 5, 5]
HELPFUL = [0, 0, 0, 1, 1, 2, 3]

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
    'chain': ['cloud', 'silver', 'void', 'matte'],
    'tote-bag': ['void', 'cloud', 'moss', 'steel']
}

TITLES = ['love it', 'perfect', 'amazing', 'so good', 'quality', 'best one', 'worth it', 'obsessed', 'fire', 'solid', 'nice', 'great', 'excellent', 'premium', 'dope']

def make_content(color):
    """Generate review content"""
    templates = [
        f'{color} color fire. fits perfect',
        f'{color} amazing quality. love it',
        f'{color} so clean. super comfortable',
        f'{color} perfect. wear all the time',
        f'quality insane. {color} beautiful',
        f'{color} looks great. worth it',
        f'{color} gorgeous. best purchase',
        f'{color} clean. highly recommend',
        f'{color} exceeded expectations. so good',
        f'{color} dope. comfortable af',
    ]
    return random.choice(templates)

def gen_date(offset):
    """Generate date string going backwards from late Dec 2024"""
    from datetime import datetime, timedelta
    start = datetime(2024, 12, 26)
    date = start - timedelta(days=offset * 2)
    return f"'{date.strftime('%Y-%m-%d')}'"

def make_review(product_key, rev_id, idx):
    """Generate a single review"""
    author = random.choice(AUTHOR_POOL)
    rating = random.choice(RATINGS)
    title = random.choice(TITLES)

    colors = COLORS.get(product_key, ['void', 'steel', 'moss', 'cloud'])
    color = random.choice(colors)
    content = make_content(color)

    # Size logic
    if product_key in ['chain-arc2', 'chain-arc3', 'tote-bag', 'beanie', 'cap']:
        size = 'ONE SIZE'
    elif product_key == 'ring':
        size = str(random.randint(6, 12))
    elif product_key == 'belt':
        size = random.choice(['S', 'M', 'L', 'XL'])
    elif product_key in ['socks', 'gloves']:
        size = random.choice(['S', 'M', 'L'])
    elif product_key == 'denim':
        size = str(random.randint(26, 34))
    else:
        size = random.choice(SIZES_APPAREL)

    has_height = product_key not in ['chain-arc2', 'chain-arc3', 'tote-bag', 'belt', 'ring']
    height_line = f"    height: {random.choice(HEIGHTS)},\n" if has_height else ""

    fit = random.choice(FIT_RATINGS)
    helpful = random.choice(HELPFUL)
    date = gen_date(idx)

    return f"""  {{
    id: '{rev_id}',
    author: '{author}',
    rating: {rating},
    title: '{title}',
    content: '{content}',
{height_line}    sizeOrdered: '{size}',
    usualSize: '{size}',
    fitRating: '{fit}',
    helpfulCount: {helpful},
    notHelpfulCount: 0,
    verified: true,
    date: {date}
  }}"""

# Define additions needed - (product_key, id_prefix, start_num, total_needed)
ADDITIONS = [
    ('hoodie', 'rev-hoodie', 11, 87),
    ('denim', 'rev-denim', 9, 34),
    ('tee', 'rev-tee', 11, 30),
    ('longsleeve', 'rev-longsleeve', 1, 25),
    ('crewneck', 'rev-crewneck', 1, 35),
    ('overshirt', 'rev-overshirt', 1, 22),
    ('coach-jacket', 'rev-coach-jacket', 1, 28),
    ('puffer', 'rev-puffer', 9, 32),
    ('cargo', 'rev-cargo', 9, 27),
    ('joggers', 'rev-joggers', 1, 24),
    ('sweats', 'rev-sweats', 10, 31),
    ('shorts', 'rev-shorts', 1, 20),
    ('wide-pants', 'rev-wide-pants', 1, 18),
    ('beanie', 'rev-beanie', 9, 26),
    ('cap', 'rev-cap', 9, 29),
    ('belt', 'rev-belt', 9, 23),
    ('gloves', 'rev-gloves', 1, 19),
    ('socks', 'rev-sock', 9, 24),
    ('ring', 'rev-ring', 9, 21),
    ('chain-arc2', 'rev-chain-arc2', 5, 14),
    ('chain-arc3', 'rev-chain-arc3', 6, 24),
    ('tote-bag', 'rev-tote-bag', 1, 28),
]

output = []
i = 0
while i < len(lines):
    line = lines[i]
    output.append(line)

    # Check if we're at the end of a review array that needs expansion
    if '  }\n' == line and i + 1 < len(lines) and lines[i+1] == ']\n':
        # Look back to find which product this is
        for j in range(i - 1, max(0, i - 300), -1):
            if 'export const ' in lines[j] and 'Reviews:' in lines[j]:
                product_match = re.search(r'export const (\w+)Reviews:', lines[j])
                if product_match:
                    product_name = product_match.group(1)

                    # Map product names to our additions
                    mappings = {
                        'hoodie': 'hoodie',
                        'denim': 'denim',
                        'tee': 'tee',
                        'longsleeve': 'longsleeve',
                        'crewneck': 'crewneck',
                        'overshirt': 'overshirt',
                        'coachJacket': 'coach-jacket',
                        'puffer': 'puffer',
                        'cargo': 'cargo',
                        'joggers': 'joggers',
                        'sweats': 'sweats',
                        'shorts': 'shorts',
                        'widePants': 'wide-pants',
                        'beanie': 'beanie',
                        'cap': 'cap',
                        'belt': 'belt',
                        'gloves': 'gloves',
                        'socks': 'socks',
                        'ring': 'ring',
                        'toteBag': 'tote-bag',
                    }

                    product_key = mappings.get(product_name)
                    if product_key:
                        for pk, id_prefix, start_num, total_needed in ADDITIONS:
                            if pk == product_key:
                                count_to_add = total_needed - start_num + 1
                                print(f"Adding {count_to_add} reviews to {product_name}...")

                                # Generate and add reviews
                                for idx in range(count_to_add):
                                    rev_num = start_num + idx
                                    rev_id = f"{id_prefix}-{rev_num:03d}"
                                    review = make_review(pk, rev_id, idx)
                                    output.append(',\n')
                                    output.append(review + '\n')
                                break
                break

    i += 1

# Write output
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.writelines(output)

print("\nDone! Reviews file updated.")
