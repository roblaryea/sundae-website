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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue';
  
  const variants = {
    primary: 'bg-gradient-to-r from-deep-blue to-electric-blue text-white hover:shadow-xl hover:scale-105 shadow-lg hover:from-electric-blue hover:to-deep-blue active:scale-100',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg focus:ring-gray-900',
    outline: 'border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white hover:shadow-lg focus:ring-electric-blue',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
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
