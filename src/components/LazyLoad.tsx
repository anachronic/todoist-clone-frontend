import React, { useEffect } from 'react'
import 'nprogress/nprogress.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

export const LazyLoad: React.FC = () => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return <></>
}
