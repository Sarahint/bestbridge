import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-[10px] border border-line bg-white px-3.5 py-3 text-[length:inherit] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus-visible:outline-none focus-visible:border-brand-light focus-visible:ring-3 focus-visible:ring-brand-light/22 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
