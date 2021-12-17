import { useCallback, useEffect } from "react";

const NOTE_ON = 9; // 1001 0010
const NOTE_OFF = 8; // 1000 0010

type UseMidiMessagesParams = {
  midiAccess: WebMidi.MIDIAccess | undefined;
  onButtonPress: (index: number) => void;
  onButtonRelease: () => void;
};

/**
 * Add event listeners to all MIDI devices.
 * Execute onButtonPress when NOTE_ON is activated,
 * and onButtonRelease when NOTE_OFF is activated.
 */
const useMidiMessages = ({
  midiAccess,
  onButtonPress,
  onButtonRelease,
}: UseMidiMessagesParams): void => {
  const onMIDIMessage = useCallback(
    (event: WebMidi.MIDIMessageEvent) => {
      const midiStatus = event.data[0] >> 4;
      if (midiStatus === NOTE_ON) {
        const midiCode = event.data[1];
        const layer = Math.floor((midiCode - 36) / 16);
        const value = midiCode - (36 + layer * 16);
        const row = Math.floor(value / 4);
        const col = 3 - (value % 4);
        onButtonPress(4 * row + col);
      } else if (midiStatus === NOTE_OFF) {
        onButtonRelease();
      }
    },
    [onButtonPress, onButtonRelease]
  );

  useEffect(() => {
    if (midiAccess) {
      console.log(midiAccess.inputs.size);
      midiAccess.inputs.forEach(function (entry) {
        entry.onmidimessage = onMIDIMessage;
      });
    }
  }, [midiAccess, onMIDIMessage]);
};

export default useMidiMessages;
