import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  LogOut,
  FileText,
  LayoutDashboard,
  AlertCircle,
  Send,
  MapPinned,
  BarChart2,
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      style={{
        width: collapsed ? '60px' : '250px',
        transition: 'width 0.3s',
        background: '#1c1c1c',
        color: '#fff',
        height: '100vh',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer', marginBottom: 20 }}>
        <Menu size={collapsed ? 24 : 20} />
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {user.role === 'pilot' && (
            <>
              <li><Link to="/dashboard/pilot" style={linkStyle}><LayoutDashboard size={18} /> {!collapsed && 'Dashboard'}</Link></li>
              <li><Link to="/dashboard/pilot/report" style={linkStyle}><Send size={18} /> {!collapsed && 'Submit Report'}</Link></li>
            </>
          )}

          {user.role === 'teamlead' && (
            <>
              <li><Link to="/dashboard/teamlead" style={linkStyle}><LayoutDashboard size={18} /> {!collapsed && 'Dashboard'}</Link></li>
              <li><Link to="/dashboard/ceo/logs" style={linkStyle}><AlertCircle size={18} /> {!collapsed && 'Activity Logs'}</Link></li>
            </>
          )}

          {user.role === 'camphead' && (
            <>
              <li><Link to="/dashboard/camphead" style={linkStyle}><LayoutDashboard size={18} /> {!collapsed && 'Dashboard'}</Link></li>
              <li><Link to="/dashboard/ceo/logs" style={linkStyle}><AlertCircle size={18} /> {!collapsed && 'Activity Logs'}</Link></li>
              <li><Link to="/dashboard/camphead/reports" style={linkStyle}><FileText size={18} /> {!collapsed && 'Reports'}</Link></li>
              <li><Link to="/dashboard/camphead/map" style={linkStyle}><MapPinned size={18} /> {!collapsed && 'Reports Map'}</Link></li>
            </>
          )}

          {user.role === 'ceo' && (
            <>
              <li><Link to="/dashboard/ceo" style={linkStyle}><LayoutDashboard size={18} /> {!collapsed && 'Dashboard'}</Link></li>
              <li><Link to="/dashboard/ceo/reports" style={linkStyle}><FileText size={18} /> {!collapsed && 'Reports'}</Link></li>
              <li><Link to="/dashboard/ceo/logs" style={linkStyle}><AlertCircle size={18} /> {!collapsed && 'Activity Logs'}</Link></li>
              <li><Link to="/dashboard/ceo/map" style={linkStyle}><MapPinned size={18} /> {!collapsed && 'Reports Map'}</Link></li>
              <li><Link to="/dashboard/ceo/analytics" style={linkStyle}><BarChart2 size={18} /> {!collapsed && 'Analytics'}</Link></li>
            </>
          )}
        </ul>
      </nav>

      <button onClick={handleLogout} style={logoutBtnStyle}>
        <LogOut size={18} /> {!collapsed && 'Logout'}
      </button>
    </aside>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 0',
};

const logoutBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'red',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  padding: '10px 0',
};

export default Sidebar;
