import 'react'
import { CustomValuesEnv } from './src/constants'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare global {

  namespace NodeJS {

    interface ProcessEnv extends CustomValuesEnv {
      NODE_ENV?: 'development' | 'production' | 'test' | (string & {})
    }

  }

}

declare module '!!raw-loader!*' {
  const content: string
  export default content
}

export { }
