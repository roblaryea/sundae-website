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
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const paddingStyles = {
    compact: 'p-6',
    default: 'p-8',
    comfortable: 'p-10',
  };
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700 hover:border-electric-blue dark:hover:border-electric-blue',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-md border border-blue-100 dark:border-gray-700',
  };

  const hoverStyles = hover
    ? 'hover:scale-102 hover:shadow-xl cursor-pointer transform'
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
