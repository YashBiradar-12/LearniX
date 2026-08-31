import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-violet-500/10 text-violet-700 border border-violet-200 dark:bg-violet-500/15 dark:text-violet-100 dark:border-violet-400/30',
    secondary: 'bg-slate-200/80 text-slate-700 border border-slate-300 dark:bg-slate-700/70 dark:text-slate-200 dark:border-slate-500/40',
    success: 'bg-emerald-500/10 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-100 dark:border-emerald-400/30',
    warning: 'bg-amber-500/10 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:border-amber-400/30',
    danger: 'bg-rose-500/10 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-100 dark:border-rose-400/30',
    info: 'bg-cyan-500/10 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-100 dark:border-cyan-400/30',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[10px] tracking-wide uppercase',
    md: 'px-3 py-1.5 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
