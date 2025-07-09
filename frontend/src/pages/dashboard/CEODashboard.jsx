import React from 'react';
import LiveStream from '../../components/LiveStream';
import Alerts from '../../components/Alerts';

const CEODashboard = () => {
    const streamUrl = "http://192.168.8.100:8080/stream.mjpeg";

    return (
        <div>
            <h2>Welcome CEO 👑</h2>
            <Alerts />
            <LiveStream streamUrl={streamUrl} />
        </div>
    );
};

export default CEODashboard;
