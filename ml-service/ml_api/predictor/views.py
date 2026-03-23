import sys
import os
import tempfile

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Fix path for ML modules
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

# Import ML modules
from ocr import extract_text_from_image
from preprocess import clean_text
from pdf_to_images import convert_pdf_to_images
from predict import predict_document
from summarizer import summarize_text


@api_view(['POST'])
def predict_api(request):
    file = request.FILES.get('file')

    if not file:
        return Response({
            "success": False,
            "error": "No file provided"
        }, status=400)

    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False) as temp:
        for chunk in file.chunks():
            temp.write(chunk)
        temp_path = temp.name

    results = []

    try:
        # Handle PDF vs Image
        if file.name.lower().endswith('.pdf'):
            images = convert_pdf_to_images(temp_path)
        else:
            images = [temp_path]

        # Collect all text
        all_pages_text = []

        for img_path in images:
            text = extract_text_from_image(img_path)
            cleaned = clean_text(text)

            # Store cleaned text
            all_pages_text.append(cleaned)

            # Predict per page
            pred, conf = predict_document(cleaned)

            results.append({
                "prediction": pred,
                "confidence": float(conf)
            })

        # Combine full document text (ONLY ONCE)
        full_text = " ".join(all_pages_text)

        # Debug (optional)
        print("FULL TEXT LENGTH:", len(full_text))

        # Generate summary (ONLY ONCE)
        final_summary = summarize_text(full_text)

        print("FINAL SUMMARY:", final_summary)

        # Majority voting
        preds = [r["prediction"] for r in results]
        final_pred = max(set(preds), key=preds.count)

        avg_conf = sum(r["confidence"] for r in results) / len(results)

        return Response({
            "success": True,
            "document_type": final_pred,
            "confidence": round(avg_conf, 4),
            "summary": final_summary,
            "pages": [
                {
                    "page": i + 1,
                    "prediction": r["prediction"],
                    "confidence": round(r["confidence"], 4)
                }
                for i, r in enumerate(results)
            ]
        })

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e)
        }, status=500)

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)