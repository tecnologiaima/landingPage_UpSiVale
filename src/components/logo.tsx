import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export function Logo({ className, width = 80, height = 28 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 160 56"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
        <path d="M10.1348 0C15.7298 0 20.2698 4.54 20.2698 10.135C20.2698 15.73 15.7298 20.27 10.1348 20.27C4.53979 20.27 0 15.73 0 10.135C0 4.54 4.53979 0 10.1348 0Z" fill="currentColor"/>
        <path d="M55.5148 20.42V56H38.2548V20.42H55.5148Z" fill="currentColor"/>
        <path d="M110.165 20.42V56H92.9048V20.42H110.165Z" fill="currentColor"/>
        <path d="M82.1648 40.09C70.6148 40.09 61.4648 30.76 61.4648 18.91V18.68H78.7248V18.91C78.7248 22.84 82.2648 25.9 87.4948 25.9C92.7248 25.9 96.2648 22.84 96.2648 18.91V18.68H113.525V18.91C113.525 30.76 104.375 40.09 92.8248 40.09C89.0448 40.09 85.5048 40.09 82.1648 40.09Z" fill="currentColor"/>
        <path d="M137.42 56C124.62 56 114.34 45.42 114.34 32.11V20.42H130.86V32.11C130.86 36.04 133.9 39.1 138.27 39.1C142.64 39.1 145.68 36.04 145.68 32.11V20.42H159.28V32.11C159.28 45.42 147.24 56 137.42 56Z" fill="currentColor"/>
    </svg>
  );
}
