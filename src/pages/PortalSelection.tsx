import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookMarked, GraduationCap, ArrowRight, Mail, Lock } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { authService, PortalRole } from '../services/authService';

export const PortalSelection: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<PortalRole>('student');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user = await authService.login({
      role: mode,
      name: form.name || (mode === 'student' ? 'Student User' : 'Admin User'),
      email: form.email || (mode === 'student' ? 'student@learnix.com' : 'admin@learnix.com'),
      password: form.password || (mode === 'student' ? 'student123' : 'admin123'),
    });

    if (user.role === 'student') {
      navigate('/student');
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="page-shell flex items-center justify-center min-h-screen bg-gradient-to-br from-olive-100 via-warm-white to-olive-50">
      <div className="page-max w-full max-w-5xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-olive-300 bg-olive-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-olive-700">
            <BookMarked size={16} />
            Smart Learning Platform
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-olive-900 mb-4">
            Welcome to LEARNIX
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-700">
            Sign in to access your personalized learning portal. Choose your role to continue.
          </p>
        </div>

        {/* Portal Selection */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode('student')}
            className={`card-base text-left cursor-pointer transform transition-all duration-200 hover:shadow-md ${
              mode === 'student'
                ? 'border-olive-600 bg-olive-50 ring-2 ring-olive-600'
                : 'border-olive-200 hover:border-olive-300'
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-olive-600 to-olive-700">
              <GraduationCap className="text-white" size={24} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-olive-700">Student</p>
            <h2 className="mt-2 text-2xl font-serif font-bold text-olive-900">Student Portal</h2>
            <p className="mt-2 text-sm text-neutral-600">Access your courses, tests, and learning materials</p>
          </button>

          <button
            type="button"
            onClick={() => setMode('admin')}
            className={`card-base text-left cursor-pointer transform transition-all duration-200 hover:shadow-md ${
              mode === 'admin'
                ? 'border-olive-600 bg-olive-50 ring-2 ring-olive-600'
                : 'border-olive-200 hover:border-olive-300'
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-olive-700 to-olive-800">
              <BookMarked className="text-white" size={24} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-olive-700">Admin</p>
            <h2 className="mt-2 text-2xl font-serif font-bold text-olive-900">Admin Portal</h2>
            <p className="mt-2 text-sm text-neutral-600">Manage students, tests, reports, and settings</p>
          </button>
        </div>

        {/* Login Form */}
        <Card variant="elevated" className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Full Name</label>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder={mode === 'student' ? 'Enter your full name' : 'Enter admin name'}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-3 top-3 text-neutral-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder={mode === 'student' ? 'student@learnix.com' : 'admin@learnix.com'}
                  className="form-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-3 top-3 text-neutral-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="Enter your password"
                  className="form-input pl-10"
                />
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" className="gap-2 mt-8">
              <span>Sign In</span>
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* Helper Text */}
          <p className="mt-6 text-center text-sm text-neutral-600">
            {mode === 'student'
              ? 'Demo: Use student@learnix.com / student123'
              : 'Demo: Use admin@learnix.com / admin123'}
          </p>
        </Card>
      </div>
    </div>
  );
};
