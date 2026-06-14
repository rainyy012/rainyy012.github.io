import { ReactNode } from 'react'

export interface CaptionedImageProps {
  src: ReturnType<typeof require>
  alt: string
}

export function CaptionedImage({
  src,
  alt,
}: CaptionedImageProps): ReactNode {
  return (
    <figure>
      <img src={src.default} alt={alt} />
      <figcaption>{alt}</figcaption>
    </figure>
  )
}
