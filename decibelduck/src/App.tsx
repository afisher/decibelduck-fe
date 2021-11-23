import React, { useEffect, useState } from "react";
import "./App.css";

const NOTE_ON = 9; // 1001 0010
const NOTE_OFF = 8; // 1000 0010

type Button = {
  row?: number;
  col?: number;
};

const App: React.FC = () => {
  const [currentButton, setCurrentButton] = useState<{
    row?: number;
    col?: number;
  }>({});

  function onMIDIMessage(event: WebMidi.MIDIMessageEvent) {
    const midiStatus = event.data[0] >> 4;
    if (midiStatus === NOTE_ON) {
      const midiCode = event.data[1];
      const layer = Math.floor((midiCode - 36) / 16);
      const value = midiCode - (36 + layer * 16);
      const row = Math.floor(value / 4);
      const col = value % 4;
      onButtonPress({ row, col });
    } else if (midiStatus === NOTE_OFF) {
      onButtonRelease();
    }
  }

  useEffect(() => {
    window.navigator.requestMIDIAccess().then((midiAccess) => {
      midiAccess.inputs.forEach(function (entry) {
        entry.onmidimessage = onMIDIMessage;
      });
    });
  }, []);

  const onButtonPress = ({ row, col }: Button) => {
    console.log(`ROW=${row} COL=${col}`);
    setCurrentButton({ row, col });
  };

  const onButtonRelease = () => {
    setCurrentButton({});
  };

  const isCurrentButton = ({ row, col }: Button) => {
    return row === currentButton.row && col === currentButton.col;
  };

  const rows = 4;
  const cols = 4;
  return (
    <div className="midiButtonsContainer">
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => (
          <button
            className={
              "midiButton" +
              (isCurrentButton({ row, col: 3 - col }) ? " selected" : "")
            }
            key={`button-${row}-${col}`}
          ></button>
        ))
      )}
    </div>
  );
};

export default App;
