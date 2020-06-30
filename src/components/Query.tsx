import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

interface Props {
  query: ReturnType<typeof useQuery>
  isEmptyFn: (data: any) => boolean
  children: (data: any) => JSX.Element
}

export const Query = ({ children, query, isEmptyFn }: Props): JSX.Element => {
  if (query.error) {
    if (/not authenticated/i.test(query.error.message)) {
      NProgress.done()
      return <Redirect to="/login" />
    }
    return <div>Errored</div>
  }

  if (query.loading) {
    NProgress.start()
    return <></>
  } else if (isEmptyFn(query.data)) {
    return <div>Nothing to show here</div>
  }

  NProgress.done()
  return children(query.data)
}
