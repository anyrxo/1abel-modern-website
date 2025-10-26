import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    # Best layering piece
    ("title: 'best layering piece',\n    content: 'best layering piece",
     "title: 'perfect layer',\n    content: 'best layering piece"),
    
    # 400gsm weight
    ("title: '400gsm weight',\n    content: 'the 400gsm weight",
     "title: 'perfect weight',\n    content: 'the 400gsm weight"),
    
    # Void thermal
    ("title: 'void thermal',\n    content: 'void thermal",
     "title: 'black thermal',\n    content: 'void thermal"),
    
    # Enzyme wash
    ("title: 'enzyme wash',\n    content: 'the enzyme wash",
     "title: 'soft finish',\n    content: 'the enzyme wash"),
    
    # Drop shoulder
    ("title: 'drop shoulder fit',\n    content: 'the drop shoulder fit",
     "title: 'relaxed shoulders',\n    content: 'the drop shoulder fit"),
    
    # Heavy
    ("title: 'heavy',\n    content: 'super heavyweight",
     "title: 'substantial weight',\n    content: 'super heavyweight"),
    
    # Sized up
    ("title: 'sized up',\n    content: 'sized up",
     "title: 'went larger',\n    content: 'sized up"),
    
    # Quality fire
    ("title: 'quality fire',\n    content: 'quality fire",
     "title: 'amazing quality',\n    content: 'quality fire"),
    
    # VERY COMFY (all caps)
    ("title: 'VERY COMFY',\n    content: 'VERY COMFY",
     "title: 'super comfortable',\n    content: 'very comfy"),
]

count = 0
for old, new in replacements:
    occurrences = content.count(old)
    if occurrences > 0:
        content = content.replace(old, new)
        count += occurrences
        print(f"Fixed: {old[:50]}... ({occurrences} times)")

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nTotal fixed: {count} duplicates")
