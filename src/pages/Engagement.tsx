import { useState } from 'react'
import { Plus, ChartBar, CircleHelp, Timer, Quote } from 'lucide-react'
import { Card, PageHeader, Button, Tabs } from '../components/ui'
import { photos } from '../data'

type Kind = 'poll' | 'quiz' | 'countdown' | 'quote'
const kinds: Record<Kind, { label: string; icon: typeof ChartBar }> = {
  poll: { label: 'Bình chọn', icon: ChartBar },
  quiz: { label: 'Đố vui', icon: CircleHelp },
  countdown: { label: 'Đếm ngược', icon: Timer },
  quote: { label: 'Trích dẫn', icon: Quote },
}

const items: { kind: Kind; title: string; img: number; uses: number }[] = [
  { kind: 'poll', title: 'Bạn chọn màu nào?', img: 3, uses: 14 },
  { kind: 'quiz', title: 'Đoán giá sản phẩm', img: 8, uses: 22 },
  { kind: 'countdown', title: 'Còn 2 ngày nữa', img: 1, uses: 9 },
  { kind: 'quote', title: 'Khách hàng nói gì', img: 10, uses: 6 },
  { kind: 'poll', title: 'Đen hay bạc?', img: 7, uses: 11 },
  { kind: 'quiz', title: 'Đây là sản phẩm gì?', img: 5, uses: 17 },
]

function Overlay({ kind, title }: { kind: Kind; title: string }) {
  if (kind === 'poll')
    return (
      <div className="w-full space-y-1.5">
        <div className="text-[13px] font-semibold text-white">{title}</div>
        {['A', 'B'].map((o, i) => (
          <div key={o} className="relative overflow-hidden rounded-md bg-white/20 px-2 py-1 text-[11px] text-white backdrop-blur">
            <div className="absolute inset-y-0 left-0 bg-brand-400/80" style={{ width: i ? '38%' : '62%' }} />
            <span className="relative font-medium">
              Lựa chọn {o} · {i ? 38 : 62}%
            </span>
          </div>
        ))}
      </div>
    )
  if (kind === 'countdown')
    return (
      <div className="w-full text-center text-white">
        <div className="text-[11px] uppercase tracking-widest opacity-80">{title}</div>
        <div className="mt-1 flex justify-center gap-1.5 font-mono text-lg font-semibold">
          {['02', '14', '36'].map((t) => (
            <span key={t} className="rounded-md bg-white/20 px-2 py-0.5 backdrop-blur">
              {t}
            </span>
          ))}
        </div>
      </div>
    )
  if (kind === 'quote')
    return <div className="w-full text-[13px] font-medium italic leading-snug text-white">“Chất lượng vượt mong đợi, sẽ ủng hộ dài dài.”</div>
  return (
    <div className="w-full text-white">
      <div className="text-[13px] font-semibold">{title}</div>
      <div className="mt-1.5 grid grid-cols-2 gap-1 text-[11px]">
        {['299K', '499K', '799K', '999K'].map((o) => (
          <span key={o} className="rounded-md bg-white/20 px-2 py-1 text-center backdrop-blur">
            {o}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Engagement() {
  const [tab, setTab] = useState<'all' | Kind>('all')
  const list = items.filter((i) => tab === 'all' || i.kind === tab)
  return (
    <>
      <PageHeader
        title="Ảnh tương tác"
        description="Mẫu ảnh bình chọn, đố vui, đếm ngược giúp tăng tương tác."
        actions={
          <Button variant="primary">
            <Plus /> Tạo ảnh tương tác
          </Button>
        }
      />
      <div className="mb-4">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[{ value: 'all' as const, label: 'Tất cả' }, ...(Object.keys(kinds) as Kind[]).map((k) => ({ value: k, label: kinds[k].label }))]}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {list.map((it) => {
          const K = kinds[it.kind]
          return (
            <Card key={it.title} className="group overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={photos[it.img].src} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex p-3">
                  <Overlay kind={it.kind} title={it.title} />
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-1.5 text-[12px] font-medium">
                  <K.icon className="size-3.5 text-zinc-400" /> {K.label}
                </span>
                <span className="text-[11px] text-zinc-400">{it.uses} lần dùng</span>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
