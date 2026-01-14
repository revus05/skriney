'use client'

import { FC, ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/system'
import { useAppSelector } from 'shared/lib'

type HeroUIProviderWrapperProps = {
  children: ReactNode
}

export const HeroUIProviderWrapper: FC<HeroUIProviderWrapperProps> = ({
  children,
}) => {
  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.animationEnabled,
    ) ?? true

  return (
    <HeroUIProvider disableAnimation={!animationEnabled}>
      {children}
    </HeroUIProvider>
  )
}
