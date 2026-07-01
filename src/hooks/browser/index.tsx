import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

const CheckSafariBrowserContext = createContext(false)

export function CheckSafariBrowserProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [isSafariBrowser, setSafariBrowserState] = useState(false)
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSafariBrowserState(/^(?!.*chrome).*(safari).*/i.test(navigator.userAgent))
    } catch (error) {
      console.info('Unable to determine browser')
      console.error(error)
    }
  }, [])
  return (
    <CheckSafariBrowserContext value={isSafariBrowser}>
      {children}
    </CheckSafariBrowserContext>
  )
}

export function useCheckSafariBrowser(): boolean {
  return useContext(CheckSafariBrowserContext)
}
