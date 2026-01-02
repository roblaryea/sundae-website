import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  // Premium Linear/Notion-style button system with enhanced contrast
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue';
  
  const variants = {
    // Primary - enhanced gradient with better shadow
    primary: 'bg-gradient-to-r from-deep-blue to-electric-blue text-white shadow-lg shadow-electric-blue/30 hover:shadow-xl hover:shadow-electric-blue/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg border border-electric-blue/20',
    
    // Secondary - solid dark with subtle glow
    secondary: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md hover:bg-gray-800 dark:hover:bg-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    
    // Outline - clearer border with better hover
    outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 hover:border-electric-blue hover:text-electric-blue dark:hover:border-electric-blue dark:hover:text-electric-blue hover:bg-electric-blue/5 dark:hover:bg-electric-blue/10',
    
    // Ghost - subtle but visible
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white',
    
    // CTA - maximum visibility for key actions
    cta: 'bg-gradient-to-r from-electric-blue via-blue-500 to-electric-blue text-white font-bold shadow-xl shadow-electric-blue/40 hover:shadow-2xl hover:shadow-electric-blue/50 hover:-translate-y-1 active:translate-y-0 active:shadow-xl border border-white/20 animate-gradient-x',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm font-semibold gap-1.5',
    md: 'px-6 py-3 text-base font-semibold gap-2',
    lg: 'px-8 py-4 text-lg font-bold gap-2',
    xl: 'px-10 py-5 text-xl font-bold gap-3',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';
  
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
