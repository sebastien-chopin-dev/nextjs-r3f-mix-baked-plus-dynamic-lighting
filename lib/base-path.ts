// next/link adds basePath itself; raw asset URLs (GLBs, textures, Draco, next/image src) do not.
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
