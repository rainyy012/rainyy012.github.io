import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export type SarcasmMarkerProps = Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'children' | 'title'>

export function SarcasmMarker(props: SarcasmMarkerProps): ReactNode {
  return (
    <abbr title='sarcasm' {...props}>
      {'/s'}
    </abbr>
  )
}
