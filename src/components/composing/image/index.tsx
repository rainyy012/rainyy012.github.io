import ThemedImage from '@theme/ThemedImage'
import { ComponentProps, ReactNode } from 'react'

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

export interface CaptionedThemedImage extends Omit<ComponentProps<typeof ThemedImage>, 'alt' | 'sources'> {
  sources: {
    light: ReturnType<typeof require>
    dark: ReturnType<typeof require>
  }
  alt: string
}

export function CaptionedThemedImage(props: CaptionedThemedImage): ReactNode {
  return (
    <figure>
      <ThemedImage {...props} />
      <figcaption>{props.alt}</figcaption>
    </figure>
  )
}
