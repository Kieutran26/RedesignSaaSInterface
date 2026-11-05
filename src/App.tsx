import { Bell, ChevronRight, Search } from 'lucide-react'
import type { ComponentType } from 'react'
import { Sidebar } from './components/Sidebar'
import { routeMeta, useRoute, href, type Route } from './router'
import CreatePost from './pages/CreatePost'
import Overview from './pages/Overview'
import Posts from './pages/Posts'
import Templates from './pages/Templates'
import CalendarPage from './pages/Calendar'
import Strategy from './pages/Strategy'
import Pillars from './pages/Pillars'
import Angles from './pages/Angles'
import Library from './pages/Library'
import Engagement from './pages/Engagement'
import Accounts from './pages/Accounts'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/Settings'
import License from './pages/License'
import Landing from './pages/Landing'
import Login from './pages/Login'

const pages: Record<Exclude<Route, 'home' | 'login'>, ComponentType> = {
  overview: Overview,
  create: CreatePost,
  posts: Posts,
  templates: Templates,
  calendar: CalendarPage,
  strategy: Strategy,
  pillars: Pillars,
  angles: Angles,
  library: Library,
  engagement: Engagement,
  accounts: Accounts,
  analytics: Analytics,
  settings: SettingsPage,
  license: License,
}

export default function App() {
  const route = useRoute()
  if (route === 'home') return <Landing />
  if (route === 'login') return <Login />
  const Page = pages[route]
  const meta = routeMeta[route]

  return (
    <div className="flex min-h-screen">
      <Sidebar current={route} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-200/70 bg-white/80 px-6 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-1.5 text-[13px]">
            <a href={href('overview')} className="text-zinc-400 transition hover:text-zinc-700">
              PostChoice
            </a>
            {meta.group && (
              <>
                <ChevronRight className="size-3.5 text-zinc-300" />
                <span className="text-zinc-400">{meta.group}</span>
              </>
            )}
            <ChevronRight className="size-3.5 text-zinc-300" />
            <span className="font-medium text-zinc-900">{meta.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden h-8 w-64 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 text-[13px] text-zinc-400 md:flex">
              <Search className="size-3.5" />
              Tìm kiếm…
              <kbd className="ml-auto rounded border border-zinc-200 bg-white px-1.5 font-mono text-[10px] text-zinc-500">
                ⌘K
              </kbd>
            </div>
            <button className="relative grid size-8 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand-500 ring-2 ring-white" />
            </button>
          </div>
        </header>
        <main key={route} className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8">
          <Page />
        </main>
      </div>
    </div>
  )
}
