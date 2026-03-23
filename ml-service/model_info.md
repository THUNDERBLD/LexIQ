# 📊 Model Information – AI Legal Document Classifier

This document describes the technical details of the trained NLP model used in the ML module.

---

## 🧠 Model Architecture

- Base Model: `bert-base-uncased`
- Model Type: Transformer-based Text Classification
- Framework: Hugging Face Transformers
- Backend Engine: PyTorch
- Task: Legal Document Classification

---

## 🎯 Objective

To classify legal documents into predefined categories:

- FIR (First Information Report)
- Court Order

The model operates on OCR-extracted text from scanned images and PDF files.

---

## 📂 Dataset Details

- Total Documents Used: 100
  - 50 FIR documents
  - 50 Court Order documents
- Format:
  - Scanned images
  - Multi-page PDF files
- Language:
  - English
  - Hindi (bilingual OCR support)

After preprocessing and filtering:

- Clean training samples generated from OCR-extracted pages

---

## ⚙️ Training Configuration

- Epochs: 4
- Optimizer: AdamW
- Loss Function: CrossEntropyLoss
- Batch Size: Default (Transformers Trainer)
- Tokenization: BERT Tokenizer
- Maximum Token Length: 512

Training Loss Progression:

- Epoch 1: 0.2931
- Epoch 2: 0.0468
- Epoch 3: 0.0161
- Epoch 4: 0.0054

---

## 📈 Inference Strategy

1. Extract text using OCR.
2. Clean and normalize text.
3. Tokenize using BERT tokenizer.
4. Generate logits.
5. Apply softmax to compute probabilities.
6. Select class with highest probability.

For multi-page documents:

- Each page classified independently.
- Majority voting used for final document-level decision.
- Overall confidence computed from aggregated probabilities.

---

## 📦 Model Output Files

After training, the following files are generated:

- `config.json`
- `model.safetensors`
- `tokenizer.json`
- `tokenizer_config.json`

These files are stored in the `trained_model/` directory.

Note: Model files are excluded from GitHub due to size limitations.

---

## 🚧 Limitations

- Model performance depends on OCR quality.
- Small dataset size may lead to high confidence bias.
- Poor scan quality may reduce classification accuracy.
- Currently supports only two document types.

---

## 🔮 Future Improvements

- Increase dataset size
- Add more legal document categories
- Improve OCR robustness
- Introduce data augmentation
- Deploy as scalable Django REST API
- Add model evaluation metrics (precision, recall, F1-score)

---

## 📚 Academic Context

This model was developed as part of the EPICS project focused on AI-based Legal Assistance.

It demonstrates the integration of:

- Computer Vision (OCR)
- Natural Language Processing
- Deep Learning
- Document Intelligence
