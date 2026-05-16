import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_article(text: str) -> dict:
    prompt = f"""
You are a professional fact-checker and media bias analyst.

Analyze the following news article and return ONLY a valid JSON object with no extra text.

Article:
\"\"\"{text}\"\"\"

Return this exact JSON structure:
{{
  "verdict": "Likely misinformation" or "Possibly biased" or "Mostly credible",
  "bias_score": <number 0-100>,
  "emotional_score": <number 0-100>,
  "missing_sources_score": <number 0-100>,
  "absolute_claims_score": <number 0-100>,
  "summary": "<2-3 sentence plain English explanation>",
  "flagged_claims": [
    {{
      "text": "<exact phrase from article>",
      "reason": "<why it is flagged>",
      "level": "high" or "medium"
    }}
  ]
}}

Scoring guide:
- bias_score: 0 = completely neutral, 100 = extremely biased
- emotional_score: how much emotional/sensational language is used
- missing_sources_score: how many claims lack named sources
- absolute_claims_score: use of words like always, never, 100%, proves, destroys
- Flag maximum 4 most suspicious sentences
- Be honest and objective — credible articles should score low
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    raw = response.choices[0].message.content.strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        import re
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            result = json.loads(match.group())
        else:
            raise ValueError("Could not parse AI response as JSON")

    return result