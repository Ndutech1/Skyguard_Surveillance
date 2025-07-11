import { useEffect, useState } from 'react';
import API from '../Utils/axios';
import { io } from 'socket.io-client';

const PublicTrends = () => {
  const [trends, setTrends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch initial trends
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await API.get('/trends');
        setTrends(res.data);
      } catch (err) {
        console.error('Failed to fetch trends:', err);
      }
    };
    fetchTrends();
  }, []);

  // Setup socket connection
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on('newTrend', (newTrend) => {
      setTrends((prev) => [newTrend, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  // Filter based on search input
  const filtered = trends.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>📈 Latest Surveillance Trends</h2>

      <input
        placeholder="Search trends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: 8, marginBottom: 20, width: '100%' }}
      />

      {filtered.map((trend) => (
        <div key={trend._id} style={{ borderBottom: '1px solid #ccc', marginBottom: 20 }}>
          <h3>{trend.title}</h3>
          <p>{trend.description}</p>
          {trend.imageUrl && (
            <img src={trend.imageUrl} alt="Trend" width="300" />
          )}
          <p>
            <small>
              Uploaded by: {trend.uploadedBy.toUpperCase()} on{' '}
              {new Date(trend.createdAt).toLocaleString()}
            </small>
          </p>
        </div>
      ))}
    </div>
  );
};

export default PublicTrends;
