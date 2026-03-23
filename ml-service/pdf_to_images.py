import os
from pdf2image import convert_from_path

# CHANGE this if Poppler is installed elsewhere
POPPLER_PATH = r"C:\Program Files\poppler-25.12.0\Library\bin"

BASE_DIR = "dataset"
FIR_PDF_DIR = os.path.join(BASE_DIR, "fir", "pdfs")
FIR_IMG_DIR = os.path.join(BASE_DIR, "fir", "images")


def convert_fir_pdfs_to_images():
    os.makedirs(FIR_IMG_DIR, exist_ok=True)

    pdf_files = [f for f in os.listdir(FIR_PDF_DIR) if f.lower().endswith(".pdf")]

    if not pdf_files:
        print("No FIR PDFs found.")
        return

    for pdf_file in pdf_files:
        pdf_path = os.path.join(FIR_PDF_DIR, pdf_file)
        print(f"Converting: {pdf_file}")

        pages = convert_from_path(
            pdf_path,
            dpi=300,                    # important for OCR quality
            poppler_path=POPPLER_PATH
        )

        for i, page in enumerate(pages):
            image_name = f"{pdf_file[:-4]}_page{i+1}.jpg"
            image_path = os.path.join(FIR_IMG_DIR, image_name)
            page.save(image_path, "JPEG")

    print("✅ All FIR PDFs converted to images.")

import tempfile


def convert_pdf_to_images(pdf_path):
    """
    Convert uploaded PDF into list of image paths (for API usage)
    """
    pages = convert_from_path(
        pdf_path,
        dpi=300,
        poppler_path=POPPLER_PATH
    )

    image_paths = []

    for i, page in enumerate(pages):
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
        page.save(temp_file.name, "JPEG")
        image_paths.append(temp_file.name)

    return image_paths


if __name__ == "__main__":
    convert_fir_pdfs_to_images()
