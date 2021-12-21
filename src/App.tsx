import React, { useState } from "react";
import Soundboard from "./Soundboard";
import "./App.css";
import Sidebar from "./Sidebar";

const App: React.VFC = () => {
  // Sound may not be played in-browser until the user has interacted with the page
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  return (
    <div className="appContainer">
      <Sidebar
        midiIsSupported={!!window.navigator.requestMIDIAccess}
        userHasInteracted={userHasInteracted}
      />
      {userHasInteracted ? (
        <Soundboard />
      ) : (
        <button
          className="startButton"
          onClick={() => setUserHasInteracted(true)}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
