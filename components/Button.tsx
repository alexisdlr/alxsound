import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, children, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
        w-full
        rounded-lg
        bg-sky-500
        border
        border-transparent
        px-4
        py-1
        disabled:cursor-not-allowed
        disabled:opacity-50
        transition
        font-bold

      `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
