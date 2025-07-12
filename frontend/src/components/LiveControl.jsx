import { useState } from 'react';
import API from '../Utils/axios';

const LiveControl = () => {
  const [status, setStatus] = useState('Idle');

  const startStream = async () => {
    try {
      await API.post('/stream/start');
      setStatus('🔴 Streaming...');
    } catch (err) {
      console.error('Start Error:', err);
      setStatus('❌ Failed to start');
    }
  };

  const stopStream = async () => {
    try {
      await API.post('/stream/stop');
      setStatus('🛑 Stopped');
    } catch (err) {
      console.error('Stop Error:', err);
      setStatus('❌ Failed to stop');
    }
  };

  return (
    <div className="p-4 rounded shadow bg-white max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-3">🎮 Live Stream Control</h3>
      <p className="mb-4">Status: <span className="font-bold">{status}</span></p>
      <div className="flex gap-4">
        <button onClick={startStream} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          ▶️ Start Stream
        </button>
        <button onClick={stopStream} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
          ⏹ Stop Stream
        </button>
      </div>
    </div>
  );
};

export default LiveControl;
