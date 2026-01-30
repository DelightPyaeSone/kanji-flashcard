import { forwardRef } from 'react';
import { cn } from '@/utils';
import { useTheme } from '@/hooks';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', className, children, ...props }, ref) => {
    const { isDark, isSakura } = useTheme();

    // Flat, minimal button styles
    const darkVariants = {
      primary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200',
      success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      danger: 'bg-red-600 hover:bg-red-500 text-white',
      ghost: 'bg-transparent hover:bg-slate-800 text-slate-400',
    };

    const lightVariants = {
      primary: 'bg-slate-800 hover:bg-slate-700 text-white',
      secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700',
      success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      danger: 'bg-red-600 hover:bg-red-500 text-white',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    };

    const sakuraVariants = {
      primary: 'bg-rose-500 hover:bg-rose-400 text-white',
      secondary: 'bg-rose-100 hover:bg-rose-200 text-rose-700',
      success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      danger: 'bg-red-600 hover:bg-red-500 text-white',
      ghost: 'bg-transparent hover:bg-rose-50 text-rose-600',
    };

    const variants = isDark ? darkVariants : isSakura ? sakuraVariants : lightVariants;

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-colors flex items-center gap-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
