import { z } from 'zod'
import { Translate } from 'shared/i18n'

export const createBankAccountSchema = (t: Translate) =>
  z.object({
    title: z
      .string()
      .trim()
      .nonempty(t('bankAccounts.validation.titleRequired')),
    initialBalance: z.string().transform((str, ctx) => {
      const trimmed = str.trim()
      if (trimmed === '') {
        return '0'
      }
      const num = Number(trimmed)
      if (isNaN(num)) {
        ctx.addIssue({
          code: 'custom',
          message: t('bankAccounts.validation.initialBalanceMustBeNumber'),
        })
        return z.NEVER
      }
      return trimmed
    }),
    currency: z
      .string()
      .trim()
      .nonempty(t('bankAccounts.validation.currencyRequired')),
  })

export type CreateBankAccountFormData = z.infer<
  ReturnType<typeof createBankAccountSchema>
>
