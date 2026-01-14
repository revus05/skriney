import { UpdateDefaultBankAccountSelect } from 'features/user-settings/default-bank-account'
import { Translate } from 'shared/ui'
import { UpdateThemeSegmentControl } from 'features/user-settings/theme'
import { UpdateDefaultCurrencySelect } from 'features/user-settings/default-currency'
import { UpdateDefaultCategorySelect } from 'features/user-settings/default-category'
import { UpdateLanguageSelect } from 'features/user-settings/language'
import { ConnectTelegramButton } from 'features/user-settings/connect-telegram'
import { UpdateAnimationEnabledSwitch } from 'features/user-settings/animation-enabled'

export const SettingsList = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.theme'} />
        </span>
        <UpdateThemeSegmentControl />
      </div>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.defaultCurrency'} />
        </span>
        <UpdateDefaultCurrencySelect />
      </div>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.defaultCategory'} />
        </span>
        <UpdateDefaultCategorySelect />
      </div>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.defaultBankAccount'} />
        </span>
        <UpdateDefaultBankAccountSelect />
      </div>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.connectTelegram.title'} />
        </span>
        <ConnectTelegramButton />
      </div>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.language'} />
        </span>
        <UpdateLanguageSelect />
      </div>
      <div className={'flex items-center justify-between'}>
        <span className={'text-base font-semibold'}>
          <Translate value={'settings.list.animationEnabled'} />
        </span>
        <UpdateAnimationEnabledSwitch />
      </div>
    </div>
  )
}
