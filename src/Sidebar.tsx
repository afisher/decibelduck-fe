import React from "react";

type SidebarProps = {
  midiIsSupported: boolean;
  userHasInteracted: boolean;
};

const Sidebar: React.VFC<SidebarProps> = ({
  midiIsSupported,
  userHasInteracted,
}) => {
  return (
    <div className="sidebar">
      <p>Welcome to the decibelduck soundboard.</p>
      {midiIsSupported ? (
        <p>
          You can activate the soundboard using the mouse, keyboard, or using
          your MIDI Fighter device.
        </p>
      ) : (
        <>
          <p>You can activate the soundboard using the mouse or keyboard. </p>
          <p>You can also use a MIDI Fighter device if you switch to Chrome.</p>
        </>
      )}
      {!userHasInteracted && <p>Press Start to begin.</p>}
    </div>
  );
};

export default Sidebar;
