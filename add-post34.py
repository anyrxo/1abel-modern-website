#!/usr/bin/env python3
"""
Add Post 34 (30 Outfits from 10 Pieces Challenge) to blog-posts.ts
"""

# Read the post content
with open('post34-full.txt', 'r', encoding='utf-8') as f:
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
    slug: '30-outfits-from-10-pieces-challenge-capsule-wardrobe-formula',
    title: 'The 30 Outfits from 10 Pieces Challenge: Ultimate Capsule Wardrobe Formula',
    excerpt: 'Mathematical proof of how 10 strategic pieces create 30+ genuinely distinct outfits. The viral TikTok challenge done right.',
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
    tags: ["30 outfits from 10 pieces","capsule wardrobe challenge","outfit combinations","minimalist capsule wardrobe","viral wardrobe challenge","modular wardrobe"],
    featured: true,
    seo: {
      metaTitle: 'The 30 Outfits from 10 Pieces Challenge: Ultimate Capsule Wardrobe Formula | 1ABEL',
      metaDescription: 'Mathematical proof of how 10 strategic pieces create 30+ genuinely distinct outfits. The viral TikTok/Instagram challenge done right with honest math and real-life wearability.',
      keywords: ["30 outfits from 10 pieces","capsule wardrobe challenge","outfit combinations","minimalist capsule wardrobe","viral wardrobe challenge","cost per wear","modular wardrobe"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 34 (30 Outfits from 10 Pieces Challenge) successfully added to blog-posts.ts")
print("📊 Word count: ~2200 words")
print("📖 Read time: 17 minutes")
print("🎯 Target keywords: 30 outfits from 10 pieces, capsule wardrobe challenge, viral wardrobe challenge")
print("⭐ Featured: YES (viral trend + high engagement potential)")
