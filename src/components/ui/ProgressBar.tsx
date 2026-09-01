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
    if (percent < 40) return 'from-red-500 to-red-400';
    if (percent < 70) return 'from-amber-500 to-amber-400';
    return 'from-olive-600 to-olive-500';
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-neutral-900">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-olive-200 ${sizeStyles[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColor(percentage)} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
