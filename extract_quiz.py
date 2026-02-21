import pdfplumber
import json
import re

pdf_path = r"c:\Users\USER\Downloads\quiz_hackathon.pdf"

categories = []
questions = []
category_dict = {}

try:
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
        
        # Split by lines
        lines = full_text.split('\n')
        
        current_category_id = 0
        question_buffer = None
        current_question_id = 0
        options = {}
        
        for i, line in enumerate(lines):
            line_stripped = line.strip()
            
            # Detect category header: "CATÉGORIE X — Name" (may start with 'n')
            if "CATÉGORIE" in line_stripped and "—" in line_stripped:
                match = re.match(r'[n\s]*CATÉGORIE\s+(\d+)\s*—\s*(.+)', line_stripped)
                if match:
                    current_category_id = int(match.group(1))
                    category_name = match.group(2).strip()
                    
                    categories.append({
                        "id": current_category_id,
                        "name": category_name,
                        "description": ""
                    })
                    category_dict[current_category_id] = category_name
                continue
            
            # Detect question: "QX. Question text"
            question_match = re.match(r'^Q(\d+)\.\s*(.+)$', line_stripped)
            if question_match:
                # Save previous question if exists
                if question_buffer:
                    question_text = question_buffer['text']
                    if options:
                        current_question_id += 1
                        q = {
                            "id": current_question_id,
                            "category_id": current_category_id,
                            "question_text": question_text,
                            "option_a": options.get('A', ''),
                            "option_b": options.get('B', ''),
                            "option_c": options.get('C', ''),
                            "option_d": options.get('D', ''),
                            "correct_answer": question_buffer.get('answer', '')
                        }
                        questions.append(q)
                    options = {}
                
                question_buffer = {
                    'num': int(question_match.group(1)),
                    'text': question_match.group(2).strip(),
                    'answer': ''
                }
                continue
            
            # Detect options: "n A) text" or similar patterns
            # The "n" at the beginning indicates a bullet point marker
            if question_buffer:
                # Try to extract option letter and text
                # Remove leading 'n' or other markers
                cleaned = re.sub(r'^[n\s]+', '', line_stripped)
                opt_match = re.match(r'^([A-D])\)\s*(.+)$', cleaned)
                if opt_match:
                    option_letter = opt_match.group(1)
                    option_text = opt_match.group(2).strip()
                    
                    # Check for markers indicating correct answer
                    if '✓' in line or '✔' in line or '*' in line:
                        question_buffer['answer'] = option_letter
                    
                    options[option_letter] = option_text
        
        # Don't forget last question
        if question_buffer and options and current_category_id > 0:
            current_question_id += 1
            q = {
                "id": current_question_id,
                "category_id": current_category_id,
                "question_text": question_buffer['text'],
                "option_a": options.get('A', ''),
                "option_b": options.get('B', ''),
                "option_c": options.get('C', ''),
                "option_d": options.get('D', ''),
                "correct_answer": question_buffer.get('answer', '')
            }
            questions.append(q)

except FileNotFoundError:
    print(f"Error: File not found at {pdf_path}")
except Exception as e:
    print(f"Error: {str(e)}")

result = {
    "categories": categories,
    "questions": questions
}

print(json.dumps(result, ensure_ascii=False, indent=2))
