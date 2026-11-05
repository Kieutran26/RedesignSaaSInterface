import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Card, PageHeader, Button, Tabs } from '../components/ui'
import { posts, statusMeta, pillars } from '../data'
import { href } from '../router'

const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date(2026, 9, 1))
  const [view, setView] = useState<'month' | 'week'>('month')
  const y = month.getFullYear()
  const m = month.getMonth()
  const first = (new Date(y, m, 1).getDay() + 6) % 7
  const daysIn = new Date(y, m + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((first + daysIn) / 7) * 7 }, (_, i) => i - first + 1)
  const today = 30

  const postsOn = (d: number) =>
    posts.filter((p) => {
      const dt = new Date(p.date)
      return dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d
    })

  return (
    <>
      <PageHeader
        title="Lịch nội dung"
        description="Nhìn tổng thể kế hoạch đăng bài theo tháng."
        actions={
          <a href={href('create')}>
            <Button variant="primary">
              <Plus /> Lên lịch bài
            </Button>
          </a>
        }
      />

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-semibold capitalize">
              {month.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex">
              <button onClick={() => setMonth(new Date(y, m - 1, 1))} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100">
                <ChevronLeft className="size-4" />
              </button>
              <button onClick={() => setMonth(new Date(y, m + 1, 1))} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100">
                <ChevronRight className="size-4" />
              </button>
            </div>
            <Button variant="ghost" className="h-7" onClick={() => setMonth(new Date(2026, 9, 1))}>
              Hôm nay
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 md:flex">
              {pillars.map((p) => (
                <span key={p.name} className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <span className="size-2 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </span>
              ))}
            </div>
            <Tabs value={view} onChange={setView} items={[{ value: 'month', label: 'Tháng' }, { value: 'week', label: 'Tuần' }]} />
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-zinc-100 bg-zinc-50/60">
          {weekdays.map((d) => (
            <div key={d} className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => {
            const inMonth = d >= 1 && d <= daysIn
            const isToday = inMonth && d === today && m === 9 && y === 2026
            return (
              <div
                key={i}
                className={`min-h-28 border-b border-r border-zinc-100 p-2 [&:nth-child(7n)]:border-r-0 ${inMonth ? 'bg-white' : 'bg-zinc-50/50'}`}
              >
                {inMonth && (
                  <>
                    <div
                      className={`mb-1.5 grid size-6 place-items-center rounded-full text-[12px] ${
                        isToday ? 'bg-brand-400 font-semibold text-zinc-900' : 'text-zinc-500'
                      }`}
                    >
                      {d}
                    </div>
                    <div className="space-y-1">
                      {postsOn(d).map((p) => {
                        const color = pillars.find((x) => x.name === p.pillar)?.color
                        return (
                          <div
                            key={p.id}
                            title={p.title}
                            className="flex cursor-pointer items-center gap-1.5 truncate rounded-md border border-zinc-100 bg-white px-1.5 py-1 text-[11px] shadow-[0_1px_1px_rgba(0,0,0,0.03)] transition hover:border-zinc-300"
                          >
                            <span className="h-3 w-0.5 shrink-0 rounded-full" style={{ background: color }} />
                            <span className="font-mono text-[10px] text-zinc-400">
                              {new Date(p.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="truncate">{p.title}</span>
                            <span className={`ml-auto size-1.5 shrink-0 rounded-full ${statusMeta[p.status].dot}`} />
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </>
  )
}
