import { ReactNode } from 'react'
import styles from './index.module.css'

export interface HiddenMarkerProps {
  id: string
  inline?: boolean
}

export function HiddenMarker({
  id,
  inline,
}: HiddenMarkerProps): ReactNode {
  if (!id) {
    // - TS errors don't show up in MDX for missing mandatory props.
    // - Empty string is still a string.
    throw new Error('<HiddenMarker/> is missing an id')
  }
  return (
    <div
      id={id}
      data-inline={inline}
      className={styles.hiddenMarker}
    />
  )
}
