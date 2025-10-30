import re
import random

# Read the file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Product-specific replacements for common duplicates
replacements = {
    # FIRE replacements - need to be context-aware
    ("content: 'fire'", "denim"): "content: 'selvedge denim ages beautifully'",
    ("content: 'fire'", "cargo"): "content: 'utility pockets are so functional'",
    ("content: 'fire'", "coach"): "content: 'lightweight but blocks wind perfectly'",
    ("content: 'fire'", "crewneck"): "content: 'heavyweight fleece is warm without bulk'",
    ("content: 'fire'", "overshirt"): "content: '12oz cotton twill has great structure'",
    ("content: 'fire'", "puffer"): "content: 'warmest jacket i own, packs small'",
    ("content: 'fire'", "tee"): "content: 'heavyweight cotton feels premium'",
    ("content: 'fire'", "longsleeve"): "content: 'layering staple, perfect weight'",
    ("content: 'fire'", "belt"): "content: 'leather quality is excellent'",
    ("content: 'fire'", "cap"): "content: 'structured crown holds shape well'",
    ("content: 'fire'", "chain"): "content: 'sterling silver quality is great'",
    ("content: 'fire'", "tote"): "content: 'canvas is thick and durable'",
    ("content: 'fire'", "socks"): "content: 'cushioned sole is so comfortable'",

    # FIRE (caps)
    ("content: 'FIRE'", "denim"): "content: 'raw denim fades perfectly over time'",
    ("content: 'FIRE'", "crewneck"): "content: 'cotton fleece quality is unmatched'",
    ("content: 'FIRE'", "coach"): "content: 'packable and functional, love it'",
    ("content: 'FIRE'", "overshirt"): "content: 'cotton twill is sturdy and breathable'",

    # Love it sm
    ("content: 'love it sm'", "crewneck"): "content: 'ribbed cuffs fit perfect'",
    ("content: 'love it sm'", "longsleeve"): "content: 'crew neck sits just right'",
    ("content: 'love it sm'", "sweats"): "content: 'elastic waistband is so comfy'",
    ("content: 'love it sm'", "tee"): "content: 'oversized fit is perfect'",
    ("content: 'love it sm'", "coach"): "content: 'snap buttons are quality'",
    ("content: 'love it sm'", "tote"): "content: 'reinforced handles hold up great'",

    # So good
    ("content: 'so good'", "crewneck"): "content: 'drop shoulder fit is relaxed'",
    ("content: 'so good'", "denim"): "content: 'straight leg cut is timeless'",
    ("content: 'so good'", "longsleeve"): "content: 'sleeve length is spot on'",
    ("content: 'so good'", "overshirt"): "content: 'chest pockets are practical'",
    ("content: 'so good'", "tee"): "content: 'enzyme wash makes it soft'",
    ("content: 'so good'", "tote"): "content: 'interior pocket is handy'",

    # Quality af
    ("content: 'quality af'", "crewneck"): "content: 'stitching quality is top tier'",
    ("content: 'quality af'", "denim"): "content: 'japanese denim is worth the price'",
    ("content: 'quality af'", "joggers"): "content: 'nylon blend is technical'",
    ("content: 'quality af'", "puffer"): "content: 'down fill is substantial'",
    ("content: 'quality af'", "sweats"): "content: 'brushed interior is plush'",
    ("content: 'quality af'", "tee"): "content: 'combed cotton is smooth'",
}

# Track what product section we're in
lines = content.split('\n')
current_product = None
fixed_lines = []

for line in lines:
    # Track product sections
    if 'export const' in line and 'Reviews' in line:
        match = re.search(r'(\w+)Reviews', line.lower())
        if match:
            current_product = match.group(1)

    # Try to fix duplicates
    fixed = False
    if current_product and "content: '" in line:
        for (pattern, product), replacement in replacements.items():
            if product in current_product.lower() and pattern in line:
                line = line.replace(pattern, replacement)
                fixed = True
                break

    fixed_lines.append(line)

content = '\n'.join(fixed_lines)

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed targeted duplicates across products")
print(f"Total lines processed: {len(lines)}")
