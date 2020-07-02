import React from 'react'

interface Props {
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

export const SideBarElement: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.join(' ')}>
      {children && <div>{children}</div>}
      <div className="ml-1">{title}</div>
    </div>
  )
}
