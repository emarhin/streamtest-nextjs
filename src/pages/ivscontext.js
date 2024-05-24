import React from "react";

import dynamic from "next/dynamic";
const Player = dynamic(() => import("@/component/player"), {
  ssr: false,
});

const ivscontext = () => {
  return (
    <div>
      <Player
        id="1"
        playbackUrl="https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8"
      />
    </div>
  );
};

export default ivscontext;
