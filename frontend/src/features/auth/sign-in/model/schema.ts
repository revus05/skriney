import { z } from 'zod'
import { passwordSchema } from 'shared/schemas'
import { Translate } from 'shared/i18n'

export const signInSchema = (t: Translate) =>
  z.object({
    email: z.string().trim().nonempty(t('auth.validation.emailRequired')),
    password: passwordSchema(t),
  })

export type SignInFormData = z.infer<ReturnType<typeof signInSchema>>
