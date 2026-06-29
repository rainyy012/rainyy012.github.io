import { parseSrc } from '.'

test(parseSrc.name, () => {
  expect(parseSrc({ default: '...' })).toBe('...')
  expect('...').toBe('...')
  expect(undefined).toBeUndefined()
})
