import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

NProgress.configure({
  showSpinner: false,
  trickleRate: 0.2,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
