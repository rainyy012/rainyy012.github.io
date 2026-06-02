import clsx from 'clsx'
import { DetailedHTMLProps, DOMAttributes, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'

const INNER_HTML: DOMAttributes<HTMLSpanElement>['dangerouslySetInnerHTML'] = {
  __html: '݁⋆˚࿔R̟a̟i̟n̟.☘&#xFE0E; ݁˖', // cspell:disable-line
}

export type SignatureProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export function Signature({ className, style, ...props }: SignatureProps): ReactNode {
  return (
    <span
      className={clsx(styles.signature, className)}
      {...props}
      dangerouslySetInnerHTML={INNER_HTML}
    />
  )
}
