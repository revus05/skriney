'use client'

import {
  Select as HeroUiSelect,
  SelectItem as HeroUiSelectItem,
  SharedSelection,
  SelectProps as HeroUiSelectProps,
} from '@heroui/react'
import { Key, ReactNode, useState } from 'react'
import { cn, useAppSelector } from 'shared/lib'
import { Icons } from 'shared/ui/icons'

type SelectProps<T extends string | null> = {
  label: string
  value: T
  onValueChangeAction: (value: T) => void
  children: ReactNode
  disallowEmptySelection?: boolean
  classNames?: HeroUiSelectProps['classNames']
} & Omit<
  HeroUiSelectProps,
  'selectedKeys' | 'onSelectionChange' | 'value' | 'onValueChange'
>

export const Select = <T extends string | null>({
  label,
  classNames,
  children,
  onValueChangeAction,
  value,
  disallowEmptySelection = true,
  isOpen,
  ...props
}: SelectProps<T>) => {
  const [open, setOpen] = useState(isOpen)

  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.animationEnabled,
    ) ?? true

  const handleSelectionChange = (keys: SharedSelection) => {
    if (keys === 'all') return

    const selectedKey = Array.from(keys as Set<Key>)[0]
    if (selectedKey !== undefined) {
      onValueChangeAction(selectedKey as T)
    } else if (!disallowEmptySelection) {
      onValueChangeAction('' as T)
    }
  }

  return (
    <HeroUiSelect
      aria-label={label}
      classNames={{
        trigger: cn(
          'hover:!bg-bg-neutral-secondary focus-within:!bg-bg-neutral-secondary backdrop-blur-[32px] active:scale-[0.98]',
          'px-4 !h-9 !min-h-9 border bg-transparent cursor-pointer outline-none shadow-sm active:shadow-md',
          animationEnabled &&
            'transition duration-150 motion-reduce:transition-none',
          open && 'scale-[0.98]',
          classNames?.trigger,
        ),
        popoverContent: cn('bg-bg-neutral-primary', classNames?.popoverContent),
        value: cn(
          'font-semibold',
          value ? '!text-text-neutral-primary' : '!text-text-neutral-tertiary',
          classNames?.value,
        ),
        selectorIcon: cn(
          value ? '!fill-icon-neutral-primary' : '!fill-icon-neutral-tertiary',
          classNames?.selectorIcon,
        ),
        errorMessage: cn(
          'text-text-semantic-error-primary text-sm',
          classNames?.errorMessage,
        ),
        mainWrapper: cn('[&_>_div]:p-0', classNames?.mainWrapper),
      }}
      size={'sm'}
      selectedKeys={value ? [value] : []}
      onSelectionChange={handleSelectionChange}
      selectorIcon={<Icons.chevronDown />}
      disallowEmptySelection={disallowEmptySelection}
      isOpen={open}
      onOpenChange={setOpen}
      {...props}
    >
      {children}
    </HeroUiSelect>
  )
}

export { HeroUiSelectItem as SelectItem }
