export function isNullOrUndefined(value: unknown): value is null | undefined {
  return Object.is(value, null) || typeof value === 'undefined'
}
