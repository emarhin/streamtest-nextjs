import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";

import "@videojs/http-streaming";

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const player = playerRef.current;

        let hlssrc = {
            src: "http://localhost:8888/mystream/index.m3u8",
            type: "application/x-mpegURL",
        };

        if (videoElement && !player) {
            // Initialize Video.js
            const playerInstance = videojs(videoElement, {
               // html5: {
                 //   vhs: {
                   //     overrideNative: true,
                   // },
                   // nativeAudioTracks: false,
                   // nativeVideoTracks: false,
                //},
                autoplay: true,
                bigPlayButton: false,
                controls: true,
                fluid: true,
                liveui: true,
                mute: true,
                preload: "auto",
             //   techorder: ["html5"],
                bigplaybutton: false,
                sources: [hlssrc],
                controlBar: {
                    playToggle: true,
                    volumePanel: true,
                    pictureInPictureToggle: true,
                    progressControl: {
                        seekBar: true,
                    },
                    currentTimeDisplay: true,
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: true,
                    playbackRateMenuButton: true,

                },
            });

            playerRef.current = playerInstance;

            // Get the FullscreenToggle button
            const fullscreenButton =
                playerInstance.controlBar.getChild("FullscreenToggle");

            // Get the index of FullscreenToggle in the control bar
            const index = playerInstance.controlBar
                .children()
                .indexOf(fullscreenButton);

            // Add a custom button before the FullscreenToggle button
            const customButton = playerInstance.controlBar.addChild(
                "button",
                {},
                index
            );

            // Customize the button
            customButton.el().innerHTML =
                "<span class='heart-emoji'>&#10084;&#65039;</span>";

            // Add click event listener to the custom button
            customButton.on("click", () => {
                alert("Hello");
            });
        }

        return () => {
            // Dispose Video.js player on unmount
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [src]);

    return (
        <div data-vjs-player>
            <video
                ref={videoRef}
                className="video-js"
                poster="//vjs.zencdn.net/v/oceans.png"
            />
            <LiveIndicator />
        </div>
    );
};

export default VideoPlayer;

const LiveIndicator = () => {
    return <div className="live-indicator">Live</div>;
};
