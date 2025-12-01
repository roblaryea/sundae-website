import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'compact' | 'default' | 'comfortable';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'default',
  hover = false,
}) => {
  // Premium Linear/Notion-style card system
  const baseStyles = 'rounded-2xl transition-all duration-200 ease-out';
  
  const paddingStyles = {
    compact: 'p-5',
    default: 'p-6',
    comfortable: 'p-8',
  };
  
  const variants = {
    default: 'bg-white dark:bg-gray-800/80 shadow-sm border border-gray-200/60 dark:border-gray-700/50 backdrop-blur-sm',
    elevated: 'bg-white dark:bg-gray-800/90 shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm',
    outlined: 'bg-white/50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 hover:border-electric-blue/50 dark:hover:border-electric-blue/50 backdrop-blur-sm',
    gradient: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-800/90 dark:to-gray-900/90 shadow-lg shadow-blue-100/30 dark:shadow-black/20 border border-blue-100/50 dark:border-gray-700/50 backdrop-blur-sm',
  };

  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/30 cursor-pointer'
    : '';

  return (
    <div className={`${baseStyles} ${paddingStyles[padding]} ${variants[variant]} ${hoverStyles} ${className}`}>
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
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return <h3 className={`card-title text-deep-slate dark:text-white ${className}`}>{children}</h3>;
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  return <p className={`card-description text-gray-600 dark:text-gray-300 mt-2 ${className}`}>{children}</p>;
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
