import pandas as pd
import torch
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import Dataset, DataLoader

# ---------- CONFIG ----------
MODEL_NAME = "bert-base-uncased"
OUTPUT_DIR = "trained_model"

MAX_LENGTH = 128
EPOCHS = 4          # slightly higher due to cleaner data
BATCH_SIZE = 8
LEARNING_RATE = 2e-5

LABELS = ["court_order", "fir"]
label2id = {label: idx for idx, label in enumerate(LABELS)}
id2label = {idx: label for label, idx in label2id.items()}


# ---------- DATASET ----------
class DocumentDataset(Dataset):
    def __init__(self, texts, labels, tokenizer):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        encoding = self.tokenizer(
            self.texts[idx],
            truncation=True,
            padding="max_length",
            max_length=MAX_LENGTH,
            return_tensors="pt"
        )

        return {
            "input_ids": encoding["input_ids"].squeeze(0),
            "attention_mask": encoding["attention_mask"].squeeze(0),
            "labels": torch.tensor(self.labels[idx], dtype=torch.long)
        }


# ---------- TRAINING ----------
if __name__ == "__main__":

    print("Loading cleaned dataset...")
    df = pd.read_csv("clean_data.csv")

    # Keep only valid labels
    df = df[df["label"].isin(LABELS)].reset_index(drop=True)

    texts = df["text"].tolist()
    labels = df["label"].map(label2id).tolist()

    X_train, X_val, y_train, y_val = train_test_split(
        texts, labels,
        test_size=0.2,
        random_state=42,
        stratify=labels
    )

    tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)

    model = BertForSequenceClassification.from_pretrained(
        MODEL_NAME,
        num_labels=len(LABELS),
        id2label=id2label,
        label2id=label2id
    )

    train_dataset = DocumentDataset(X_train, y_train, tokenizer)
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)

    optimizer = torch.optim.AdamW(model.parameters(), lr=LEARNING_RATE)

    model.train()
    for epoch in range(EPOCHS):
        total_loss = 0

        for batch in train_loader:
            optimizer.zero_grad()

            outputs = model(
                input_ids=batch["input_ids"],
                attention_mask=batch["attention_mask"],
                labels=batch["labels"]
            )

            loss = outputs.loss
            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        avg_loss = total_loss / len(train_loader)
        print(f"Epoch {epoch + 1}/{EPOCHS} - Loss: {avg_loss:.4f}")

    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)

    print("✅ Retraining completed. Model saved to trained_model/")