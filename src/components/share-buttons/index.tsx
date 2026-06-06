import { useWindowSize } from '@docusaurus/theme-common'
import ClipboardJS from 'clipboard'
import clsx from 'clsx'
import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  SVGProps,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  BlueskyIcon,
  BlueskyShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share'
import { toast } from 'react-toastify'
import styles from './index.module.css'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  bgStyle?: CSSProperties
  borderRadius?: number
  iconFillColor?: string
  round?: boolean
  size?: number | string
}

const ICON_SIZE = 32 // px

const SHARED_ICON_PROPS: Partial<IconProps> = {
  size: ICON_SIZE,
  round: true,
}

export interface ShareButtonsProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  shareUrl: string
}

export function ShareButtons({
  shareUrl,
  className,
  ...props
}: ShareButtonsProps): ReactNode {
  return (
    <div className={clsx(styles.container, className)} {...props}>

      <BlueskyShareButton
        url={shareUrl}
        aria-label='Share on Bluesky'
      // title={title}
      >
        <BlueskyIcon {...SHARED_ICON_PROPS} />
      </BlueskyShareButton>

      <FacebookShareButton
        url={shareUrl}
        aria-label='Share on Facebook'
      >
        <FacebookIcon {...SHARED_ICON_PROPS} />
      </FacebookShareButton>

      <ThreadsShareButton
        url={shareUrl}
        aria-label='Share on Threads'
      // title={title}
      >
        <ThreadsIcon {...SHARED_ICON_PROPS} />
      </ThreadsShareButton>

      <RedditShareButton
        url={shareUrl}
        aria-label='Share on Reddit'
      // title={title}
      >
        <RedditIcon {...SHARED_ICON_PROPS} />
      </RedditShareButton>

      <TelegramShareButton
        url={shareUrl}
        aria-label='Share on Telegram'
      // title={title}
      >
        <TelegramIcon {...SHARED_ICON_PROPS} />
      </TelegramShareButton>

      <LineShareButton
        url={shareUrl}
        aria-label='Share on Line'
      // title={title}
      >
        <LineIcon {...SHARED_ICON_PROPS} />
      </LineShareButton>

      <WhatsappShareButton
        url={shareUrl}
        aria-label='Share on WhatsApp'
      // title={title}
      >
        <WhatsappIcon {...SHARED_ICON_PROPS} />
      </WhatsappShareButton>

      <CopyButton url={shareUrl} />

      <NativeShareButton url={shareUrl} />

    </div>
  )
}

const VALID_SHARE_ITEM_TYPES = new Set([
  'article',
  'quiz',
])

export interface ShareButtonsForFooterProps extends ShareButtonsProps {
  shareItemType?: string | undefined | null
}

export function ShareButtonsForFooter({
  shareUrl,
  shareItemType,
}: ShareButtonsForFooterProps): ReactNode {
  const windowsize = useWindowSize()
  // const title = 'Read this next'
  shareItemType ||= 'article'
  if (!VALID_SHARE_ITEM_TYPES.has(shareItemType)) {
    throw new Error(`Expected \`shareItemType\` to be one of ["${[...VALID_SHARE_ITEM_TYPES].join('", "')}"] but got "${shareItemType}"`)
  }
  return (
    <div
      className={styles.containerForFooter}
      data-is-mobile={windowsize === 'mobile'}
    >
      <b>Share this {shareItemType}:</b>
      <ShareButtons shareUrl={shareUrl} />
    </div>
  )
}

interface CopyButtonProps {
  url: string
}

function CopyButton({ url }: CopyButtonProps): ReactNode {
  const [isCopied, setCopiedState] = useState(false)
  const onCopy = useCallback(() => {
    try {
      ClipboardJS.copy(url)
      setCopiedState(true)
      setTimeout(() => { setCopiedState(false) }, 3000)
    } catch (error) {
      console.error(error)
      window.alert('Unable to copy link')
    }
  }, [url])
  return (
    <button
      className={clsx('react-share__ShareButton', styles.customButtonBase)}
      type='button'
      onClick={onCopy}
      aria-label='Copy link'
    >
      <svg
        viewBox='0 -960 960 960'
        width={ICON_SIZE}
        height={ICON_SIZE}
      >
        <circle
          cx={480}
          cy={-480}
          r={480}
          fill={isCopied ? 'var(--ifm-color-success)' : 'var(--ifm-color-primary-darker)'}
        />
        <path
          d={isCopied ? COPIED_ICON : LINK_ICON}
          fill='white'
        />
      </svg>
    </button>
  )
}

interface NativeShareButtonProps {
  url: string
}

