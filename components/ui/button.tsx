import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold text-[0.98rem] border border-transparent cursor-pointer transition-all duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-white hover:bg-brand-dark hover:-translate-y-px hover:shadow-brand-md",
        outline:
          "border-brand text-brand bg-transparent hover:bg-brand hover:text-white",
        ghost: "bg-transparent hover:bg-bg-soft text-ink",
      },
      size: {
        default: "px-[26px] py-[13px]",
        sm: "px-3 py-2 text-sm rounded-lg",
        lg: "px-8 py-4 text-[1.02rem]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
