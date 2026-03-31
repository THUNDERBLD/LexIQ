import sys
import os
import tempfile

from rest_framework.decorators import api_view
from rest_framework.response import Response

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

from ocr import extract_text_from_image
from preprocess import clean_text as preprocess_clean_text
from pdf_to_images import convert_pdf_to_images
from predict import predict_document

from summarizer import process_document


@api_view(['POST'])
def predict_api(request):
    file = request.FILES.get('file')

    if not file:
        return Response({"success": False, "error": "No file provided"}, status=400)

    with tempfile.NamedTemporaryFile(delete=False) as temp:
        for chunk in file.chunks():
            temp.write(chunk)
        temp_path = temp.name

    results = []
    images = []

    try:
        # PDF or Image
        if file.name.lower().endswith('.pdf'):
            images = convert_pdf_to_images(temp_path)
        else:
            images = [temp_path]

        all_pages_text = []

        for idx, img_path in enumerate(images):
            text = extract_text_from_image(img_path)
            cleaned = preprocess_clean_text(text)

            print(f"\n===== OCR PAGE {idx+1} =====\n", cleaned[:200])

            all_pages_text.append(cleaned)

            if cleaned.strip():
                pred, conf = predict_document(cleaned)
                results.append({
                    "prediction": pred,
                    "confidence": float(conf)
                })

        # 🔥 Check empty OCR
        if not any(text.strip() for text in all_pages_text):
            return Response({
                "success": False,
                "error": "No readable text found in document"
            }, status=400)

        preds = [r["prediction"] for r in results]
        final_pred = max(set(preds), key=preds.count) if preds else "unknown"

        avg_conf = sum(r["confidence"] for r in results) / len(results) if results else 0

        # 🔥 Process document
        output = process_document(all_pages_text, final_pred)

        return Response({
            "success": True,
            "document_type": final_pred,
            "confidence": round(avg_conf, 4),
            "summary": output["summary"],
            "page_summaries": output["page_summaries"],
            "extracted_fields": output["extracted_fields"],
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

        if images:
            for img_path in images:
                if os.path.exists(img_path) and img_path != temp_path:
                    os.remove(img_path)