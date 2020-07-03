import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
}

const styles = [
  'cursor-pointer',
  'hover:bg-gray-700',
  'hover:text-teal-400',
  'cursor-pointer',
  'rounded',
  'px-3',
  'py-2',
  'flex',
  'flex-row',
  'items-center',
]

export const SideBarElement = React.forwardRef<HTMLDivElement, Props>(
  function SideBarElement({ children, title, ...props }, ref) {
    return (
      <div className={styles.join(' ')} {...props} ref={ref}>
        {children && <div>{children}</div>}
        <div className="ml-1">{title}</div>
      </div>
    )
  }
)
