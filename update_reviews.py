import re
import random
from datetime import datetime, timedelta

# Read the current file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Review generation helpers
authors = ['Marcus', 'Sarah', 'Jason', 'alex_nyc', 'David', 'Emma', 'ChrisM', 'nina_k', 'jake_m', 'Rachel', 'Tommy', 'Mia', 'ben_r', 'Ashley', 'kyle_t', 'Olivia', 'Matt', 'sophia_m', 'Derek', 'lauren_b', 'Jared', 'Chloe', 'nathan_r', 'Maya', 'Brandon', 'zoe_k', 'Adam', 'Isabella', 'Tyler', 'Haley', 'Chris', 'grace_m', 'Jordan', 'Sam', 'lily_p', 'Kevin', 'Nicole', 'Dan', 'ava_r', 'Lucas', 'Jasmine', 'Ethan', 'ruby_k', 'Zach', 'maddie_r', 'Ryan', 'Sophia', 'Connor', 'ellie_m', 'Blake', 'Hannah', 'Austin', 'chloe_b', 'Nate', 'Lily', 'Jesse', 'aria_k', 'Cole', 'Mila', 'Owen', 'taylor_h', 'Evan', 'Leah', 'Ian', 'zoey_p', 'Luke', 'Ella', 'Noah', 'avery_m', 'Jack', 'madison_r', 'Dylan', 'Grace', 'Gavin', 'natalie_b', 'Carter', 'isabel_k', 'Mason', 'Harper', 'Wyatt', 'brooklyn_m']

heights = ["'5\\'3\\\"-5\\'5\\\"'", "'5\\'5\\\"-5\\'8\\\"'", "'5\\'8\\\"-5\\'10\\\"'", "'5\\'10\\\"-6\\'0\\\"'", "'6\\'0\\\"-6\\'2\\\"'"]
sizes_apparel = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
fit_ratings = ['true', 'large', 'small', 'true', 'true']  # Mostly 'true'
ratings = [4, 5, 5, 5, 5]  # Mostly 5s
helpful_counts = [0, 0, 0, 1, 1, 2, 3]

# Color names for each product
colors_map = {
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

def gen_date(days_ago):
    start_date = datetime(2024, 12, 26)
    date = start_date - timedelta(days=days_ago * 2)
    return date.strftime("'%Y-%m-%d'")

def gen_review(product_key, num, date_str):
    author = random.choice(authors)
    rating = random.choice(ratings)
    title = random.choice(['love it', 'perfect', 'amazing', 'so good', 'quality', 'best one', 'worth it', 'obsessed', 'fire', 'solid'])

    colors = colors_map.get(product_key, ['void', 'steel', 'moss', 'cloud'])
    color = random.choice(colors)

    # Simple, short content templates
    contents = [
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
    content = random.choice(contents)

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
        size = random.choice(sizes_apparel)

    has_height = product_key not in ['chain-arc2', 'chain-arc3', 'tote-bag', 'belt', 'ring']
    height_str = f"\\n    height: {random.choice(heights)}," if has_height else ""

    fit = random.choice(fit_ratings)
    helpful = random.choice(helpful_counts)

    return f"""  {{
    id: '{num}',
    author: '{author}',
    rating: {rating},
    title: '{title}',
    content: '{content}',{height_str}
    sizeOrdered: '{size}',
    usualSize: '{size}',
    fitRating: '{fit}',
    helpfulCount: {helpful},
    notHelpfulCount: 0,
    verified: true,
    date: {date_str}
  }}"""

# Define what needs to be added for each product
to_add = [
    ('hoodie', 'rev-hoodie-010', 'rev-hoodie', 11, 87, 77),
    ('denim', 'rev-denim-008', 'rev-denim', 9, 34, 26),
    ('tee', 'rev-tee-010', 'rev-tee', 11, 30, 20),
    ('longsleeve', 'rev-longsleeve-000', 'rev-longsleeve', 1, 25, 25),
    ('crewneck', 'rev-crewneck-000', 'rev-crewneck', 1, 35, 35),
    ('overshirt', 'rev-overshirt-000', 'rev-overshirt', 1, 22, 22),
    ('coach-jacket', 'rev-coach-jacket-000', 'rev-coach-jacket', 1, 28, 28),
    ('puffer', 'rev-puffer-008', 'rev-puffer', 9, 32, 24),
    ('cargo', 'rev-cargo-008', 'rev-cargo', 9, 27, 19),
    ('joggers', 'rev-joggers-000', 'rev-joggers', 1, 24, 24),
    ('sweats', 'rev-sweats-009', 'rev-sweats', 10, 31, 22),
    ('shorts', 'rev-shorts-000', 'rev-shorts', 1, 20, 20),
    ('wide-pants', 'rev-wide-pants-000', 'rev-wide-pants', 1, 18, 18),
    ('beanie', 'rev-beanie-008', 'rev-beanie', 9, 26, 18),
    ('cap', 'rev-cap-008', 'rev-cap', 9, 29, 21),
    ('belt', 'rev-belt-008', 'rev-belt', 9, 23, 15),
    ('gloves', 'rev-gloves-000', 'rev-gloves', 1, 19, 19),
    ('socks', 'rev-sock-008', 'rev-sock', 9, 24, 16),
    ('ring', 'rev-ring-008', 'rev-ring', 9, 21, 13),
    ('chain-arc2', 'rev-chain-arc2-004', 'rev-chain-arc2', 5, 14, 10),
    ('chain-arc3', 'rev-chain-arc3-005', 'rev-chain-arc3', 6, 24, 19),
    ('tote-bag', 'rev-tote-bag-000', 'rev-tote-bag', 1, 28, 28),
]

for product_key, last_id, id_prefix, start_num, total_needed, count_to_add in to_add:
    print(f"Adding {count_to_add} reviews for {product_key}...")

    # Find the last occurrence of the last_id
    pattern = re.escape(last_id)
    matches = list(re.finditer(pattern, content))

    if not matches:
        print(f"  WARNING: Could not find {last_id} for {product_key}")
        continue

    # Get the position of the last match
    last_match = matches[-1]
    start_pos = last_match.start()

    # Find the closing brace of this review object (look for next "  }" pattern)
    search_from = start_pos
    closing_pattern = r'\\n  \\}\\n]'
    closing_match = re.search(closing_pattern, content[search_from:search_from+5000])

    if not closing_match:
        print(f"  WARNING: Could not find closing for {product_key}")
        continue

    insert_pos = search_from + closing_match.start() + len('\\n  }')

    # Generate new reviews
    new_reviews = []
    for i in range(count_to_add):
        num = start_num + i
        review_id = f"{id_prefix}-{num:03d}"
        date_str = gen_date(i)
        review = gen_review(product_key, review_id, date_str)
        new_reviews.append(review)

    # Insert them
    new_content = ',\\n' + ',\\n'.join(new_reviews)
    content = content[:insert_pos] + new_content + content[insert_pos:]

    print(f"  Added {count_to_add} reviews to {product_key}")

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\\nAll reviews added successfully!")
