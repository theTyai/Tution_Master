/**
 * Tution Master — Main App with React Router
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store';

// Pages
import LandingPage    from './pages/LandingPage';
import AuthPage       from './pages/AuthPage';
import DashboardPage  from './pages/DashboardPage';
import CoursesPage    from './pages/CoursesPage';
import CourseDetail   from './pages/CourseDetail';
import LearnPage      from './pages/LearnPage';
import TutorsPage     from './pages/TutorsPage';
import ProfilePage    from './pages/ProfilePage';
import AdminPage      from './pages/AdminPage';
import NotFoundPage   from './pages/NotFoundPage';

// Protected Route wrapper
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, token } = useAuthStore();
  if (!token || !user) return <Navigate to="/auth" replace />;
  if (roles.length && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#141c30', color: '#e8ecf5', border: '1px solid rgba(255,255,255,0.1)' },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public */}
        <Route path="/"              element={<LandingPage />} />
        <Route path="/auth"          element={<AuthPage />} />
        <Route path="/courses"       element={<CoursesPage />} />
        <Route path="/courses/:id"   element={<CourseDetail />} />
        <Route path="/tutors"        element={<TutorsPage />} />

        {/* Protected — Student */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/learn/:courseId/:lessonId?" element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
        <Route path="/profile"   element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Protected — Admin */}
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
