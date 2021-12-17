import clsx from "clsx";
import React, { useCallback, useState } from "react";
import "./App.css";
import testSounds from "./testSounds";
import useHowl from "./useHowl";
import useMidiAccess from "./useMidiAccess";
import useMidiMessages from "./useMidiMessages";

/**
 * Parent component of the decibelduck app
 */
const App: React.FC = () => {
  const [currentButton, setCurrentButton] = useState<number>();
  const audios = useHowl(testSounds);
  const midiAccess = useMidiAccess();

  // Sound may not be played in-browser until the user has interacted with the page
  const [userHasInteracted, setUserHasInteracted] = useState(false);

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

  return userHasInteracted ? (
    <div className="midiButtonsContainer">
      {Array.from({ length: 16 }, (_, index) => (
        <button
          className={clsx({
            midiButton: true,
            selected: isCurrentButton(index),
          })}
          key={`button-${index}`}
          onClick={() => playSound(index)}
        ></button>
      ))}
    </div>
  ) : (
    <button className="startButton" onClick={() => setUserHasInteracted(true)}>
      Start
    </button>
  );
};

export default App;
