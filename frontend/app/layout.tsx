import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import React from 'react'
import { Providers } from 'app/providers'
import { getPreloadedState } from 'entities/user'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Skriney',
  description: 'App to track expenses',
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { theme, ...preloadedState } = await getPreloadedState()

  console.log({ theme, preloadedState })

  return (
    <html
      lang={preloadedState.language.toLowerCase()}
      className={theme.toLowerCase()}
    >
      <body
        className={`${roboto.variable} relative z-0 min-h-screen antialiased`}
      >
        <Providers preloadedState={preloadedState}>{children}</Providers>
        <div className={'absolute top-0 left-0 z-[-1] h-full w-full'}>
          <div className={'relative h-full w-full overflow-hidden'}>
            <div
              className={
                'animate-fly-circle absolute top-1/4 left-[30vw] h-[50svh] w-[50vw] -translate-1/2 rotate-[-33deg] rounded-[50%] bg-[#CC9766] opacity-100 blur-[25vw] motion-reduce:animate-none'
              }
            />
            <div
              className={
                'animate-gradient-pulse absolute right-0 -bottom-1/4 h-[50svh] w-[20vw] rotate-[30deg] rounded-[50%] bg-[#19ad64] opacity-30 blur-[25vw] motion-reduce:animate-none'
              }
            />
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
