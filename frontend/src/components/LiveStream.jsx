import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const LiveStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true,
      sources: [{
        src: 'http://<your_PC_ip>:8080/hls/skyguard.m3u8',
        type: 'application/x-mpegURL',
      }]
    });

    return () => player.dispose();
  }, []);

  return (
    <div>
      <h3>Live Drone Feed</h3>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default LiveStream;
