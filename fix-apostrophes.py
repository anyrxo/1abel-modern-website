#!/usr/bin/env python3
"""
Fix unescaped apostrophes in single-quoted strings in blog-posts.ts
"""

with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed_lines = []
changes = 0

for line in lines:
    # Check if line contains metaTitle or metaDescription with single quotes
    if ('metaTitle:' in line or 'metaDescription:' in line or 'excerpt:' in line or "role: 'Founder" in line) and "'" in line:
        # Find if there's an unescaped apostrophe within the string
        # This is a simple fix: if we find 's or 't etc within quotes, escape them
        original_line = line
        # Replace common patterns like: 's with: \'s, 't with \'t, etc
        # But be careful not to replace already escaped ones or the string delimiters

        # First, temporarily mark the string delimiters
        parts = line.split("'")
        if len(parts) >= 3:  # Has opening and closing quotes
            # Process the string content (parts between quotes)
            for i in range(1, len(parts)-1, 2):  # Process odd indices (string contents)
                # Replace unescaped apostrophes
                if '\\' not in parts[i] or "\\" + "'" not in parts[i]:
                    parts[i] = parts[i].replace("'", "\\'")
            line = "'".join(parts)

        if line != original_line:
            changes += 1
            print(f"Fixed line: {original_line.strip()} -> {line.strip()}")

    fixed_lines.append(line)

with open('src/data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print(f"\nTotal changes: {changes}")
