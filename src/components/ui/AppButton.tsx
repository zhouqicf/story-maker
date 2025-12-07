import { Button as BaseButton } from '@mui/base/Button';
import type { ButtonProps } from '@mui/base/Button';
import { clsx } from 'clsx';
import { Sparkles } from 'lucide-react';
import { forwardRef } from 'react';

interface AppButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, loading, ...props }, ref) => {
    
    const baseStyles = "font-bubble font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-candy-blue text-blue-900 shadow-[0_6px_0_0_rgb(100,180,220)] active:shadow-none active:translate-y-1.5 hover:brightness-105 border-2 border-candy-blue",
      secondary: "bg-white text-candy-text shadow-[0_4px_0_0_rgb(200,200,200)] active:shadow-none active:translate-y-1 hover:bg-gray-50 border-2 border-gray-100",
      ghost: "bg-transparent text-candy-text hover:bg-black/5 active:scale-90",
      icon: "rounded-full aspect-square p-0 flex items-center justify-center shadow-md active:shadow-none",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-xl",
      md: "px-6 py-3 text-base rounded-2xl",
      lg: "px-8 py-4 text-xl rounded-3xl",
      xl: "px-10 py-6 text-2xl rounded-[2rem]",
    };

    const iconSizes = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-20 h-20",
    };

    return (
      <BaseButton
        ref={ref}
        className={clsx(
            baseStyles,
            variants[variant],
            variant === 'icon' ? iconSizes[size] : sizes[size],
            className
        )}
        {...props}
      >
        {loading ? <Sparkles className="animate-spin" /> : icon}
        {children}
      </BaseButton>
    );
  }
);
