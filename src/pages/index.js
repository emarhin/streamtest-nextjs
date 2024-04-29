import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const initHls = () => {
      if (Hls.isSupported()) {
        var config = {
          autoStartLoad: true,
        };

        const hls = new Hls(config);

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log("video and hls.js are now bound together!");
          video.play();
        });

        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log(
            "manifest loaded, found " + data.levels.length + " quality level"
          );
        });

        hls.loadSource("https://203.161.46.12:8888/mystream/index.m3u8");
        hls.attachMedia(video);

        // Save hls instance to the video element for cleanup
        video.hls = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener("loadedmetadata", function () {
          video.play();
        });
      }
    };

    initHls();

    return () => {
      // Cleanup HLS instance
      const hls = video?.hls;
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} id="video" controls autoPlay muted></video>
    </div>
  );
};

export default VideoPlayer;
