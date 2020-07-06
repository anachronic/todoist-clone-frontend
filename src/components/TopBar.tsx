import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'
import { Button } from './Button'

interface Props {
  className?: string
}

export const TopBar: React.FC<Props> = ({ className = '' }) => {
  const history = useHistory()
  const authStore = useAuthStore()

  return useObserver(() => (
    <div
      className={`bg-gray-700 px-1 py-3 w-full items-center flex flex-row text-gray-200 ${className}`}
    >
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
        <div className="px-3">
          {authStore.isAuthenticated ? (
            <Button
              onClick={async () => {
                await authStore.logout()
                history.push('/login')
              }}
            >
              Log out
            </Button>
          ) : (
            <Button onClick={() => history.push('/login')}>Log in</Button>
          )}
        </div>
      </div>
    </div>
  ))
}
