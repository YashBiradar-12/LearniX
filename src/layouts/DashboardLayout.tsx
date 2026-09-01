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
  BookMarked,
  Users,
  Shield,
  ClipboardList,
  LogOut,
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
  const location = useLocation();
  const navigate = useNavigate();

  const studentNavItems = [
    { path: '/student', icon: BarChart3, label: 'Dashboard' },
    { path: '/student/generate-paper', icon: FileText, label: 'Generate Paper' },
    { path: '/student/tests', icon: BookOpen, label: 'My Tests' },
    { path: '/student/performance', icon: TrendingUp, label: 'Performance' },
    { path: '/student/materials', icon: BookMarked, label: 'My Materials' },
    { path: '/student/doubts', icon: HelpCircle, label: 'Who Can Help?' },
    { path: '/student/profile', icon: Settings, label: 'Profile' },
  ];

  const adminNavItems = [
    { path: '/admin', icon: BarChart3, label: 'Overview' },
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

  return (
    <div className="flex h-screen bg-olive-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col border-r border-olive-200 bg-white md:flex shadow-sm">
        {/* Logo Section */}
        <div className="border-b border-olive-200 px-6 py-6">
          <Link to={portal === 'admin' ? '/admin' : '/student'} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-olive-600 to-olive-700">
              <BookMarked size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-olive-900">
                {portal === 'admin' ? 'Admin' : 'LEARNIX'}
              </h1>
              <p className="text-xs font-medium text-olive-600">
                {portal === 'admin' ? 'Control Center' : 'Learning'}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
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

        {/* CTA Box */}
        <div className="border-t border-olive-200 px-4 py-4">
          <div className="mood-ring rounded-lg p-4">
            <p className="mb-2 text-xs font-medium text-olive-700">
              {portal === 'admin' ? 'Admin actions' : 'Quick action'}
            </p>
            <Link
              to={portal === 'admin' ? '/admin' : '/student/generate-paper'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-olive-700 hover:text-olive-900 transition-colors"
            >
              {portal === 'admin' ? 'Manage System' : 'Generate Paper'} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* User Section */}
        <div className="border-t border-olive-200 px-4 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-olive-200 bg-white px-3 py-2.5 text-sm font-medium text-olive-700 hover:bg-olive-50 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 border-b border-olive-200 bg-white md:hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <Link to={portal === 'admin' ? '/admin' : '/student'} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-olive-600 to-olive-700">
                <BookMarked size={16} className="text-white" />
              </div>
              <span className="text-sm font-serif font-bold text-olive-900">
                {portal === 'admin' ? 'Admin' : 'LEARNIX'}
              </span>
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="rounded-lg border border-olive-200 bg-white p-2 text-olive-700 hover:bg-olive-50"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="border-t border-olive-200 bg-white px-4 py-4">
              <ul className="space-y-1">
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

        {/* Desktop Header Bar */}
        <div className="sticky top-0 z-30 hidden border-b border-olive-200 bg-white md:block shadow-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-4">
            <div>
              <p className="text-xs font-medium text-olive-600">
                {portal === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </p>
              <h2 className="font-serif text-lg font-bold text-olive-900">
                {currentUser?.name || (portal === 'admin' ? 'Admin User' : 'Student User')}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-olive-200 bg-white px-4 py-2 text-sm font-medium text-olive-700 hover:bg-olive-50 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-olive-100">
          {children}
        </main>
      </div>
    </div>
  );
};
