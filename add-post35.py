#!/usr/bin/env python3
"""
Add Post 35 (Gender-Neutral Basics) to blog-posts.ts
"""

# Read the post content
with open('post35-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'gender-neutral-basics-future-of-minimalist-fashion',
    title: 'Gender-Neutral Basics: The Future of Minimalist Fashion',
    excerpt: 'The gender-neutral fashion revolution: inclusive sizing, unisex design, and timeless pieces that work for all bodies and expressions.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '14 min',
    category: 'Style Philosophy',
    tags: ["gender-neutral basics","unisex fashion","gender-neutral wardrobe","inclusive sizing","androgynous fashion","non-binary fashion"],
    featured: false,
    seo: {
      metaTitle: 'Gender-Neutral Basics: The Future of Minimalist Fashion | 1ABEL',
      metaDescription: 'The gender-neutral fashion revolution: inclusive sizing, unisex design, and timeless pieces that work for all bodies and gender expressions. Market growing 8.2% CAGR through 2030.',
      keywords: ["gender-neutral basics","unisex fashion","gender-neutral wardrobe","inclusive sizing","androgynous fashion","genderless clothing","non-binary fashion"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 35 (Gender-Neutral Basics) successfully added to blog-posts.ts")
print("📊 Word count: ~1900 words")
print("📖 Read time: 14 minutes")
print("🎯 Target keywords: gender-neutral basics, unisex fashion, inclusive sizing, androgynous fashion")
print("📈 Market: Growing 8.2% CAGR through 2030 ($38.4B → $64.8B)")
