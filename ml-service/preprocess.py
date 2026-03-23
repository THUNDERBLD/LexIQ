import pandas as pd
import re

INPUT_CSV = "data.csv"
OUTPUT_CSV = "clean_data.csv"


def clean_text(text):
    if not isinstance(text, str):
        return ""

    # Convert English text to lowercase
    # (Hindi characters are unaffected)
    text = text.lower()

    # Remove unwanted special characters but KEEP:
    # - Hindi characters
    # - English letters
    # - Numbers
    # - :
    # - /
    text = re.sub(r"[^a-z0-9\u0900-\u097F:/\s]", " ", text)

    # Normalize multiple spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()


if __name__ == "__main__":

    print("Loading OCR dataset...")
    df = pd.read_csv(INPUT_CSV)

    # Apply cleaning
    df["text"] = df["text"].apply(clean_text)

    # Drop very small or empty texts
    df = df[df["text"].str.len() > 30]

    # Reset index
    df = df.reset_index(drop=True)

    df.to_csv(OUTPUT_CSV, index=False)

    print("✅ Preprocessing completed. clean_data.csv generated.")
    print(f"Total samples after cleaning: {len(df)}")