#!/usr/bin/env python3
"""
Fix corrupted author objects in blog-posts.ts
"""
import re

with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find incomplete author objects like:
# author: {
#   name: 'Anyro',
# <section> (missing role, bio, and closing brace)

pattern = r"author: \{\s+name: 'Anyro',\s+(?=<section>|slug:)"

replacement = """author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '15 min',
    category: 'Wardrobe Building',
    tags: ["capsule wardrobe","minimalist fashion","wardrobe building"],
    featured: false,
    seo: {
      metaTitle: '1ABEL Blog | Minimalist Fashion',
      metaDescription: 'Exploring minimalist fashion, sustainable clothing, and intentional wardrobe building.',
      keywords: ["minimalist fashion","sustainable clothing","capsule wardrobe"]
    }
  },
  {
    """

# This won't work well with regex... let me try a different approach
# Let's find all instances where author object is incomplete

lines = content.split('\n')
fixed_lines = []
i = 0
fixes = 0

while i < len(lines):
    line = lines[i]

    # Check if this line starts an author object
    if '    author: {' in line:
        # Check if the next line has only "name: 'Anyro',"
        if i + 1 < len(lines) and "name: 'Anyro'," in lines[i+1]:
            # Check if line after that is NOT "role:"
            if i + 2 < len(lines) and 'role:' not in lines[i+2]:
                # This is a corrupted author object, fix it
                fixes += 1
                fixed_lines.append(line)  # author: {
                fixed_lines.append(lines[i+1])  # name: 'Anyro',
                # Add the missing fields
                fixed_lines.append("      role: 'Founder, 1ABEL',")
                fixed_lines.append("      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'")
                # Skipthe corrupted next line(s) and continue
                i += 2
                continue

    fixed_lines.append(line)
    i += 1

with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(fixed_lines))

print(f"Fixed {fixes} corrupted author objects")
