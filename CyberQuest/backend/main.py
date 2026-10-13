from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "CyberQuest backend is running!"}


@app.get("/api/scenarios")
def get_scenarios():
    return {
        "scenarios": [
            {
                "id": 1,
                "category": "Phishing",
                "title": "Suspicious IT Email",
                "difficulty": "Easy"
            }
        ]
    }