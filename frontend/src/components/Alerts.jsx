import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://skyguard-surveillance.onrender.com'); // Use your backend IP if deployed

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('new_report_alert', (data) => {
      setAlerts((prev) => [data, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h3>🔔 Real-Time Alerts</h3>
      {alerts.map((alert, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: 10, margin: 5 }}>
          <strong>🚨 New Report:</strong> {alert.title} <br />
          <small>By: {alert.createdBy} | {new Date(alert.time).toLocaleTimeString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
