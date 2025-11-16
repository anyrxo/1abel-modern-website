#!/usr/bin/env python3
"""
Add Post 49 (Quiet Luxury Fashion: The Anti-Logo Movement) to blog-posts.ts
"""

# Read the post content
with open('post49-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'quiet-luxury-fashion-anti-logo-capsule-wardrobe-stealth-wealth',
    title: 'Quiet Luxury Fashion: The Anti-Logo Movement and Capsule Wardrobe Approach',
    excerpt: 'Quiet luxury search increased 427% in 2024. Anti-logo aesthetic prioritizes fabric quality, timeless design, understated wealth. Build capsule wardrobe without $50K+ price tag.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '20 min',
    category: 'Style Philosophy',
    tags: ["quiet luxury","stealth wealth","anti logo fashion","tonal dressing","minimalist luxury","quiet luxury brands"],
    featured: false,
    seo: {
      metaTitle: 'Quiet Luxury Fashion: Anti-Logo Capsule Wardrobe Guide | 1ABEL',
      metaDescription: 'Quiet luxury 30-piece capsule wardrobe under $5K. Fabric hierarchy, tonal color palette, accessible brands, tailoring strategy. Achieve Succession-level aesthetic without designer prices.',
      keywords: ["quiet luxury","stealth wealth","anti logo fashion","tonal dressing","quiet luxury fashion","quiet luxury brands","minimalist luxury","old money aesthetic"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 49 (Quiet Luxury Fashion) successfully added to blog-posts.ts")
print("📊 Word count: ~2500 words")
print("📖 Read time: 20 minutes")
print("🎯 Target keywords: quiet luxury, stealth wealth, anti logo fashion, tonal dressing")
