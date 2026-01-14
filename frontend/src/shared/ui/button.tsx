import { ComponentProps, createElement, FC } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { cva } from 'class-variance-authority'
import { cn, useAppSelector } from 'shared/lib'
import { Icons, Loader } from 'shared/ui'

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    iconStart?: string
    iconEnd?: string
    loading?: boolean
  }

const buttonVariants = cva(
  'relative cursor-pointer w-fit rounded-lg py-2 px-8 font-semibold text-text-brand-inverse active:scale-[0.98] flex gap-2.5 items-center disabled:active:scale-100 disabled:cursor-default',
  {
    variants: {
      variant: {
        primary:
          'bg-bg-brand-primary/70 hover:bg-bg-brand-secondary disabled:hover:bg-bg-brand-primary/70 hover:text-text-brand-primary [&_svg]:fill-icon-brand-inverse hover:[&_svg]:fill-icon-brand-primary shadow-sm active:shadow-md disabled:shadow-md',
        icon: 'p-1 hover:bg-border-neutral-primary rounded-md hover:shadow-md active:shadow-xs active:scale-[0.95]',
        ghost:
          'bg-none hover:bg-border-neutral-primary hover:shadow-sm active:shadow-md',
        danger:
          'bg-bg-semantic-error-bold text-text-semantic-error-inverse hover:bg-bg-semantic-error-subtle hover:text-text-semantic-error-primary',
      },
      animationEnabled: {
        true: 'transition duration-150 motion-reduce:transition-none',
        false: 'transition-none duration-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export const Button: FC<ButtonProps> = ({
  type = 'button',
  iconStart,
  iconEnd,
  variant,
  className,
  children,
  disabled,
  loading = false,
  ...props
}) => {
  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.animationEnabled,
    ) ?? true

  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, animationEnabled }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {iconStart &&
        createElement(Icons[iconStart], {
          className: cn(
            'fill-icon-neutral-tertiary size-5 transition',
            loading && 'opacity-0',
            animationEnabled
              ? 'transition duration-150 motion-reduce:transition-none'
              : 'duration-0 transition-none',
          ),
        })}
      {children && (
        <span className={cn(loading && 'opacity-0')}>{children}</span>
      )}
      {iconEnd &&
        createElement(Icons[iconEnd], {
          className: cn(
            'fill-icon-neutral-tertiary size-5 transition',
            loading && 'opacity-0',
            animationEnabled
              ? 'transition duration-150 motion-reduce:transition-none'
              : 'duration-0 transition-none',
          ),
        })}
      {loading && <Loader />}
    </button>
  )
}
