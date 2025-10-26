import random
from datetime import datetime, timedelta

# Review generation templates
authors = ['Marcus', 'Sarah', 'Jason', 'alex_nyc', 'David', 'Emma', 'ChrisM', 'nina_k', 'jake_m', 'Rachel', 'Tommy', 'Mia', 'ben_r', 'Ashley', 'kyle_t', 'Olivia', 'Matt', 'sophia_m', 'Derek', 'lauren_b', 'Jared', 'Chloe', 'nathan_r', 'Maya', 'Brandon', 'zoe_k', 'Adam', 'Isabella', 'Tyler', 'Haley', 'Chris', 'grace_m', 'Jordan', 'Sam', 'lily_p', 'Kevin', 'Nicole', 'Dan', 'ava_r', 'Lucas', 'Jasmine', 'Ethan', 'ruby_k', 'Zach', 'maddie_r', 'Ryan', 'Sophia', 'Connor', 'ellie_m', 'Blake', 'Hannah', 'Austin', 'chloe_b', 'Nate', 'Lily', 'Jesse', 'aria_k', 'Cole', 'Mila', 'Owen', 'taylor_h', 'Evan', 'Leah', 'Ian', 'zoey_p', 'Luke', 'Ella', 'Noah', 'avery_m', 'Jack', 'madison_r', 'Dylan', 'Grace', 'Gavin', 'natalie_b', 'Carter', 'isabel_k', 'Mason', 'Harper', 'Wyatt', 'brooklyn_m', 'Chase', 'Addison', 'Parker', 'skylar_r', 'Hayden', 'Claire', 'Carson', 'savannah_k', 'Logan', 'Kennedy', 'Aiden', 'peyton_m', 'Cooper', 'Morgan', 'Landon', 'quinn_r']

heights = ['5\'3"-5\'5"', '5\'5"-5\'8"', '5\'8"-5\'10"', '5\'10"-6\'0"', '6\'0"-6\'2"']
sizes_apparel = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
fit_ratings = ['true', 'large', 'small']
ratings = [4, 4, 5, 5, 5, 5, 5]  # Mostly 5s with some 4s
helpful_counts = [0, 0, 0, 1, 1, 2, 3]

# Color names for each product type
colors = {
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
    'ring': ['void', 'steel', 'cloud']
}

# Product-specific review templates
templates = {
    'thermal': [
        '{color} color {adj}. {desc}',
        '{desc}. {color} {adj2}',
        '400 GSM {adj}. {color} color {desc}',
        '{color} {adj}. thick fabric {desc}',
        'quality {adj}. {color} {desc}',
    ],
    'hoodie': [
        '{color} {adj}. 550 GSM {desc}',
        'best hoodie. {color} color {adj}',
        '{desc}. {color} {adj2}',
        '550 GSM thick. {color} {adj}',
        'heavyweight hoodie. {color} {desc}',
    ],
    'denim': [
        '{color} wash {adj}. {desc}',
        '14oz selvage {adj}. {color} {desc}',
        '{color} {adj}. denim quality {desc}',
        'selvage denim {adj}. {color} wash {desc}',
        '{color} color {desc}. thick fabric',
    ],
    'default': [
        '{color} {adj}. {desc}',
        'quality {adj}. {color} {desc}',
        '{color} color {desc}. {adj2}',
        '{desc}. {color} {adj}',
        '{color} {adj2}. {desc}',
    ]
}

adjectives = ['perfect', 'fire', 'amazing', 'sick', 'dope', 'beautiful', 'gorgeous', 'clean', 'nice', 'solid', 'quality', 'so good', 'incredible', 'insane']
adjectives2 = ['so clean', 'so nice', 'beautiful', 'gorgeous in person', 'perfect', 'looks great', 'even better irl', 'no complaints']
descriptions = ['fits perfect', 'love it', 'wear all the time', 'best purchase', 'worth it', 'no regrets', 'highly recommend', 'quality amazing', 'exceeded expectations', 'exactly what i wanted', 'very happy', 'perfect fit', 'comfortable af', 'super warm', 'layers perfect']

titles = ['love it', 'perfect', 'amazing', 'so good', 'quality', 'best one', 'worth it', 'obsessed', 'fire', 'solid', 'nice', 'great', 'excellent', 'premium', 'dope']

