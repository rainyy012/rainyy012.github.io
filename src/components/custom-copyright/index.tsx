import { CUSTOM_VALUES } from '@site/src/constants/generated'
import { useConstant } from '@site/src/hooks/constant'
import ClipboardJS from 'clipboard'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import styles from './index.module.css'

const STORAGE_KEY = 'show-build-hash'

export function CustomCopyright(): ReactNode {

  const year = useConstant(() => new Date().getFullYear())
  const [showHash, setHashVisibility] = useState(false)

  useEffect(() => {
    const comment = document.createComment(` Build hash: ${CUSTOM_VALUES.GIT_HASH} `)
    document.append(comment)
    return () => { comment.remove() }
  }, [])

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHashVisibility(true)
    }
  }, [])

  const onToggleBuildHash = useCallback(() => {
    setHashVisibility((prevVisibility) => {
      const nextVisibility = !prevVisibility
      if (nextVisibility) {
        localStorage.setItem(STORAGE_KEY, '1')
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
      return nextVisibility
    })
  }, [])

  const onCopyBuildHash = useCallback(() => {
    const options: ToastOptions = { position: 'bottom-center' }
    if (CUSTOM_VALUES.GIT_HASH) {
      ClipboardJS.copy(CUSTOM_VALUES.GIT_HASH)
      toast.success('Build hash copied!', options)
    } else {
      toast.error('Unable to determine build hash.', options)
    }
  }, [])

  return (
    <>
      <span onClick={onToggleBuildHash}>Copyright © {year} Rain</span>
      <div
        className={styles.hash}
        title={CUSTOM_VALUES.GIT_HASH}
        data-visible={showHash}
      >
        {'Build hash: '}
        <code onClick={onCopyBuildHash}>
          {CUSTOM_VALUES.GIT_HASH?.substring(0, 7)}
        </code>
      </div>
    </>
  )

}
