import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, disabled, placeholder, ...props }, ref) => {
    return (
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        ref={ref}
        className={twMerge(
          `
            flex 
            w-full 
            rounded-md
            bg-neutral-700
            border
            border-transparent
            px-3
            py-3
            text-sm
            file:border-0
            file:bg-transparent
            file:text-sm
            file:text-stone-50
            file:font-medium
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
            `,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
