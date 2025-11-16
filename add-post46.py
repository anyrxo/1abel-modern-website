#!/usr/bin/env python3
"""
Add Post 46 (The Complete Men's Capsule Wardrobe Guide) to blog-posts.ts
First post of Phase 2 expansion (posts 46-100)
"""

# Read the post content
with open('post46-full.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract HTML content (lines 3 to end, before the separator "---")
content_lines = []
for i, line in enumerate(lines[2:], start=2):
    if line.strip() == '---':
        break
    content_lines.append(line)

html_content = ''.join(content_lines)

# Read current blog-posts.ts
with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    blog_posts_content = f.read()

# Find the last closing bracket and semicolon
insertion_point = blog_posts_content.rfind('];')

if insertion_point == -1:
    print("Error: Could not find end of blog posts array")
    exit(1)

# Create the new blog post entry
new_post = """  },
  {
    slug: 'mens-capsule-wardrobe-guide-25-pieces-every-occasion',
    title: 'The Complete Men\\'s Capsule Wardrobe Guide: 25 Pieces for Every Occasion',
    excerpt: 'Most men own 120+ items but wear 20% repeatedly. The 2025 men\\'s capsule: 25 strategic pieces = 100+ outfits. Research-backed formulas for work, casual, formal. Eliminate decision fatigue.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '17 min',
    category: 'Wardrobe Building',
    tags: ["mens capsule wardrobe","mens minimalist wardrobe","mens wardrobe essentials","capsule wardrobe for men","mens fashion basics","minimalist menswear"],
    featured: false,
    seo: {
      metaTitle: 'Men\\'s Capsule Wardrobe Guide: 25 Pieces for Every Occasion | 1ABEL',
      metaDescription: '25-piece men\\'s capsule wardrobe creates 100+ outfits. Research-backed guide: what to buy, where to invest, fit formulas, color psychology, seasonal rotation. Eliminate decision fatigue.',
      keywords: ["mens capsule wardrobe","mens minimalist wardrobe","mens wardrobe essentials","capsule wardrobe for men","mens fashion basics","mens wardrobe guide","minimalist menswear"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 46 (Men's Capsule Wardrobe Guide) successfully added to blog-posts.ts")
print("📊 Word count: ~2200 words")
print("📖 Read time: 17 minutes")
print("🎯 Target keywords: mens capsule wardrobe, mens minimalist wardrobe, mens wardrobe essentials")
