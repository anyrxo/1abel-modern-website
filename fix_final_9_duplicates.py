import re

# Read file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Specific replacements for last 9 duplicates
# Each replacement is unique and product-specific
replacements = [
    # love the heavyweight (3 instances) - make each unique
    ("content: 'love the heavyweight',", "content: 'heavyweight cotton is thick but breathable',", 1),
    ("content: 'love the heavyweight',", "content: 'perfect weight for year round wear',", 1),

    # love the weight (2 instances)
    ("content: 'love the weight',", "content: 'fabric weight hits the sweet spot',", 1),
    ("content: 'love the weight',", "content: 'not too heavy, not too light',", 1),

    # soft is perfect (2 instances)
    ("content: 'soft is perfect',", "content: 'softness without sacrificing durability',", 1),
    ("content: 'soft is perfect',", "content: 'worn in feel right out the package',", 1),

    # brushed interior exceeded expectations (2 instances)
    ("content: 'brushed interior exceeded expectations',", "content: 'interior lining is plush and cozy',", 1),
    ("content: 'brushed interior exceeded expectations',", "content: 'fleece lining is softer than expected',", 1),

    # love the drop shoulder (2 instances)
    ("content: 'love the drop shoulder',", "content: 'drop shoulder gives relaxed fit',", 1),
    ("content: 'love the drop shoulder',", "content: 'shoulder seam placement is perfect',", 1),

    # love the 12oz cotton twill (2 instances)
    ("content: 'love the 12oz cotton twill',", "content: 'twill weave has great texture',", 1),
    ("content: 'love the 12oz cotton twill',", "content: 'cotton twill is structured yet comfortable',", 1),

    # soft worth the price (2 instances)
    ("content: 'soft worth the price',", "content: 'price justified by the quality',", 1),
    ("content: 'soft worth the price',", "content: 'worth every dollar, no regrets',", 1),

    # love the elastic waistband (2 instances)
    ("content: 'love the elastic waistband',", "content: 'waistband stretches without losing shape',", 1),
    ("content: 'love the elastic waistband',", "content: 'elastic waist is comfortable all day',", 1),

    # 450gsm, everyday go-to (2 instances)
    ("content: '450gsm, everyday go-to',", "content: 'heavyweight but moves with you',", 1),
    ("content: '450gsm, everyday go-to',", "content: 'thick fleece is my new favorite',", 1),
]

for old, new, count in replacements:
    content = content.replace(old, new, count)

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed final 9 duplicate groups with unique content")
print("All reviews should now be unique!")
