import { useEffect, useState } from "react";

/**
 * Request MIDI access from the browser, if supported
 */
const useMidiAccess = (): WebMidi.MIDIAccess | undefined => {
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess>();

  useEffect(() => {
    if (window.navigator.requestMIDIAccess) {
      window.navigator.requestMIDIAccess().then((m) => setMidiAccess(m));
    }
  }, []);

  return midiAccess;
};

export default useMidiAccess;
