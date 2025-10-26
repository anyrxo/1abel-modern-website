import re

with open('src/data/productReviews.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

output = []
i = 0
fixes = 0

while i < len(lines):
    line = lines[i]
    
    # Check if this is a title line
    if 'title:' in line and i + 1 < len(lines):
        title_line = line
        content_line = lines[i + 1]
        
        # Extract title and content
        title_match = re.search(r"title: '([^']+)'", title_line)
        content_match = re.search(r"content: '([^']+)'", content_line)
        
        if title_match and content_match:
            title = title_match.group(1).lower()
            content = content_match.group(1).lower()
            
            # Check for duplicates - if title appears at start of content
            if content.startswith(title) or (title in content and len(title) > 4):
                # Create better title based on content type
                original_title = title_match.group(1)
                
                # Map common duplicates to better titles
                title_replacements = {
                    'perfect': 'love these',
                    'best': 'top tier',
                    'obsessed': 'so good',
                    'love': 'favorite',
                    'amazing': 'incredible',
                    'fire': 'heat',
                    'solid': 'quality piece',
                }
                
                new_title = original_title
                for key, val in title_replacements.items():
                    if original_title.lower() == key:
                        new_title = val
                        break
                
                if new_title != original_title:
                    title_line = title_line.replace(f"'{original_title}'", f"'{new_title}'")
                    fixes += 1
        
        output.append(title_line)
        i += 1
    else:
        output.append(line)
        i += 1

with open('src/data/productReviews.ts', 'w', encoding='utf-8') as f:
    f.writelines(output)

print(f"Fixed {fixes} generic title duplicates")
