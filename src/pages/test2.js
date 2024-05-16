import React from "react";

// This imports the functional component from the previous sample.
import VideoJS from "../component/videojscomponet.js";

const App = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    //autoplay: true,
    controls: true,
    // responsive: true,
    liveui: true,
    // fluid: true,
    preload: "auto",
    html5: {
      vhs: {
        overrideNative: true,
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false,
    },
  };
   const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS src="http://localhost:8888/mystream/index.m3u8" />
      <div>Rest of app here</div>
    </>
  );
};

export default App;
