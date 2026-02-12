from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import StoryRequest
from .story_engine import generate_story
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-story")
def generate(request: StoryRequest):

    story_text = generate_story(
        request.prompt,
        request.history,
        request.world_state
    )

    try:
        story_json = json.loads(story_text)
    except:
        story_json = {"error": "Model did not return valid JSON"}

    return story_json
