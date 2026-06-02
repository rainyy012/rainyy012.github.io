import { CustomValuesEnv } from './src/constants'

declare global {

  namespace NodeJS {

    interface ProcessEnv extends CustomValuesEnv { }

  }

}

export { }
