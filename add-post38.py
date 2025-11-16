#!/usr/bin/env python3
"""
Add Post 38 (Plant-Based Dyes and Eco-Friendly Fabrics) to blog-posts.ts
"""

# Read the post content
with open('post38-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'plant-based-dyes-eco-friendly-fabrics-sustainable-textiles',
    title: 'Plant-Based Dyes and Eco-Friendly Fabrics: The Future of Sustainable Fashion',
    excerpt: 'Textile dyeing is 20% of global water pollution. The shift: Plant-based natural dyes, GOTS low-impact synthetics, waterless CO2 technology. Technical deep-dive.',
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
    category: 'Sustainability',
    tags: ["plant-based dyes","eco-friendly fabrics","GOTS dyes","sustainable textiles","natural fiber alternatives","organic linen"],
    featured: false,
    seo: {
      metaTitle: 'Plant-Based Dyes and Eco-Friendly Fabrics: Sustainable Textiles Guide | 1ABEL',
      metaDescription: 'Textile dyeing = 20% global water pollution. Plant-based natural dyes, GOTS low-impact synthetics, waterless CO2 technology. Technical guide to sustainable fabrics: linen, hemp, Tencel.',
      keywords: ["plant-based dyes","eco-friendly fabrics","GOTS dyes","sustainable textiles","natural fiber alternatives","waterless dyeing technology","organic linen"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 38 (Plant-Based Dyes and Eco-Friendly Fabrics) successfully added to blog-posts.ts")
print("📊 Word count: ~1850 words")
print("📖 Read time: 14 minutes")
print("🎯 Target keywords: plant-based dyes, eco-friendly fabrics, GOTS dyes, sustainable textiles")
print("🔬 Technical/educational focus: Dyeing chemistry, fiber comparisons, low competition niche")
print("🌱 Sustainability sub-niche: Plant-based dyes market growing 12.3% CAGR")
