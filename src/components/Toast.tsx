import classNames from 'classnames'
import React, { HTMLProps, Ref } from 'react'
import { UseToastOptions } from '../hooks/useToast'

type Props = UseToastOptions & HTMLProps<HTMLDivElement>

export const Toast = React.forwardRef<HTMLDivElement, Props>(function Toast(
  { position = 'bottom-center', variant = 'primary', text, timeout },
  ref: Ref<HTMLDivElement>
) {
  const [unmounting, setUnmounting] = React.useState(false)
  React.useEffect(() => {
    if (timeout) {
      setTimeout(() => setUnmounting(true), timeout)
    }
  }, [timeout])

  return (
    <div
      ref={ref}
      className={classNames('toast', variant, position, {
        mounting: !unmounting,
        unmounting,
      })}
    >
      {text}
    </div>
  )
})
