#!/usr/bin/env python3
"""
Add Post 33 (Fall/Winter Capsule Wardrobe) to blog-posts.ts
"""

# Read the post content
with open('post33-full.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract HTML content (lines 3 to line 595, before the separator)
html_content = ''.join(lines[2:595])  # Line 3 is index 2, line 595 is index 594

# Read current blog-posts.ts
with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    blog_posts_content = f.read()

# Check if file ends with "];
closing_bracket_exists = blog_posts_content.rstrip().endswith('];')

if closing_bracket_exists:
    # Find the last closing brace and bracket (end of array)
    insertion_point = blog_posts_content.rfind('];')
else:
    # File is missing closing bracket, append to end
    print("⚠️  File missing closing '];' - will add it")
    insertion_point = len(blog_posts_content.rstrip())

# Create the new blog post entry
new_post = """  },
  {
    slug: 'fall-winter-capsule-wardrobe-cold-weather-minimalism',
    title: 'Fall/Winter Capsule Wardrobe: Cold Weather Minimalism Done Right',
    excerpt: 'Build the perfect fall/winter capsule with Arc 2 (Shadow) colors, heavyweight fabrics, and four-layer system for 30-60°F.',
    content: `
""" + html_content + """`,
    author: {
      name: 'Anyro',
      role: 'Founder, 1ABEL',
      bio: 'Multi-business entrepreneur and founder of 1ABEL. Believes in eliminating friction from daily life through intentional design.'
    },
    publishedAt: '2025-01-16',
    updatedAt: '2025-01-16',
    readTime: '16 min',
    category: 'Wardrobe Building',
    tags: ["fall capsule wardrobe","winter wardrobe essentials","cold weather minimalism","heavyweight fabrics","Arc 2 Shadow","seasonal wardrobe","black blazer"],
    featured: false,
    seo: {
      metaTitle: 'Fall/Winter Capsule Wardrobe: Cold Weather Minimalism Done Right | 1ABEL',
      metaDescription: 'Build the perfect fall/winter capsule with Arc 2 (Shadow) colors, heavyweight fabrics, and four-layer system for 30-60°F temperature range.',
      keywords: ["fall capsule wardrobe","winter wardrobe essentials","cold weather minimalism","heavyweight fabrics","seasonal wardrobe planning","black blazer"]
    }
  }
"""

# Build the new content based on whether closing bracket exists
if closing_bracket_exists:
    # Insert before existing "];
    new_content = blog_posts_content[:insertion_point] + new_post + "\n" + blog_posts_content[insertion_point:]
else:
    # Append and add closing "];
    new_content = blog_posts_content[:insertion_point] + ",\n" + new_post + "\n];\n"

# Write back to file
with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Post 33 (Fall/Winter Capsule Wardrobe) successfully added to blog-posts.ts")
print("📊 Word count: ~2100 words")
print("📖 Read time: 16 minutes")
print("🎯 Target keywords: fall capsule wardrobe, winter wardrobe essentials, cold weather minimalism, black blazer")
