from fastapi import FastAPI
from app.routes.report import router as report_router

app = FastAPI(
    title="AI Health Report Analyzer",
    description="Backend API for analyzing health reports",
    version="1.0"
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

app.include_router(report_router)
