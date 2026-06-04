import React, {type ReactNode} from 'react';
import Provider from '@theme-original/Layout/Provider';
import type ProviderType from '@theme/Layout/Provider';
import type {WrapperProps} from '@docusaurus/types';
import { ToastContainer, Bounce } from 'react-toastify'

type Props = WrapperProps<typeof ProviderType>;

export default function ProviderWrapper(props: Props): ReactNode {
  return (
    <>
      <Provider {...props} />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
        toastStyle={{
          width: 800,
          maxWidth: '100vw',
        }}
      />
    </>
  );
}
