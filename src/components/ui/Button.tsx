import React from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  as?: 'button' | 'span';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  as: ComponentType = 'button',
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-violet-500 via-violet-600 to-cyan-500 text-white shadow-[0_16px_36px_rgba(124,58,237,0.35)] hover:shadow-[0_20px_44px_rgba(34,211,238,0.20)] hover:-translate-y-0.5',
    secondary:
      'bg-white/80 text-slate-900 border border-slate-200/80 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-100 dark:border-slate-700/80 dark:hover:bg-slate-700/80',
    outline:
      'border border-violet-200 bg-violet-500/5 text-violet-700 hover:bg-violet-500/10 dark:border-violet-300/60 dark:text-violet-100',
    ghost:
      'text-violet-700 hover:bg-violet-500/10 dark:text-violet-200',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const commonProps = {
    className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`,
    ...(ComponentType === 'button'
      ? { disabled: disabled || isLoading }
      : { 'data-disabled': disabled || isLoading }),
  };

  if (ComponentType === 'span') {
    return (
      <span {...commonProps} {...props}>
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </span>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
