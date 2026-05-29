import { CustomValues } from './src/components/custom-value'

declare global {

  namespace NodeJS {

    interface ProcessEnv extends CustomValues { }

  }

}

export { }
