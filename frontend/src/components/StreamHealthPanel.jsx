import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const StreamHealthPanel = () => {
  const socket = useContext(SocketContext);
  const [status, setStatus] = useState('Unknown');
  const [startedAt, setStartedAt] = useState(null);
  const [stoppedAt, setStoppedAt] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('streamHealth', (data) => {
      setStatus(data.status);
      if (data.startedAt) setStartedAt(data.startedAt);
      if (data.stoppedAt) setStoppedAt(data.stoppedAt);
    });

    return () => socket.off('streamHealth');
  }, [socket]);

  const formatTime = (ms) =>
    ms ? new Date(ms).toLocaleTimeString() : '—';

  return (
    <div>
      <h3>🩺 Stream Health Monitor</h3>
      <p>Status: {status === 'active' ? '🟢 Active' : '🔴 Stopped'}</p>
      <p>Started At: {formatTime(startedAt)}</p>
      <p>Last Stopped: {formatTime(stoppedAt)}</p>
    </div>
  );
};

export default StreamHealthPanel;
