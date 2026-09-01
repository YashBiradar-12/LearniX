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
    primary: 'bg-olive-100 text-olive-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
  };

  const trendColor = {
    positive: 'text-emerald-700',
    negative: 'text-rose-700',
  };

  return (
    <Card variant="elevated" className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-label mb-3">{title}</p>
          <p className="text-4xl font-bold text-neutral-900 mb-2">{value}</p>
          {subtitle && <p className="text-sm text-neutral-600">{subtitle}</p>}
          {trend !== undefined && (
            <p className={`mt-3 text-sm font-semibold flex items-center gap-1 ${trend >= 0 ? trendColor.positive : trendColor.negative}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};
