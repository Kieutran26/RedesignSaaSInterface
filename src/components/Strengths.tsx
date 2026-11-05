import { useEffect, useRef, useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { PlatformMark, type AnyPlatform } from './ui'

const d = (ms: number) => ({ transitionDelay: `${ms}ms` })

function CardHead({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="px-1">
      <h3 className="text-[16px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{desc}</p>
    </div>
  )
}

/* 01 — speed: manual vs PostChoice */
function SpeedVisual() {
  const rows = [
    { label: 'Thủ công', mins: 45, cls: 'bg-zinc-300', text: 'text-zinc-500' },
    { label: 'PostChoice', mins: 12, cls: 'bg-brand-400', text: 'font-semibold text-zinc-900' },
  ]
  return (
    <div className="flex h-full items-end justify-center gap-6 pt-2">
      {rows.map((r, i) => (
        <div key={r.label} className="flex h-full w-16 flex-col items-center justify-end gap-1.5">
          <span className={`font-mono text-[11px] ${r.text}`}>{r.mins}′</span>
          <div className={`grow-col w-full rounded-t-lg ${r.cls}`} style={{ height: `${(r.mins / 45) * 70}%`, ...d(200 + i * 300) }} />
          <span className={`text-[11px] ${r.text}`}>{r.label}</span>
        </div>
      ))}
    </div>
  )
}

/* 02 — strategy donut */
function StrategyVisual() {
  const segs = [
    { l: 'Kiến thức', v: 35, c: '#fdd835' },
    { l: 'Thương hiệu', v: 25, c: '#ffffff' },
    { l: 'Khuyến mãi', v: 20, c: '#f97316' },
    { l: 'Cộng đồng', v: 20, c: '#10b981' },
  ]
  let acc = 0
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="relative size-24">
        <svg viewBox="0 0 42 42" className="size-full -rotate-90">
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="#3f3f46" strokeWidth="5" />
          {segs.map((sg, i) => {
            const off = acc
            acc += sg.v
            return (
              <circle
                key={sg.l}
                cx="21"
                cy="21"
                r="15.9"
                fill="none"
                stroke={sg.c}
                strokeWidth="5"
                pathLength={100}
                strokeDashoffset={-off}
                className="donut-seg"
                style={{ ['--v' as string]: sg.v - 1.2, transitionDelay: `${300 + i * 200}ms` }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-xl font-semibold text-white">4</div>
      </div>
      <div className="flex gap-1.5">
        {segs.map((sg) => (
          <span key={sg.l} title={sg.l} className="size-2 rounded-full" style={{ background: sg.c }} />
        ))}
      </div>
    </div>
  )
}

/* 03 — Vietnamese AI chat */
const reply = 'Sale sập sàn 48h! Giảm đến 40% toàn bộ đồng hồ dây da.'
function LanguageVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  const [start, setStart] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setStart(true), io.disconnect()), { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!start || n >= reply.length) return
    const t = setTimeout(() => setN((x) => x + 1), n === 0 ? 900 : 22)
    return () => clearTimeout(t)
  }, [start, n])
  return (
    <div ref={ref} className="flex h-full flex-col justify-center space-y-2 text-left">
      <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-zinc-900 px-3 py-1.5 text-[11px] text-white">
        Viết caption flash sale
      </div>
      <div className="flex items-start gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-400">
          <Sparkles className="size-3.5" />
        </span>
        <div className="min-h-[52px] rounded-2xl rounded-tl-md border border-zinc-200 bg-white px-3 py-1.5 text-[11px] leading-relaxed text-zinc-800">
          {n === 0 ? (
            <span className="inline-flex gap-1 py-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: `${i * 120}ms` }} />
              ))}
            </span>
          ) : (
            reply.slice(0, n)
          )}
        </div>
      </div>
    </div>
  )
}

/* 04 — official API connections */
function SecurityVisual() {
  const list: AnyPlatform[] = ['facebook', 'instagram', 'tiktok', 'x', 'threads', 'linkedin']
  return (
    <div className="grid h-full grid-cols-3 place-content-center justify-center gap-2.5">
      {list.map((p, i) => (
        <span key={p} className="pop-in relative grid size-11 place-items-center rounded-xl border border-zinc-200 bg-white" style={d(200 + i * 80)}>
          <PlatformMark platform={p} className="size-5" />
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
            <Check className="size-2.5" strokeWidth={3.5} />
          </span>
        </span>
      ))}
    </div>
  )
}

export function Strengths() {
  return (
    <section id="diem-manh" className="scroll-mt-16 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[12px] font-medium text-zinc-600">
            <span className="size-1.5 rounded-full bg-brand-500" />
            Điểm mạnh
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Vì sao các đội ngũ chọn{' '}
            <span className="relative whitespace-nowrap">
              <span className="grow-bar absolute inset-x-[-4px] bottom-[0.08em] h-[0.38em] rounded-sm bg-brand-300/80" style={d(400)} />
              <span className="relative">PostChoice</span>
            </span>
          </h2>
          <p className="mt-3 text-[15px] text-zinc-500">Nhanh, gọn và có chiến lược — cho cách làm nội dung của người Việt.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              [SpeedVisual, 'bg-brand-50', 'Nhanh hơn gấp 3 lần', 'Viết một lần, đăng mọi kênh.'],
              [StrategyVisual, 'bg-zinc-900', 'Có chiến lược', 'Mỗi bài gắn với một trụ cột.'],
              [LanguageVisual, 'bg-zinc-50', 'Thuần Việt', 'AI và giao diện tối ưu tiếng Việt.'],
              [SecurityVisual, 'bg-emerald-50/60', 'Kết nối an toàn', 'API chính thức, không lưu mật khẩu.'],
            ] as const
          ).map(([Visual, bg, title, desc], i) => (
            <article
              key={title}
              style={d(i * 100)}
              className="reveal group flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-3 pb-5 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(24,24,27,0.25)]"
            >
              <div className={`h-44 overflow-hidden rounded-2xl px-4 py-3 ${bg}`}>
                <Visual />
              </div>
              <CardHead title={title} desc={desc} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
