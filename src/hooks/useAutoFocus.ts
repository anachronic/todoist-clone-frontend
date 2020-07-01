import { RefObject, useRef } from 'react'

export type AutoFocusHook = () => [RefObject<HTMLInputElement>, () => void]

export const useAutoFocus: AutoFocusHook = () => {
  const ref = useRef<HTMLInputElement>(null)
  const setFocus = () => ref.current && ref.current.focus()

  return [ref, setFocus]
}
