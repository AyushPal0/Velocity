import requests
import json

def generate_story(prompt, history, world_state):

    system_prompt = f"""
You are an AI RPG Story Engine.

Return ONLY valid JSON in this format:

{{
  "world_lore": "...",
  "characters": [
    {{
      "name": "...",
      "role": "...",
      "personality": "...",
      "secret": "..."
    }}
  ],
  "mission": "...",
  "plot_twist": "...",
  "moral_dilemma": "...",
  "choices": [
    {{"id": 1, "text": "...", "effect": "good/bad/neutral"}},
    {{"id": 2, "text": "...", "effect": "good/bad/neutral"}}
  ]
}}

World State:
Reputation: {world_state.get("reputation", 0)}
Corruption Level: {world_state.get("corruptionLevel", 5)}

Keep the story evolving based on user decisions.
"""

    full_prompt = system_prompt + "\n\nUser Input:\n" + prompt

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
