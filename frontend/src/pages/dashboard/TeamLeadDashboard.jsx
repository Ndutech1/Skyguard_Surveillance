import LiveStream from '../../components/LiveStream';

const TeamLeadDashboard = () => {
  const streamUrl = "http://192.168.8.100:8080/stream.mjpeg";

  return (
    <div>
      <h2>Team Lead Control Panel</h2>
      <LiveStream streamUrl={streamUrl} />
    </div>
  );
};

export default TeamLeadDashboard;
