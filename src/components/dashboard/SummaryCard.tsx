import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: number;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-violet-500/10 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-400/30',
    success: 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/30',
    warning: 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30',
    danger: 'bg-rose-500/10 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-400/30',
  };

  return (
    <Card variant="elevated" className="h-full relative overflow-hidden">
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
          {subtitle && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
          {trend !== undefined && (
            <p className={`mt-3 text-sm font-semibold ${trend >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorClasses[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
};
