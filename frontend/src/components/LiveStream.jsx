import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import API from '../Utils/axios'; // Adjust path if needed

const LiveStream = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [status, setStatus] = useState('⏳ Waiting for stream...');

  useEffect(() => {
    API.get('/stream/get-url')
      .then(() => {
        setStreamUrl('http://localhost:8080/hls/skyguard.m3u8'); // Local NGINX stream endpoint
      })
      .catch(() => {
        setStatus('❌ Failed to load stream configuration.');
      });
  }, []);

  useEffect(() => {
    if (!streamUrl) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true,
      techOrder: ['html5'],
      html5: {
        hls: {
          overrideNative: true,
          lowLatencyMode: true,
        }
      },
      sources: [{
        src: streamUrl,
        type: 'application/x-mpegURL',
      }]
    });

    playerRef.current = player;

    player.ready(() => {
      player.play().catch(() => {
        console.warn('Autoplay failed, user interaction required');
      });
    });

    player.on('playing', () => {
      setStatus('🟢 Live Streaming');
    });

    player.on('error', () => {
      setStatus('⚠️ Disconnected. Trying to reconnect...');
      retryConnect(1);
    });

    return () => player.dispose();
  }, [streamUrl]);

  const retryConnect = (attempt) => {
    const delay = Math.min(3000 * attempt, 15000);
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.src({ src: streamUrl, type: 'application/x-mpegURL' });
        playerRef.current.load();
        playerRef.current.play().catch(() => {
          if (attempt < 5) retryConnect(attempt + 1);
        });
      }
    }, delay);
  };

  return (
    <div>
      <h3>🚁 Live Drone Feed</h3>
      <p>{status}</p>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        playsInline
        muted
      />
    </div>
  );
};

export default LiveStream;
