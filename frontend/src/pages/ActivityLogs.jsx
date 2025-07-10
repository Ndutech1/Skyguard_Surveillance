import { useEffect, useState, useContext } from 'react';
import API from '../Utils/axios';
import { AuthContext } from '../context/AuthContext';

const ActivityLogs = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await API.get('/logs', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setLogs(res.data);
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h3>🗂 Activity Logs</h3>
      {logs.map((log) => (
        <div key={log._id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <p><strong>{log.action}</strong> — {log.details}</p>
          <small>By {log.performedBy.name} ({log.role}) at {new Date(log.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ActivityLogs;
