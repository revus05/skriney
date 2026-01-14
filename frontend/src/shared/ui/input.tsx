'use client'

import React, { ComponentProps, createElement, FC, useRef } from 'react'
import { cn, useAppSelector } from 'shared/lib'
import { Button, Icons } from 'shared/ui'

type InputProps = ComponentProps<'input'> & {
  iconStart?: string
  iconEnd?: string
  value?: string
  onValueChange?: (newValue: string) => void
  onIconEndClick?: (e: React.MouseEvent) => void
  inputClassName?: string
  errorMessage?: string | null
  setFocus?: (name: string) => void
}

export const Input: FC<InputProps> = ({
  iconStart,
  iconEnd,
  onIconEndClick,
  value,
  onValueChange,
  type = 'text',
  className,
  inputClassName,
  errorMessage,
  setFocus,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    } else {
      if (setFocus) {
        setFocus(props.name || '')
      }
    }
  }

  const handleEndButtonMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onIconEndClick) {
      onIconEndClick(e)
    }
  }

  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.animationEnabled,
    ) ?? true

  return (
    <div>
      <div
        onClick={handleContainerClick}
        className={cn(
          'hover:bg-bg-neutral-secondary flex h-9 w-full items-center justify-between gap-4 rounded-lg border shadow-sm ' +
            'focus-within:!bg-bg-brand-tertiary/70 cursor-text px-4 font-semibold',
          'active:scale-[0.98] active:shadow-md',
          iconEnd ? 'py-1' : 'py-2',
          errorMessage && 'border-border-semantic-error-primary',
          animationEnabled &&
            'transition duration-150 motion-reduce:transition-none',
          className,
        )}
      >
        <div className={'flex grow items-center gap-4'}>
          {iconStart &&
            createElement(Icons[iconStart], {
              className: cn(
                'fill-icon-neutral-tertiary transition size-5',
                value && 'fill-icon-neutral-primary',
              ),
            })}
          <input
            ref={inputRef}
            type={type}
            className={cn(
              'placeholder:text-text-neutral-tertiary w-full grow outline-none',
              inputClassName,
            )}
            value={value}
            onChange={(e) => onValueChange && onValueChange(e.target.value)}
            {...props}
          />
        </div>
        {iconEnd && (
          <Button
            variant="icon"
            onMouseDown={handleEndButtonMouseDown}
            tabIndex={-1}
          >
            {createElement(Icons[iconEnd], {
              className: cn(
                'fill-icon-neutral-tertiary transition size-5',
                value && 'fill-icon-neutral-primary',
              ),
            })}
          </Button>
        )}
      </div>
      {errorMessage && (
        <span className={'text-text-semantic-error-primary'}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
