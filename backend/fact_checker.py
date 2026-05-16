def get_fact_checks(text: str) -> list:
    keywords = text[:100]
    return [
        {
            "text": f"Claim relates to: {keywords[:60]}...",
            "source": "Fact-check database",
            "verdict": "Under review",
            "color": "#888888"
        }
    ]