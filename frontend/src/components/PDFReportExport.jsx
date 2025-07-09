import html2pdf from 'html2pdf.js';

const PDFReportExport = ({ report }) => {
  const handleDownload = () => {
    const content = document.getElementById(`report-${report._id}`);
    html2pdf().from(content).save(`${report.title}_report.pdf`);
  };

  return (
    <>
      <div id={`report-${report._id}`} style={{ display: 'none' }}>
        <h2>{report.title}</h2>
        <p>{report.description}</p>
        {report.imageUrl && (
          <img
            src={`data:image/png;base64,${report.imageUrl}`}
            alt="report"
            width="300"
          />
        )}
        <p><strong>Submitted by:</strong> {report.role}</p>
        <p><strong>Location:</strong> Lat {report.location?.lat}, Lng {report.location?.lng}</p>
        <p><strong>Time:</strong> {new Date(report.createdAt).toLocaleString()}</p>
      </div>

      <button onClick={handleDownload}>📥 Export PDF</button>
    </>
  );
};

export default PDFReportExport;
