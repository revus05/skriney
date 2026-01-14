import { z } from 'zod'
import { passwordSchema } from 'shared/schemas'
import { Translate } from 'shared/i18n'

export const signUpSchema = (t: Translate) =>
  z
    .object({
      username: z
        .string()
        .trim()
        .nonempty(t('auth.validation.usernameRequired')),
      email: z.string().trim().nonempty(t('auth.validation.emailRequired')),
      password: passwordSchema(t),
      repeatPassword: passwordSchema(t),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('auth.validation.passwordsNotMatch'),
      path: ['repeatPassword'],
    })

export type SignUpFormData = z.infer<ReturnType<typeof signUpSchema>>
