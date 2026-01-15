'use client'

import { useEffect } from 'react'

export const DeleteSignInSessionStorageItem = () => {
  useEffect(() => {
    if (sessionStorage.getItem('pending-sign-in') === 'true') {
      sessionStorage.removeItem('pending-sign-in')
    }
  }, [])

  return null
}
