import requests
import json

def generate_story(prompt, history, world_state):

    system_prompt = f"""
You are an AI RPG Story Engine.

Return ONLY valid JSON:

{{
  "world_lore": "...",
  "characters": [],
  "mission": "...",
  "plot_twist": "...",
  "moral_dilemma": "...",
  "choices": []
}}

Reputation: {world_state.get("reputation", 0)}
Corruption Level: {world_state.get("corruptionLevel", 5)}
"""

    full_prompt = system_prompt + "\n\nUser: " + prompt

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": full_prompt,
            "stream": False
        }
    )

    result = response.json()
    return result["response"]
