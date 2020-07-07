import React from 'react'
import { UseToastOptions } from '../hooks/useToast'

const classes = [
  'border-red-200',
  'border',
  'w-1/4',
  'p-2',
  'rounded',
  'bg-gray-900',
  'shadow-lg',
  'text-center',
  'fixed',
]

export const Toast: React.FC<UseToastOptions> = ({
  position = 'bottomCenter',
  text,
}) => {
  return (
    <div className={`${classes.join(' ')}`} style={styles[position]}>
      {text}
    </div>
  )
}

const styles = {
  bottomCenter: {
    left: '50%',
    bottom: '2vh',
    transform: 'translate(-50%, 0px)',
  },
  topCenter: {
    left: '50%',
    top: '2vh',
    transform: 'translate(-50%, 0px)',
  },
  topRight: {
    right: '2vh',
    top: '5vh',
  },
}
