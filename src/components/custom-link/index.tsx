import { useHistory } from '@docusaurus/router'
import { useCustomValues } from '@site/src/components/custom-value'
import { AnchorHTMLAttributes, DetailedHTMLProps, MouseEvent, ReactNode, useCallback } from 'react'

export type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { href: string }

export function Link({
  children,
  href,
  ...otherProps
}: LinkProps): ReactNode {

  const { push } = useHistory()
  const { RAIN_GITHUB_IO } = useCustomValues()

  const normalizedOrigin = typeof window !== 'undefined'
    ? window.location.origin
    : RAIN_GITHUB_IO

  const URL_REGEX = new RegExp(`^${normalizedOrigin}\\/?`)

  const containsOrigin = String(href).includes(normalizedOrigin)
  const isSameOrigin = containsOrigin || /^(\.|\/)/.test(href) || /^#/.test(href)

  href = href.replace(/\.mdx?$/, '')
  if (containsOrigin) { href = href.replace(URL_REGEX, '/') }

  const onClick = useCallback((e: MouseEvent) => {
    if (isSameOrigin) {
      if (!e.metaKey && !e.shiftKey) {
        push(href)
        e.preventDefault()
      }
    }
  }, [href, isSameOrigin, push])

  return (
    <a
      href={href}
      onClick={onClick}
      {...isSameOrigin ? {} : {
        target: '_blank',
        rel: 'noreferrer',
      }}
      {...otherProps}
    >
      {children}
    </a>
  )
}
