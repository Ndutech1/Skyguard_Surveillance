import { useEffect, useState } from 'react';
import socket from '../socket'; 

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('new_report_alert', (data) => {
      setAlerts((prev) => [data, ...prev]);
    });

    return () => {
        socket.off('new_report_alert'); // Clean up the listener on unmount
    }
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
