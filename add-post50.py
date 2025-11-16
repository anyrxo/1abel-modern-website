#!/usr/bin/env python3
"""
Add Post 50 (Vegan Fashion and Plant-Based Materials: The 2025 Complete Guide) to blog-posts.ts
HALFWAY MILESTONE: 50/100 POSTS!
"""

# Read the post content
with open('post50-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'vegan-fashion-plant-based-materials-guide-2025-mushroom-pineapple-leather',
    title: 'Vegan Fashion and Plant-Based Materials: The 2025 Complete Guide',
    excerpt: 'Vegan fashion market to reach $1.2B by 2029. Mushroom, pineapple, apple, cactus leather alternatives are mainstream. Complete guide: materials science, brands, capsule wardrobe.',
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
    category: 'Sustainable Fashion',
    tags: ["vegan fashion","plant based materials","mushroom leather","vegan leather alternatives","sustainable fashion","pineapple leather"],
    featured: false,
    seo: {
      metaTitle: 'Vegan Fashion & Plant-Based Materials: Complete 2025 Guide | 1ABEL',
      metaDescription: 'Mushroom, pineapple, apple, cactus leather guide. 25-piece vegan capsule wardrobe strategy, brand recommendations, material durability, care instructions. Sustainable fashion without animal products.',
      keywords: ["vegan fashion","plant based materials","mushroom leather","vegan leather alternatives","pineapple leather","sustainable vegan fashion","cactus leather","mycelium leather"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 50 (Vegan Fashion and Plant-Based Materials) successfully added to blog-posts.ts")
print("📊 Word count: ~2400 words")
print("📖 Read time: 19 minutes")
print("🎯 Target keywords: vegan fashion, mushroom leather, plant based materials, vegan leather alternatives")
print("🎉 MILESTONE: 50/100 NEW POSTS COMPLETE!")
