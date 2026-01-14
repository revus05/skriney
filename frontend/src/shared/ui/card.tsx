import { ComponentProps, FC } from 'react'
import { cn } from 'shared/lib'

export const Card: FC<ComponentProps<'div'>> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-bg-neutral-tertiary/70 rounded-3xl border px-6 py-4 backdrop-blur-[32px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
