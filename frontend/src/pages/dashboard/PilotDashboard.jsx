import React from 'react';
import LiveStream from '../../components/LiveStream';
import PDFReportExport from '../../components/PDFReportExport';
import html2pdf from 'html2pdf.js'; // ✅ import this

// Example reports array for demonstration
const reports = [
  {
    _id: '1',
    title: 'Report 1',
    description: 'This is a sample report',
    createdAt: new Date(),
    role: 'pilot',
    imageUrl: null,
    location: { lat: 8.0, lng: 7.0 },
  },
  {
    _id: '2',
    title: 'Report 2',
    description: 'Another test report',
    createdAt: new Date(),
    role: 'pilot',
    imageUrl: null,
    location: { lat: 8.0, lng: 6.0 },
  },
];

const PilotDashboard = () => {
  const streamUrl = 'http://192.168.8.100:8080/stream.mjpeg';

  const handleExportAll = () => {
    html2pdf().from(document.getElementById('all-reports')).save('all_reports.pdf');
  };

  return (
    <div>
      <h2>Welcome Drone Pilot!</h2>
      <LiveStream streamUrl={streamUrl} />

      <div style={{ marginTop: 30 }}>
        <button onClick={handleExportAll}>📥 Export All Reports</button>

        <div id="all-reports">
          {reports.map((report) => (
            <div
              key={report._id}
              style={{
                border: '1px solid #ccc',
                padding: 15,
                margin: '10px 0',
              }}
            >
              <h4>{report.title}</h4>
              <p>{report.description}</p>
              <PDFReportExport report={report} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PilotDashboard;
