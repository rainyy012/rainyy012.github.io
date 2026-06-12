/**
 * Assumptions:
 * - The delimiter is `,`
 * - Any line beginning with '#' will be treated as comment and ignored.
 * - After removal of comments:
 *   - the first line will be used to infer column names
 *   - the second line will be used to infer data types
 *     - Accepted types are `String`, `Number`, `Boolean`
 */
export function parseCSV<T>(text: string): Array<T> {
  const delimiter = ','
  const commentLinePattern = /^#/
  const converters = {
    String,
    Number,
    Boolean: (value: string) => Boolean(JSON.parse(value)),
  } as const
  const [$labels, $types, ...lines] = text.split('\n').filter((line) => !commentLinePattern.test(line))
  const labels = $labels.split(delimiter).map((x) => x.trim())
  const types = $types.split(delimiter).map((x) => x.trim()) as Array<'String' | 'Number' | 'Boolean'>
  return lines.map((line) => {
    const columns = line.split(delimiter)
    return columns.reduce((columnAsObject, column, columnIndex) => {
      const value = (converters[types[columnIndex]])(column) as T[keyof T]
      columnAsObject[labels[columnIndex] as keyof T] = value
      return columnAsObject
    }, {} as T)
  })
}
