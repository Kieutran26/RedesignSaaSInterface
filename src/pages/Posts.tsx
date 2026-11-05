import { useState } from 'react'
import { Plus, Search, Ellipsis, FileText, Filter } from 'lucide-react'
import { Card, PageHeader, Button, Tabs, Avatar } from '../components/ui'
import { posts, accounts, statusMeta, fmtDate, fmt, photos, type Status } from '../data'
import { href } from '../router'

type F = 'all' | Status

export default function Posts() {
  const [tab, setTab] = useState<F>('all')
  const [q, setQ] = useState('')
  const count = (s: F) => (s === 'all' ? posts.length : posts.filter((p) => p.status === s).length)
  const list = posts.filter(
    (p) => (tab === 'all' || p.status === tab) && p.title.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title="Tất cả bài viết"
        description="Quản lý bài viết đã đăng, đã lên lịch và bản nháp trên mọi kênh."
        actions={
          <a href={href('create')}>
            <Button variant="primary">
              <Plus /> Tạo bài viết
            </Button>
          </a>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={tab}
          onChange={setTab}
          items={(['all', 'published', 'scheduled', 'draft', 'failed'] as F[]).map((v) => ({
            value: v,
            label: v === 'all' ? 'Tất cả' : statusMeta[v].label,
            count: count(v),
          }))}
        />
        <div className="flex gap-2">
          <div className="flex h-9 w-60 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-brand-100">
            <Search className="size-4 text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm bài viết…"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-zinc-400"
            />
          </div>
          <Button>
            <Filter /> Lọc
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-zinc-100 bg-zinc-50/60 text-[11px] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-5 py-3 font-medium">Bài viết</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Kênh</th>
              <th className="px-5 py-3 font-medium">Trạng thái</th>
              <th className="hidden px-5 py-3 font-medium lg:table-cell">Thời gian</th>
              <th className="hidden px-5 py-3 text-right font-medium lg:table-cell">Tiếp cận</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {list.map((p) => (
              <tr key={p.id} className="transition hover:bg-zinc-50/70">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {p.img !== undefined ? (
                      <img src={photos[p.img].src} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-zinc-100">
                        <FileText className="size-4 text-zinc-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="truncate font-medium">{p.title}</div>
                      <div className="max-w-sm truncate text-[12px] text-zinc-500">{p.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-5 py-3.5 md:table-cell">
                  <div className="flex -space-x-2">
                    {p.accounts.map((a) => {
                      const acc = accounts.find((x) => x.id === a)!
                      return <Avatar key={a} name={acc.name} platform={acc.platform} size="sm" />
                    })}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusMeta[p.status].cls}`}>
                    <span className={`size-1.5 rounded-full ${statusMeta[p.status].dot}`} />
                    {statusMeta[p.status].label}
                  </span>
                </td>
                <td className="hidden px-5 py-3.5 font-mono text-[12px] text-zinc-500 lg:table-cell">{fmtDate(p.date)}</td>
                <td className="hidden px-5 py-3.5 text-right font-mono text-[12px] lg:table-cell">
                  {p.reach ? fmt(p.reach) : <span className="text-zinc-300">—</span>}
                </td>
                <td className="pr-3">
                  <button className="grid size-8 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700">
                    <Ellipsis className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="py-16 text-center text-[13px] text-zinc-500">Không có bài viết nào phù hợp.</div>
        )}
      </Card>
    </>
  )
}
