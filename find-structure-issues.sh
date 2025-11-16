#!/bin/bash
# Find structural issues in blog-posts.ts

echo "Looking for posts with missing closing braces..."

# Find all author: { lines and check if they're followed properly
grep -n "author: {" src/data/blog-posts.ts | while read line; do
    linenum=$(echo $line | cut -d: -f1)

    # Check if within 20 lines we have role:, bio:, publishedAt:, etc
    next20=$(sed -n "$((linenum)),$((linenum+25))p" src/data/blog-posts.ts)

    if ! echo "$next20" | grep -q "role:"; then
        echo "Line $linenum: Missing role: after author:"
        sed -n "$((linenum)),$((linenum+5))p" src/data/blog-posts.ts
        echo "---"
    fi
done
