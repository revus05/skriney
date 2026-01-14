'use client'

import React, {
  ComponentProps,
  FC,
  useState,
  useRef,
  useLayoutEffect,
} from 'react'
import { Icons } from 'shared/ui'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { cn } from 'shared/lib'
import Picker from '@emoji-mart/react'

interface EmojiTitleType extends ComponentProps<'div'> {
  emoji?: string
  title: string
  onEmojiChange?: (emoji: string) => void
  onTitleChange?: (title: string) => void
}

export const EmojiTitle: FC<EmojiTitleType> = ({
  emoji,
  title,
  className,
  onEmojiChange,
  onTitleChange,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(title)

  const inputRef = useRef<HTMLInputElement>(null)
  const measurerRef = useRef<HTMLSpanElement>(null)

  const handleDoubleClick = () => {
    if (!onTitleChange) return
    setTempValue(title)
    setIsEditing(true)
  }

  useLayoutEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(tempValue.length, tempValue.length)
    }
  }, [isEditing, tempValue.length])

  useLayoutEffect(() => {
    if (isEditing && measurerRef.current && inputRef.current) {
      measurerRef.current.textContent = tempValue || ' '
      const width = measurerRef.current.offsetWidth
      inputRef.current.style.width = `${width + 8}px`
    }
  }, [tempValue, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value)
  }

  const handleSave = () => {
    setIsEditing(false)
    if (onTitleChange && tempValue.trim() && tempValue !== title) {
      onTitleChange(tempValue.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <div
      className={cn('flex items-center gap-2 text-base leading-5', className)}
      {...props}
    >
      {!onEmojiChange ? (
        emoji ? (
          <span className={'cursor-pointer'}>{emoji}</span>
        ) : (
          <Icons.emojiPlaceholder className={'shrink-0 cursor-pointer'} />
        )
      ) : (
        <Popover placement="right">
          <PopoverTrigger>
            {emoji ? (
              <span className={'cursor-pointer'}>{emoji}</span>
            ) : (
              <Icons.emojiPlaceholder className={'shrink-0 cursor-pointer'} />
            )}
          </PopoverTrigger>
          <PopoverContent className={'bg-transparent p-0'}>
            <Picker
              data={async () => {
                const response = await fetch(
                  'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
                )
                return response.json()
              }}
              onEmojiSelect={({ native }: { native: string }) =>
                onEmojiChange(native)
              }
              previewPosition="none"
              skinTonePosition="none"
            />
          </PopoverContent>
        </Popover>
      )}

      {isEditing ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={tempValue}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="h-5 min-w-[40px] cursor-text rounded border border-gray-300 font-semibold outline-none"
            style={{ width: '40px' }}
          />
          <span
            ref={measurerRef}
            className="pointer-events-none invisible absolute top-0 left-0 h-5 px-1 font-semibold whitespace-nowrap"
            aria-hidden="true"
          >
            {tempValue || ' '}
          </span>
        </div>
      ) : (
        <span
          className="h-5 cursor-text truncate font-semibold whitespace-nowrap"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </span>
      )}
    </div>
  )
}
