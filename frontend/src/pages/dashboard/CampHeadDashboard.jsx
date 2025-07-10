import React, { useEffect, useState, useContext } from 'react';
import PDFReportExport from '../../components/PDFReportExport';
import html2pdf from 'html2pdf.js';
import { AuthContext } from '../../context/AuthContext';
import API from '../../Utils/axios';

const CampHeadDashboard = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get('/reports/all', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      }
    };

    fetchReports();
  }, []);

  const handleExportAll = () => {
    const element = document.getElementById('all-reports');
    html2pdf().from(element).save('All_Reports.pdf');
  };

  return (
    <div>
      <h2>Welcome Camp Head ⛺</h2>

      <button onClick={handleExportAll} style={{ marginBottom: 20 }}>
        📥 Export All Reports
      </button>

      <div id="all-reports">
        {reports.map((report) => (
          <div
            key={report._id}
            style={{
              border: '1px solid #ccc',
              padding: 15,
              marginBottom: 15,
              background: '#f9f9f9',
            }}
          >
            <h4>{report.title}</h4>
            <p>{report.description}</p>
            {report.imageUrl && (
              <img
                src={`data:image/png;base64,${report.imageUrl}`}
                alt="Report"
                width="200"
              />
            )}
            <p>
              <strong>Location:</strong>{' '}
              {report.location?.lat}, {report.location?.lng}
            </p>
            <p>
              <strong>Submitted by:</strong> {report.role}
            </p>
            <PDFReportExport report={report} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampHeadDashboard;
