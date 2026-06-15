import { useColorMode, useWindowSize } from '@docusaurus/theme-common'
import { TOAST_TIMEOUT } from '@site/src/constants'
import { ReactNode } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

export function CustomToastContainer(): ReactNode {
  const { colorMode } = useColorMode()
  const windowsize = useWindowSize()
  return (
    <ToastContainer
      position='top-center'
      autoClose={TOAST_TIMEOUT}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={colorMode}
      transition={Bounce}
      toastStyle={windowsize === 'mobile' ? {
        maxWidth: '100vw',
      } : {
        width: 600,
      }}
    />
  )
}
