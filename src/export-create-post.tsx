// Standalone entry used only by `pnpm export:html` to export the Create Post page.
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Bell, ChevronRight, Search } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import CreatePost from './pages/CreatePost'
import './index.css'

// Other pages are not included in this export, so block in-app navigation.
document.addEventListener(
  'click',
  (e) => {
    const a = (e.target as HTMLElement).closest('a')
    if (a?.getAttribute('href')?.startsWith('#')) e.preventDefault()
  },
  true,
)

function Standalone() {
  return (
    <div className="flex min-h-screen">
      <Sidebar current="create" />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-200/70 bg-white/80 px-6 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-zinc-400">PostChoice</span>
            <ChevronRight className="size-3.5 text-zinc-300" />
            <span className="text-zinc-400">Nội dung</span>
            <ChevronRight className="size-3.5 text-zinc-300" />
            <span className="font-medium text-zinc-900">Tạo bài viết</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden h-8 w-64 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 text-[13px] text-zinc-400 md:flex">
              <Search className="size-3.5" />
              Tìm kiếm…
              <kbd className="ml-auto rounded border border-zinc-200 bg-white px-1.5 font-mono text-[10px] text-zinc-500">⌘K</kbd>
            </div>
            <button className="relative grid size-8 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand-500 ring-2 ring-white" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8">
          <CreatePost />
        </main>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Standalone />
  </React.StrictMode>,
)
