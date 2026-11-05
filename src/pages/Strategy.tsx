import { Target, TrendingUp, Users, Pencil, CircleCheck, Circle } from 'lucide-react'
import { Card, PageHeader, Button, ProgressBar } from '../components/ui'
import { pillars } from '../data'

const goals = [
  { icon: Users, label: 'Tăng người theo dõi', value: 52570, target: 60000, unit: '' },
  { icon: TrendingUp, label: 'Tỉ lệ tương tác', value: 6.8, target: 8, unit: '%' },
  { icon: Target, label: 'Bài viết / tháng', value: 48, target: 60, unit: '' },
]

const milestones = [
  { label: 'Xác định chân dung khách hàng', done: true },
  { label: 'Thiết lập 4 trụ cột nội dung', done: true },
  { label: 'Lên lịch nội dung quý IV', done: true },
  { label: 'Ra mắt chiến dịch mùa lễ', done: false },
  { label: 'Đánh giá hiệu quả cuối quý', done: false },
]

export default function Strategy() {
  return (
    <>
      <PageHeader
        title="Chiến lược nội dung"
        description="Mục tiêu, định hướng và phân bổ nội dung cho quý IV / 2026."
        actions={
          <Button>
            <Pencil /> Chỉnh sửa
          </Button>
        }
      />

      <Card className="relative overflow-hidden p-6">
        <div className="absolute -right-16 -top-16 size-56 rounded-full bg-brand-100/60 blur-2xl" />
        <div className="relative max-w-2xl">
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-white">Định hướng</span>
          <p className="mt-3 text-lg font-medium leading-relaxed tracking-tight">
            “Trở thành nguồn kiến thức đáng tin cậy về phụ kiện lifestyle cho người trẻ đô thị — giáo dục trước, bán hàng sau.”
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
            {['Gen Z & Millennials', '22–35 tuổi', 'TP.HCM, Hà Nội', 'Giọng điệu: thân thiện, tinh tế'].map((t) => (
              <span key={t} className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-zinc-600">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {goals.map((g) => {
          const pct = (g.value / g.target) * 100
          return (
            <Card key={g.label} className="p-5">
              <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-500">
                <g.icon className="size-4" /> {g.label}
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold tracking-tight">
                  {g.value.toLocaleString('vi-VN')}
                  {g.unit}
                </span>
                <span className="text-[12px] text-zinc-400">
                  / {g.target.toLocaleString('vi-VN')}
                  {g.unit}
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar value={pct} />
              </div>
              <div className="mt-1.5 text-right font-mono text-[11px] text-zinc-400">{Math.round(pct)}%</div>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="p-6">
          <h2 className="text-[15px] font-semibold">Phân bổ nội dung mục tiêu</h2>
          <p className="text-[12px] text-zinc-500">Tỉ lệ bài viết theo trụ cột</p>
          <div className="mt-6 flex h-3 overflow-hidden rounded-full">
            {pillars.map((p) => (
              <div key={p.name} style={{ width: `${p.target}%`, background: p.color }} />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.name} className="rounded-xl border border-zinc-100 p-4">
                <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                  <span className="size-2 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </div>
                <div className="mt-2 text-xl font-semibold">{p.target}%</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-[15px] font-semibold">Lộ trình quý</h2>
          <ol className="relative mt-5 space-y-4 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-zinc-200">
            {milestones.map((m) => (
              <li key={m.label} className="relative flex items-center gap-3 text-[13px]">
                {m.done ? (
                  <CircleCheck className="relative size-4 bg-white text-emerald-500" />
                ) : (
                  <Circle className="relative size-4 bg-white text-zinc-300" />
                )}
                <span className={m.done ? 'text-zinc-500' : 'font-medium'}>{m.label}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  )
}
