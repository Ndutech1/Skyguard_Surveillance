import { useEffect, useState, useContext } from 'react';
import API from '../../Utils/axios';
import { AuthContext } from '../../context/AuthContext';

const CEOReports = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await API.get('/reports/all', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setReports(res.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h3>All Submitted Reports</h3>
      {reports.map((rep) => (
        <div key={rep._id} style={{ borderBottom: '1px solid #ccc' }}>
          <h4>{rep.title}</h4>
          <p>{rep.description}</p>
          <small>By: {rep.createdBy.name} ({rep.role})</small>
        </div>
      ))}
    </div>
  );
};

export default CEOReports;
