import React from 'react'
import ReactDOM from 'react-dom'
import { Toast } from '../components/Toast'

type UseToastHook = (options: UseToastOptions) => void

export interface UseToastOptions {
  text: string
  position?: 'bottom-center' | 'top-center' | 'top-right'
  variant?: 'danger' | 'primary' | 'accent' | 'info' | 'warning'
  timeout?: number
}

export function useToast(): UseToastHook {
  const startToast = (options: UseToastOptions) => {
    ReactDOM.render(
      <Toast {...options} />,
      document.getElementById('notifications')
    )

    setTimeout(
      () => {
        const node = document.getElementById('notifications')
        if (node) {
          ReactDOM.unmountComponentAtNode(node)
        }
      },
      typeof options.timeout === 'undefined' ? 3200 : options.timeout + 200
    )
  }

  return startToast
}
