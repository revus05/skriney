import { withHomeLayout } from 'widgets/layouts/home'
import { ProfileHeadline } from './headline'

const ProfilePage = () => {
  return (
    <div className={'flex flex-col gap-6'}>
      <ProfileHeadline />
    </div>
  )
}

export default withHomeLayout(ProfilePage)
