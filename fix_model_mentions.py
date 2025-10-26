with open('src/data/productDescriptions.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Skip lines that contain "Model is"
    if "Model is" not in line:
        new_lines.append(line)

with open('src/data/productDescriptions.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Removed all 'Model is' lines")
