//import "@/styles/globals.css";
import Script from "next/script";

//import "@/styles/player.css";

import "@/styles/playerlive.css";

import "video.js/dist/video-js.css";

// City
import "@videojs/themes/dist/city/index.css";

// Fantasy
import "@videojs/themes/dist/fantasy/index.css";

// Forest
import "@videojs/themes/dist/forest/index.css";

// Sea
import "@videojs/themes/dist/sea/index.css";

import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://player.live-video.net/1.28.0/amazon-ivs-videojs-tech.min.js"></script>
        <script src="https://player.live-video.net/1.28.0/amazon-ivs-player.min.js"></script>
      </Head>
      <Component {...pageProps} />{" "}
    </>
  );
}
