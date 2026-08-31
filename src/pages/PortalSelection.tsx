import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, GraduationCap, ArrowRight, Mail, Lock } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { authService, PortalRole } from '../services/authService';

export const PortalSelection: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<PortalRole>('student');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const user = authService.login({
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
    <div className="page-shell flex items-center justify-center">
      <div className="page-max max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-violet-700 dark:border-violet-400/30 dark:text-violet-200">
            LEARNIX
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white md:text-6xl">
            Welcome back
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Sign in to your student or admin portal to continue.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode('student')}
            className={`rounded-[24px] border p-5 text-left transition ${mode === 'student' ? 'border-violet-400 bg-violet-500/10' : 'border-slate-200 bg-white/80'}`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_14px_34px_rgba(139,92,246,0.35)]">
              <GraduationCap className="text-white" size={22} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">Student</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Student portal</h2>
          </button>

          <button
            type="button"
            onClick={() => setMode('admin')}
            className={`rounded-[24px] border p-5 text-left transition ${mode === 'admin' ? 'border-cyan-400 bg-cyan-500/10' : 'border-slate-200 bg-white/80'}`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 shadow-[0_14px_34px_rgba(34,211,238,0.25)]">
              <ShieldCheck className="text-white" size={22} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">Admin</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Admin portal</h2>
          </button>
        </div>

        <Card variant="elevated" className="rounded-[28px] p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder={mode === 'student' ? 'Enter your name' : 'Enter admin name'}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <Mail size={16} className="pointer-events-none absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder={mode === 'student' ? 'student@learnix.com' : 'admin@learnix.com'}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder={mode === 'student' ? 'student123' : 'admin123'}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-violet-400"
                />
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" className="justify-center gap-2">
              <span>Continue</span>
              <ArrowRight size={18} />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
