export function lerp(from, to, by) {
  return from * (1 - by) + to * by;
}
export const EPSILON = 0.00001;