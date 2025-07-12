import { useState, useEffect } from 'react';
import API from '../../Utils/axios';

const SetStreamURL = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/stream/get-url')
      .then(res => {
        setUrl(res.data.url || '');
      })
      .catch(() => {
        setMessage('⚠️ Failed to fetch current stream URL');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/stream/set-url', { url });
      setMessage('✅ Stream URL updated!');
    } catch {
      setMessage('❌ Failed to update stream URL.');
    }
  };

  return (
    <div>
      <h3>⚙️ Set Live Stream Source (IT Only)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="rtsp://192.168.8.1:8554/live"
          style={{ width: '100%', padding: '8px' }}
        />
        <button type="submit" style={{ marginTop: 10 }}>
          Save URL
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SetStreamURL;
