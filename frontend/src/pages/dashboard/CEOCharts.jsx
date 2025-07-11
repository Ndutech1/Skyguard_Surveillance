import { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import API from '../../Utils/axios';
import { AuthContext } from '../../context/AuthContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a83279'];

const CEOCharts = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await API.get('/analytics/summary', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSummary(res.data);
    };
    fetchSummary();
  }, []);

  if (!summary) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2>📊 CEO Surveillance Analytics</h2>
      <p><strong>Total Reports:</strong> {summary.totalReports}</p>

      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        {/* Reports by Role */}
        <div style={{ width: 400 }}>
          <h4>Reports by Role</h4>
          <PieChart width={400} height={300}>
            <Pie
              data={summary.reportsByRole.map(r => ({ name: r._id, value: r.count }))}
              cx="50%" cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {summary.reportsByRole.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Reports Over Time */}
        <div style={{ width: 500 }}>
          <h4>Reports Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summary.reportsByDate}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CEOCharts;
