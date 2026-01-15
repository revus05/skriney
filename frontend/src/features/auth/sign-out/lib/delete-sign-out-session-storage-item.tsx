'use client'

import { useEffect } from 'react'

export const DeleteSignOutSessionStorageItem = () => {
  useEffect(() => {
    if (sessionStorage.getItem('pending-sign-out') === 'true') {
      sessionStorage.removeItem('pending-sign-out')
    }
  }, [])

  return null
}
