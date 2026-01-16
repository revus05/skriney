'use client'

import { Button, Input, Translate } from 'shared/ui'
import {
  setShowPassword,
  SignInFormData,
  useSignInForm,
  useSignInSubmit,
} from '../model'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { paths } from 'shared/navigation'
import { useTranslation } from 'shared/i18n'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const SignInForm = () => {
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useSignInForm()

  const { onSubmit, isLoading } = useSignInSubmit()

  const showPassword = useAppSelector(
    (state) => state.signInFormSlice.showPassword,
  )

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof SignInFormData)

  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('pending-sign-in') === 'true') {
      setIsRedirecting(true)
      sessionStorage.removeItem('pending-sign-in')
    }
  }, [isLoading])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-neutral-primary/70 flex w-100 flex-col gap-6 rounded-2xl border p-8 shadow-sm backdrop-blur-[32px]"
    >
      <h2 className="text-xl font-semibold">
        <Translate value="auth.signIn.title" />
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            {...register('email')}
            errorMessage={errors.email?.message}
            type="email"
            placeholder={t('auth.signIn.email')}
            iconStart="email"
            setFocus={handleSetFocus}
          />
          <Input
            {...register('password')}
            errorMessage={errors.password?.message}
            placeholder={t('auth.signIn.password')}
            iconStart="lock"
            type={showPassword ? 'text' : 'password'}
            iconEnd={showPassword ? 'eyeSlash' : 'eye'}
            onIconEndClick={(e) => {
              e.stopPropagation()
              dispatch(setShowPassword(!showPassword))
            }}
            setFocus={handleSetFocus}
          />
        </div>
        <Link
          href={paths.signUp}
          className={'text-text-neutral-tertiary font-semibold'}
        >
          <Translate value="auth.signIn.createAccount" />
        </Link>
        <Button
          className={'mx-auto'}
          type={'submit'}
          loading={isLoading || isRedirecting}
        >
          <Translate value="auth.signIn.submit" />
        </Button>
      </div>
    </form>
  )
}
