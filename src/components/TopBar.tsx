import React from 'react'
import { Button } from './Button'
import { Link, useHistory } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'

export const TopBar: React.FC = () => {
  const history = useHistory()
  const { isAuthenticated } = useAuthStore()

  let rhs
  if (isAuthenticated) {
    rhs = <Button onClick={() => console.log('implement me')}>Log out</Button>
  } else {
    rhs = <Button onClick={() => history.push('/login')}>Log in</Button>
  }

  return (
    <div className="bg-gray-700 px-1 py-3 w-full items-center flex flex-row text-gray-200">
      <div className="flex flex-grow flex-row items-center">
        <div className="px-3">
          <Link
            to="/"
            className="hover:underline hover:text-indigo-300 text-gray-200"
          >
            Go Home
          </Link>
        </div>
        <div className="px-3">
          <Link
            to="/about"
            className="hover:underline hover:text-indigo-300 text-gray-200"
          >
            About
          </Link>
        </div>
        <div className="px-3">
          <Link
            to="/tasks"
            className="hover:underline hover:text-indigo-300 text-gray-200"
          >
            Tasks
          </Link>
        </div>
      </div>
      <div>
        <div className="px-3">{rhs}</div>
      </div>
    </div>
  )
}
