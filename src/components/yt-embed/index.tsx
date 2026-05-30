import { useWindowSize } from '@docusaurus/theme-common'
import { ReactNode } from 'react'
import styles from './index.module.css'

export interface YTEmbedProps {
  videoId: string
}

export function YTEmbed({
  videoId,
}: YTEmbedProps): ReactNode {
  const windowSize = useWindowSize()
  return (
    <div className={styles.container}>
      <iframe
        {...(windowSize === 'desktop' ? { height: 315, width: 560 } : {})}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}