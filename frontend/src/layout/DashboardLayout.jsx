import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: 20, flex: 1 }}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
