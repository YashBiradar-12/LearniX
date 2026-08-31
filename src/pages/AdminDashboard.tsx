import React, { useMemo } from 'react';
import { Users, BarChart3, ClipboardCheck, Activity, ArrowUpRight } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { authService } from '../services/authService';

export const AdminDashboard: React.FC = () => {
  const currentUser = authService.getCurrentUser('admin');

  const headingName = useMemo(() => currentUser?.name || 'Admin User', [currentUser?.name]);
  const metrics = [
    { label: 'Active students', value: '1,284', icon: Users, tone: 'violet' },
    { label: 'Avg. accuracy', value: '78%', icon: BarChart3, tone: 'cyan' },
    { label: 'Assignments reviewed', value: '482', icon: ClipboardCheck, tone: 'emerald' },
    { label: 'Engagement score', value: '91%', icon: Activity, tone: 'amber' },
  ];

  const students = [
    { name: 'Student 01', course: 'Physics - Semester 4', score: '78%', status: 'On track' },
    { name: 'Student 02', course: 'Mathematics - Semester 4', score: '84%', status: 'Excellent' },
    { name: 'Student 03', course: 'Chemistry', score: '66%', status: 'Needs support' },
  ];

  return (
    <div className="page-shell">
      <div className="page-max">
        <div className="mb-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">Admin overview</p>
          <h1 className="text-3xl text-slate-900 dark:text-white md:text-5xl">{headingName}'s command center</h1>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon, tone }) => (
            <Card key={label} variant="elevated" className="relative overflow-hidden rounded-[24px]">
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  tone === 'violet' ? 'bg-violet-500/15 text-violet-200' :
                  tone === 'cyan' ? 'bg-cyan-500/15 text-cyan-200' :
                  tone === 'emerald' ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'
                }`}>
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <Card variant="elevated" className="rounded-[28px]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 dark:text-white">Student momentum</h2>
              <Button variant="secondary" size="sm">
                View all <ArrowUpRight size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.name} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{student.course}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-cyan-200">{student.score}</span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="elevated" className="rounded-[28px]">
            <h2 className="mb-5 text-2xl text-slate-900 dark:text-white">Action queue</h2>
            <div className="space-y-4">
              {[
                'Review weak-area interventions',
                'Check newly generated practice papers',
                'Update teacher pattern insights',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
