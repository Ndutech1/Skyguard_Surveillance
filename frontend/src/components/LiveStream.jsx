import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import API from '../Utils/axios';

const LiveStream = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [status, setStatus] = useState('⏳ Waiting for stream...');

  // 🔁 Fetch stream URL from backend
  useEffect(() => {
    API.get('/stream/get-url')
      .then((res) => {
        if (res.data?.url) {
          setStreamUrl(res.data.url);
        } else {
          setStatus('❌ No stream URL configured.');
        }
      })
      .catch(() => {
        setStatus('❌ Failed to load stream configuration.');
      });
  }, []);

  // 🎥 Initialize Video.js player
  useEffect(() => {
    if (!streamUrl) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true,
      techOrder: ['html5'],
      sources: [
        {
          src: streamUrl,
          type: streamUrl.endsWith('.m3u8')
            ? 'application/x-mpegURL'
            : 'application/x-rtsp',
        },
      ],
    });

    playerRef.current = player;

    player.ready(() => {
      player.play().catch(() => {
        console.warn('Autoplay failed, user interaction required');
      });
    });

    player.on('playing', () => setStatus('🟢 Live Streaming'));
    player.on('error', () => {
      setStatus('⚠️ Disconnected. Retrying...');
      retryConnect(1);
    });

    return () => player.dispose();
  }, [streamUrl]);

  // 🔁 Retry logic on stream error
  const retryConnect = (attempt) => {
    const delay = Math.min(3000 * attempt, 15000);
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.src({
          src: streamUrl,
          type: streamUrl.endsWith('.m3u8')
            ? 'application/x-mpegURL'
            : 'application/x-rtsp',
        });
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
