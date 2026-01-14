import { Switch as HeroUiSwitch } from '@heroui/switch'
import { ComponentProps, FC } from 'react'

type SwitchProps = ComponentProps<typeof HeroUiSwitch>

export const Switch: FC<SwitchProps> = (props) => {
  return (
    <HeroUiSwitch
      classNames={{
        wrapper:
          'rounded-lg border shadow-sm !bg-transparent backdrop-blur-[32px]',
        thumb: 'rounded-[6px] bg-bg-neutral-inverse-primary',
      }}
      {...props}
    />
  )
}
