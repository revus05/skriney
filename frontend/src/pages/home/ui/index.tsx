import { TotalBalance } from './total-balance'
import { CategoriesHome } from './categories'
import { withHomeLayout } from 'widgets/layouts/home'

const HomePage = () => {
  return (
    <div className={'flex w-full justify-center'}>
      <div className={'flex w-224.5 flex-col gap-6'}>
        <TotalBalance />
        <CategoriesHome />
      </div>
    </div>
  )
}

export default withHomeLayout(HomePage)
