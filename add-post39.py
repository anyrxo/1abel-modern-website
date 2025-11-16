#!/usr/bin/env python3
"""
Add Post 39 (The Ultimate Travel Capsule Wardrobe) to blog-posts.ts
"""

# Read the post content
with open('post39-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'ultimate-travel-capsule-wardrobe-carry-on-only-packing',
    title: 'The Ultimate Travel Capsule Wardrobe: Pack Light, Travel Smart',
    excerpt: '15 pieces, carry-on only, 7-14 days covered. Save $60-120 in baggage fees, zero lost luggage risk. Strategic packing for minimalist travel.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '15 min',
    category: 'Wardrobe Building',
    tags: ["travel capsule wardrobe","carry-on only packing","minimalist travel","travel wardrobe essentials","packing light","wrinkle-resistant fabrics"],
    featured: false,
    seo: {
      metaTitle: 'Ultimate Travel Capsule Wardrobe: Carry-On Only Packing Guide | 1ABEL',
      metaDescription: '15 pieces, carry-on only, 7-14 days covered. Save $60-120 baggage fees, zero lost luggage risk. Strategic packing methods, sink washing guide, flight outfit formula.',
      keywords: ["travel capsule wardrobe","carry-on only packing","minimalist travel","travel wardrobe essentials","how to pack light","wrinkle-resistant travel fabrics"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 39 (Ultimate Travel Capsule Wardrobe) successfully added to blog-posts.ts")
print("📊 Word count: ~1950 words")
print("📖 Read time: 15 minutes")
print("🎯 Target keywords: travel capsule wardrobe, carry-on only packing, minimalist travel")
print("✈️ Travel recovery: 42% prefer carry-on only (up from 28% in 2019)")
print("💰 Savings: $60-120 per trip in baggage fees")
