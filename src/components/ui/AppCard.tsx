import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid';
  hoverEffect?: boolean;
}

export const AppCard = forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, variant = 'glass', hoverEffect = false, children, ...props }, ref) => {
    
    const baseStyles = "rounded-3xl border-2 overflow-hidden transition-all duration-300";
    
    const variants = {
      glass: "bg-white/60 backdrop-blur-xl border-white/40 shadow-xl shadow-candy-purple/10",
      solid: "bg-white border-gray-100 shadow-md",
    };

    const hoverStyles = hoverEffect 
        ? "hover:-translate-y-2 hover:shadow-2xl hover:shadow-candy-blue/20 hover:border-candy-blue/30 cursor-pointer" 
        : "";

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
