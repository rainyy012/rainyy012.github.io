import { ReactNode, useEffect, useReducer, useRef } from 'react'
import styles from './index.module.css'

const triggerKeys = new Set([' ', 'Enter'])

const showContentReducer = () => true

export interface SpoilerProps {
  children?: ReactNode
}

export function Spoiler({
  children,
}: SpoilerProps): ReactNode {
  const [shouldShowContent, showContent] = useReducer(showContentReducer, false)
  const elementRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!elementRef.current) { return }
    const target = elementRef.current
    const onKeyDown = (event: KeyboardEvent) => {
      if (triggerKeys.has(event.key)) {
        target.click()
        target.removeEventListener('keydown', onKeyDown)
        event.preventDefault()
      }
    }
    target.addEventListener('keydown', onKeyDown)
    return () => { target.removeEventListener('keydown', onKeyDown) }
  }, [])
  return (
    <span
      ref={elementRef}
      className={styles.spoilerText}
      data-hidden={!shouldShowContent}
      aria-expanded={shouldShowContent}
      {...(!shouldShowContent && {
        onClick: showContent,
        title: 'Click to reveal spoiler',
        tabIndex: 0,
      })}
    >
      <span>
        {children}
      </span>
    </span>
  )
}
