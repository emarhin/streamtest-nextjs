const IVSPackage = window.IVSPlayer;

class PlayerDemo {
  videoElement = document.querySelector("#video-player");

  constructor(stream) {
    if (!IVSPackage.isPlayerSupported) {
      throw new Error("IVS Player is not supported in this browser");
    }

    const player = (this.player = IVSPackage.create({
      serviceWorker: {
        url: "amazon-ivs-service-worker-loader.js",
      },
    }));
    player.attachHTMLVideoElement(this.videoElement);
    this.attachListeners();

    //const versionString = document.querySelector(".version");
    // versionString.innerText = `Amazon IVS Player version ${player.getVersion()}`;

    this.loadAndPlay(stream);
  }

  loadAndPlay(stream) {
    const { player } = this;
    player.setAutoplay(true);
    player.load(stream);
  }

  attachListeners() {
    const { player } = this;

    const { ErrorType, PlayerEventType, PlayerState } = IVSPackage;

    for (let state of Object.values(PlayerState)) {
      player.addEventListener(state, () => {
        console.log(state);
      });
    }

    player.addEventListener(PlayerEventType.INITIALIZED, () => {
      console.log("INITIALIZED");
    });

    player.addEventListener(PlayerEventType.ERROR, (error) => {
      const statusTooManyRequests = 429;
      if (
        error.type === ErrorType.NOT_AVAILABLE &&
        error.code === statusTooManyRequests
      ) {
        console.error("Concurrent-viewer limit reached", error);
      } else {
        console.error("ERROR", error);
      }
    });

    player.addEventListener(PlayerEventType.QUALITY_CHANGED, (quality) => {
      console.log("QUALITY_CHANGED", quality);
    });

    player.addEventListener(PlayerEventType.TEXT_CUE, (cue) => {
      console.log("TEXT_CUE", cue.startTime, cue.text);
    });

    player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
      console.log("Timed metadata", cue.text);
    });
  }
}

function getFormStream() {
  console.log("it is called");
  return "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";
}

const demo = new PlayerDemo(getFormStream());
