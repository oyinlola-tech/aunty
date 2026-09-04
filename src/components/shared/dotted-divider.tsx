import { cn } from "@/lib/utils";

interface DottedDividerProps {
  className?: string;
}

export function DottedDivider({ className }: DottedDividerProps) {
  return (
    <div
      className={cn(
        "border-t-2 border-dashed border-doodle my-12 sm:my-16",
        className
      )}
      aria-hidden="true"
    />
  );
}
