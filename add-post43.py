#!/usr/bin/env python3
"""
Add Post 43 (Remote Work Wardrobe: Dressing for Success at Home) to blog-posts.ts
"""

# Read the post content
with open('post43-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'remote-work-wardrobe-work-from-home-fashion-wfh-outfits',
    title: 'Remote Work Wardrobe: Dressing for Success at Home',
    excerpt: '58% work remotely now. Pajamas hurt productivity 12%. The WFH solution: 15-piece capsule balancing comfort + professionalism. Zoom outfit formulas, fabric guide, 1ABEL integration.',
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
    tags: ["remote work wardrobe","work from home fashion","WFH outfit ideas","Zoom outfits","home office fashion","comfortable professional clothing"],
    featured: false,
    seo: {
      metaTitle: 'Remote Work Wardrobe: Dressing for Success at Home | 1ABEL',
      metaDescription: '58% work remotely in 2025. Wearing real clothes increases productivity 12% vs pajamas. 15-piece WFH capsule, Zoom-friendly formulas, all-day comfort fabrics, boundary-setting through clothing.',
      keywords: ["remote work wardrobe","work from home fashion","WFH outfit ideas","Zoom outfits","home office clothing","comfortable professional wear"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 43 (Remote Work Wardrobe) successfully added to blog-posts.ts")
print("📊 Word count: ~1700 words")
print("📖 Read time: 13 minutes")
print("🎯 Target keywords: remote work wardrobe, work from home fashion, WFH outfit ideas")
print("💼 Post-pandemic shift: 58% work remotely (up from 17% pre-pandemic)")
print("📈 Productivity impact: 12% boost wearing real clothes vs pajamas")
