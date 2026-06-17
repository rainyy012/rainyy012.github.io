import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import { ReactNode } from 'react'

export interface PreviewOnlyProps {
  children?: ReactNode
}

export function PreviewOnly({ children }: PreviewOnlyProps): ReactNode {
  const { isBlogPostPage } = useBlogPost()
  return isBlogPostPage ? null : children
}

export interface FullPageOnlyProps {
  children?: ReactNode
}

export function FullPageOnly({ children }: FullPageOnlyProps): ReactNode {
  const { isBlogPostPage } = useBlogPost()
  return isBlogPostPage ? children : null
}
