import {
  ActionDispatch,
  createContext,
  ReactNode,
  useEffect,
  useInsertionEffect,
  useReducer,
} from 'react'

export const FONT_SYSTEM_UI = 'system-ui'

export const CustomFontFamilyContext = createContext<[string, ActionDispatch<[string]>]>(null!)

export interface CustomFontFamilyProviderProps {
  children?: ReactNode
}

const STORAGE_KEY = 'custom-font-family'

export interface CustomFontFamilyProviderProps {
  children?: ReactNode
}

export function CustomFontFamilyProvider({
  children,
}: CustomFontFamilyProviderProps): ReactNode {

  const state = useReducer<string, [string | [string]]>((_, newValue: string | [string]) => {
    if (Array.isArray(newValue)) {
      // Prevent saving local storage upon initialization.
      return newValue[0]
    } else {
      if (newValue === FONT_SYSTEM_UI) {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, newValue)
      }
      return newValue
    }
  }, FONT_SYSTEM_UI)
  const [customFontFamily, setCustomFontFamily] = state

  useEffect(() => {
    const fetchedCustomFont = localStorage.getItem(STORAGE_KEY)
    if (fetchedCustomFont) {
      setCustomFontFamily([fetchedCustomFont])
    }
  }, [setCustomFontFamily])

  useEffect(() => {
    const onStorageEvent = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setCustomFontFamily([e.newValue || FONT_SYSTEM_UI])
      } else if (Object.is(e.key, null)) {
        setCustomFontFamily([FONT_SYSTEM_UI])
      }
    }
    window.addEventListener('storage', onStorageEvent)
    return () => { window.removeEventListener('storage', onStorageEvent) }
  }, [setCustomFontFamily])

  useInsertionEffect(() => {
    if (!customFontFamily) { return }
    const style = document.createElement('style')
    style.innerText = `:root{--ifm-font-family-base:${customFontFamily}}`
    document.head.append(style)
    return () => { style.remove() }
  }, [customFontFamily])

  return (
    <CustomFontFamilyContext value={state}>
      {children}
    </CustomFontFamilyContext>
  )

}
