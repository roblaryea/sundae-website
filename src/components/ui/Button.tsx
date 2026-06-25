'use client';

import React from 'react';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost' | 'cta' | 'ink';
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

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5C4D] focus-visible:ring-offset-[var(--navy-deep)]';

  const variants = {
    // Primary - warm signature gradient with coral glow (dark); a premium solid
    // ink button on light, where the coral gradient read hot/generic on paper.
    primary: 'bg-gradient-to-r from-[#E9A24A] via-[#FF5C4D] to-[#E03E48] text-white shadow-[0_10px_30px_-10px_rgba(255,92,77,0.5)] hover:shadow-[0_16px_40px_-10px_rgba(255,92,77,0.65)] hover:-translate-y-0.5 active:translate-y-0 [html.light_&]:bg-none [html.light_&]:bg-[var(--ink)] [html.light_&]:text-white [html.light_&]:shadow-[0_14px_30px_-10px_rgba(26,20,15,0.45)] [html.light_&]:hover:shadow-[0_20px_44px_-12px_rgba(26,20,15,0.55)]',

    // Secondary - subtle glass
    secondary: 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-emphasis)] hover:text-[var(--text-primary)] hover:border-[var(--border-emphasis)] hover:-translate-y-0.5 active:translate-y-0',

    // Outline - clean border on dark
    outline: 'border border-[var(--border-emphasis)] text-[var(--text-secondary)] bg-transparent hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]',

    // Outline Light - brighter for dark sections
    'outline-light': 'border border-[var(--border-emphasis)] text-[var(--text-primary)] bg-transparent hover:bg-[var(--surface-emphasis)] hover:border-[var(--text-muted)] active:bg-[var(--surface-subtle)]',

    // Ghost - subtle
    ghost: 'text-[var(--text-supporting)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',

    // CTA - warm signature gradient with coral glow (dark); solid ink on light.
    cta: 'bg-gradient-to-r from-[#E9A24A] via-[#FF5C4D] to-[#E03E48] text-white font-bold shadow-[0_12px_40px_-8px_rgba(255,92,77,0.5)] hover:shadow-[0_18px_50px_-8px_rgba(255,92,77,0.62)] hover:-translate-y-1 active:translate-y-0 [html.light_&]:bg-none [html.light_&]:bg-[var(--ink)] [html.light_&]:text-white [html.light_&]:shadow-[0_14px_32px_-10px_rgba(26,20,15,0.46)] [html.light_&]:hover:shadow-[0_22px_48px_-12px_rgba(26,20,15,0.56)]',

    // Ink - solid warm-near-black; for primary actions placed on bright warm surfaces (closer)
    ink: 'bg-[var(--ink)] text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.55)] hover:-translate-y-1 active:translate-y-0',
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
