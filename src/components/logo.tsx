import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("font-logo font-bold tracking-wider lowercase text-primary", className)}>
      ima
    </span>
  );
}
