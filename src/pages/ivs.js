import React, { useEffect } from "react";
import Script from "next/script";

const ivs = () => {
  const streamUrl =
    "https://135caa8d61a0.us-west-2.playback.live-video.net/api/video/v1/us-west-2.730335638120.channel.84nsDpxNGT1A.m3u8";

  let latestBufferedPosition = 0;

  useEffect(() => {
    const loadIVSPlayer = async () => {
      if (window.IVSPlayer) {
        const { IVSPlayer } = window;

        console.log("ivs is online");

        const ivsPlayer = IVSPlayer.create();
        ivsPlayer.attachHTMLVideoElement(
          document.getElementById("video-player")
        );
        ivsPlayer.load(streamUrl);
        // ivsPlayer.play();

        ivsPlayer.addEventListener(IVSPlayer.PlayerState.BUFFERING, () => {
          // Store the current playback position when buffering starts
          console.log("buffering", ivsPlayer.getBufferDuration());
          latestBufferedPosition = ivsPlayer.getBufferDuration();
        });

        ivsPlayer.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
          console.log("playing");
        });

        ivsPlayer.addEventListener(IVSPlayer.PlayerState.READY, () => {
          console.log("READY");

          //  const seekToTime = Math.max(0, latestBufferedPosition - 1);
          // ivsPlayer.seekTo(seekToTime);
         // ivsPlayer.play();
        });

        ivsPlayer.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
          console.log("ended");
        });

        ivsPlayer.addEventListener(
          IVSPlayer.PlayerEventType.PLAYBACK_BLOCKED,
          () => {
            console.log("player blocked from autoplay");
          }
        );

        return () => {
        //  ivsPlayer.pause();
         // ivsPlayer.detachHTMLVideoElement();
        };
      }
    };

    loadIVSPlayer();
  }, [streamUrl]);

  return (
    <div>
      <video id="video-player" controls />
    </div>
  );
};

export default ivs;
