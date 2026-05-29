declare global {

  namespace NodeJS {

    interface ProcessEnv {
      GOOGLE_ANALYTICS_ID: string
    }

  }

}

export { }
