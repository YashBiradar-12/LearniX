import React from 'react';
import { Card } from '../components/ui';
import { BarChart3, TrendingUp, ClipboardCheck } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const stats = [
    { label: 'Average score', value: '78.4%', icon: BarChart3 },
    { label: 'Growth', value: '+12.8%', icon: TrendingUp },
    { label: 'Reviewed papers', value: '482', icon: ClipboardCheck },
  ];

  return (
    <div className="page-shell">
      <div className="page-max space-y-8">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-200">Insights</p>
          <h1 className="text-3xl text-slate-900 dark:text-white md:text-4xl">Reports and analytics</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} variant="elevated" className="rounded-[24px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-200">
                  <Icon size={21} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card variant="elevated" className="rounded-[28px]">
          <h2 className="mb-6 text-2xl text-slate-900 dark:text-white">Performance trend</h2>
          <div className="grid grid-cols-6 items-end gap-3">
            {[35, 42, 58, 63, 72, 78, 88, 85].map((height, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-violet-500 to-cyan-400" style={{ height: `${height}px` }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][index]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
