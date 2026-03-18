import React from 'react';

interface CardProps {
 children: React.ReactNode;
 className?: string;
 variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'glow' | 'feature' | 'pricing';
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
 const baseStyles = 'rounded-2xl transition-all duration-300 ease-out';

 const paddingStyles = {
 none: 'p-0',
 compact: 'p-4',
 default: 'p-6',
 comfortable: 'p-8',
 spacious: 'p-10',
 };

 const variants = {
 // Default — glass card on dark background
 default: 'bg-[var(--surface-subtle)] border border-[var(--border-default)] backdrop-blur-sm',

 // Elevated — slightly brighter surface
 elevated: 'bg-[var(--surface-hover)] border border-white/[0.1] backdrop-blur-sm shadow-lg shadow-black/20',

 // Outlined — minimal with hover effect
 outlined: 'bg-transparent border border-white/[0.1] hover:border-white/[0.2] backdrop-blur-sm',

 // Glass — frosted glass effect
 glass: 'bg-[var(--surface-subtle)] backdrop-blur-xl border border-[var(--border-default)]',

 // Glow — highlighted/featured with blue glow
 glow: 'bg-[rgba(28,71,255,0.06)] border border-[rgba(28,71,255,0.2)] shadow-[0_0_60px_rgba(28,71,255,0.3)]',

 // Feature — for feature cards
 feature: 'bg-[var(--surface-subtle)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.3)]',

 // Pricing — for pricing cards
 pricing: 'bg-[var(--surface-subtle)] border border-white/[0.1] backdrop-blur-sm shadow-xl shadow-black/20',
 };

 const hoverStyles = hover
 ? 'hover:-translate-y-1 hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.3)] cursor-pointer'
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
 return <Component className={`${sizeClass} font-bold text-[var(--text-primary)] ${className}`}>{children}</Component>;
};

interface CardDescriptionProps {
 children: React.ReactNode;
 className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
 return <p className={`text-[16px] leading-relaxed text-[var(--text-supporting)] mt-2 ${className}`}>{children}</p>;
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
 return <div className={`mt-6 pt-4 border-t border-[var(--border-default)] ${className}`}>{children}</div>;
};

// Feature card icon wrapper
interface CardIconProps {
 children: React.ReactNode;
 className?: string;
 variant?: 'default' | 'gradient' | 'outlined';
}

export const CardIcon: React.FC<CardIconProps> = ({ children, className = '', variant = 'gradient' }) => {
 const variants = {
 default: 'bg-[var(--surface-emphasis)] text-[var(--text-secondary)]',
 gradient: 'bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] text-white',
 outlined: 'border border-[var(--border-emphasis)] bg-[var(--surface-subtle)] text-[var(--text-secondary)]',
 };

 return (
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${variants[variant]} ${className}`}>
 {children}
 </div>
 );
};
