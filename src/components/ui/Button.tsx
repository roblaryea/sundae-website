'use client';

import React from 'react';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  target?: never;
  rel?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    fullWidth = false,
  } = props;

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-[var(--navy-deep)]';

  const variants = {
    // Primary — gradient with blue glow
    primary: 'bg-gradient-to-r from-[#0A1E8C] via-[#1C47FF] to-[#3B82F6] text-white shadow-[0_0_30px_rgba(28,71,255,0.3)] hover:shadow-[0_0_50px_rgba(28,71,255,0.4)] hover:-translate-y-0.5 active:translate-y-0',

    // Secondary — subtle glass
    secondary: 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-white/[0.1] hover:bg-white/[0.1] hover:text-[var(--text-primary)] hover:border-white/[0.2] hover:-translate-y-0.5 active:translate-y-0',

    // Outline — clean border on dark
    outline: 'border border-[var(--border-emphasis)] text-[var(--text-secondary)] bg-transparent hover:border-white/[0.3] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]',

    // Outline Light — brighter for dark sections
    'outline-light': 'border border-white/[0.25] text-[var(--text-primary)] bg-transparent hover:bg-[var(--surface-emphasis)] hover:border-white/[0.4] active:bg-[var(--surface-subtle)]',

    // Ghost — subtle
    ghost: 'text-[var(--text-supporting)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',

    // CTA — maximum visibility gradient with glow
    cta: 'bg-gradient-to-r from-[#0A1E8C] via-[#1C47FF] to-[#3B82F6] text-white font-bold shadow-[0_0_40px_rgba(28,71,255,0.35)] hover:shadow-[0_0_60px_rgba(28,71,255,0.5)] hover:-translate-y-1 active:translate-y-0',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm font-semibold gap-1.5',
    md: 'px-6 py-3 text-base font-semibold gap-2',
    lg: 'px-8 py-4 text-lg font-bold gap-2',
    xl: 'px-10 py-5 text-xl font-bold gap-3',
  };

  const disabledStyles = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : '';

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`;

  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={combinedClassName}
        onClick={props.onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void}
        aria-disabled={disabled || undefined}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = 'button' } = props as ButtonAsButton;
  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
