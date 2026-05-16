from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from analyzer import analyze_article
from scraper import scrape_article
from fact_checker import get_fact_checks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleRequest(BaseModel):
    text: str = ""
    url: str = ""

@app.post("/analyze")
async def analyze(request: ArticleRequest):
    if request.url:
        text = scrape_article(request.url)
    else:
        text = request.text

    if not text.strip():
        return {"error": "No content provided"}

    result = analyze_article(text)
    fact_checks = get_fact_checks(text)

    return {
        "verdict": result.get("verdict", "Unknown"),
        "biasScore": result.get("bias_score", 0),
        "emotionalScore": result.get("emotional_score", 0),
        "missingSourcesScore": result.get("missing_sources_score", 0),
        "absoluteClaimsScore": result.get("absolute_claims_score", 0),
        "summary": result.get("summary", ""),
        "flaggedClaims": result.get("flagged_claims", []),
        "factChecks": fact_checks
    }

@app.get("/")
def root():
    return {"status": "Bias checker API is running"}