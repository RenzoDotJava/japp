import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

export function useToggle(
  defaultValue?: boolean,
): { isOpen: boolean, toggle: () => void, setIsOpen: Dispatch<SetStateAction<boolean>> } {
  const [isOpen, setIsOpen] = useState(!!defaultValue)

  const toggle = useCallback(() => {
    setIsOpen(x => !x)
  }, [])

  return { isOpen, toggle, setIsOpen }
}