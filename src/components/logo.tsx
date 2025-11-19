import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export function Logo({ className, width = 80, height = 28 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 96.6 34.1"
      width={width}
      height={height}
      className={cn("text-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.3,9.2V3.7c0-2-1.6-3.7-3.7-3.7S1,1.6,1,3.7s1.6,3.7,3.7,3.7h0c1.2,0,2.2,0.6,2.9,1.5L8.3,9.2z"
        fill="currentColor"
      />
      <path
        d="M1,12.7h7.4v20.5H1V12.7z"
        fill="currentColor"
      />
      <path
        d="M54.5,33.2c-11.4,0-20.6-9.2-20.6-20.5V12.2h7.4v10.5c0,7.3,5.9,13.2,13.2,13.2s13.2-5.9,13.2-13.2V12.2h7.4v10.5
        C75.1,24,65.9,33.2,54.5,33.2z"
        fill="currentColor"
      />
      <path
        d="M78.6,33.2c-7.3,0-13.2-5.9-13.2-13.2V1.4h7.4v20.5c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8V1.4h7.4V20
        C91.8,27.3,85.9,33.2,78.6,33.2z"
        fill="currentColor"
      />
      <path
        d="M93,34.1c-2,0-3.7-1.6-3.7-3.7s1.6-3.7,3.7-3.7s3.7,1.6,3.7,3.7S95,34.1,93,34.1z"
        fill="currentColor"
      />
    </svg>
  );
}
