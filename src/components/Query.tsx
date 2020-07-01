import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

interface Props {
  query: any
  isEmptyFn?: (data: any) => boolean
  children: (data: any) => JSX.Element
}

export const Query = ({ children, query, isEmptyFn }: Props): JSX.Element => {
  useEffect(() => {
    NProgress.start()
  }, [])

  useEffect(() => {
    if (!query.loading) {
      NProgress.done()
    }
  }, [query.loading])

  if (query.error) {
    if (/not authenticated/i.test(query.error.message)) {
      return <Redirect to="/login" />
    }
    return <div>Errored</div>
  }

  if (query.loading) {
    return <></>
  }

  if (isEmptyFn && isEmptyFn(query.data)) {
    return <div>Nothing to show here</div>
  }

  return children(query.data)
}
