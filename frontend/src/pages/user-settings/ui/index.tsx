import { withHomeLayout } from 'widgets/layouts/home'
import { Translate } from 'shared/ui'
import { SettingsList } from './list'

const SettingsPage = () => {
  return (
    <div className={'flex w-full justify-center'}>
      <div className={'flex w-[540px] flex-col gap-6'}>
        <h2 className={'text-[32px] leading-8 font-bold'}>
          <Translate value={'settings.title'} />
        </h2>
        <SettingsList />
      </div>
    </div>
  )
}

export default withHomeLayout(SettingsPage)
