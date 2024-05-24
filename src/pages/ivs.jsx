import Script from "next/script";
import React, { useEffect } from "react";

const ivs = () => {
  //const streamUrl = "http://localhost:8888/mystream/index.m3u8";
  // const streamUrl =
  //"https://135caa8d61a0.us-west-2.playback.live-video.net/api/video/v1/us-west-2.730335638120.channel.84nsDpxNGT1A.m3u8";

  //const streamUrl =
  //"https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";
  // const streamUrl =
  //  "https://135caa8d61a0.us-west-2.playback.live-video.net/api/video/v1/us-west-2.730335638120.channel.84nsDpxNGT1A.m3u8";

  return (
    <div>
      <Script
        src="/lib/service-worker.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <video
        id="video-player"
        playsinIine
        controls
        crossOrigin="anonymous"
      ></video>
    </div>
  );
};

export default ivs;
