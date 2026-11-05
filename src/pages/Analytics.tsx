import { useState } from 'react'
import { Download } from 'lucide-react'
import { Card, PageHeader, Button, Tabs, StatCard, Avatar } from '../components/ui'
import { posts, accounts, pillars, fmt, photos } from '../data'

const series: Record<'7d' | '30d' | '90d', number[]> = {
  '7d': [42, 58, 51, 74, 66, 88, 79],
  '30d': [30, 42, 38, 51, 47, 60, 58, 66, 61, 72, 70, 81, 77, 88, 84],
  '90d': [22, 28, 35, 33, 41, 46, 52, 49, 58, 63, 70, 74],
}

function LineChart({ data }: { data: number[] }) {
  const w = 600
  const h = 200
  const max = Math.max(...data) * 1.1
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / max) * h])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-56 w-full overflow-visible">
      <defs>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fdd835" stopOpacity=".35" />
          <stop offset="1" stopColor="#fdd835" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#f4f4f5" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#fill)" />
      <path d={d} fill="none" stroke="#e5b800" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

export default function Analytics() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d')
  const top = posts.filter((p) => p.reach).sort((a, b) => b.reach! - a.reach!)
  return (
    <>
      <PageHeader
        title="Phân tích"
        description="Hiệu quả nội dung trên tất cả các kênh."
        actions={
          <>
            <Tabs
              value={range}
              onChange={setRange}
              items={[
                { value: '7d', label: '7 ngày' },
                { value: '30d', label: '30 ngày' },
                { value: '90d', label: '90 ngày' },
              ]}
            />
            <Button>
              <Download /> Xuất báo cáo
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Lượt tiếp cận" value="482K" delta={14.2} />
        <StatCard label="Lượt hiển thị" value="1,2M" delta={9.1} />
        <StatCard label="Tương tác" value="32,8K" delta={5.6} />
        <StatCard label="Người theo dõi mới" value="+2.140" delta={-2.3} />
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold">Lượt tiếp cận theo thời gian</h2>
          <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
            <span className="h-0.5 w-3 rounded bg-brand-500" /> Tất cả kênh
          </span>
        </div>
        <div className="mt-6">
          <LineChart data={series[range]} />
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-[15px] font-semibold">Theo kênh</h2>
          <ul className="mt-4 space-y-4">
            {accounts.map((a, i) => {
              const v = [38, 14, 34, 14][i]
              return (
                <li key={a.id} className="flex items-center gap-3">
                  <Avatar name={a.name} platform={a.platform} size="sm" />
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between text-[12px]">
                      <span className="font-medium">{a.name}</span>
                      <span className="font-mono text-zinc-500">{v}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-100">
                      <div className="h-full rounded-full bg-zinc-900" style={{ width: `${v * 2.2}%` }} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-[15px] font-semibold">Tương tác theo trụ cột</h2>
          <div className="mt-6 flex h-40 items-end gap-6">
            {pillars.map((p, i) => {
              const v = [6.4, 8.1, 3.9, 9.6][i]
              return (
                <div key={p.name} className="flex flex-1 flex-col items-center gap-2">
                  <span className="font-mono text-[11px] text-zinc-500">{v}%</span>
                  <div className="w-full rounded-md" style={{ height: `${v * 10}%`, background: p.color }} />
                  <span className="text-center text-[11px] leading-tight text-zinc-500">{p.name}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold">Bài viết nổi bật</h2>
        </div>
        <ul className="divide-y divide-zinc-100">
          {top.map((p, i) => (
            <li key={p.id} className="flex items-center gap-4 px-5 py-3">
              <span className="w-4 font-mono text-[12px] text-zinc-400">{i + 1}</span>
              {p.img !== undefined && <img src={photos[p.img].src} alt="" className="size-10 rounded-lg object-cover" />}
              <span className="flex-1 truncate text-[13px] font-medium">{p.title}</span>
              <span className="w-24 text-right font-mono text-[12px]">{fmt(p.reach!)}</span>
              <span className="w-16 text-right font-mono text-[12px] text-emerald-600">{p.engagement}%</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}
