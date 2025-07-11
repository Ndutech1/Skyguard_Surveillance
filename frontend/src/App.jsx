import { Routes, Route } from 'react-router-dom';

import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleRedirect from './components/RoleRedirect';
import ProtectedRoute from './components/ProtectedRoute';

import PilotDashboard from './pages/dashboard/PilotDashboard';
import ITDashboard from './pages/dashboard/ITDashboard';
import TeamLeadDashboard from './pages/dashboard/TeamLeadDashboard';
import CampHeadDashboard from './pages/dashboard/CampHeadDashboard';
import CEODashboard from './pages/dashboard/CEODashboard';
import SubmitReport from './pages/dashboard/SubmitReport';
import CEOReports from './pages/dashboard/CEOReports';
import ActivityLogs from './pages/ActivityLogs';
import Unauthorized from './pages/Unauthorized';
import ReportsMap from './pages/dashboard/ReportsMap';
import CEOCharts from './pages/dashboard/CEOCharts';
import PublicTrends from './pages/PublicTrends';

import DashboardLayout from './layout/DashboardLayout';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<RoleRedirect />} />
      <Route path="/trends" element={<PublicTrends />} />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Pilot Routes */}
      <Route
        path="/dashboard/pilot"
        element={
          <ProtectedRoute allowedRoles={['pilot']}>
            <DashboardLayout>
              <PilotDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/pilot/report"
        element={
          <ProtectedRoute allowedRoles={['pilot']}>
            <DashboardLayout>
              <SubmitReport />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* IT Route */}
      <Route
        path="/dashboard/it"
        element={
          <ProtectedRoute allowedRoles={['it']}>
            <ITDashboard />
          </ProtectedRoute>
        }
      />

      {/* Team Lead Route */}
      <Route
        path="/dashboard/teamlead"
        element={
          <ProtectedRoute allowedRoles={['teamlead']}>
            <TeamLeadDashboard />
          </ProtectedRoute>
        }
      />

      {/* Camp Head Route */}
      <Route
        path="/dashboard/camphead"
        element={
          <ProtectedRoute allowedRoles={['camphead']}>
            <CampHeadDashboard />
          </ProtectedRoute>
        }
      />

      {/* CEO Routes */}
      <Route
        path="/dashboard/ceo"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <DashboardLayout>
              <CEODashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ceo/reports"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <DashboardLayout>
              <CEOReports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ceo/logs"
        element={
          <ProtectedRoute allowedRoles={['ceo', 'teamlead', 'camphead']}>
            <DashboardLayout>
              <ActivityLogs />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ceo/map"
        element={
          <ProtectedRoute allowedRoles={['ceo', 'teamlead', 'camphead']}>
            <DashboardLayout>
              <ReportsMap />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ceo/submit-report"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <DashboardLayout>
              <SubmitReport />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ceo/reports/:reportId"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <DashboardLayout>
              <CEOReports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ceo/reports/:reportId/map"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <DashboardLayout>
              <ReportsMap />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route 
      path="/dashboard/ceo/analytics"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <DashboardLayout>
              <CEOCharts />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="./pages/UploadTrend"
        element={
          <ProtectedRoute allowedRoles={['ceo', 'teamlead']}>
            <DashboardLayout>
              <PublicTrends />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;
