"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { View as ViewImpl } from "@react-three/drei";
import { r3f } from "@/lib/r3f-tunnel";

type ViewProps = ComponentProps<"div"> & { children: ReactNode };

// A DOM div that the shared Canvas scissors into. Its 3D children are tunnelled into the Canvas.
export function View({ children, ...props }: ViewProps) {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <>
      <div ref={ref} {...props} />
      <r3f.In>
        <ViewImpl track={ref}>{children}</ViewImpl>
      </r3f.In>
    </>
  );
}
