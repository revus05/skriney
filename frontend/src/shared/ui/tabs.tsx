'use client'

import { Icons } from 'shared/ui'
import { createElement, FC } from 'react'
import { Tab as HeroUiTab, Tabs as HeroUiTabs } from '@heroui/tabs'

type Option = {
  icon: string
  value: string
  onClick?: () => void
}

type TabsProps = {
  label: string
  value: string
  onValueChangeAction: (value: string) => void
  options: Option[]
}

export const Tabs: FC<TabsProps> = ({
  label,
  value,
  onValueChangeAction,
  options,
}) => {
  const handleClick = (newValue: string, onClick?: () => void) => {
    onValueChangeAction(newValue)
    if (onClick) {
      onClick()
    }
  }

  return (
    <HeroUiTabs
      aria-label={label}
      classNames={{
        tabList:
          'bg-transparent rounded-xl border p-1 backdrop-blur-[32px] gap-1 shadow-sm',
        cursor: '!bg-bg-neutral-tertiary/70 outline-none',
        tab: 'p-1 rounded size-7 transition active:scale-[0.95] will-change-transform',
      }}
      selectedKey={value}
    >
      {options.map((option) => (
        <HeroUiTab
          key={option.value}
          onClick={() => handleClick(option.value, option.onClick)}
          title={createElement(Icons[option.icon], { className: 'size-5' })}
        />
      ))}
    </HeroUiTabs>
  )
}
