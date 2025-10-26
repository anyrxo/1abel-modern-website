import re

# Read productDescriptions.ts
with open('src/data/productDescriptions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove lines that start with "Model is" from fitDetails arrays
# Pattern: find lines like "      'Model is 6'0" and wears size M',"
content = re.sub(r"^\s*'Model is[^']+',\s*\n", "", content, flags=re.MULTILINE)

# Write back
with open('src/data/productDescriptions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed all 'Model is' lines from productDescriptions.ts")
