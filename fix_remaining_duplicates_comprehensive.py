import re
import random

# Product-specific vocabulary
PRODUCT_VOCAB = {
    'thermal': ['400gsm', 'drop shoulder', 'heavyweight', 'layering', 'cotton elastane', 'stretches well'],
    'hoodie': ['550gsm', 'fleece', 'drawstrings', 'kangaroo pocket', 'warm', 'cozy'],
    'denim': ['japanese', 'selvedge', '13.5oz', 'breaks in', 'raw denim', 'straight leg', 'tapered'],
    'chain': ['sterling silver', 'length', 'weight', 'sits perfect', 'minimal', 'clean'],
    'tote': ['canvas', 'handles', 'sturdy', 'holds everything', 'interior pocket', 'durable'],
    'tee': ['240gsm', 'enzyme wash', 'combed cotton', 'ribbed neck', 'heavyweight', 'soft'],
    'longsleeve': ['ribbed cuffs', 'crew neck', 'layering', 'sleeve length', 'fitted'],
    'crewneck': ['320gsm', 'fleece', 'drop shoulder', 'brushed interior', 'ribbed hem'],
    'overshirt': ['12oz cotton twill', 'chest pockets', 'snap buttons', 'layering piece', 'structure'],
    'coach': ['water resistant', 'snap buttons', 'lightweight', 'packable', 'windproof'],
    'puffer': ['700 fill down', 'warmth', 'packable', 'insulated', 'cozy', 'winter'],
    'cargo': ['ripstop', 'utility pockets', 'durable', 'tactical', 'reinforced'],
    'joggers': ['tapered', 'elastic waistband', 'cuffed ankles', 'four way stretch', 'athletic'],
    'sweats': ['450gsm', 'brushed fleece', 'elastic waistband', 'heavyweight', 'soft'],
    'shorts': ['cotton twill', 'breathable', 'length', 'pockets', 'summer'],
    'wide': ['wide leg', 'front pleats', 'flowy', 'tailored waist', 'silhouette'],
    'beanie': ['ribbed knit', 'fits perfect', 'warm', 'not too tight', 'cuffed'],
    'cap': ['adjustable strap', 'structured crown', 'cotton twill', 'curved brim', 'fits great'],
    'belt': ['leather', 'metal buckle', 'quality', 'holds up', 'width'],
    'gloves': ['warm', 'touchscreen compatible', 'lined', 'grip', 'fits snug'],
    'socks': ['cushioned sole', 'cotton blend', 'ribbed', 'stays up', 'comfortable'],
    'ring': ['sterling silver', 'comfortable', 'weight', 'size', 'minimal design'],
}

# Generic positive phrases to product-specific
def make_product_specific(generic, product_type):
    vocab = PRODUCT_VOCAB.get(product_type, ['great', 'quality', 'love it'])

    templates = [
        f"{random.choice(vocab)} is {random.choice(['perfect', 'great', 'excellent', 'amazing'])}",
        f"love the {random.choice(vocab)}",
        f"{random.choice(vocab)}, {random.choice(['wear constantly', 'everyday go-to', 'so comfortable', 'highly recommend'])}",
        f"{random.choice(vocab)} {random.choice(['exceeded expectations', 'is top tier', 'worth the price'])}",
    ]

    return random.choice(templates)

# Read file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find duplicates
content_dict = {}
for i, line in enumerate(lines):
    if "content: '" in line or 'content: "' in line:
        match = re.search(r"content: ['\"]([^'\"]+)['\"]", line)
        if match:
            cont = match.group(1)
            if cont not in content_dict:
                content_dict[cont] = []
            content_dict[cont].append(i)

duplicates = {k: v for k, v in content_dict.items() if len(v) > 1}

# Track product context
current_product = None
fixed_count = 0

for i, line in enumerate(lines):
    # Track product
    if 'export const' in line and 'Reviews' in line:
        match = re.search(r'export const (\w+)', line.lower())
        if match:
            prod_name = match.group(1).replace('reviews', '').replace('arc2', '').replace('arc3', '')
            # Find matching product type
            for key in PRODUCT_VOCAB.keys():
                if key in prod_name:
                    current_product = key
                    break

    # Fix duplicates
    if i in [idx for dups in duplicates.values() for idx in dups[1:]]:  # Skip first occurrence
        if "content: '" in line and current_product:
            # Extract indentation
            indent = len(line) - len(line.lstrip())
            new_content = make_product_specific("", current_product)
            lines[i] = ' ' * indent + f"content: '{new_content}',\n"
            fixed_count += 1

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"Fixed {fixed_count} duplicate reviews with product-specific content")
