import React, { useCallback, useState } from "react";
import "./App.css";
import testSounds from "./testSounds";
import useHowl from "./useHowl";
import useMidiAccess from "./useMidiAccess";
import useMidiMessages from "./useMidiMessages";

const App: React.FC = () => {
  const [currentButton, setCurrentButton] = useState<number>();
  const audios = useHowl(testSounds);
  const midiAccess = useMidiAccess();

  const playSound = useCallback(
    (index: number) => {
      audios && audios[index].play();
    },
    [audios]
  );

  const onButtonPress = useCallback(
    (index: number) => {
      console.log(`INDEX=${index}`);
      setCurrentButton(index);
      playSound(index);
    },
    [setCurrentButton, playSound]
  );

  const onButtonRelease = useCallback(() => {
    setCurrentButton(undefined);
  }, [setCurrentButton]);

  useMidiMessages({
    midiAccess,
    onButtonPress,
    onButtonRelease,
  });

  const isCurrentButton = (index: number) => index === currentButton;

  return (
    <>
      <div className="midiButtonsContainer">
        {[...Array(16)].map((_, index) => (
          <button
            className={
              "midiButton" + (isCurrentButton(index) ? " selected" : "")
            }
            key={`button-${index}`}
            onClick={() => onButtonPress(index)}
          ></button>
        ))}
      </div>
    </>
  );
};

export default App;
