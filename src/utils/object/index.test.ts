import { isEmptyObject } from '.'

test('Empty object', () => {
  expect(isEmptyObject({})).toBe(true)
})

test('Non-empty object', () => {
  expect(isEmptyObject({ a: 'b' })).toBe(false)
})
