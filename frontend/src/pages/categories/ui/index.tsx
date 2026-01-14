import { CategoriesList } from './list'
import { Icons, Translate } from 'shared/ui'
import { withHomeLayout } from 'widgets/layouts/home'
import { CreateCategoryButton } from 'features/categories/create-category'

const CategoriesPage = () => {
  return (
    <div className={'flex w-full justify-center'}>
      <div className={'flex w-[560px] flex-col gap-6'}>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-2.5'}>
            <h2 className={'text-[32px] leading-8 font-bold'}>
              <Translate value={'categories.title'} />
            </h2>
            <Icons.info />
          </div>
          <CreateCategoryButton />
        </div>
        <CategoriesList />
      </div>
    </div>
  )
}

export default withHomeLayout(CategoriesPage)
