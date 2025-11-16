#!/usr/bin/env python3
"""
Add Post 48 (The Minimalist Shoe Collection: 5 Pairs for Every Occasion) to blog-posts.ts
"""

# Read the post content
with open('post48-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'minimalist-shoe-collection-5-pairs-every-occasion-guide',
    title: 'The Minimalist Shoe Collection: 5 Pairs for Every Occasion (2025 Guide)',
    excerpt: 'Average person owns 19 pairs, wears 5 regularly. Minimalist shoe search peaked at 94 in May 2025. 5-pair formula covers 100% of occasions. Quality-first investment strategy.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '19 min',
    category: 'Wardrobe Building',
    tags: ["minimalist shoes","minimalist footwear","minimalist shoe collection","capsule wardrobe shoes","essential shoes","quality shoes"],
    featured: false,
    seo: {
      metaTitle: 'Minimalist Shoe Collection: 5 Pairs for Every Occasion | 1ABEL Guide',
      metaDescription: '5-pair minimalist shoe formula covers 100% of occasions. Quality benchmarks, investment ranges, care routines, sizing strategy. White sneakers, brown leather, black boots guide.',
      keywords: ["minimalist shoes","minimalist footwear","minimalist shoe collection","capsule wardrobe shoes","essential shoes","quality shoes investment","white leather sneakers"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 48 (Minimalist Shoe Collection) successfully added to blog-posts.ts")
print("📊 Word count: ~2400 words")
print("📖 Read time: 19 minutes")
print("🎯 Target keywords: minimalist shoes, minimalist shoe collection, capsule wardrobe shoes")
