import React, { useState } from "react";
import { generateStory } from "./api";

function App() {
  const [input, setInput] = useState("");
  const [story, setStory] = useState(null);
  const [history, setHistory] = useState([]);
  const [worldState, setWorldState] = useState({
    reputation: 0,
    corruptionLevel: 5,
  });

  const handleGenerate = async () => {
    const data = await generateStory(input, history, worldState);
    setStory(data);

    setHistory([
      ...history,
      { role: "user", content: input },
      { role: "assistant", content: JSON.stringify(data) },
    ]);

    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Dynamic Story Game</h1>

      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />
      <button onClick={handleGenerate}>Generate</button>

      {story && (
        <div>
          <h2>World Lore</h2>
          <p>{story.world_lore}</p>

          <h3>Mission</h3>
          <p>{story.mission}</p>

          <h3>Choices</h3>
          {story.choices &&
            story.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => setInput(choice.text)}
              >
                {choice.text}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
