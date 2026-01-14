import { z } from 'zod'
import { Translate } from 'shared/i18n'

export const updateBankAccountSchema = (t: Translate) =>
  z.object({
    title: z
      .string()
      .trim()
      .nonempty(t('bankAccounts.validation.titleRequired')),
    emoji: z.string(),
  })

export type UpdateBankAccountFormData = z.infer<
  ReturnType<typeof updateBankAccountSchema>
>
