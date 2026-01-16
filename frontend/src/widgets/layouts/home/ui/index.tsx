import React, { FC, ReactNode } from 'react'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { paths } from 'shared/navigation'
import { Header } from './header'
import { Aside } from './aside'
import { DeleteSignInSessionStorageItem } from 'features/auth/sign-in/lib/delete-sign-in-session-storage-item'
import { DeleteSignOutSessionStorageItem } from 'features/auth/sign-out/lib/delete-sign-out-session-storage-item'

type HomeLayoutType = {
  children: ReactNode
}

const HomeLayout: FC<HomeLayoutType> = async ({ children }) => {
  const cookiesObj = await cookies()
  const headersObj = await headers()

  const jwt = cookiesObj.get('jwt')?.value

  console.log('================ home-layout ==================')
  console.log('jwt:', jwt)

  headersObj.forEach((header) => console.log(header))

  console.log('\n\n')

  if (!jwt) {
    redirect(paths.signIn)
  }

  return (
    <>
      <main className={'p-2.5'}>
        <Header />
        <div className="mt-8 flex gap-8 pr-8">
          <Aside />
          {children}
        </div>
      </main>
      <DeleteSignInSessionStorageItem />
      <DeleteSignOutSessionStorageItem />
    </>
  )
}

export const withHomeLayout = (Component: React.FC) => {
  const WrappedComponent = () => (
    <HomeLayout>
      <Component />
    </HomeLayout>
  )

  WrappedComponent.displayName = `withHomeLayout(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
