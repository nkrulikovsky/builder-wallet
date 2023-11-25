export function ensureMilliseconds(unixTime: number): number {
  if (unixTime < 1e12) {
    unixTime *= 1000
  }
  return unixTime
}
