import { CustomValuesEnv } from './src/constants'

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
