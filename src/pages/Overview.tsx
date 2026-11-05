import { ArrowUpRight, CalendarClock, Plus, TriangleAlert, Sparkles } from 'lucide-react'
import { Card, PageHeader, Button, StatCard, Avatar, ProgressBar } from '../components/ui'
import { posts, accounts, pillars, statusMeta, fmtDate, fmt, photos } from '../data'
import { href } from '../router'

const week = [42, 58, 51, 74, 66, 88, 79]
const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export default function Overview() {
  const upcoming = posts.filter((p) => p.status === 'scheduled')
  const max = Math.max(...week)
  return (
    <>
      <PageHeader
        title="Chào buổi chiều"
        description="Tổng quan hoạt động nội dung của bạn trong 7 ngày qua."
        actions={
          <a href={href('create')}>
            <Button variant="primary">
              <Plus /> Tạo bài viết
            </Button>
          </a>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Bài đã đăng" value="48" delta={12} hint="so với tuần trước" />
        <StatCard label="Lượt tiếp cận" value="124,6K" delta={8.4} hint="tổng các kênh" />
        <StatCard label="Tỉ lệ tương tác" value="6,8%" delta={-1.2} hint="trung bình" />
        <StatCard label="Đã lên lịch" value={String(upcoming.length)} hint="trong 7 ngày tới" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">Lượt tiếp cận</h2>
              <p className="text-[12px] text-zinc-500">7 ngày gần nhất · nghìn lượt</p>
            </div>
            <a href={href('analytics')} className="flex items-center gap-1 text-[12px] font-medium text-zinc-600 hover:text-zinc-900">
              Xem phân tích <ArrowUpRight className="size-3.5" />
            </a>
          </div>
          <div className="mt-8 flex h-48 items-end gap-3">
            {week.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-400 opacity-0 transition group-hover:opacity-100">{v}K</span>
                <div
                  className={`w-full rounded-md transition ${i === 5 ? 'bg-brand-400' : 'bg-zinc-100 group-hover:bg-zinc-200'}`}
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[11px] text-zinc-500">{days[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-[15px] font-semibold">Cân bằng trụ cột</h2>
          <p className="text-[12px] text-zinc-500">Thực tế so với mục tiêu tháng này</p>
          <div className="mt-5 space-y-4">
            {pillars.map((p) => (
              <div key={p.name}>
                <div className="mb-1.5 flex justify-between text-[12px]">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </span>
                  <span className="font-mono text-zinc-500">
                    {p.actual}% <span className="text-zinc-300">/ {p.target}%</span>
                  </span>
                </div>
                <ProgressBar value={(p.actual / 40) * 100} color={p.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <div className="flex items-center justify-between px-6 pt-5">
            <h2 className="text-[15px] font-semibold">Sắp đăng</h2>
            <a href={href('calendar')} className="text-[12px] font-medium text-zinc-600 hover:text-zinc-900">
              Mở lịch
            </a>
          </div>
          <ul className="divide-y divide-zinc-100 p-2">
            {posts
              .filter((p) => p.status !== 'published')
              .slice(0, 4)
              .map((p) => (
                <li key={p.id} className="flex items-center gap-4 rounded-lg px-4 py-3 transition hover:bg-zinc-50">
                  {p.img !== undefined ? (
                    <img src={photos[p.img].src} alt="" className="size-10 rounded-lg object-cover" />
                  ) : (
                    <div className="grid size-10 place-items-center rounded-lg bg-zinc-100">
                      <CalendarClock className="size-4 text-zinc-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{p.title}</div>
                    <div className="text-[11px] text-zinc-500">{fmtDate(p.date)}</div>
                  </div>
                  <div className="hidden -space-x-2 sm:flex">
                    {p.accounts.map((a) => {
                      const acc = accounts.find((x) => x.id === a)!
                      return <Avatar key={a} name={acc.name} platform={acc.platform} size="sm" />
                    })}
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusMeta[p.status].cls}`}>
                    {statusMeta[p.status].label}
                  </span>
                </li>
              ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-red-50">
                <TriangleAlert className="size-4 text-red-600" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold">1 bài đăng thất bại</h3>
                <p className="mt-0.5 text-[12px] text-zinc-500">"Tuyển dụng Content Executive" chưa được đăng lên TalentChoice.</p>
                <a href={href('posts')} className="mt-2 inline-block text-[12px] font-medium text-zinc-900 underline-offset-2 hover:underline">
                  Xem chi tiết
                </a>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50">
                <Sparkles className="size-4 text-brand-700" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold">Gợi ý</h3>
                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Trụ cột "Câu chuyện thương hiệu" đang thấp hơn mục tiêu 6%. Thử lên lịch thêm 2 bài tuần này.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-[13px] font-semibold">Kênh đã kết nối</h3>
            <ul className="mt-3 space-y-2.5">
              {accounts.map((a) => (
                <li key={a.id} className="flex items-center gap-2.5 text-[13px]">
                  <Avatar name={a.name} platform={a.platform} size="sm" />
                  <span className="flex-1 truncate">{a.name}</span>
                  <span className="font-mono text-[11px] text-zinc-400">{fmt(a.followers)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
