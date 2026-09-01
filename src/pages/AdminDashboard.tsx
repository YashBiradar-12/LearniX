import React, { useMemo } from 'react';
import { Users, BarChart3, ClipboardCheck, Activity, ArrowUpRight } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { authService } from '../services/authService';

export const AdminDashboard: React.FC = () => {
  const currentUser = authService.getCurrentUser('admin');

  const headingName = useMemo(() => currentUser?.name || 'Admin User', [currentUser?.name]);
  const metrics = [
    { label: 'Active students', value: '1,284', icon: Users, tone: 'olive' },
    { label: 'Avg. accuracy', value: '78%', icon: BarChart3, tone: 'olive' },
    { label: 'Assignments reviewed', value: '482', icon: ClipboardCheck, tone: 'olive' },
    { label: 'Engagement score', value: '91%', icon: Activity, tone: 'olive' },
  ];

  const students = [
    { name: 'Student 01', course: 'Physics - Semester 4', score: '78%', status: 'On track' },
    { name: 'Student 02', course: 'Mathematics - Semester 4', score: '84%', status: 'Excellent' },
    { name: 'Student 03', course: 'Chemistry', score: '66%', status: 'Needs support' },
  ];

  return (
    <div className="page-shell">
      <div className="page-max">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-olive-700">Admin Overview</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-olive-900">
            {headingName}'s Command Center
          </h1>
        </div>

        {/* Metrics Grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon }) => (
            <Card key={label} variant="elevated" className="border-olive-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-label mb-3">{label}</p>
                  <p className="text-4xl font-bold text-neutral-900">{value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100 text-olive-700 flex-shrink-0">
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          {/* Student Momentum */}
          <Card variant="elevated" className="border-olive-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-olive-900">Student Momentum</h2>
              <Button variant="secondary" size="sm">
                View all <ArrowUpRight size={16} />
              </Button>
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.name} className="flex items-center justify-between gap-4 rounded-lg border border-olive-200 bg-olive-50 p-4">
                  <div>
                    <p className="font-semibold text-neutral-900">{student.name}</p>
                    <p className="text-sm text-neutral-600">{student.course}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-olive-700">{student.score}</span>
                    <span className="badge-olive text-xs">
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Queue */}
          <Card variant="elevated" className="border-olive-300">
            <h2 className="mb-4 font-serif text-xl font-bold text-olive-900">Action Queue</h2>
            <div className="space-y-3">
              {[
                'Review weak-area interventions',
                'Check newly generated practice papers',
                'Update teacher pattern insights',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-olive-200 bg-olive-50 p-4 text-sm text-neutral-700">
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
