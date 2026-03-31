from transformers import pipeline
import re

# -------------------------
# MODEL (ONLY for court orders)
# -------------------------
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

# -------------------------
# CLEAN TEXT
# -------------------------
def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\u0900-\u097F\s:/.-]', '', text)
    return text.strip()

# -------------------------
# SAFE TRIM
# -------------------------
def safe_trim(text, max_words=300):
    return " ".join(text.split()[:max_words])

# =========================================================
# 🔒 COURT ORDER SECTION (FIXED + IMPROVED)
# =========================================================

def generate_summary(text):
    trimmed = safe_trim(text)

    if len(trimmed.split()) < 20:
        return trimmed

    input_len = len(trimmed.split())

    max_len = min(120, int(input_len * 0.8))
    min_len = max(30, int(input_len * 0.4))

    try:
        result = summarizer(
            trimmed,
            max_length=max_len,
            min_length=min_len,
            do_sample=False
        )
        return result[0]["summary_text"]
    except:
        return trimmed[:200]


def extract_order_content(text):
    if "ORDER" in text:
        parts = text.split("ORDER")
        return parts[-1]
    return text


def extract_court_fields(text):

    data = {}

    # Person / Judge
    match = re.search(r'(mr\.?|ms\.?|mrs\.?)\s+([a-zA-Z\s]+)', text, re.I)
    if match:
        data["person"] = match.group(2).strip()

    # Decision
    if "allowed" in text.lower():
        data["decision"] = "Application allowed"
    elif "dismissed" in text.lower():
        data["decision"] = "Application dismissed"

    # Status
    if "settled" in text.lower():
        data["status"] = "Case settled"

    # Payment
    if "paid" in text.lower():
        data["payment"] = "Payment completed"

    return data

# =========================================================
# 🔥 FIR SECTION-AWARE EXTRACTION (FINAL)
# =========================================================

def extract_fir_contents_section(text):
    patterns = [
        r'12\s*\.?\s*f\.?i\.?r\.?\s*contents(.*)',
        r'fir\s*contents(.*)',
        r'तथ्य(.*)'
    ]

    for p in patterns:
        match = re.search(p, text, re.I | re.S)
        if match:
            return match.group(1)

    return text


def clean_fir_contents(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.split(r'\b(dd\.no|signature|date of dispatch)\b', text, flags=re.I)[0]
    return text.strip()

# -------------------------
# SAFE FIELD EXTRACTION
# -------------------------

def extract_fir_no(text):
    match = re.search(r'fir\s*no\s*[:\-]?\s*(\d{1,5})', text, re.I)
    return match.group(1) if match else ""


def extract_date(text):
    match = re.search(r'\d{2}/\d{2}/\d{4}', text)
    return match.group(0) if match else ""


def extract_ipc(text):
    match = re.search(r'ipc\s*(\d+)', text, re.I)
    return match.group(1) if match else ""


def extract_time(text):
    match = re.search(r'(\d{1,2}:\d{2}\s*(am|pm)|\d{2}:\d{2}\s*hrs)', text, re.I)
    return match.group(1) if match else ""


def extract_name(text):
    patterns = [
        r'([a-zA-Z]+\s+s/o\s+[a-zA-Z\s]+)',
        r'नाम\s*[:\-]?\s*([a-zA-Z\s]+)',
        r'name\s*[:\-]?\s*([a-zA-Z\s]+)'
    ]

    for p in patterns:
        match = re.search(p, text, re.I)
        if match:
            return match.group(1).strip()

    return ""


def extract_location(text):
    match = re.search(r'p\s*s[:\-]?\s*([a-zA-Z\s]+)', text, re.I)
    return match.group(1).strip() if match else ""

# -------------------------
# INCIDENT DETECTION (FIXED)
# -------------------------

def detect_incident(text):

    text = text.lower()

    # Priority 1: COVID
    if "mask" in text or "मास्क" in text:
        return "Violation of COVID-19 norms (mask not worn)"

    if "lockdown" in text or "curfew" in text or "कर्फ्यू" in text:
        return "Violation of lockdown/curfew rules"

    # Weapons
    if "pistol" in text or "weapon" in text or "arm" in text:
        return "Illegal possession of weapon (Arms Act violation)"

    # Theft (STRICT)
    if re.search(r'\btheft\b', text) or "चोरी" in text:
        return "Theft incident reported"

    # Assault
    if "assault" in text or "मारपीट" in text:
        return "Physical assault reported"

    # Fraud
    if "fraud" in text or "धोखाधड़ी" in text:
        return "Fraud case reported"

    # General
    if "ipc" in text:
        return "Offence registered under IPC"

    return "Details recorded in FIR"

# -------------------------
# FINAL FIR DETAILS
# -------------------------

def extract_fir_details(full_text):

    contents = extract_fir_contents_section(full_text)
    contents = clean_fir_contents(contents)

    ipc_val = extract_ipc(full_text)

    return {
        "person": extract_name(contents),
        "time": extract_time(contents),
        "location": extract_location(full_text),
        "law": f"IPC {ipc_val}" if ipc_val else "",
        "incident": detect_incident(contents),
        "raw_content": contents[:500]
    }

# =========================================================
# MAIN FUNCTION
# =========================================================

def process_document(pages_text, doc_type="unknown"):

    full_text = " ".join(pages_text)
    cleaned = clean_text(full_text)

    # 🔥 FIR
    if doc_type == "fir":

        fields = {
            "fir_no": extract_fir_no(cleaned),
            "date": extract_date(cleaned),
            "ipc": extract_ipc(cleaned),
            "name": extract_name(cleaned)
        }

        details = extract_fir_details(cleaned)

        combined = {**fields, **details}

        return {
            "summary": details["incident"],
            "page_summaries": [
                "FIR registration details identified.",
                "Detailed incident extracted from FIR contents."
            ],
            "extracted_fields": combined
        }

    # 🔒 COURT ORDER (FINAL FIXED)
    elif doc_type == "court_order":

        content = extract_order_content(cleaned)

        summary = generate_summary(content)

        fields = extract_court_fields(content)  # 🔥 FIXED (use ORDER only)

        return {
            "summary": summary,
            "page_summaries": [summary],
            "extracted_fields": fields
        }

    # DEFAULT
    else:
        summary = generate_summary(cleaned)

        return {
            "summary": summary,
            "page_summaries": [summary],
            "extracted_fields": {}
        }