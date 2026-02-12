from pydantic import BaseModel
from typing import List, Dict


class StoryRequest(BaseModel):
    prompt: str
    history: List[Dict]
    world_state: Dict
