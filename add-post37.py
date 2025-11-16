#!/usr/bin/env python3
"""
Add Post 37 (Sustainable Fashion in 2025) to blog-posts.ts
"""

# Read the post content
with open('post37-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'sustainable-fashion-2025-organic-cotton-recycled-materials-circular-economy',
    title: 'Sustainable Fashion in 2025: Organic Cotton, Recycled Materials, and Circular Economy',
    excerpt: 'Fashion is 10% of global carbon emissions. The 2025 shift: GOTS-certified organic cotton, recycled materials, circular business models. Measurable impact, not greenwashing.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '17 min',
    category: 'Sustainability',
    tags: ["sustainable fashion","organic cotton","recycled materials","circular economy","GOTS certification","eco-friendly fabrics"],
    featured: false,
    seo: {
      metaTitle: 'Sustainable Fashion in 2025: Organic Cotton, Recycled Materials, Circular Economy | 1ABEL',
      metaDescription: 'Fashion is 10% of global carbon emissions, 20% wastewater. The 2025 shift: GOTS organic cotton (88% less water), recycled materials, circular business models. Measurable impact, not greenwashing.',
      keywords: ["sustainable fashion 2025","organic cotton","recycled materials","circular economy","GOTS certification","eco-friendly fabrics","carbon footprint clothing"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 37 (Sustainable Fashion in 2025) successfully added to blog-posts.ts")
print("📊 Word count: ~2300 words")
print("📖 Read time: 17 minutes")
print("🎯 Target keywords: sustainable fashion, organic cotton, recycled materials, circular economy")
print("🌱 Top 2025 keyword cluster: Sustainability (#1 search volume growth)")
print("📈 Market: $7.8B → $15.2B by 2030 (9.7% CAGR)")
