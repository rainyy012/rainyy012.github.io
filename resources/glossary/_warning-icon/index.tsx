import WarningIconBase from '@theme/Admonition/Icon/Warning'
import { ReactNode } from 'react'
import styles from './index.module.css'

export interface WarningIconProps {
  severe?: boolean
}

export function WarningIcon({
  severe,
}: WarningIconProps): ReactNode {
  return (
    <WarningIconBase
      className={styles.icon}
      data-severe={severe}
    />
  )
}
