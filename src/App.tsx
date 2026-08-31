import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { GeneratePaper } from './pages/GeneratePaper';
import { Test } from './pages/Test';
import { PerformancePage } from './pages/Performance';
import { Materials } from './pages/Materials';
import { WhoCanHelp } from './pages/WhoCanHelp';
import { MyTests } from './pages/MyTests';
import { Profile } from './pages/Profile';
import { PortalSelection } from './pages/PortalSelection';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminStudents } from './pages/AdminStudents';
import { AdminReports } from './pages/AdminReports';
import { AdminSettings } from './pages/AdminSettings';
import { authService } from './services/authService';

function StudentPortalRoutes() {
  const user = authService.getCurrentUser('student');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout portal="student" user={user}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/generate-paper" element={<GeneratePaper />} />
        <Route path="/test/:paperId" element={<Test />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/doubts" element={<WhoCanHelp />} />
        <Route path="/tests" element={<MyTests />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

function AdminPortalRoutes() {
  const user = authService.getCurrentUser('admin');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout portal="admin" user={user}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/students" element={<AdminStudents />} />
        <Route path="/reports" element={<AdminReports />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortalSelection />} />
        <Route path="/student/*" element={<StudentPortalRoutes />} />
        <Route path="/admin/*" element={<AdminPortalRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
