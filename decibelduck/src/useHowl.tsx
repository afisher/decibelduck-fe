import { useEffect, useState } from "react";
import { Howl } from "howler";

export default (soundURLs: string[]): Howl[] | undefined => {
  const [audios, setAudios] = useState<Howl[]>();

  useEffect(() => {
    setAudios(soundURLs.map((soundURL) => new Howl({ src: [soundURL] })));
  }, [soundURLs]);

  return audios;
};
