import cv2
import pytesseract
import os
import csv
import re
import numpy as np


DATASET_DIR = "dataset"
OUTPUT_CSV = "data.csv"
LABELS = ["court_order", "fir"]


# ---------- IMAGE PREPROCESSING ----------

def deskew(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    coords = np.column_stack(np.where(gray < 255))
    if len(coords) == 0:
        return image

    angle = cv2.minAreaRect(coords)[-1]

    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle

    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)

    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(
        image, M, (w, h),
        flags=cv2.INTER_CUBIC,
        borderMode=cv2.BORDER_REPLICATE
    )
    return rotated


def enhance_contrast(gray):
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    return clahe.apply(gray)


# ---------- TEXT CLEANING ----------

def normalize_text(text):
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"[|_~•]", "", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    lines = []
    for line in text.splitlines():
        line = line.strip()
        if len(line) > 2:
            lines.append(line)

    return "\n".join(lines).strip()


# ---------- OCR FUNCTION ----------

def extract_text_from_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return ""

    # Resize
    image = cv2.resize(image, None, fx=1.6, fy=1.6, interpolation=cv2.INTER_CUBIC)

    # Deskew
    image = deskew(image)

    # Grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Contrast enhancement
    gray = enhance_contrast(gray)

    # Adaptive threshold
    gray = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31, 2
    )

    # Noise removal
    gray = cv2.medianBlur(gray, 3)

    # OCR (Hindi + English)
    text = pytesseract.image_to_string(
        gray,
        lang="eng+hin",
        config="--oem 3 --psm 4"
    )

    return normalize_text(text)


# ---------- MAIN ----------

if __name__ == "__main__":

    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["text", "label"])

        for label in LABELS:
            image_dir = os.path.join(DATASET_DIR, label, "images")

            if not os.path.exists(image_dir):
                print(f"⚠️ Missing folder: {image_dir}")
                continue

            for img in os.listdir(image_dir):
                if img.lower().endswith((".jpg", ".jpeg", ".png")):
                    img_path = os.path.join(image_dir, img)
                    text = extract_text_from_image(img_path)

                    if len(text) > 40:
                        writer.writerow([text, label])

    print("✅ OCR completed successfully. data.csv generated.")
