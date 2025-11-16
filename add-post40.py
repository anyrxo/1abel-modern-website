#!/usr/bin/env python3
"""
Add Post 40 (Wardrobe Planning Apps & Digital Tools) to blog-posts.ts
"""

# Read the post content
with open('post40-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'wardrobe-planning-apps-digital-tools-capsule-wardrobe-app',
    title: 'Wardrobe Planning Apps and Digital Tools: Technology Meets Minimalism',
    excerpt: '76% have 50+ apps but don't optimize getting dressed. Digital wardrobe apps save 80-100 hours annually. Reviews: Cladwell, Whering, Stylebook, Acloset + DIY tools.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '13 min',
    category: 'Wardrobe Building',
    tags: ["wardrobe planning apps","capsule wardrobe app","digital closet","wardrobe organization apps","AI outfit planner","minimalist wardrobe tracker"],
    featured: false,
    seo: {
      metaTitle: 'Wardrobe Planning Apps & Digital Tools: Technology Meets Minimalism | 1ABEL',
      metaDescription: '76% have 50+ apps but don't optimize getting dressed. Digital wardrobe apps save 80-100 hours annually. Reviews: Cladwell, Whering, Stylebook, Acloset. Plus DIY tools: Sheets, Notion, Airtable.',
      keywords: ["wardrobe planning apps","capsule wardrobe app","digital closet","wardrobe organization apps","AI outfit planner","cost-per-wear tracking app"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 40 (Wardrobe Planning Apps & Digital Tools) successfully added to blog-posts.ts")
print("📊 Word count: ~1700 words")
print("📖 Read time: 13 minutes")
print("🎯 Target keywords: wardrobe planning apps, capsule wardrobe app, digital closet")
print("📱 Tech integration: 18.7% CAGR market growth 2023-2030")
print("⏰ Time savings: 80-100 hours saved annually (15 min → 2 min decisions)")
