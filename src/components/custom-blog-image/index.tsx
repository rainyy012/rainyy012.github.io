import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import styles from './index.module.css'

type ICustomBlogImageContext = [string | null, Dispatch<SetStateAction<string | null>>]

const CustomBlogImageContext = createContext<ICustomBlogImageContext | null>(null)

interface CustomBlogImageProviderProps {
  children?: ReactNode
}

export function CustomBlogImageProvider({
  children,
}: CustomBlogImageProviderProps): ReactNode {
  return (
    <CustomBlogImageContext value={useState<string | null>(null)}>
      {children}
    </CustomBlogImageContext>
  )
}

export interface CustomBlogImageProps {
  src: ReturnType<typeof require>
}

export function CustomBlogImage({ src }: CustomBlogImageProps): void {
  const [, setCustomBlogImage] = useContext(CustomBlogImageContext)!
  useEffect(() => {
    setCustomBlogImage(src.default)
  }, [setCustomBlogImage, src])
}

const RELATIVE_PATH_PATTERN = /^\.(\.)?\//

export function CustomBlogImageLoader(): ReactNode {
  const { assets, frontMatter } = useBlogPost()
  const [customBlogImage] = useContext(CustomBlogImageContext)!
  const effectiveUrl = customBlogImage || assets.image || frontMatter.image
  return (effectiveUrl === frontMatter.image && RELATIVE_PATH_PATTERN.test(frontMatter.image!))
    ? null
    : (
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${effectiveUrl})` }}
      />
    )
}
