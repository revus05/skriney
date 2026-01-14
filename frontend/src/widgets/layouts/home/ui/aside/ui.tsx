import { Icons, Translate } from 'shared/ui'
import { createElement } from 'react'
import Link from 'next/link'

export const Aside = () => {
  const navItems = [
    {
      id: 'home',
      label: 'home',
      icon: 'home',
      href: '/',
    },
    {
      id: 'transaction',
      label: 'transaction',
      icon: 'transaction',
      href: '/transactions',
    },
    {
      id: 'statistics',
      label: 'statistics',
      icon: 'graph',
      href: '/statistics',
    },
    {
      id: 'categories',
      label: 'categories',
      icon: 'categories',
      href: '/categories',
    },
    {
      id: 'bank-accounts',
      label: 'bankAccounts',
      icon: 'card',
      href: '/bank-accounts',
    },
    /*{
      id: 'goal',
      label: 'goals',
      icon: 'goal',
      href: '/goals',
    },*/
    'divide',
    {
      id: 'settings',
      label: 'settings',
      icon: 'settings',
      href: '/settings',
    },
  ]

  return (
    <aside
      className={
        'bg-bg-neutral-primary/70 h-fit w-57.5 rounded-2xl border px-4 py-2 shadow-sm'
      }
    >
      <nav>
        <ul>
          {navItems.map((item) =>
            typeof item === 'string' ? (
              <div
                className={'bg-border-neutral-primary my-2 h-px'}
                key={item}
              ></div>
            ) : (
              <li key={item.id} className={'transition active:scale-[0.98]'}>
                <Link
                  href={item.href}
                  className={
                    'hover:bg-bg-neutral-secondary group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2'
                  }
                >
                  {createElement(Icons[item.icon], {
                    className:
                      'fill-icon-neutral-tertiary group-hover:fill-icon-neutral-primary transition shrink-0',
                  })}
                  <span
                    className={
                      'text-text-neutral-tertiary group-hover:text-text-neutral-primary text-base font-semibold whitespace-nowrap transition select-none'
                    }
                  >
                    <Translate value={`sidebar.${item.label}`} />
                  </span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </aside>
  )
}
