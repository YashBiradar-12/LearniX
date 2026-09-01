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
          <p className="text-label mb-3">Analytics & Reports</p>
          <h1 className="font-serif text-4xl md:text-4xl font-bold text-olive-900">Reports and Analytics</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} variant="elevated" className="border-olive-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-label">{label}</p>
                  <p className="mt-3 text-4xl font-bold text-neutral-900">{value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100 text-olive-700 flex-shrink-0">
                  <Icon size={21} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card variant="elevated" className="border-olive-300">
          <h2 className="mb-6 font-serif text-2xl font-bold text-olive-900">Performance Trend</h2>
          <div className="grid grid-cols-8 items-end gap-3">
            {[35, 42, 58, 63, 72, 78, 88, 85].map((height, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-olive-600 to-olive-400" style={{ height: `${height}px` }} />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
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
