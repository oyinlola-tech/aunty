import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
}

export function Doodle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn("text-doodle", className)}
      aria-hidden="true"
    >
      <path
        d="M20 80 Q50 20, 100 60 T180 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
      <path
        d="M40 120 Q80 60, 140 100 T190 120"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
    </svg>
  );
}
