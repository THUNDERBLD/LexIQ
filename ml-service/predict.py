import torch
import torch.nn.functional as F
from transformers import BertTokenizer, BertForSequenceClassification
import os

# ---------- CONFIG ----------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "trained_model")
MAX_LENGTH = 128

LABELS = ["court_order", "fir"]


# ---------- LOAD MODEL ----------
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertForSequenceClassification.from_pretrained(MODEL_DIR)
model.eval()   # very important for inference


# ---------- PREDICTION FUNCTION ----------
def predict_document(text):
    """
    Takes OCR-extracted text as input
    Returns predicted label and confidence score
    """

    encoding = tokenizer(
        text,
        truncation=True,
        padding="max_length",
        max_length=MAX_LENGTH,
        return_tensors="pt"
    )

    with torch.no_grad():
        outputs = model(
            input_ids=encoding["input_ids"],
            attention_mask=encoding["attention_mask"]
        )

    # Convert logits to probabilities
    probs = F.softmax(outputs.logits, dim=1)

    predicted_class_id = torch.argmax(probs, dim=1).item()
    confidence = probs[0][predicted_class_id].item()

    return LABELS[predicted_class_id], confidence


# ---------- TEST BLOCK ----------
if __name__ == "__main__":

    sample_text = """
    माननीय न्यायालय
    IN THE COURT OF CIVIL JUDGE
    Case No : 123/2023
    Date : 12/09/2023
    """

    label, confidence = predict_document(sample_text)

    print(f"Predicted document type : {label}")
    print(f"Confidence             : {confidence:.4f}")

    print("MODEL_DIR:", MODEL_DIR)
