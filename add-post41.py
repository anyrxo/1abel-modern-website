#!/usr/bin/env python3
"""
Add Post 41 (Fashion Rental and Resale: The Circular Economy Alternative) to blog-posts.ts
"""

# Read the post content
with open('post41-full.txt', 'r', encoding='utf-8') as f:
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
    slug: 'fashion-rental-resale-circular-economy-second-hand-luxury',
    title: 'Fashion Rental and Resale: The Circular Economy Alternative',
    excerpt: 'Fashion produces 92M tons of waste annually. The alternative: Rental ($2.65B market) and resale ($350B by 2028). Platform reviews + 1ABEL\\'s circular durability strategy.',
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
    tags: ["fashion rental","clothing resale platforms","second hand luxury","circular economy fashion","sustainable shopping","resale value"],
    featured: false,
    seo: {
      metaTitle: 'Fashion Rental and Resale: The Circular Economy Alternative | 1ABEL',
      metaDescription: '92M tons textile waste annually. Circular solution: Rental (Rent the Runway, Nuuly) + resale (Vestiaire, Grailed). Platform reviews, buying strategies, 1ABEL\\'s durability = resale value.',
      keywords: ["fashion rental","clothing resale platforms","second hand luxury","circular economy fashion","rent the runway","vestiaire collective","buy second hand designer"]
    }
"""

# Insert the new post before the closing "];
new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 41 (Fashion Rental and Resale) successfully added to blog-posts.ts")
print("📊 Word count: ~1900 words")
print("📖 Read time: 14 minutes")
print("🎯 Target keywords: fashion rental, clothing resale platforms, second-hand luxury")
print("♻️ Circular economy: Rental $2.65B (6.2% CAGR), Resale $350B by 2028 (18.6% CAGR)")
print("🌱 Tier 2 sustainability cluster COMPLETE (Posts 37-41)")
