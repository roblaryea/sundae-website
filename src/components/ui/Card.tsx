import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient' | 'feature' | 'pricing';
  padding?: 'none' | 'compact' | 'default' | 'comfortable' | 'spacious';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'default',
  hover = false,
  onClick,
}) => {
  // Premium Linear/Notion-style card system with standardized variants
  const baseStyles = 'rounded-2xl transition-all duration-200 ease-out';
  
  const paddingStyles = {
    none: 'p-0',
    compact: 'p-4',
    default: 'p-6',
    comfortable: 'p-8',
    spacious: 'p-10',
  };
  
  const variants = {
    // Default - subtle background with light shadow
    default: 'bg-white dark:bg-gray-800/80 shadow-sm border border-gray-200/60 dark:border-gray-700/50 backdrop-blur-sm',
    
    // Elevated - stronger shadow for emphasis
    elevated: 'bg-white dark:bg-gray-800/90 shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm',
    
    // Outlined - minimal with hover effect
    outlined: 'bg-white/50 dark:bg-gray-800/30 border-2 border-gray-200 dark:border-gray-700 hover:border-electric-blue/50 dark:hover:border-electric-blue/50 backdrop-blur-sm',
    
    // Gradient - blue gradient background
    gradient: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-800/90 dark:to-gray-900/90 shadow-lg shadow-blue-100/30 dark:shadow-black/20 border border-blue-100/50 dark:border-gray-700/50 backdrop-blur-sm',
    
    // Feature - for feature cards with icon
    feature: 'bg-white dark:bg-gray-800/90 shadow-md shadow-gray-100/50 dark:shadow-black/10 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:border-electric-blue/20 dark:hover:border-electric-blue/30',
    
    // Pricing - for pricing cards
    pricing: 'bg-white dark:bg-gray-800/95 shadow-xl shadow-gray-200/60 dark:shadow-black/30 border-2 border-gray-100 dark:border-gray-700/50 backdrop-blur-sm',
  };

  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/30 cursor-pointer'
    : '';

  const interactiveStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${paddingStyles[padding]} ${variants[variant]} ${hoverStyles} ${interactiveStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '', as = 'h3' }) => {
  const Component = as;
  const sizeClass = as === 'h2' ? 'text-2xl' : as === 'h3' ? 'text-xl' : 'text-lg';
  return <Component className={`${sizeClass} font-bold text-gray-900 dark:text-white ${className}`}>{children}</Component>;
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  return <p className={`text-[16px] leading-relaxed text-gray-600 dark:text-gray-300 mt-2 ${className}`}>{children}</p>;
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 ${className}`}>{children}</div>;
};

// Feature card icon wrapper
interface CardIconProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'outlined';
}

export const CardIcon: React.FC<CardIconProps> = ({ children, className = '', variant = 'gradient' }) => {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-700',
    gradient: 'bg-gradient-to-br from-electric-blue to-deep-blue',
    outlined: 'border-2 border-electric-blue bg-electric-blue/10',
  };
  
  return (
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
