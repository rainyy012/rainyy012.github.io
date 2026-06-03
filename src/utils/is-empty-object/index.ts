export function isEmptyObject(object: object): boolean {
  for (const _key in object) {
    return false
  }
  return true
}
