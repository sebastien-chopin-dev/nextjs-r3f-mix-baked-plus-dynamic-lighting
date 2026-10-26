export function Spinner() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="size-6 animate-spin rounded-full border-2 border-border border-t-foreground" />
    </div>
  );
}

// Four corners pointing out (enter) or in (exit).
export function FullscreenIcon({ exit = false }: { exit?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d={
          exit
            ? "M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
            : "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
        }
      />
    </svg>
  );
}

export const overlayButton =
  "absolute z-10 flex items-center gap-2 rounded-full bg-elevated/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-border backdrop-blur hover:bg-elevated";
