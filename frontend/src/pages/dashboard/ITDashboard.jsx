import React, { useEffect, useState } from 'react';
import LiveStream from '../../components/LiveStream';
import Alerts from '../../components/Alerts';
import API from '../../Utils/axios'; // Adjust path if needed

const ITDashboard = () => {
    const [streamUrl, setStreamUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/stream/get-url') // Change base URL if deployed
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
            <h2>Welcome IT Staff 👨‍💻</h2>
            <Alerts />
            {loading ? (
                <p>⏳ Loading stream URL...</p>
            ) : streamUrl ? (
                <LiveStream streamUrl={streamUrl} />
            ) : (
                <p>⚠️ No stream URL configured. Please set it first.</p>
            )}
        </div>
    );
};

export default ITDashboard;
