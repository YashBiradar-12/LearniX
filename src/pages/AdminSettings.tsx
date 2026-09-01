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
          <p className="text-label mb-3">System Configuration</p>
          <h1 className="font-serif text-4xl md:text-4xl font-bold text-olive-900">Portal Settings</h1>
        </div>

        <Card variant="elevated" className="border-olive-300">
          <div className="space-y-3">
            {settings.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg border border-olive-200 bg-olive-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-olive-200 text-olive-700">
                    <Icon size={18} />
                  </div>
                  <span className="font-semibold text-neutral-900">{label}</span>
                </div>
                <button
                  className={`flex h-6 w-11 items-center rounded-full p-1 transition-all ${
                    active ? 'justify-end bg-olive-600' : 'justify-start bg-neutral-300'
                  }`}
                >
                  <span className="h-4 w-4 rounded-full bg-white" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
