import { isNullOrUndefined } from '@site/src/utils/type-check'
import {
  ActionDispatch,
  createContext,
  ReactNode,
  useEffect,
  useInsertionEffect,
  useReducer,
} from 'react'

export const CustomFontFamilyContext = createContext<[string | null, ActionDispatch<[string | null]>]>(null!)

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

  const state = useReducer((_, newValue: string | null) => {
    if (isNullOrUndefined(newValue)) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, newValue)
    }
    return newValue
  }, null as string | null)
  const [customFontFamily, setCustomFontFamily] = state

  useEffect(() => {
    const fetchedCustomFont = localStorage.getItem(STORAGE_KEY)
    if (fetchedCustomFont) {
      // TOFIX: (mid priority) this should not trigger local storage calls
      setCustomFontFamily(fetchedCustomFont)
    }
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
