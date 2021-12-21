import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
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
const Soundboard: React.FC = () => {
  const [currentButton, setCurrentButton] = useState<number>();
  const [soundURLs, setSoundURLs] = useState<string[]>();
  const audios = useHowl(soundURLs);
  const midiAccess = useMidiAccess();

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

  return (
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
  );
};

export default Soundboard;
