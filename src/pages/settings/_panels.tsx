import { useColorMode } from '@docusaurus/theme-common'
import { CustomFontFamilyContext, FONT_SYSTEM_UI } from '@site/src/components/custom-font'
import { ChangeEvent, ReactNode, useCallback, useContext } from 'react'
import styles from './index.module.css'

// Unable to import built-in `ColorModeChoice` from Docusaurus.
type ColorModeChoice = ReturnType<typeof useColorMode>['colorModeChoice']

const THEMES: Readonly<Array<ColorModeChoice>> = [
  null,
  'light',
  'dark',
]

// This makes localization a bit easier if ever needed in the future.
const themeLabels = new Map<ColorModeChoice, string>([
  [null, 'System default'],
  ['light', 'Light'],
  ['dark', 'Dark'],
])

export function ThemePanel(): ReactNode {
  const { colorModeChoice, setColorMode } = useColorMode()
  const onColorModeChoiceChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setColorMode(e.target.value === 'null' ? null : e.target.value as ColorModeChoice)
  }, [setColorMode])
  return (
    <ul className={styles.list}>
      {THEMES.map((theme) => {
        const serializedValue = String(theme)
        return (
          <li key={serializedValue}>
            <label>
              <input
                type='radio'
                name='theme'
                value={serializedValue}
                checked={Object.is(theme, colorModeChoice)}
                onChange={onColorModeChoiceChange}
              />
              {themeLabels.get(theme)}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

// -----------------------------------------------------------------------------

const FONT_FAMILIES = [
  FONT_SYSTEM_UI,
  'Arial',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
] as const

export function FontPanel(): ReactNode {
  const [customFontFamily, setCustomFontFamily] = useContext(CustomFontFamilyContext)
  const onFontChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCustomFontFamily(e.target.value)
  }, [setCustomFontFamily])
  return (
    <ul className={styles.list}>
      {FONT_FAMILIES.map((fontFamily) => {
        return (
          <li key={fontFamily}>
            <label>
              <input
                type='radio'
                name='font'
                value={fontFamily}
                checked={Object.is(customFontFamily, fontFamily)}
                onChange={onFontChange}
              />
              <span style={{ fontFamily }}>
                {fontFamily === FONT_SYSTEM_UI ? 'System default' : fontFamily}
              </span>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

export function ClearLocalStoragePanel(): ReactNode {
  return (
    <>
      <button
        className='button button--danger'
        onClick={() => {
          if (window.confirm('Confirm clear local storage?')) {
            localStorage.clear()
            window.location.reload()
          }
        }}
      >
        Clear local storage
      </button>
    </>
  )
}
