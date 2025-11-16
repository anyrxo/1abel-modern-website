#!/usr/bin/env python3
"""
Fix all structural issues in blog-posts.ts by ensuring proper formatting
"""
import re

with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix pattern: }\n\n  }, should be }\n  },
content = re.sub(r'\}\n\n  \},', r'}\n  },', content)

# Fix pattern: extra blank lines before },
content = re.sub(r'\n\n  \},\n  \{', r'\n  },\n  {', content)

with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed structural issues - removed extra blank lines before post separators")
