# 🧠 AI Legal Document Classifier – ML Module

This repository contains the **Machine Learning module** of the AI Legal Document Classifier project.

The system classifies legal documents (e.g., FIR, Court Order) from scanned images or PDF files using:

- Optical Character Recognition (OCR)
- Text preprocessing
- Transformer-based NLP (BERT)
- Streamlit-based frontend interface

This ML module works independently and will later be deployed as a Django-based API for integration into a full-stack system.

---

# 📌 Problem Statement

Legal documents in real-world systems are typically:

- Scanned images
- Multi-page PDF files
- Unstructured
- Bilingual (English + Hindi)

Because these formats are not machine-readable, automated legal assistance requires:

1. Extracting text from images
2. Cleaning noisy OCR output
3. Understanding contextual meaning
4. Classifying document type accurately

This ML module implements that complete pipeline.

---
---

### 📊 Model Details: See [model_info.md](model_info.md)

---
---

# 🔄 End-to-End Workflow

1. User uploads Image or PDF
2. If PDF → Convert into page-wise images
3. Apply OCR to each page
4. Clean and normalize extracted text
5. Classify each page using BERT
6. Aggregate page-level predictions
7. Display final document type with confidence score

---

# 🏗 ML Pipeline Explanation

## 1️⃣ PDF to Image Conversion

PDF files are converted into page-wise images before OCR processing.

**Tools Used**
- `pdf2image`
- `Poppler`

**File**
```
pdf_to_images.py
```

---

## 2️⃣ OCR – Optical Character Recognition

Extracts machine-readable text from images.

Supports:
- English
- Hindi

**Tools Used**
- Tesseract OCR
- pytesseract

**File**
```
ocr.py
```

---

## 3️⃣ Image Preprocessing

Improves OCR accuracy using:

- Image resizing
- Grayscale conversion
- Adaptive thresholding
- Noise removal

**Library**
- OpenCV (`cv2`)

---

## 4️⃣ Text Cleaning & Normalization

OCR output is often noisy. Cleaning includes:

- Removing extra whitespace
- Merging broken lines
- Preserving legal keywords
- Structured formatting adjustments

**Library**
- Python Regular Expressions (`re`)

**File**
```
preprocess.py
```

---

## 5️⃣ NLP-Based Classification

The cleaned text is classified using a fine-tuned transformer model.

**Model**
- `bert-base-uncased`

**Framework**
- Hugging Face Transformers
- PyTorch (backend engine for training & inference)

**Files**
```
train_model.py
predict.py
```

### Why BERT?

- Captures contextual relationships
- Handles long legal text effectively
- More reliable than keyword-based models

---

## 6️⃣ Page-wise Aggregation

For multi-page documents:

- Each page is classified independently
- Majority voting determines final document type
- Confidence score calculated using softmax probabilities

---

## 7️⃣ Streamlit Interface

A lightweight frontend built using Streamlit provides:

- Image/PDF upload
- Page-wise OCR preview
- Document classification result
- Confidence score display

**File**
```
app.py
```

Run using:
```
streamlit run app.py
```

---

# 📂 Project Structure

```
EPICS-LEGAL-AI/
│
├── app.py                # Streamlit frontend
├── ocr.py                # OCR processing
├── preprocess.py         # Text cleaning
├── pdf_to_images.py      # PDF conversion
├── train_model.py        # Model training
├── predict.py            # Inference logic
├── requirements.txt
├── .gitignore
├── README.md
├── model_info.md
├── LICENSE
│
├── dataset/              # (ignored from GitHub)
│   ├── Court_order/
│   └── FIR/
│
└── trained_model/        # (ignored from GitHub)
```

---

# 📊 Dataset Information

The dataset used for training includes:

- 50 Court Order documents
- 50 FIR documents
- Combination of images and PDFs
- Real-world formatted legal documents

⚠️ Dataset is excluded from this repository because:

- Legal document sensitivity
- Privacy considerations
- Repository size limitations
- Academic best practices

The training pipeline is fully reproducible.

---

# 🧠 Trained Model

The fine-tuned BERT model produces:

- `config.json`
- `model.safetensors`
- `tokenizer.json`
- `tokenizer_config.json`

⚠️ The trained model is excluded because:

- Model size exceeds GitHub file limits
- It can be regenerated using:

```
python train_model.py
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone <repository-url>
cd EPICS-LEGAL-AI
```

---

## 2️⃣ Create Virtual Environment

```
python -m venv venv
venv\Scripts\activate   # Windows
```

---

## 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

## 4️⃣ Install Tesseract OCR

Download:
https://github.com/tesseract-ocr/tesseract

Ensure:
- Tesseract is added to PATH
- Hindi language pack (`hin.traineddata`) is installed

---

## 5️⃣ Run Application

```
streamlit run app.py
```

---

# 📸 Streamlit Interface Screenshots

Below are actual screenshots of the Streamlit-based ML interface demonstrating the complete document classification workflow.

---

## 🏠 1. Application Home & File Upload

This is the main interface where users can:

- Upload image or PDF documents
- Drag and drop files
- Click "Submit for Review"
- Process each review independently

![Application Home](https://raw.githubusercontent.com/MunishUpadhyay/Materials/refs/heads/main/Screenshot%202026-02-16%20191022.png)

---

## 📄 2. Page-wise Analysis – Page 1

Displays:

- Uploaded document preview
- Page number
- Extracted OCR text (expandable)
- Page-level prediction
- Confidence score

![Page 1 Analysis](https://raw.githubusercontent.com/MunishUpadhyay/Materials/refs/heads/main/Screenshot%202026-02-16%20191131.png)

---

## 📄 3. Page-wise Analysis – Page 2

Shows:

- Second page preview
- Independent classification
- Page-level confidence

![Page 2 Analysis](https://raw.githubusercontent.com/MunishUpadhyay/Materials/refs/heads/main/Screenshot%202026-02-16%20191159.png)

---

## 📄 4. Page-wise Analysis – Page 3

Demonstrates:

- Multi-page handling
- OCR text extraction
- Consistent prediction across pages

![Page 3 Analysis](https://raw.githubusercontent.com/MunishUpadhyay/Materials/refs/heads/main/Screenshot%202026-02-16%20191229.png)

---

## ✅ 5. Final Document Decision

Displays:

- Final aggregated classification
- Overall confidence score
- Majority voting result

![Final Decision](https://raw.githubusercontent.com/MunishUpadhyay/Materials/refs/heads/main/Screenshot%202026-02-16%20191253.png)

---

# 🔐 .gitignore Explanation

The following are intentionally excluded:

```
venv/
dataset/
trained_model/
__pycache__/
*.pyc
```

Reasons:

- Virtual environments are system-specific
- Dataset contains legal documents
- Trained model exceeds GitHub size limits
- Keeps repository clean and professional

---

# 🧪 Technologies Used

- Python
- Streamlit
- Tesseract OCR
- OpenCV
- Hugging Face Transformers
- PyTorch
- pdf2image
- Poppler
- Pandas
- scikit-learn

---

# 🚀 Future Improvements

- Add more document categories
- Improve OCR robustness
- Expand multilingual support
- Deploy as Django REST API
- Containerization with Docker
- Cloud deployment

---

# 📖 Academic Context

Developed as part of the EPICS project for AI-based Legal Assistance.

This module focuses specifically on document classification and ML pipeline implementation.

---

# 📜 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for full details.
