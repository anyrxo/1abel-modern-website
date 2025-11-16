#!/usr/bin/env python3
"""
Add Post 42 (The Black Blazer: Your Most Versatile Investment Piece) to blog-posts.ts
"""

# Read the post content
with open('post42-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'black-blazer-versatile-investment-piece-outfit-formulas',
    title: 'The Black Blazer: Your Most Versatile Investment Piece',
    excerpt: 'One piece, 50+ outfits. Black blazer search peaked Nov 2024. Outfit formulas (formal to casual), quality guide, cost-per-wear analysis, 1ABEL Arc integration.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '12 min',
    category: 'Wardrobe Building',
    tags: ["black blazer","versatile blazer outfits","investment piece","blazer outfit formulas","how to style a blazer","minimalist wardrobe essentials"],
    featured: false,
    seo: {
      metaTitle: 'The Black Blazer: Your Most Versatile Investment Piece | 1ABEL',
      metaDescription: '78% more blazers worn in 2024 vs 2019. One black blazer = 50+ outfits. 15 outfit formulas (formal to casual), quality guide ($200-600 sweet spot), cost-per-wear analysis, 1ABEL Arc styling.',
      keywords: ["black blazer","versatile blazer outfits","investment piece","blazer outfit formulas","how to style a blazer","black blazer men","black blazer women"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 42 (The Black Blazer) successfully added to blog-posts.ts")
print("📊 Word count: ~1600 words")
print("📖 Read time: 12 minutes")
print("🎯 Target keywords: black blazer, versatile blazer outfits, investment piece")
print("👔 Trend spike: Search peaked November 2024 (index 100)")
print("💼 High commercial intent: Specific product focus, 15+ outfit formulas")
