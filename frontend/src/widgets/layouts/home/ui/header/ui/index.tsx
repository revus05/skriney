import { Icons } from 'shared/ui'
import Link from 'next/link'
import { HeaderSearch } from './search'
import { HeaderUserActions } from './user-actions'

export const Header = () => {
  return (
    <header
      className={
        'bg-bg-neutral-primary/70 flex items-center justify-between rounded-2xl border px-8 py-3 shadow-sm'
      }
    >
      <Link href={'/'} tabIndex={-1}>
        <Icons.logo />
      </Link>
      <HeaderSearch />
      <HeaderUserActions />
    </header>
  )
}
