import {
  toast, // eslint-disable-line no-restricted-imports
  ToastContent,
  ToastOptions,
} from 'react-toastify'

// It seems like calling `toast.<method>` can trigger a cascade of re-renders.
// This can happen in the initializer function of `useState`.
// This custom utility is designed to mitigate that by adding a timeout.

const COMMON_TIMEOUT = 10 // ms

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CustomToast {

  export function info<TData = unknown>(
    content: ToastContent<TData>,
    options?: ToastOptions<TData>
  ): void {
    setTimeout(() => {
      toast.info(content, options)
    }, COMMON_TIMEOUT)
  }

  export function success<TData = unknown>(
    content: ToastContent<TData>,
    options?: ToastOptions<TData>
  ): void {
    setTimeout(() => {
      toast.success(content, options)
    }, COMMON_TIMEOUT)
  }

  export function warn<TData = unknown>(
    content: ToastContent<TData>,
    options?: ToastOptions<TData>
  ): void {
    setTimeout(() => {
      toast.warn(content, options)
    }, COMMON_TIMEOUT)
  }

  export function error<TData = unknown>(
    content: ToastContent<TData>,
    options?: ToastOptions<TData>
  ): void {
    setTimeout(() => {
      toast.error(content, options)
    }, COMMON_TIMEOUT)
  }

}
