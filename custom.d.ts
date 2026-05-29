import { CustomValuesEnv } from './src/components/custom-value'

declare global {

  namespace NodeJS {

    interface ProcessEnv extends CustomValuesEnv { }

  }

}

export { }
