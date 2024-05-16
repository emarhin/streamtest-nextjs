import videojs from 'video.js';
import Hls from 'hls.js';

const Tech = videojs.getTech('Tech');

class HlsjsTech extends Tech {
    constructor(options, ready) {
        super(options, ready);

        this.hls = new Hls(options);

        // Forward HLS.js events to Video.js
        ['MEDIA_ATTACHED', 'MANIFEST_PARSED', 'ERROR', 'FRAG_LOADED', 'FRAG_PARSING_DATA'].forEach(eventName => {
            this.hls.on(Hls.Events[eventName], (event, data) => {
                this.trigger(event, data);
            });
        });
    }

    createEl() {
        this.el_ = super.createEl('video');
        return this.el_;
    }

    src(source) {
        if (source) {
            this.hls.loadSource(source.src);
            this.hls.attachMedia(this.el_);
        }
    }

    currentSrc() {
        return this.el_.currentSrc;
    }

    dispose() {
        if (this.hls) {
            this.hls.destroy();
        }
        super.dispose();
    }
}

HlsjsTech.isSupported = function() {
    return Hls.isSupported();
};

// Register HLS.js tech with Video.js
videojs.registerTech('HlsjsTech', HlsjsTech);

export default HlsjsTech;

