# Legal Aid Assistant ⚖️

Legal Aid Assistant is an AI-powered platform designed to provide accessible legal help. It allows users to understand complex legal documents (like land records, FIRs, court notices) by providing simplified explanations in multiple languages (English, Hindi, Marathi, etc.).

## 🚀 Technologies

### Frontend
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **Networking**: Axios
- **Routing**: React Router

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **File Storage**: Cloudinary
- **Payments**: Razorpay & Stripe
- **Authentication**: JWT & Cookie-Parser

### ML Service
- **Language**: Python
- **Framework**: Flask
- **OCR**: Tesseract OCR & OpenCV
- **Processing**: PDF2Image & Pillow
- **AI Models**: Hugging Face Transformers (Summarization)

## 📁 Project Structure

```text
Legal Aid Assistant/
├── Frontend/           # React component-based UI
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route components (Home, Dashboard, Analysis, etc.)
│   │   ├── store/      # Global state management (Zustand)
│   │   └── utils/      # Constants, translations, and helper functions
├── Backend/            # Express.js REST API
│   ├── src/
│   │   ├── controllers/# Business logic and request handlers
│   │   ├── models/     # Mongoose models for MongoDB
│   │   ├── routes/     # API endpoints mapping
│   │   └── db/         # Database connection setup
├── ml-service/         # Python service for AI/ML processing
│   ├── ocr.py          # Optical Character Recognition logic
│   ├── summarizer.py   # Text simplification using AI
│   └── preprocess.py   # Document image cleaning and preparation
```

## ✨ Key Features

- **Multi-language Interface**: Available in English, Hindi, and Marathi to cater to rural users.
- **Smart Document Analysis**: Extract key points, legal summaries, and next steps from any legal document.
- **Secure File Handling**: Documents are encrypted, processed, and stored securely.
- **Interactive Chat**: Ask follow-up questions about your analyzed documents.
- **Resource Center**: Access legal guides, FAQs, and emergency help contacts.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB connection string
- Cloudinary API credentials

### Installation
1.  **Backend**:
    ```bash
    cd Backend
    npm install
    npm run nodemon
    ```
2.  **Frontend**:
    ```bash
    cd Frontend
    npm install
    npm run dev
    ```
3.  **ML Service**:
    ```bash
    cd ml-service
    pip install -r requirements.txt
    python preprocess.py
    ```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
