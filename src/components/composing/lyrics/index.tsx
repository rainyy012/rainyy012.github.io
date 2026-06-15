import { ReactNode } from 'react'
import styles from './index.module.css'

export interface LyricsProps {
  children?: ReactNode
}

export function Lyrics({ children }: LyricsProps): ReactNode {
  return (
    <span className={styles.container}>
      {children}
    </span>
  )
}
