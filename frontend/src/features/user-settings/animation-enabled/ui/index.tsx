'use client'

import { Switch } from 'shared/ui'
import { useUpdateAnimationEnabledSubmit } from '../model'
import { useAppSelector } from 'shared/lib'

export const UpdateAnimationEnabledSwitch = () => {
  const updateAnimationEnabled = useUpdateAnimationEnabledSubmit()

  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.animationEnabled,
    ) ?? true

  return (
    <Switch
      isSelected={animationEnabled}
      onValueChange={(animationEnabled) =>
        updateAnimationEnabled({ animationEnabled })
      }
    />
  )
}
