import { z } from 'zod'
import { Translate } from 'shared/i18n'

export const createCategorySchema = (t: Translate) =>
  z.object({
    title: z.string().trim().nonempty(t('categories.validation.titleRequired')),
    emoji: z.string(),
  })

export type CreateCategoryFormData = z.infer<
  ReturnType<typeof createCategorySchema>
>