function NativeShareButton({ url }: NativeShareButtonProps): ReactNode {

  const [canShare, checkIfCanShare] = useReducer(() => {
    return typeof navigator !== 'undefined' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ url })
  }, false)
  useEffect(() => { checkIfCanShare() }, [])

  const onShowShareSheet = useCallback(async () => {
    try {
      await navigator.share({ url })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // User likely to have aborted it manually
      } else {
        toast.error('Unable to show sharing options')
        console.error(error)
      }
    }
  }, [url])

  return canShare && (
    <button
      className={clsx('react-share__ShareButton', styles.customButtonBase)}
      type='button'
      onClick={onShowShareSheet}
      aria-label='More share options'
    >
      <svg
        viewBox='0 -960 960 960'
        width={ICON_SIZE}
        height={ICON_SIZE}
      >
        <circle
          cx={480}
          cy={-480}
          r={480}
          fill='var(--ifm-color-primary-darker)'
        />
        <path
          d={MORE_ICON}
          fill='white'
        />
      </svg>
    </button>
  )

}

/**
 * @see https://fonts.google.com/icons?selected=Material+Symbols+Rounded:check:FILL@1;wght@400;GRAD@0;opsz@40&icon.style=Rounded&icon.query=tick&icon.size=32&icon.color=%23ffffff
 */
const COPIED_ICON = 'm379.33-339.33 355-355q10-10 23.67-10 13.67 0 23.67 10 10 10 10 23.83 0 13.83-10 23.83l-379 379.34q-10 10-23.34 10-13.33 0-23.33-10L177.33-446q-10-10-9.5-23.83.5-13.84 10.5-23.84t23.84-10q13.83 0 23.83 10l153.33 154.34Z'

/**
 * @see https://fonts.google.com/icons?selected=Material+Symbols+Rounded:link:FILL@1;wght@400;GRAD@0;opsz@40&icon.style=Rounded&icon.query=link&icon.size=32&icon.color=%23ffffff
 */
const LINK_ICON = 'M280-280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h133.33q14.17 0 23.75 9.62 9.59 9.61 9.59 23.83 0 14.22-9.59 23.72-9.58 9.5-23.75 9.5H280q-55.56 0-94.44 38.84-38.89 38.84-38.89 94.33 0 55.49 38.89 94.49 38.88 39 94.44 39h133.33q14.17 0 23.75 9.62 9.59 9.62 9.59 23.83 0 14.22-9.59 23.72-9.58 9.5-23.75 9.5H280Zm76.67-166.67q-14.17 0-23.75-9.61-9.59-9.62-9.59-23.84 0-14.21 9.59-23.71 9.58-9.5 23.75-9.5h246.66q14.17 0 23.75 9.61 9.59 9.62 9.59 23.84 0 14.21-9.59 23.71-9.58 9.5-23.75 9.5H356.67Zm190 166.67q-14.17 0-23.75-9.62-9.59-9.61-9.59-23.83 0-14.22 9.59-23.72 9.58-9.5 23.75-9.5H680q55.56 0 94.44-38.84 38.89-38.84 38.89-94.33 0-55.49-38.89-94.49-38.88-39-94.44-39H546.67q-14.17 0-23.75-9.62-9.59-9.62-9.59-23.83 0-14.22 9.59-23.72 9.58-9.5 23.75-9.5H680q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H546.67Z'

/**
 * @see https://fonts.google.com/icons?selected=Material+Symbols+Rounded:more_horiz:FILL@1;wght@400;GRAD@0;opsz@40&icon.style=Rounded&icon.query=more&icon.size=32&icon.color=%23ffffff
 */
const MORE_ICON = 'M218.57-421.33q-24.24 0-41.4-17.26Q160-455.86 160-480.09q0-24.24 17.26-41.41 17.26-17.17 41.5-17.17t41.41 17.26q17.16 17.27 17.16 41.5 0 24.24-17.26 41.41-17.26 17.17-41.5 17.17Zm261.34 0q-24.24 0-41.41-17.26-17.17-17.27-17.17-41.5 0-24.24 17.26-41.41 17.27-17.17 41.5-17.17 24.24 0 41.41 17.26 17.17 17.27 17.17 41.5 0 24.24-17.26 41.41-17.27 17.17-41.5 17.17Zm261.33 0q-24.24 0-41.41-17.26-17.16-17.27-17.16-41.5 0-24.24 17.26-41.41 17.26-17.17 41.5-17.17t41.4 17.26Q800-504.14 800-479.91q0 24.24-17.26 41.41-17.26 17.17-41.5 17.17Z'
