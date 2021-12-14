import { useEffect, useState } from "react";

export default (): WebMidi.MIDIAccess | undefined => {
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess>();

  useEffect(() => {
    window.navigator.requestMIDIAccess().then((m) => setMidiAccess(m));
  }, []);

  return midiAccess;
};
