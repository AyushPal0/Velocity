import React, { useState } from "react";
import { generateStory } from "./api";
import InkText from "./components/InkText";
import "./index.css";

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
    <div className="book-container">
      <h1 className="glow" style={{ fontFamily: "Cinzel" }}>
        Game Idea Generator: Craft Your Own Adventure!
      </h1>

      <textarea
        rows="3"
        style={{ width: "100%", padding: "10px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="A dragon guarding a forgotten kingdom..."
      />

      <button className="magic-button" onClick={handleGenerate}>
        Summon Story ✨
      </button>

      {story && (
        <div>
          <h2 className="glow">World Lore</h2>
          <p style={{ color: "red" }}>
  {story.world_lore}
</p>

          <h3>Mission</h3>
          <p style={{ color: "red" }}>
  {story.world_lore}
</p>

          <h3>Choices</h3>
          {story.choices &&
            story.choices.map((choice) => (
              <button
                key={choice.id}
                className="magic-button"
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
