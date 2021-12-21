import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import "./App.css";
import useHowl from "./useHowl";
import useMidiAccess from "./useMidiAccess";
import useMidiMessages from "./useMidiMessages";

const { REACT_APP_API_URL } = process.env;

type SoundResponse = {
  items: { url: string }[];
};

/**
 * Parent component of the decibelduck app
 */
const App: React.FC = () => {
  const [currentButton, setCurrentButton] = useState<number>();
  const [soundURLs, setSoundURLs] = useState<string[]>();
  const audios = useHowl(soundURLs);
  const midiAccess = useMidiAccess();

  // Sound may not be played in-browser until the user has interacted with the page
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  useEffect(() => {
    axios.get<SoundResponse>(`${REACT_APP_API_URL}/sounds`).then((result) => {
      setSoundURLs(result.data.items.map((item) => item.url));
    });
  }, []);

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
