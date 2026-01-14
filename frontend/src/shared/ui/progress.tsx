import { ComponentProps, FC } from 'react'
import { cn } from 'shared/lib'

interface ProgressType extends ComponentProps<'div'> {
  value: number
}

export const Progress: FC<ProgressType> = ({ value, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-bg-neutral-tertiary/70 h-3 overflow-hidden rounded-full border backdrop-blur-[32px]',
        className,
      )}
      {...props}
    >
      <div
        className={'h-full rounded-full'}
        style={{
          width: `calc(${value}% + 6px)`,
          background:
            'linear-gradient(90deg, color-mix(in oklab, var(--color-bg-neutral-inverse-primary) 70%, transparent) 0%, color-mix(in oklab, var(--color-bg-neutral-inverse-tertiary) 70%, transparent) 100%)',
        }}
      ></div>
    </div>
  )
}
