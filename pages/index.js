import React, { useState, useRef, useEffect } from 'react';

const usePlayerState = (videoPlayer) => {
  const [ playerState, setPlayerState ] = useState({ 
    playing: false,
    percentage: 0
  });

  useEffect(() => {
    playerState.playing ? videoPlayer.current.play() : videoPlayer.current.pause();
  }, [videoPlayer, playerState.playing]);

  const toggleVideoPlay = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing 
    });
  }

  const handleTimeUpdate = () => {
    const currentPercentage = (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100

    setPlayerState({
      ...playerState,
      percentage: currentPercentage
    })
  }

  const handleChangeVideoPercentage = (event) => {
    const currentPercentageValue = event.target.value
    videoPlayer.current.currentTime = videoPlayer.current.duration / 100 * currentPercentageValue

    setPlayerState({
      ...playerState,
      percentage: currentPercentageValue
    })
  }

  return {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage
  }
}

export default function Home() {
  const videoPlayer = useRef(null)
  const { playerState, toggleVideoPlay, handleTimeUpdate, handleChangeVideoPercentage } = usePlayerState(videoPlayer);

  const videoURL = 'moon.mp4'

  return (
    <div className="videoWrapper">
      <video
        ref={videoPlayer}
        src={videoURL}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="controls">
        <button onClick={toggleVideoPlay}> 
          { playerState.playing ? "Pause" : "Play" }
        </button> 
        <input type="range" min="0" max="100" onChange={handleChangeVideoPercentage}value={playerState.percentage}/>
      </div>
    </div>
  );
}
