import React from 'react';
import { Card, Button } from '../components/ui';
import { ArrowUpRight, Search, Users } from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const students = [
    { name: 'Student 01', className: 'Physics - Semester 4', score: '78%', status: 'On track' },
    { name: 'Student 02', className: 'Mathematics - Semester 4', score: '84%', status: 'Excellent' },
    { name: 'Student 03', className: 'Chemistry', score: '66%', status: 'Needs support' },
    { name: 'Student 04', className: 'Biology', score: '89%', status: 'Strong' },
  ];

  return (
    <div className="page-shell">
      <div className="page-max space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-200">Student management</p>
            <h1 className="text-3xl text-slate-900 dark:text-white md:text-4xl">Students overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2">
              <Search size={16} /> Search
            </Button>
            <Button size="sm" className="gap-2">
              Add student <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: 'Active learners', value: '1,284' },
            { label: 'High performers', value: '324' },
            { label: 'At risk', value: '41' },
          ].map((stat) => (
            <Card key={stat.label} variant="elevated" className="rounded-[24px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-600 dark:text-violet-200">
                  <Users size={20} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card variant="elevated" className="rounded-[28px]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl text-slate-900 dark:text-white">Student list</h2>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Updated today</span>
          </div>

          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.name} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{student.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{student.className}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-violet-600 dark:text-cyan-200">{student.score}</span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200">
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
