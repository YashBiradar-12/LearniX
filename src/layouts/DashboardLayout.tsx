import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  BookOpen,
  TrendingUp,
  HelpCircle,
  Settings,
  Menu,
  X,
  Brain,
  Sparkles,
  Users,
  Shield,
  ClipboardList,
  LogOut,
  SunMedium,
  MoonStar,
} from 'lucide-react';
import { authService, AuthUser } from '../services/authService';

interface DashboardLayoutProps {
  children: React.ReactNode;
  portal?: 'student' | 'admin';
  user?: AuthUser;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  portal = 'student',
  user,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const studentNavItems = [
    { path: '/student', icon: BarChart3, label: 'Dashboard' },
    { path: '/student/generate-paper', icon: FileText, label: 'Generate Paper' },
    { path: '/student/tests', icon: BookOpen, label: 'My Tests' },
    { path: '/student/performance', icon: TrendingUp, label: 'Performance' },
    { path: '/student/materials', icon: BookOpen, label: 'My Materials' },
    { path: '/student/doubts', icon: HelpCircle, label: 'Who Can Help?' },
    { path: '/student/profile', icon: Settings, label: 'Profile' },
  ];

  const adminNavItems = [
    { path: '/admin', icon: Shield, label: 'Overview' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/reports', icon: ClipboardList, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const navItems = portal === 'admin' ? adminNavItems : studentNavItems;

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const currentUser = user ?? authService.getCurrentUser(portal);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className={`flex h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-transparent text-slate-800'}`}>
      <aside className={`hidden w-72 flex-col border-r ${isDark ? 'border-slate-800 bg-slate-950/90' : 'border-slate-200/80 bg-white/80'} backdrop-blur-xl md:flex`}>
        <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200/80'} p-6`}>
          <Link to={portal === 'admin' ? '/admin' : '/student'} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_12px_32px_rgba(124,58,237,0.24)]">
              <Brain size={22} className="text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {portal === 'admin' ? 'Admin' : 'LEARNIX'}
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-600">
                {portal === 'admin' ? 'Control Center' : 'Platform'}
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-center gap-2 px-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            <Sparkles size={12} />
            Navigation
          </div>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-pill ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-200/80'} p-4`}>
          <div className="mood-ring rounded-2xl p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700">
              {portal === 'admin' ? 'Command view' : 'Ready to practice?'}
            </p>
            <Link
              to={portal === 'admin' ? '/admin' : '/student/generate-paper'}
              className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              {portal === 'admin' ? 'Review priorities' : 'Generate a paper'} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </aside>

      <div className={`fixed left-0 right-0 top-0 z-40 border-b ${isDark ? 'border-slate-800 bg-slate-950/90' : 'border-slate-200/80 bg-white/80'} backdrop-blur-xl md:hidden`}>
        <div className="flex items-center justify-between p-4">
          <Link to={portal === 'admin' ? '/admin' : '/student'} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400">
              <Brain size={18} className="text-white" />
            </div>
            <span className="text-sm font-black text-slate-900">
              {portal === 'admin' ? 'Admin Control' : 'LEARNIX'}
            </span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 bg-white/95 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`nav-pill ${isActive(item.path) ? 'active' : ''}`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      <main className={`flex-1 overflow-y-auto ${isDark ? 'bg-slate-950' : 'bg-slate-50/70'} pt-16 md:pt-0`}>
        <div className={`sticky top-0 z-30 border-b ${isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200/80 bg-white/80'} backdrop-blur-xl`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {portal === 'admin' ? 'Admin portal' : 'Student portal'}
              </p>
              <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentUser?.name || (portal === 'admin' ? 'Admin User' : 'Student User')}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'} transition hover:border-violet-400`}
                aria-label="Toggle theme"
              >
                {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-700"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};
