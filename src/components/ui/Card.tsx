import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default:
      'glass-card rounded-3xl p-6',
    elevated:
      'glass-card rounded-3xl p-6 hover:-translate-y-0.5 hover:border-violet-300/70 transition-all duration-300',
    bordered:
      'soft-card rounded-3xl p-6 border border-violet-200 bg-gradient-to-br from-violet-50 to-cyan-50',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
