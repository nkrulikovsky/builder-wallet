import { useRef } from 'react'

export const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && (htmlElRef as any).current.focus()
  }

  return [htmlElRef, setFocus]
}
