from transformers import pipeline
import re

# Load model once
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)


def clean_text_for_summary(text):
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text)

    # Remove websites / junk
    text = re.sub(r'www\.\S+', '', text)
    text = re.sub(r'\S+\.com', '', text)

    return text.strip()

def summarize_text(text):
    if not text or len(text.strip()) < 50:
        return "Text too short to summarize"

    # Light cleaning only (no aggressive filtering)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'www\.\S+', '', text)
    text = re.sub(r'\S+\.com', '', text)

    # Limit size but NOT too small
    text = text[:2000]

    try:
        summary = summarizer(
            text,
            max_length=180,
            min_length=60,
            do_sample=False
        )

        return summary[0]["summary_text"]

    except Exception:
        return "Summary not available"