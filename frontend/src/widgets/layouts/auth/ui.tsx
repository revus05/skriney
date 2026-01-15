import React, { FC, ReactNode } from 'react'
import { DeleteSignInSessionStorageItem } from 'features/auth/sign-in/lib/delete-sign-in-session-storage-item'
import { DeleteSignOutSessionStorageItem } from 'features/auth/sign-out/lib/delete-sign-out-session-storage-item'

type AuthLayoutType = {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutType> = async ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <DeleteSignInSessionStorageItem />
      <DeleteSignOutSessionStorageItem />
    </>
  )
}

export const withAuthLayout = (Component: React.FC) => {
  const WrappedComponent = () => (
    <AuthLayout>
      <Component />
    </AuthLayout>
  )

  WrappedComponent.displayName = `withAuthLayout(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
