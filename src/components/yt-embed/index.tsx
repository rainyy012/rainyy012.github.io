import { ReactNode } from 'react'

export interface YTEmbedProps {
  videoId: string
}

export function YTEmbed({
  videoId,
}: YTEmbedProps): ReactNode {
  return (
    <iframe
      width={560}
      height={315}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}