#!/usr/bin/env python3
"""
Add Post 36 (Affordable Luxury Fashion) to blog-posts.ts
"""

# Read the post content
with open('post36-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'affordable-luxury-fashion-build-premium-wardrobe-on-budget',
    title: 'Affordable Luxury Fashion: How to Build a Premium Wardrobe on a Budget',
    excerpt: 'Quality vs fast fashion vs designer: Real cost-per-wear analysis proves affordable luxury is the smartest investment. No brand tax.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '16 min',
    category: 'Shopping Guides',
    tags: ["affordable luxury fashion","cost per wear","quality vs fast fashion","budget minimalist wardrobe","investment pieces","timeless wardrobe"],
    featured: false,
    seo: {
      metaTitle: 'Affordable Luxury Fashion: Build a Premium Wardrobe on a Budget | 1ABEL',
      metaDescription: 'Quality vs fast fashion vs designer: Real cost-per-wear analysis proves affordable luxury is smartest investment. $0.39/wear vs $0.83 fast fashion, 77% cheaper than designer. No brand tax.',
      keywords: ["affordable luxury fashion","cost per wear","quality vs fast fashion","budget minimalist wardrobe","investment pieces","designer markup","direct-to-consumer fashion"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 36 (Affordable Luxury Fashion) successfully added to blog-posts.ts")
print("📊 Word count: ~2100 words")
print("📖 Read time: 16 minutes")
print("🎯 Target keywords: affordable luxury fashion, cost per wear, quality vs fast fashion")
print("💰 High commercial intent: Price objection handling + value education")
print("🏆 TIER 1 COMPLETE: All 5 high-priority posts finished (32-36)")
