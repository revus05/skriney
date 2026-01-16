import { Icons } from './icons'
import React, { ComponentProps, FC } from 'react'
import { cn } from 'shared/lib'
import Image from 'next/image'

interface UserImageType extends ComponentProps<'div'> {
  image?: string
  userColor?: string
  username?: string
  editing?: boolean
  size: number
}

const getGradient = (color?: string) => {
  switch (color) {
    case 'RED':
      return 'linear-gradient(135deg, #ff4e50, #f9d423)'
    case 'GREEN':
      return 'linear-gradient(135deg, #a8e063, #56ab2f)'
    case 'BLUE':
      return 'linear-gradient(135deg, #36d1dc, #5b86e5)'
    case 'YELLOW':
      return 'linear-gradient(135deg, #f7971e, #ffd200)'
    case 'ORANGE':
      return 'linear-gradient(135deg, #ff8008, #ffc837)'
    case 'PINK':
      return 'linear-gradient(135deg, #ff6a88, #ff99ac)'
    case 'CYAN':
      return 'linear-gradient(135deg, #06beb6, #48b1bf)'
    case 'MAGENTA':
      return 'linear-gradient(135deg, #d53369, #daae51)'
    case 'GRAY':
      return 'linear-gradient(135deg, #bdc3c7, #2c3e50)'
    case 'BLACK':
      return 'linear-gradient(135deg, #000000, #434343)'
    default:
      return 'linear-gradient(135deg, #ece9e6, #ffffff)'
  }
}

export const UserImage: FC<UserImageType> = ({
  image,
  userColor,
  username,
  className,
  editing = false,
  size,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative flex size-30 items-center justify-center overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      {image ? (
        <Image
          src={image}
          alt="user"
          width={size}
          height={size}
          className={'h-full w-full object-cover'}
          unoptimized
        />
      ) : (
        <div
          className={'flex h-full w-full items-center justify-center'}
          style={{ background: getGradient(userColor) }}
        >
          {username && (
            <span className={'text-4xl font-bold'}>
              {username[0].toUpperCase()}
            </span>
          )}
        </div>
      )}
      {editing && (
        <div
          className={
            'absolute top-1/2 left-1/2 flex h-full w-full -translate-1/2 cursor-pointer items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100'
          }
        >
          <Icons.image className={'size-12 fill-white'} />
        </div>
      )}
    </div>
  )
}
