import { Input as BaseInput } from '@mui/base/Input';
import type { InputProps } from '@mui/base/Input';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

type AppInputProps = InputProps & {
  label?: string;
  className?: string;
};

// Custom slot components for Base UI Input to ensure strict Tailwind classes
const RootSlot = forwardRef<HTMLDivElement, any>((props, ref) => {
    const { ownerState, className, ...other } = props;
    return <div ref={ref} className={clsx("flex flex-col gap-2", className)} {...other} />;
});

const InputSlot = forwardRef<HTMLInputElement, any>((props, ref) => {
    const { ownerState, className, ...other } = props;
    return (
        <input 
            ref={ref} 
            className={clsx(
                "w-full bg-white/80 border-4 border-transparent focus:border-candy-blue/30 outline-none rounded-2xl px-6 py-4 font-bubble text-xl text-candy-text placeholder:text-gray-300 transition-all shadow-inner focus:shadow-lg focus:shadow-candy-blue/10",
                className
            )} 
            {...other} 
        />
    );
});

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <BaseInput
        slots={{ root: RootSlot, input: InputSlot }}
        slotProps={{
            root: { className },
            input: { placeholder: props.placeholder }
        }}
        {...props}
        ref={ref}
      />
    );
  }
);
