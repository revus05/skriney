import { z } from 'zod'
import { Translate } from 'shared/i18n'

export const passwordSchema = (t: Translate) =>
  z
    .string()
    .min(8, t('auth.validation.passwordMinLength'))
    .max(64, t('auth.validation.passwordMaxLength'))
    .trim()
