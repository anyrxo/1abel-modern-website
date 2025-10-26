import re
import random

# Read the file
with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Alternative titles for common duplicates
title_alternatives = {
    'fire': ['amazing', 'so good', 'love these', '10/10', 'quality', 'best purchase', 'no regrets', 'worth it', 'highly recommend'],
    'obsessed': ['love it', 'cant stop wearing', 'favorite piece', 'so good', 'amazing quality', 'best ever', 'perfect', '5 stars', 'must have'],
    'love it': ['amazing', 'so good', 'perfect', 'obsessed', 'great buy', 'highly recommend', 'favorite', '10/10', 'fire'],
    'perfect': ['love it', 'amazing', 'flawless', 'exactly what i wanted', 'so good', 'no complaints', 'fire', 'best', '5 stars'],
    'so good': ['amazing', 'love it', 'fire', 'obsessed', 'quality', 'perfect', 'highly recommend', 'favorite', 'cant stop wearing']
}

# Username variations to replace repetitive patterns
username_replacements = {
    'Marcus T': 'marcust',
    'Marcus W': 'marcus92',
    'Marcus K': 'marcusk',
    'Tyler K': 'tylerk',
    'Tyler M': 'tyler_m23',
    'Tyler J': 'tylerj',
    'Tyler W': 'tywilson',
    'Brandon T': 'brandont',
    'Brandon K': 'bk_fit',
    'Brandon P': 'brandonp',
    'Brandon M': 'brandonm',
    'Brandon W': 'brandonw',
    'Jessica R': 'jessica_r',
    'Jessica M': 'jessm',
    'Jessica H': 'jesshendrix',
    'Jessica K': 'jesskay',
    'Kevin H': 'kevin_h',
    'Kevin M': 'kevinm',
    'Kevin R': 'kevinr',
    'Kevin P': 'kp_style',
    'Kevin W': 'kwilliams',
    'Sarah K': 'sarahk',
    'Sarah T': 'sarah_t',
    'Derek M': 'derekm',
    'Derek W': 'derekw',
    'Derek P': 'derekp',
    'Emma K': 'emmakay',
    'Emma L': 'emmalou',
    'Emma R': 'emmar',
    'Emma T': 'emmat',
    'Emma P': 'emma_p23',
    'Rachel M': 'rachelm',
    'Rachel T': 'rachelt',
    'Rachel W': 'rachelw',
    'Rachel H': 'rachelh',
    'Rachel S': 'rachels',
    'Rachel L': 'rachel_lopez',
    'Rachel P': 'rachelp',
    'Lauren K': 'laurenk',
    'Lauren M': 'laurenm',
    'Lauren G': 'laureng',
    'Lauren H': 'laurenh',
    'Lauren P': 'laurenp',
    'Sophie M': 'sophiem',
    'Sophie L': 'sophiel',
    'Sophie H': 'sophieh',
    'Sophie W': 'sophiew',
    'Olivia K': 'oliviak',
    'Olivia H': 'oliviah',
    'Olivia T': 'oliviat',
    'Olivia G': 'oliviag',
    'Jordan M': 'jordanm',
    'Jordan K': 'jordank',
    'Michael K': 'mikek',
    'Michael P': 'mikep',
    'Michael R': 'mikeramos',
    'Michael W': 'michaelw',
    'Chris M': 'chrism',
    'Chris R': 'chrisr',
    'Chris W': 'chrisw',
    'Chris D': 'chrisd',
    'Nathan B': 'nathanb',
    'Nathan W': 'natew',
}

# Fix title=content duplicates
def fix_duplicate_titles(content):
    fixed_count = 0

    # Pattern to match a review block
    pattern = r"(author: '[^']+',\s+rating: \d+,\s+title: '([^']+)',\s+content: '([^']+)')"

    def replace_func(match):
        nonlocal fixed_count
        full_match = match.group(0)
        title = match.group(2)
        content_text = match.group(3)

        # If title exactly equals content (case insensitive)
        if title.lower() == content_text.lower():
            # Get alternative title
            if title.lower() in title_alternatives:
                new_title = random.choice(title_alternatives[title.lower()])
                fixed_count += 1
                return full_match.replace(f"title: '{title}'", f"title: '{new_title}'")

        return full_match

    result = re.sub(pattern, replace_func, content)
    print(f"Fixed {fixed_count} duplicate title=content pairs")
    return result

# Fix usernames
def fix_usernames(content):
    fixed_count = 0
    for old_name, new_name in username_replacements.items():
        old_pattern = f"author: '{old_name}'"
        new_pattern = f"author: '{new_name}'"
        count = content.count(old_pattern)
        if count > 0:
            content = content.replace(old_pattern, new_pattern)
            fixed_count += count
            print(f"Replaced '{old_name}' with '{new_name}' ({count} times)")

    print(f"Fixed {fixed_count} usernames total")
    return content

# Apply fixes
print("Fixing duplicate titles...")
content = fix_duplicate_titles(content)

print("\nFixing repetitive usernames...")
content = fix_usernames(content)

# Write back
with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ All fixes applied successfully!")
