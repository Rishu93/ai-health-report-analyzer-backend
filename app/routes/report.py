from fastapi import APIRouter, UploadFile, File
from app.services.pdf_reader import extract_text_from_pdf
from app.services.analyzer import analyze_report

router = APIRouter()

@router.post("/analyze-report")
async def analyze_health_report(file: UploadFile = File(...)):
    file_bytes = await file.read()
    extracted_text = extract_text_from_pdf(file_bytes)

    analysis = analyze_report(extracted_text)

    return {
        "filename": file.filename,
        "analysis": analysis,
        "text_preview": extracted_text[:300]
    }
