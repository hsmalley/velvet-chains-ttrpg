const rawBase = import.meta.env.BASE_URL ?? '/';
const baseWithoutTrailingSlash = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseWithoutTrailingSlash}${normalizedPath}`;
}
