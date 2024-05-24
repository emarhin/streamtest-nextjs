import { useEffect, useRef, useCallback } from "react";
//import throttle from "lodash.throttle";
//import "context-filter-polyfill";

//import PlayerControls from "./PlayerControls";
//import Spinner from "../../common/Spinner";
//import { Play } from "../../../assets/icons";

import usePlayer from "../../public/lib/ivscontext";

//import { isCanvasBlank, isMobileOS } from "../../../utils";
//import config from "../../../config";

//mport "./Player.css";

//const { BLUR, PLAY_IN_BACKGROUND } = config;
const { READY, BUFFERING } = window.IVSPlayer.PlayerState;

/**
 * Props:
 * @param {number} id   Player ID
 * @param {string} state 'ACTIVE' | 'NEXT' | 'PREV'
 * @param {string} playbackUrl stream URL to load into the player for playback
 * @param {object} swiper Swiper instance
 * @param {boolean} isPlayerActive true if the player is active (1 or 2 players could be active at the same time due to Swiper duplicates)
 * @param {boolean} isPlayerVisible true if the player is currently visible in the viewport (only 1 active player can be visible at any time)
 * @param {boolean} metadataVisible true if the metadata panel is expanded
 * @param {function toggleMetadata(): void} toggleMetadata toggles metadata panel in mobile view
 * @param {function gotoStream(dir: string): void} gotoStream sets the active stream to the one corresponding to dir ('next' or 'prev')
 */
const Player = ({
  id,

  playbackUrl,
}) => {
  const {
    pid,
    video,
    load,
    muted,
    paused,
    loading,
    toggleMute,
    togglePlayPause,
    play,
    pause,
    player,
  } = usePlayer(id);

  const canvas = useRef();

  useEffect(() => {
    if (playbackUrl) {
      load(playbackUrl);
      // if (BLUR.ENABLED && BLUR.STILL_FRAME) clearCanvas();
    }
  }, [playbackUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <video id={`${id}-video`} ref={video} playsInline muted controls />
    </div>
  );
};

export default Player;