def generate_review(product, start_id, date_str):
    """Generate a single review for a product."""
    author = random.choice(authors)
    rating = random.choice(ratings)
    title = random.choice(titles)

    # Pick a color
    color_list = colors.get(product, ['void', 'steel', 'moss', 'cloud'])
    color = random.choice(color_list)

    # Generate content
    template_list = templates.get(product, templates['default'])
    template = random.choice(template_list)
    content = template.format(
        color=color,
        adj=random.choice(adjectives),
        adj2=random.choice(adjectives2),
        desc=random.choice(descriptions)
    )

    # Random size
    if product in ['belt', 'beanie', 'cap', 'gloves', 'socks', 'ring', 'chain', 'tote-bag']:
        if product == 'ring':
            size = str(random.randint(6, 12))
        elif product == 'belt':
            size = random.choice(['S', 'M', 'L', 'XL'])
        elif product in ['socks', 'gloves']:
            size = random.choice(['S', 'M', 'L'])
        else:
            size = 'ONE SIZE'
    elif product == 'denim':
        size = str(random.randint(25, 36))
    else:
        size = random.choice(sizes_apparel)

    height = random.choice(heights) if product not in ['belt', 'chain', 'tote-bag', 'ring'] else None
    fit_rating = random.choice(fit_ratings)
    helpful_count = random.choice(helpful_counts)

    # Build review object
    review = f'''  {{
    id: '{start_id}',
    author: '{author}',
    rating: {rating},
    title: '{title}',
    content: '{content}','''

    if height:
        review += f"\n    height: '{height}',"

    review += f'''
    sizeOrdered: '{size}',
    usualSize: '{size}',
    fitRating: '{fit_rating}',
    helpfulCount: {helpful_count},
    notHelpfulCount: 0,
    verified: true,
    date: '{date_str}'
  }}'''

    return review

def generate_date(days_ago):
    """Generate a date string going backwards from Jan 2025."""
    start_date = datetime(2024, 12, 26)  # Start just before 2025
    date = start_date - timedelta(days=days_ago * 2)  # Space them out
    return date.strftime('%Y-%m-%d')

# Generate reviews for each product
products_to_generate = {
    'hoodie': (11, 87, 'rev-hoodie'),
    'denim': (9, 34, 'rev-denim'),
    'tee': (11, 30, 'rev-tee'),
    'longsleeve': (1, 25, 'rev-longsleeve'),
    'crewneck': (1, 35, 'rev-crewneck'),
    'overshirt': (1, 22, 'rev-overshirt'),
    'coach-jacket': (1, 28, 'rev-coach-jacket'),
    'puffer': (9, 32, 'rev-puffer'),
    'cargo': (9, 27, 'rev-cargo'),
    'joggers': (1, 24, 'rev-joggers'),
    'sweats': (10, 31, 'rev-sweats'),
    'shorts': (1, 20, 'rev-shorts'),
    'wide-pants': (1, 18, 'rev-wide-pants'),
    'beanie': (9, 26, 'rev-beanie'),
    'cap': (9, 29, 'rev-cap'),
    'belt': (9, 23, 'rev-belt'),
    'gloves': (1, 19, 'rev-gloves'),
    'socks': (1, 24, 'rev-sock'),
    'ring': (9, 21, 'rev-ring'),
    'chain-arc2': (5, 14, 'rev-chain-arc2'),
    'chain-arc3': (6, 24, 'rev-chain-arc3'),
    'tote-bag': (1, 28, 'rev-tote-bag'),
}

print("// GENERATED REVIEWS - ADD THESE TO productReviews.ts\\n")

for product_key, (start_num, total_needed, id_prefix) in products_to_generate.items():
    num_to_generate = total_needed - start_num + 1
    print(f"\\n// ===== {product_key.upper()} ({num_to_generate} reviews) =====")

    reviews = []
    for i in range(num_to_generate):
        review_num = start_num + i
        review_id = f"{id_prefix}-{review_num:03d}"
        date_str = generate_date(i)

        review = generate_review(product_key, review_id, date_str)
        reviews.append(review)

    # Print with commas
    for j, review in enumerate(reviews):
        if j < len(reviews) - 1:
            print(review + ",")
        else:
            print(review)

print("\\n// END OF GENERATED REVIEWS")
