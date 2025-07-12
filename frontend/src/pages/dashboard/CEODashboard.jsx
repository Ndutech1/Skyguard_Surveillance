import React, { useEffect, useState } from 'react';
import LiveStream from '../../components/LiveStream';
import Alerts from '../../components/Alerts';
import API from '../../Utils/axios'; // Adjust path if needed

const CEODashboard = () => {
    const [streamUrl, setStreamUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/stream/get-url')
            .then(res => {
                setStreamUrl(res.data.url);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch stream URL', err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Welcome CEO 👑</h2>
            <Alerts />
            {loading ? (
                <p>⏳ Loading live feed...</p>
            ) : streamUrl ? (
                <LiveStream streamUrl={streamUrl} />
            ) : (
                <p>⚠️ No live stream URL available. Contact IT Staff.</p>
            )}
        </div>
    );
};

export default CEODashboard;
