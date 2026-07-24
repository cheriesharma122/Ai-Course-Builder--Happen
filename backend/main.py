import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel

# Load variables from backend/.env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found in the backend/.env file.")

client = genai.Client(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RoadmapRequest(BaseModel):
    skill: str
    level: str
    goal: str
    hours: str
    language: str


@app.get("/")
def home():
    return {"message": "Welcome to AI SkillPath Backend!"}


@app.post("/generate-roadmap")
def generate_roadmap(data: RoadmapRequest):
    prompt = f"""
Create a personalized learning roadmap for this learner.

Skill: {data.skill}
Current level: {data.level}
Goal: {data.goal}
Daily study time: {data.hours}
Preferred language: {data.language}

Generate:

1. A practical 8-week roadmap
2. Topics for every week
3. Practical exercises
4. Weekly mini projects
5. Free learning resources
6. Three final portfolio projects
7. Interview preparation tips
8. A final checklist

Write clearly in {data.language}.
Do not use Markdown tables.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt,
        )

        if not response.text:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an empty response.",
            )

        return {
            "message": "AI roadmap generated successfully",
            "skill": data.skill,
            "level": data.level,
            "goal": data.goal,
            "hours": data.hours,
            "language": data.language,
            "roadmap": response.text,
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Gemini error:", error)

        raise HTTPException(
            status_code=500,
            detail=f"Could not generate roadmap: {str(error)}",
        )