import { CustomValuesEnv } from './src/constants'

declare global {

  namespace NodeJS {

    interface ProcessEnv extends CustomValuesEnv {
      NODE_ENV?: 'development' | 'production' | 'test' | (string & {})
    }

  }

}

export { }
