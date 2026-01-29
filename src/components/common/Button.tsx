import { forwardRef } from 'react';
import { motion } from 'framer-motion';
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

    const darkVariants = {
      primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30',
      secondary: 'bg-white/10 hover:bg-white/20 text-white',
      success: 'bg-green-500/20 hover:bg-green-500/40 border border-green-500/50 text-green-300',
      danger: 'bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-300',
      ghost: 'bg-transparent hover:bg-white/10 text-white/70',
    };

    const lightVariants = {
      primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30',
      secondary: 'bg-white hover:bg-slate-100 text-slate-700 shadow-sm border border-slate-200',
      success: 'bg-green-100 hover:bg-green-200 border border-green-300 text-green-700',
      danger: 'bg-red-100 hover:bg-red-200 border border-red-300 text-red-700',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    };

    const sakuraVariants = {
      primary: 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg shadow-rose-400/30',
      secondary: 'bg-white hover:bg-rose-50 text-rose-700 shadow-sm border border-rose-200',
      success: 'bg-green-100 hover:bg-green-200 border border-green-300 text-green-700',
      danger: 'bg-red-100 hover:bg-red-200 border border-red-300 text-red-700',
      ghost: 'bg-transparent hover:bg-rose-50 text-rose-600',
    };

    const variants = isDark ? darkVariants : isSakura ? sakuraVariants : lightVariants;

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'rounded-xl font-medium transition-all duration-300 flex items-center gap-2',
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
