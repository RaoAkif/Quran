import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { paraData } from '../../paraData.js';
import '../App.css';

const Surah = () => {
  let { id } = useParams();
  let surah = paraData[id];

  const playerWrapperRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = async () => {
      // 1. IMPROVED DETECTION: Check if the fullscreen element is the wrapper OR contains the wrapper (the iframe)
      const currentFullscreenElement = document.fullscreenElement;
      const isPlayerFullscreen = 
        currentFullscreenElement && 
        (currentFullscreenElement === playerWrapperRef.current || playerWrapperRef.current.contains(currentFullscreenElement));

      if (isPlayerFullscreen) {
        playerWrapperRef.current.classList.add("landscape-mode");

        // 2. NEW FIX: Explicitly lock screen orientation to landscape
        // This is required for modern Android browsers
        if (screen.orientation && screen.orientation.lock) {
          try {
            await screen.orientation.lock("landscape");
          } catch (error) {
            console.warn("Screen orientation lock failed or not supported:", error);
          }
        }
      } else {
        playerWrapperRef.current.classList.remove("landscape-mode");

        // 3. UNLOCK: Return to natural orientation when exiting fullscreen
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      }
    };

    // Listen for standard and vendor-prefixed fullscreen changes
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari/Older Chrome

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div style={{ margin: 'auto', width: '50%', padding: '10px' }}>
      <div ref={playerWrapperRef} className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={surah.link}
          controls
          width="100%"
          height="100%"
          // 4. CONFIG: Ensure playsinline is false to allow native fullscreen behaviors on iOS if desired
          config={{
            youtube: {
              playerVars: { playsinline: 0 }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Surah;