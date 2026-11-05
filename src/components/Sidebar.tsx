import {
  LayoutGrid,
  Layers,
  SquarePen,
  FileText,
  Copy,
  CalendarDays,
  Target,
  Columns3,
  Compass,
  FolderOpen,
  Images,
  Share2,
  ChartColumn,
  Settings,
  KeyRound,
  ChevronDown,
  ChevronsUpDown,
  LogOut,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { href, type Route } from '../router'

type Item = { label: string; icon: ComponentType<{ className?: string }>; to: Route; active?: boolean }

const contentItems: Item[] = [
  { label: 'Tạo bài viết', to: 'create', icon: SquarePen },
  { label: 'Tất cả bài viết', to: 'posts', icon: FileText },
  { label: 'Mẫu bài viết', to: 'templates', icon: Copy },
  { label: 'Lịch nội dung', to: 'calendar', icon: CalendarDays },
  { label: 'Chiến lược nội dung', to: 'strategy', icon: Target },
  { label: 'Trụ cột nội dung', to: 'pillars', icon: Columns3 },
  { label: 'Góc khai thác', to: 'angles', icon: Compass },
  { label: 'Thư viện tệp', to: 'library', icon: FolderOpen },
  { label: 'Ảnh tương tác', to: 'engagement', icon: Images },
]

const otherItems: Item[] = [
  { label: 'Tài khoản mạng xã hội', to: 'accounts', icon: Share2 },
  { label: 'Phân tích', to: 'analytics', icon: ChartColumn },
]

const settingItems: Item[] = [
  { label: 'Cài đặt', to: 'settings', icon: Settings },
  { label: 'Quản lý license', to: 'license', icon: KeyRound },
]

function NavLink({ item, nested, current }: { item: Item; nested?: boolean; current: Route }) {
  const Icon = item.icon
  item = { ...item, active: item.to === current }
  return (
    <a
      href={href(item.to)}
      className={`group relative flex items-center gap-2.5 rounded-lg py-1.5 text-[13px] transition-colors ${
        nested ? 'pl-9 pr-2.5' : 'px-2.5'
      } ${
        item.active
          ? 'bg-white font-medium text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/80'
          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
      }`}
    >
      {item.active && (
        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-400" />
      )}
      <Icon
        className={`size-4 shrink-0 ${item.active ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`}
      />
      <span className="truncate">{item.label}</span>
    </a>
  )
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid size-7 place-items-center rounded-lg bg-brand-400">
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <path d="M4 5l16 3-7 3-2 8-3-7z" fill="#18181b" />
        </svg>
      </div>
      <span className="text-[15px] font-semibold tracking-tight">PostChoice</span>
    </div>
  )
}

export function Sidebar({ current }: { current: Route }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-zinc-200/70 bg-zinc-50/80 lg:flex">
      <a href="#/" title="Trang chủ" className="flex h-14 items-center px-4">
        <Logo />
      </a>

      <div className="px-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-left transition hover:border-zinc-300">
          <div className="grid size-6 place-items-center rounded-md bg-zinc-900 text-[10px] font-semibold text-white">
            ALL
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Không gian</div>
            <div className="truncate text-[13px] font-medium leading-tight">Tất cả thương hiệu</div>
          </div>
          <ChevronsUpDown className="size-3.5 text-zinc-400" />
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        <div className="space-y-0.5">
          <NavLink current={current} item={{ label: 'Tổng quan', to: 'overview', icon: LayoutGrid }} />
          <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-zinc-900">
            <Layers className="size-4 text-zinc-400" />
            <span className="flex-1 text-left font-medium">Nội dung</span>
            <ChevronDown className="size-3.5 text-zinc-400" />
          </button>
          <div className="space-y-0.5">
            {contentItems.map((i) => (
              <NavLink current={current} key={i.label} item={i} nested />
            ))}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="px-2.5 pb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">Kênh</div>
          {otherItems.map((i) => (
            <NavLink current={current} key={i.label} item={i} />
          ))}
        </div>

        <div className="space-y-0.5">
          <div className="px-2.5 pb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">Hệ thống</div>
          {settingItems.map((i) => (
            <NavLink current={current} key={i.label} item={i} />
          ))}
        </div>
      </nav>

      <div className="border-t border-zinc-200/70 p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5">
          <div className="grid size-8 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            PC
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-medium">Workspace</div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Trực tuyến · GMT+7
            </div>
          </div>
          <a
            href={href('login')}
            title="Đăng xuất"
            className="grid size-7 place-items-center rounded-md text-zinc-400 transition hover:bg-zinc-200/60 hover:text-zinc-700"
          >
            <LogOut className="size-4" />
          </a>
        </div>
      </div>
    </aside>
  )
}
