import React from "react";
import "./App.css";

const App = () => {
  const rows = 4;
  const cols = 4;
  return (
    <div className="midiButtonsContainer">
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => (
          <button className="midiButton" key={`button-${row}-${col}`}></button>
        ))
      )}
    </div>
  );
};

export default App;
