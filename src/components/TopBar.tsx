import React from 'react'
import { Button } from './Button'

export const TopBar: React.FC = () => {
  return (
    <div className="bg-gray-700 px-1 py-3 w-full items-center flex flex-row text-gray-200">
      <div className="flex flex-grow flex-row items-center">
        <div className="px-3">
          <a
            href="#"
            className="hover:underline hover:text-indigo-300 text-gray-200"
          >
            Go home
          </a>
        </div>
      </div>
      <div>
        <div className="px-3">
          <Button>Log in</Button>
        </div>
      </div>
    </div>
  )
}
