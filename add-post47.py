#!/usr/bin/env python3
"""
Add Post 47 (How to Style Wide-Leg Jeans: The 2025 Complete Guide) to blog-posts.ts
"""

# Read the post content
with open('post47-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'how-to-style-wide-leg-jeans-complete-guide-20-outfits',
    title: 'How to Style Wide-Leg Jeans: The 2025 Complete Guide (20+ Outfits)',
    excerpt: 'Wide-leg jeans dominate 2025 with 187% search increase. 68% struggle to style them. 20+ outfit formulas, proportion science, body-type strategies, footwear matrix. Master the trend.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '18 min',
    category: 'Style Guide',
    tags: ["wide leg jeans","how to style wide leg jeans","wide leg jeans outfit","wide leg denim","wide leg jeans styling","wide leg jeans 2025"],
    featured: false,
    seo: {
      metaTitle: 'How to Style Wide-Leg Jeans: Complete Guide with 20+ Outfits | 1ABEL',
      metaDescription: '20+ wide-leg jean outfit formulas for 2025. Proportion science, body-type strategies, footwear pairing, rise guide, hem length rules. Master the silhouette dominating fashion.',
      keywords: ["wide leg jeans","how to style wide leg jeans","wide leg jeans outfit","wide leg denim","wide leg jeans styling guide","wide leg jeans 2025","wide leg jeans body type"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 47 (How to Style Wide-Leg Jeans) successfully added to blog-posts.ts")
print("📊 Word count: ~2300 words")
print("📖 Read time: 18 minutes")
print("🎯 Target keywords: wide leg jeans, how to style wide leg jeans, wide leg jeans outfit")
