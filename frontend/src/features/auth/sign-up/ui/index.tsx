'use client'

import { Button, Input, Translate } from 'shared/ui'
import {
  setShowPassword,
  setShowRepeatPassword,
  SignUpFormData,
  useSignUpForm,
  useSignUpSubmit,
} from '../model'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'
import Link from 'next/link'
import { paths } from 'shared/navigation'

export const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const form = useSignUpForm()

  const onSubmit = useSignUpSubmit(form.setError)

  const showPassword = useAppSelector(
    (state) => state.signUpFormSlice.showPassword,
  )
  const showRepeatPassword = useAppSelector(
    (state) => state.signUpFormSlice.showRepeatPassword,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = form

  const handleShowPasswordClick = () => dispatch(setShowPassword(!showPassword))
  const handleShowRepeatPasswordClick = () =>
    dispatch(setShowRepeatPassword(!showRepeatPassword))

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof SignUpFormData)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-neutral-primary/70 flex w-[400px] flex-col gap-6 rounded-2xl border p-8 shadow-sm backdrop-blur-[32px]"
    >
      <h2 className="text-xl font-semibold">
        <Translate value="auth.signUp.title" />
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            {...register('username')}
            errorMessage={errors.username?.message}
            type="text"
            placeholder={t('auth.signUp.username')}
            iconStart="user"
            setFocus={handleSetFocus}
          />
          <Input
            {...register('email')}
            errorMessage={errors.email?.message}
            type="email"
            placeholder={t('auth.signUp.email')}
            iconStart="email"
            setFocus={handleSetFocus}
          />
          <Input
            {...register('password')}
            errorMessage={errors.password?.message}
            placeholder={t('auth.signUp.password')}
            iconStart="lock"
            type={showPassword ? 'text' : 'password'}
            iconEnd={showPassword ? 'eyeSlash' : 'eye'}
            onIconEndClick={handleShowPasswordClick}
            setFocus={handleSetFocus}
          />
          <Input
            {...register('repeatPassword')}
            errorMessage={errors.repeatPassword?.message}
            placeholder={t('auth.signUp.repeatPassword')}
            iconStart="lock"
            type={showRepeatPassword ? 'text' : 'password'}
            iconEnd={showRepeatPassword ? 'eyeSlash' : 'eye'}
            onIconEndClick={handleShowRepeatPasswordClick}
            setFocus={handleSetFocus}
          />
        </div>
        <Link
          href={paths.signIn}
          className={'text-text-neutral-tertiary font-semibold'}
        >
          <Translate value="auth.signUp.signIn" />
        </Link>
        <Button className={'mx-auto'} type={'submit'}>
          <Translate value="auth.signUp.submit" />
        </Button>
      </div>
    </form>
  )
}
