import React from 'react'
import './assets/styles.css'
import { TopBar } from './components/TopBar'

export const App: React.FC = () => {
  return (
    <div>
      <TopBar />
      <div className="container mx-auto">This should be the content</div>
    </div>
  )
}
