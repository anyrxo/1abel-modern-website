import re
import random

# Read the file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Function to generate random helpful count (0-3)
def random_helpful():
    # Weight towards lower numbers
    weights = [0.4, 0.3, 0.2, 0.1]  # 40% = 0, 30% = 1, 20% = 2, 10% = 3
    return random.choices([0, 1, 2, 3], weights=weights)[0]

# Function to generate random not helpful count (0-1)
def random_not_helpful():
    # 90% = 0, 10% = 1
    return random.choices([0, 1], weights=[0.9, 0.1])[0]

# Fix helpfulCount values that are > 3
def fix_helpful_count(match):
    current_value = int(match.group(1))
    if current_value > 3:
        new_value = random_helpful()
        return f'helpfulCount: {new_value}'
    return match.group(0)

# Fix notHelpfulCount values that are > 1
def fix_not_helpful_count(match):
    current_value = int(match.group(1))
    if current_value > 1:
        new_value = random_not_helpful()
        return f'notHelpfulCount: {new_value}'
    return match.group(0)

# Apply fixes
content = re.sub(r'helpfulCount: (\d+)', fix_helpful_count, content)
content = re.sub(r'notHelpfulCount: (\d+)', fix_not_helpful_count, content)

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all review helpful/not helpful counts")
print("   - helpfulCount: max 0-3 (weighted towards lower)")
print("   - notHelpfulCount: max 0-1 (90% are 0)")
