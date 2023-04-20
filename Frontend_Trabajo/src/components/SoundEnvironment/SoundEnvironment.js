import React, { useState } from 'react';
import Sound from 'react-sound';
import BackgroundMusic from 'assets/sounds/background.mp3';
import { Button } from 'reactstrap';


const SoundEnvironment = (
  //handleSongLoading,
  //handleSongPlaying,
  //handleSongFinishedPlaying
  props
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {volumen} = props;
  return (
    <div>
      <Button className="rounded-circle " onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <i className="ni ni-button-pause" /> : <i className="ni ni-button-play" />}
      </Button>
      <Sound
        url={BackgroundMusic}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        // playFromPosition={300 /* in milliseconds */}
        // onLoading={handleSongLoading}
        // onPlaying={handleSongPlaying}
        // onFinishedPlaying={handleSongFinishedPlaying}
        volume={volumen}
        loop={true}
      />
    </div>
  );
};

export default SoundEnvironment;