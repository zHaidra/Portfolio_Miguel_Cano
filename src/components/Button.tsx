import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-control transition-colors duration-200 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-[#06080C] font-semibold hover:bg-accent-soft',
  secondary: 'border border-line-strong bg-raised text-ink hover:border-subtle hover:bg-[#1d2229]',
  ghost: 'text-muted hover:text-ink',
};

const sizes: Record<Size, string> = {
  // min-h keeps every control at or above the 44px touch target.
  md: 'h-12 px-5 text-[0.95rem]',
  sm: 'h-11 px-4 text-sm',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
    {children}
  </button>
);

/** Same visual treatment, but a real anchor so it behaves like a link. */
export const ButtonLink = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: LinkProps) => (
  <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
    {children}
  </a>
);
