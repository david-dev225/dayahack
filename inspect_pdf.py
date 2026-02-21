import pdfplumber

pdf_path = r"c:\Users\USER\Downloads\quiz_hackathon.pdf"

try:
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            print(f"--- PAGE {page_num + 1} ---")
            text = page.extract_text()
            print(text)
            print("\n")
except FileNotFoundError:
    print(f"File not found: {pdf_path}")
except Exception as e:
    print(f"Error: {str(e)}")
