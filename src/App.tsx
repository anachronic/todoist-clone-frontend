import React from 'react'
import './assets/styles.css'
import { TopBar } from './components/TopBar'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './Routes'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <TopBar />
        <div className="container mx-auto mt-3">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  )
}
