from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.report import router as report_router

app = FastAPI(
    title="AI Health Report Analyzer",
    description="Backend API for analyzing health reports",
    version="1.0"
)

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

# Include report routes
app.include_router(report_router)
