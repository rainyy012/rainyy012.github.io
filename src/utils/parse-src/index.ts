import { isObject } from '@glyph-cat/type-checking'

export function parseSrc(src: unknown): string {
  return isObject(src) ? (src as any).default : src as string
}
