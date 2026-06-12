import { parseCSV } from '.'

const testData = `
a,b,c,
# comment
String,Number,Boolean
x1,41,true
x2,42,false
x3,43,1
x4,44,0
`.trim()

test(parseCSV.name, () => {
  expect(parseCSV(testData)).toStrictEqual([
    { a: 'x1', b: 41, c: true },
    { a: 'x2', b: 42, c: false },
    { a: 'x3', b: 43, c: true },
    { a: 'x4', b: 44, c: false },
  ])
})
