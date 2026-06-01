import { ReactNode, useCallback, useEffect, useReducer, useRef } from 'react'
import styles from './index.module.css'

const triggerKeys = new Set([' ', 'Enter'])

const falseToTrueReducer = () => true

export interface SpoilerProps {
  children?: ReactNode
}

export function Spoiler({
  children,
}: SpoilerProps): ReactNode {

  const [shouldInheritCursor, setCursorInheritance] = useReducer(falseToTrueReducer, false)
  const [shouldShowContent, showContent] = useReducer(falseToTrueReducer, false)

  const onRevealSpoiler = useCallback(() => {
    showContent()
    setTimeout(setCursorInheritance, 1000) // for a slightly better UX
  }, [])

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
        onClick: onRevealSpoiler,
        title: 'Click to reveal spoiler',
        tabIndex: 0,
      })}
      style={shouldInheritCursor ? { cursor: 'inherit' } : {}}
    >
      <span>
        {children}
      </span>
    </span>
  )

}
