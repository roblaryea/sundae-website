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

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400';

  const variants = {
    // Primary - solid dark
    primary: 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg',

    // Secondary - lighter
    secondary: 'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',

    // Outline - clean border
    outline: 'border-2 border-slate-300 text-slate-700 bg-white hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50',

    // Outline Light - for use on dark backgrounds
    'outline-light': 'border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 active:bg-white/5',

    // Ghost - subtle
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',

    // CTA - maximum visibility
    cta: 'bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/30 hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0 active:shadow-xl',
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
