import React, { useEffect, useState } from 'react';
import LiveStream from '../../components/LiveStream';
import Alerts from '../../components/Alerts';
import SetStreamURL from './SetStreamURL';
import API from '../../Utils/axios';

const ITDashboard = () => {
  const [status, setStatus] = useState('🔘 Idle');
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    // Auto-start the stream on IT dashboard mount
    API.post('/stream/start')
      .then(() => {
        setStatus('🟢 Stream Running');
      })
      .catch(() => {
        setStatus('🔴 Stream Failed to Start');
      })
      .finally(() => {
        setStarting(false);
      });
  }, []);

  return (
    <div>
      <h2>
        Welcome IT Staff 👨‍💻{' '}
        <span style={{ fontSize: '0.9rem', color: status.includes('🟢') ? 'green' : 'red' }}>
          {status}
        </span>
      </h2>

      <Alerts />

      {starting ? (
        <p>⏳ Starting stream...</p>
      ) : status.includes('🟢') ? (
        <>
          <LiveStream />
          <hr style={{ margin: '20px 0' }} />
          <SetStreamURL />
        </>
      ) : (
        <>
          <p>⚠️ Stream not active. Try checking your connection or stream config.</p>
          <SetStreamURL />
        </>
      )}
    </div>
  );
};

export default ITDashboard;
