import React from 'react'
import ReactDOM from 'react-dom'
import { Toast } from '../components/Toast'

type UseToastHook = (options: UseToastOptions) => void

export interface UseToastOptions {
  text: string
  position?: 'bottomCenter' | 'topCenter' | 'topRight'
  timeout?: number
}

// Yes, I realize this is not a hook...
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
      typeof options.timeout === 'undefined' ? 3000 : options.timeout
    )
  }

  return startToast
}
