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

export interface Signature {
  (props: SignatureProps): ReactNode
  WithValediction(props: SignatureWithValedictionProps): ReactNode
}

export interface SignatureWithValedictionProps extends SignatureProps {
  replacedBy?: ReactNode
}

export function SignatureWithValediction({
  replacedBy,
  ...signatureProps
}: SignatureWithValedictionProps): ReactNode {
  return (
    <p>
      <br />{replacedBy || 'From the bottom of my heart,'}<br />
      <Signature {...signatureProps} />
    </p>
  )
}

Signature.WithValediction = SignatureWithValediction
