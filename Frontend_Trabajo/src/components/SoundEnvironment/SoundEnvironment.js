import React, { useState } from 'react';
import Sound from 'react-sound';
import BackgroundMusic from 'assets/sounds/background.mp3';
import { Button } from 'reactstrap';

var volumen = 50;

const SoundEnvironment = (
  handleSongLoading,
  handleSongPlaying,
  handleSongFinishedPlaying
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
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