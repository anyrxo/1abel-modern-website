#!/usr/bin/env python3
"""
Add Post 44 (Hybrid Work Capsule: Seamless Transition from Home to Office) to blog-posts.ts
"""

# Read the post content
with open('post44-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'hybrid-work-capsule-office-wardrobe-business-casual',
    title: 'Hybrid Work Capsule: Seamless Transition from Home to Office',
    excerpt: '64% work hybrid now (3 office/2 home split). The solution: 18-piece capsule working both contexts. Versatile formulas, commute-friendly fabrics, 1ABEL integration.',
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
    category: 'Wardrobe Building',
    tags: ["hybrid work wardrobe","office capsule wardrobe","business casual minimalism","commute-friendly clothing","versatile work outfits","hybrid work fashion"],
    featured: false,
    seo: {
      metaTitle: 'Hybrid Work Capsule: Seamless Home to Office Wardrobe | 1ABEL',
      metaDescription: '64% work hybrid (3 office/2 home). 18-piece capsule works both contexts. Office vs home outfit formulas, commute-friendly fabrics, cost-per-wear analysis, 1ABEL versatile integration.',
      keywords: ["hybrid work wardrobe","office capsule wardrobe","business casual minimalism","hybrid work outfits","commute-friendly clothing","versatile work capsule"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 44 (Hybrid Work Capsule) successfully added to blog-posts.ts")
print("📊 Word count: ~1800 words")
print("📖 Read time: 14 minutes")
print("🎯 Target keywords: hybrid work wardrobe, office capsule wardrobe, business casual minimalism")
print("💼 Modern work: 64% hybrid model (3 office/2 home split)")
print("👔 Versatility: 18 pieces work in BOTH contexts (no separate wardrobes)")
