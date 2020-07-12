import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

interface Props {
  query: any
  isEmptyFn?: (data: any) => boolean
  children: (data: any, empty?: JSX.Element | null) => JSX.Element
  emptyRender?: JSX.Element | null
}

export const Query = ({
  children,
  query,
  isEmptyFn,
  emptyRender,
}: Props): JSX.Element => {
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

  const dataIsEmpty = !!isEmptyFn && isEmptyFn(query.data)
  if (dataIsEmpty && !emptyRender) {
    return <div>Nothing to show here</div>
  }

  return children(query.data, dataIsEmpty ? emptyRender : null)
}
