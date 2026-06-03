import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export type SarcasmProps = Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'children' | 'title'>

export function Sarcasm(props: SarcasmProps): ReactNode {
  return (
    <abbr title='sarcasm' {...props}>
      {'/s'}
    </abbr>
  )
}
