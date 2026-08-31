import React from 'react';
import { Card, Button } from '../components/ui';
import { Bell, ShieldCheck, SlidersHorizontal } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const settings = [
    { label: 'Notifications', icon: Bell, active: true },
    { label: 'Access control', icon: ShieldCheck, active: true },
    { label: 'Custom reports', icon: SlidersHorizontal, active: false },
  ];

  return (
    <div className="page-shell">
      <div className="page-max space-y-8">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-200">Configuration</p>
          <h1 className="text-3xl text-slate-900 dark:text-white md:text-4xl">Portal settings</h1>
        </div>

        <Card variant="elevated" className="rounded-[28px]">
          <div className="space-y-4">
            {settings.map(({ label, icon: Icon, active }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-200">
                    <Icon size={18} />
                  </div>
                  <span className="text-base font-semibold text-slate-800 dark:text-slate-200">{label}</span>
                </div>
                <button className={`flex h-7 w-12 items-center rounded-full p-1 transition-all ${active ? 'justify-end bg-violet-500' : 'justify-start bg-slate-300 dark:bg-slate-700'}`}>
                  <span className="h-5 w-5 rounded-full bg-white" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};
