import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import styles from './index.module.css'

const urlSchemePattern = /^https:\/\//
const wwwPattern = /^www\./

export interface NonResourceLinkProps {
  children?: ReactNode
}

export function NonResourceLink({
  children,
}: NonResourceLinkProps): ReactNode {
  const link = String((children as ReactElement<PropsWithChildren>).props.children)
  return (
    <span className={styles.nonResourceLink}>
      {link.replace(urlSchemePattern, '').replace(wwwPattern, '')}
    </span>
  )
}
