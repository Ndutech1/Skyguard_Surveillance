import { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
});

const ReportsMap = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/reports/all', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setReports(res.data.filter(r => r.location?.lat && r.location?.lng));
            } catch (error) {
                // Handle error if needed
            }
        };
        fetchReports();
    }, [user.token]);

    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <h3>📍 Surveillance Reports Map</h3>
            <MapContainer
                center={[9.082, 8.6753]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {reports.map(report => (
                    <Marker
                        key={report._id}
                        position={[report.location.lat, report.location.lng]}
                        icon={customIcon}
                    >
                        <Popup>
                            <strong>{report.title}</strong>
                            <br />
                            {report.description}
                            <br />
                            {report.imageUrl && (
                                <img
                                    src={`data:image/png;base64,${report.imageUrl}`}
                                    alt="Report"
                                    style={{ width: '100%', marginTop: 8 }}
                                />
                            )}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ReportsMap;
