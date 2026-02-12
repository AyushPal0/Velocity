export async function generateStory(prompt, history, worldState) {
  const response = await fetch("http://localhost:8000/generate-story", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      history,
      world_state: worldState,
    }),
  });

  return response.json();
}
