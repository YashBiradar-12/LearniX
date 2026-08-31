import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
}) => {
  const percentage = (value / max) * 100;

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3',
  };

  const getColor = (percent: number) => {
    if (percent < 40) return 'from-rose-500 to-rose-400';
    if (percent < 70) return 'from-amber-400 to-yellow-300';
    return 'from-emerald-400 to-cyan-400';
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80 ${sizeStyles[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColor(percentage)} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
