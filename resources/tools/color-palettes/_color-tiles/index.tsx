// import Link from '@theme/Link'
import Link from '@theme/MDXComponents/A'
import ClipboardJS from 'clipboard'
import { MouseEvent, ReactNode, useCallback } from 'react'
import { toast } from 'react-toastify'
import styles from './index.module.css'

export interface ColorTilesProps {
  reference: string
  values: Array<[name: string, color: string]>
}

export function ColorTiles({
  reference,
  values,
}: ColorTilesProps): ReactNode {
  const onCopyColorCode = useCallback((e: MouseEvent) => {
    try {
      const name = (e.target as HTMLButtonElement).getAttribute('data-name') as string
      const color = (e.target as HTMLButtonElement).getAttribute('data-value') as string
      ClipboardJS.copy(color)
      toast.success(
        <>
          Copied {name} (
          <div
            className={styles.tinyTile}
            style={{ '--color': color }}
          />
          <span style={{ fontFamily: 'monospace' }}>{color}</span>)
        </>
      )
    } catch (error) {
      toast.success('Unable to copy color')
      console.error(error)
    }
  }, [])
  return (
    <>
      {/* <p><Link href={reference}>Reference <ExternalLinkIcon /></Link></p> */}
      <p><Link href={reference}>Reference</Link></p>
      <ul className={styles.container}>
        {values.map(([name, color]) => (
          <li key={color}>
            <button
              style={{
                '--color': color,
                color: getFgColor(color),
              }}
              onClick={onCopyColorCode}
              data-name={name}
              data-value={color}
            >
              <span>{name || <br />}</span>
              <span>{color}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function getFgColor(hex: string): string {
  try {
    const [r, g, b] = hex.replace('#', '').match(/[0-9a-f]{2}/g)!
    return ((0.21 * parseInt(r, 16)) +
      (0.72 * parseInt(g, 16)) +
      (0.07 * parseInt(b, 16))
    ) > 0x70 ? '#000000' : '#ffffff'
  } catch (error) {
    console.error(error)
    return '#808080'
  }
}
