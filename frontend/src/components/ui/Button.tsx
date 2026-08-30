import type { ReactNode } from 'react';
import { twMerge } from '@/lib/cx';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-2.5 py-1.5',
  md: '',
};

export function Button({ variant = 'primary', size = 'md', children, icon, className, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={twMerge(variants[variant], sizes[size], className)}>
      {icon}
      {children}
    </button>
  );
}
