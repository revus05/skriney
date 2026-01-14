import { z } from 'zod'
import { Translate } from 'shared/i18n'

export const updateTransactionSchema = (t: Translate) =>
  z.object({
    amount: z.string().transform((str, ctx) => {
      const trimmed = str.trim()
      if (trimmed === '') {
        ctx.addIssue({
          code: 'custom',
          message: t('transactions.validation.amountRequired'),
        })
        return z.NEVER
      }
      const num = Number(trimmed)
      if (isNaN(num)) {
        ctx.addIssue({
          code: 'custom',
          message: t('transactions.validation.amountMustBeNumber'),
        })
        return z.NEVER
      }
      if (num === 0) {
        ctx.addIssue({
          code: 'custom',
          message: t('transactions.validation.amountCantBeZero'),
        })
        return z.NEVER
      }
      return trimmed
    }),
    categoryUuid: z
      .string()
      .trim()
      .nonempty(t('transactions.validation.categoryRequired')),
    bankAccountUuid: z
      .string()
      .trim()
      .nonempty(t('transactions.validation.bankAccountRequired')),
    currency: z
      .string()
      .trim()
      .nonempty(t('transactions.validation.currencyRequired')),
    description: z
      .string()
      .trim()
      .max(128, t('transactions.validation.descriptionMaxLength128')),
  })

export type UpdateTransactionFormData = z.infer<
  ReturnType<typeof updateTransactionSchema>
>
