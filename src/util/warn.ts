export function throwError(location: string, message: string): never {
  throw new Error(`[jolyne/${location}]: ${message}`);
}
