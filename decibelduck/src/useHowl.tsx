import { useEffect, useState } from "react";
import { Howl } from "howler";

/**
 * Load all sound files into an array of Howl objects
 */
const useHowl = (soundURLs: string[]): Howl[] | undefined => {
  const [audios, setAudios] = useState<Howl[]>();

  useEffect(() => {
    setAudios(soundURLs.map((soundURL) => new Howl({ src: [soundURL] })));
  }, [soundURLs]);

  return audios;
};

export default useHowl;
