import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  // Premium Linear/Notion-style button system
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue';
  
  const variants = {
    primary: 'bg-gradient-to-r from-deep-blue to-electric-blue text-white shadow-md shadow-electric-blue/25 hover:shadow-lg hover:shadow-electric-blue/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md',
    secondary: 'bg-gray-900 dark:bg-gray-700 text-white shadow-sm hover:bg-gray-800 dark:hover:bg-gray-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 hover:border-electric-blue hover:text-electric-blue dark:hover:border-electric-blue dark:hover:text-electric-blue hover:bg-electric-blue/5 dark:hover:bg-electric-blue/10',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm font-semibold',
    md: 'px-6 py-3 text-base font-semibold',
    lg: 'px-8 py-4 text-lg font-bold',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
