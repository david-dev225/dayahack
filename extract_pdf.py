import pdfplumber
import json
import re

pdf_path = r'c:\Users\USER\Downloads\quiz_hackathon.pdf'
output_file = r'c:\Users\USER\OneDrive\Documents\Dayasoft preselection\quiz_data.json'

questions_data = []
categories = []
category_id = 0
question_count = 0

with pdfplumber.open(pdf_path) as pdf:
    full_text = ''
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            full_text += text + '\n'
    
    lines = [l for l in full_text.split('\n')]
    
    current_category = None
    i = 0
    
    while i < len(lines):
        line = lines[i].strip()
        
        # Detect category
        if 'CATÉGORIE' in line and '—' in line:
            parts = line.split('—')
            if len(parts) > 1:
                cat_name = parts[1].strip()
                category_id = len(categories) + 1
                current_category = {
                    'id': category_id, 
                    'name': cat_name, 
                    'description': f'Questions sur {cat_name}'
                }
                categories.append(current_category)
        
        # Detect question
        if line.startswith('Q') and '. ' in line:
            question_count += 1
            q_match = re.match(r'Q\d+\.\s*(.*)', line)
            if q_match:
                q_text = q_match.group(1)
                
                options = {'A': '', 'B': '', 'C': '', 'D': ''}
                correct = ''
                
                # Scan next lines for options
                for j in range(1, 15):
                    if i + j >= len(lines):
                        break
                    opt_line = lines[i + j].strip()
                    
                    # Match option pattern
                    if opt_line and len(opt_line) > 2:
                        # Check if starts with "n A)" or "n B)", etc
                        if opt_line.startswith('n ') and len(opt_line) > 3 and opt_line[2] in 'ABCD' and ')' in opt_line:
                            opt_letter = opt_line[2]
                            opt_text = opt_line[4:].strip()  # Skip "n X) "
                            options[opt_letter] = opt_text
                            correct = opt_letter  # Last one marked with 'n' is correct
                        # Also handle without 'n' prefix
                        elif opt_line[0] in 'ABCD' and ')' in opt_line:
                            opt_letter = opt_line[0]
                            opt_text = re.sub(r'^[A-D]\)\s*', '', opt_line)
                            if opt_text:
                                options[opt_letter] = opt_text
                    
                    # Stop if we hit next question or category
                    if (opt_line.startswith('Q') and '. ' in opt_line) or 'CATÉGORIE' in opt_line:
                        break
                
                if correct and all(options.values()):
                    question = {
                        'id': question_count,
                        'category_id': category_id,
                        'question_text': q_text,
                        'option_a': options['A'],
                        'option_b': options['B'],
                        'option_c': options['C'],
                        'option_d': options['D'],
                        'correct_answer': correct
                    }
                    questions_data.append(question)
        
        i += 1

# Save JSON
output = {
    'categories': categories,
    'questions': questions_data
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"✅ Extracted {len(questions_data)} questions from {len(categories)} categories")
print(f"📄 Saved to {output_file}")
print("\nFirst question:")
if questions_data:
    print(json.dumps(questions_data[0], ensure_ascii=False, indent=2))
