import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  CalendarDays,
  Sparkles,
  Target,
  Link2,
  ChartColumn,
  Images,
  Clock,
  Layers,
  ShieldCheck,
  Languages,
  Zap,
  Send,
  Hash,
  Wand2,
  Menu,
  X,
  CircleCheck,
  Heart,
  MessageCircle,
  Bookmark,
  PenLine,
} from 'lucide-react'
import { Logo } from '../components/Sidebar'
import { PhonePreview } from '../components/PhonePreview'
import { IntroShowcase } from '../components/IntroShowcase'
import { Strengths } from '../components/Strengths'
import { Features } from '../components/Features'
import { FinalCTA } from '../components/FinalCTA'
import { PlatformMark, type AnyPlatform } from '../components/ui'
import { href } from '../router'
import { photos } from '../data'

const nav = [
  ['gioi-thieu', 'Giới thiệu'],
  ['diem-manh', 'Điểm mạnh'],
  ['tinh-nang', 'Tính năng'],
  ['bang-gia', 'Bảng giá'],
  ['faq', 'FAQ'],
] as const

const platforms: AnyPlatform[] = ['facebook', 'instagram', 'threads', 'x', 'tiktok', 'linkedin']

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/** Adds `.in` to every `.reveal` element inside the root once it scrolls into view. */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    // Also pick up .reveal elements rendered later (e.g. after hot reload or state changes).
    const mo = new MutationObserver(() =>
      ref.current?.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el)),
    )
    if (ref.current) mo.observe(ref.current, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return ref
}

const d = (ms: number) => ({ transitionDelay: `${ms}ms`, animationDelay: `${ms}ms` })

function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(to)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1400)
        setV(to * (1 - Math.pow(1 - k, 3)))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])
  return (
    <span ref={ref} className="tabular-nums">
      {v.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

const phrases = [
  'Bộ sưu tập thu đông đã lên kệ. 5 mẫu đồng hồ dây da mới, giảm 20% cho 100 khách đầu tiên.',
  'Mẹo nhỏ: lau dây da bằng khăn mềm mỗi tuần để giữ màu bền đẹp. Bạn đã thử chưa?',
  'Minigame cuối tuần: đoán đúng giá chiếc đồng hồ này để nhận voucher 200K.',
]

function useTyping() {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const full = phrases[i]
    const t = setTimeout(
      () => {
        if (!deleting && n < full.length) setN(n + 1)
        else if (!deleting) setDeleting(true)
        else if (n > 0) setN(Math.max(0, n - 3))
        else {
          setDeleting(false)
          setI((i + 1) % phrases.length)
        }
      },
      !deleting && n === full.length ? 2200 : deleting ? 18 : 32,
    )
    return () => clearTimeout(t)
  }, [i, n, deleting])
  return { text: phrases[i].slice(0, n), index: i }
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[12px] font-medium text-zinc-600">
      <span className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: React.ReactNode; desc: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-zinc-500 text-pretty">{desc}</p>
    </div>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative whitespace-nowrap">
      <span className="absolute inset-x-[-4px] bottom-[0.08em] h-[0.38em] origin-left animate-draw-x rounded-sm bg-brand-300/80 [animation-delay:700ms]" />
      <span className="relative">{children}</span>
    </span>
  )
}

/* ---------- Hero product mock ---------- */
const screens = [
  { key: 'compose', label: 'Soạn bài', icon: PenLine },
  { key: 'calendar', label: 'Lịch nội dung', icon: CalendarDays },
  { key: 'analytics', label: 'Phân tích', icon: ChartColumn },
] as const

function ComposeScreen() {
  const { text, index } = useTyping()
  const sets: AnyPlatform[][] = [
    ['facebook', 'instagram', 'x', 'tiktok'],
    ['facebook', 'threads', 'linkedin'],
    ['instagram', 'tiktok', 'facebook', 'threads', 'x'],
  ]
  const sel = sets[index]
  const img = [3, 7, 8][index]
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_260px]">
      <div className="flex flex-col p-6 text-left">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-semibold">Tạo bài viết</div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Đã lưu
          </span>
        </div>
        <div className="mt-4 flex gap-2.5">
          {platforms.map((p, i) => {
            const on = sel.includes(p)
            return (
              <div key={p} className="relative">
                <div
                  key={on ? `on-${index}` : 'off'}
                  style={d(i * 70)}
                  className={`grid size-10 place-items-center rounded-full text-[11px] font-semibold transition-colors duration-300 ${
                    on ? 'animate-pop bg-zinc-900 text-white ring-2 ring-brand-400 ring-offset-2' : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  {['DE', 'DC', 'TI', 'KI', 'KC', 'NG'][i]}
                </div>
                <PlatformMark platform={p} className={`absolute -bottom-0.5 -right-0.5 size-4 rounded-full ring-2 ring-white ${on ? '' : 'grayscale'}`} />
              </div>
            )
          })}
        </div>
        <div className="mt-5 flex-1 rounded-xl border border-zinc-200 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Nội dung dùng chung</div>
          <p className="mt-2 min-h-[64px] text-[13px] leading-relaxed text-zinc-800">
            {text}
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-zinc-900" />
          </p>
          <div className="mt-3 flex items-center gap-1.5 border-t border-zinc-100 pt-3">
            {['Chèn media', 'Trợ lý AI', 'Chữ ký'].map((t, i) => (
              <span key={t} className={`rounded-md px-2 py-1 text-[11px] font-medium ${i === 1 ? 'bg-brand-50 text-brand-700' : 'text-zinc-500'}`}>
                {t}
              </span>
            ))}
            <span className="ml-auto rounded-md border border-zinc-200 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">{text.length}/280</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <span className="rounded-lg border border-zinc-200 px-3 py-1.5 text-[11px] font-medium text-zinc-600">Thêm vào lịch</span>
          <span className="flex items-center gap-1.5 rounded-lg bg-brand-400 px-3 py-1.5 text-[11px] font-semibold">
            <Send className="size-3" /> Đăng ngay · {sel.length} kênh
          </span>
        </div>
      </div>

      {/* phone preview */}
      <div className="relative hidden items-center justify-center bg-gradient-to-b from-zinc-50 to-brand-50/60 md:flex">
        <PhonePreview platforms={sel} text={text} img={img} />
      </div>
    </div>
  )
}

function CalendarScreen() {
  const days = ['T2 9', 'T3 10', 'T4 11', 'T5 12', 'T6 13', 'T7 14', 'CN 15']
  const items: { day: number; top: number; p: AnyPlatform; t: string; time: string; c: string; drag?: boolean }[] = [
    { day: 0, top: 10, p: 'facebook', t: 'Mẹo bảo quản dây da', time: '09:00', c: '#fdd835' },
    { day: 1, top: 52, p: 'instagram', t: 'Hậu trường studio', time: '18:30', c: '#18181b' },
    { day: 2, top: 22, p: 'tiktok', t: 'Unbox đồng hồ mới', time: '12:00', c: '#fdd835', drag: true },
    { day: 3, top: 62, p: 'x', t: 'Flash sale 48h', time: '20:00', c: '#f97316' },
    { day: 4, top: 14, p: 'linkedin', t: 'Tuyển Content Exec', time: '08:00', c: '#18181b' },
    { day: 4, top: 56, p: 'threads', t: 'Hỏi đáp cộng đồng', time: '19:00', c: '#10b981' },
    { day: 5, top: 36, p: 'instagram', t: 'Minigame đoán giá', time: '19:00', c: '#10b981' },
    { day: 6, top: 18, p: 'facebook', t: 'Review tháng 11', time: '10:00', c: '#10b981' },
  ]
  return (
    <div className="flex h-full flex-col p-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold">Lịch nội dung</div>
          <div className="text-[11px] text-zinc-500">Tuần 46 · Tháng 11, 2026</div>
        </div>
        <div className="flex rounded-lg bg-zinc-100 p-0.5 text-[10px] font-medium">
          <span className="rounded-md px-2 py-1 text-zinc-500">Tháng</span>
          <span className="rounded-md bg-white px-2 py-1 shadow-sm">Tuần</span>
        </div>
      </div>
      <div className="mt-4 grid flex-1 grid-cols-7 overflow-hidden rounded-xl border border-zinc-200">
        {days.map((dd, i) => (
          <div key={dd} className={`relative border-zinc-100 ${i < 6 ? 'border-r' : ''} ${i === 2 ? 'bg-brand-50/50' : ''}`}>
            <div className="border-b border-zinc-100 px-2 py-1.5 text-[10px]">
              <span className="text-zinc-400">{dd.split(' ')[0]} </span>
              <span className={`font-semibold ${i === 2 ? 'rounded bg-brand-400 px-1' : ''}`}>{dd.split(' ')[1]}</span>
            </div>
            {items
              .filter((it) => it.day === i)
              .map((it, k) => (
                <div
                  key={k}
                  style={{ top: `${it.top + 12}%`, ...d(150 + (it.day * 2 + k) * 60) }}
                  className={`absolute inset-x-1 animate-pop rounded-md border bg-white p-1.5 ${
                    it.drag ? 'z-10 rotate-[-3deg] border-brand-400 shadow-[0_14px_28px_-12px_rgba(24,24,27,0.4)]' : 'border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-0.5 rounded-full" style={{ background: it.c }} />
                    <PlatformMark platform={it.p} className="size-3" />
                    <span className="font-mono text-[8px] text-zinc-400">{it.time}</span>
                  </div>
                  <div className="mt-0.5 line-clamp-2 text-[9px] font-medium leading-tight">{it.t}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Smooth cubic path through points (Catmull-Rom → Bézier). */
function smoothPath(pts: number[][]) {
  return pts
    .map((p, i) => {
      if (i === 0) return `M${p[0]},${p[1]}`
      const p0 = pts[i - 2] ?? pts[i - 1]
      const p1 = pts[i - 1]
      const p3 = pts[i + 1] ?? p
      const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6]
      const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6]
      return `C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p[0]},${p[1]}`
    })
    .join(' ')
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => [(i / (data.length - 1)) * 60, 20 - ((v - min) / (max - min || 1)) * 18 - 1])
  return (
    <svg viewBox="0 0 60 20" className="h-5 w-14">
      <path d={smoothPath(pts)} pathLength={1} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" className="animate-draw-line" />
    </svg>
  )
}

function AnalyticsScreen() {
  const [range, setRange] = useState(1)
  const sets = [
    [52, 58, 55, 63, 61, 70, 74],
    [30, 42, 38, 51, 47, 60, 58, 66, 61, 72, 70, 84],
    [22, 28, 35, 33, 41, 46, 52, 49, 58, 63, 70, 74, 79, 86],
  ]
  const data = sets[range]
  const prev = data.map((v, i) => v * 0.78 + Math.sin(i * 1.3) * 4)
  const max = 100
  const toPts = (arr: number[]) => arr.map((v, i) => [(i / (arr.length - 1)) * 100, 100 - (v / max) * 100])
  const pts = toPts(data)
  const line = smoothPath(pts)
  const prevLine = smoothPath(toPts(prev))
  const hi = data.length - 3
  const [hx, hy] = pts[hi]
  const xLabels = [['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], ['1/10', '8/10', '15/10', '22/10', '30/10'], ['T8', 'T9', 'T10']][range]

  const kpis = [
    { l: 'Tiếp cận', v: '482K', dl: '+14%', c: '#e5b800', s: [3, 5, 4, 6, 7, 6, 9] },
    { l: 'Tương tác', v: '32,8K', dl: '+6%', c: '#18181b', s: [4, 4, 6, 5, 7, 7, 8] },
    { l: 'Theo dõi mới', v: '2.140', dl: '+9%', c: '#10b981', s: [2, 4, 3, 5, 6, 8, 7] },
    { l: 'Tỉ lệ nhấp', v: '3,4%', dl: '−0,2', c: '#f97316', s: [6, 5, 6, 4, 5, 4, 4], down: true },
  ]
  const channels: [AnyPlatform, string, number][] = [
    ['facebook', 'Facebook', 38],
    ['instagram', 'Instagram', 27],
    ['tiktok', 'TikTok', 21],
    ['linkedin', 'LinkedIn', 14],
  ]

  return (
    <div className="flex h-full flex-col gap-3 p-5 text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold leading-tight">Phân tích</div>
          <div className="text-[10px] text-zinc-500">Tất cả kênh · cập nhật 2 phút trước</div>
        </div>
        <div className="flex rounded-lg bg-zinc-100 p-0.5 text-[10px] font-medium">
          {['7 ngày', '30 ngày', '90 ngày'].map((r, i) => (
            <button
              key={r}
              onClick={() => setRange(i)}
              className={`rounded-md px-2 py-1 transition ${range === i ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {kpis.map((k, i) => (
          <div key={k.l} style={d(i * 80)} className="animate-fade-up rounded-xl border border-zinc-200 bg-white px-3 py-2.5">
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              {k.l}
              <span className={`rounded-full px-1.5 text-[9px] font-medium ${k.down ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>{k.dl}</span>
            </div>
            <div className="mt-1 flex items-end justify-between">
              <span className="text-[17px] font-semibold leading-none tracking-tight">{k.v}</span>
              <Sparkline key={range} data={k.s} color={k.c} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 md:grid-cols-[1.65fr_1fr]">
        {/* main chart */}
        <div className="flex min-h-0 flex-col rounded-xl border border-zinc-200 bg-white p-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold">Lượt tiếp cận</div>
            <div className="flex items-center gap-3 text-[9px] text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="h-0.5 w-3 rounded bg-[#e5b800]" /> Kỳ này
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 border-t border-dashed border-zinc-400" /> Kỳ trước
              </span>
            </div>
          </div>
          <div className="mt-2 flex min-h-0 flex-1 gap-2">
            <div className="flex flex-col justify-between pb-4 text-right font-mono text-[8px] text-zinc-400">
              {['100K', '75K', '50K', '25K', '0'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div key={range} className="relative min-h-0 flex-1">
                {[0, 25, 50, 75, 100].map((g) => (
                  <span key={g} className="absolute inset-x-0 border-t border-dashed border-zinc-100" style={{ top: `${g}%` }} />
                ))}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
                  <defs>
                    <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#fdd835" stopOpacity=".45" />
                      <stop offset="1" stopColor="#fdd835" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${line} L100,100 L0,100 Z`} fill="url(#heroArea)" className="animate-fade-up [animation-delay:500ms]" />
                  <path d={prevLine} fill="none" stroke="#a1a1aa" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                  <path d={line} pathLength={1} fill="none" stroke="#e5b800" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" className="animate-draw-line" />
                  <line x1={hx} x2={hx} y1={hy} y2="100" stroke="#18181b" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" className="animate-fade-up [animation-delay:1.2s]" />
                </svg>
                {/* HTML marker keeps a true circle regardless of SVG scaling */}
                <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2" style={{ left: `${hx}%`, top: `${hy}%` }}>
                  <span className="block size-full animate-pop rounded-full bg-zinc-900 ring-[3px] ring-white [animation-delay:1.3s]" />
                </span>
                <span className="absolute -translate-x-1/2" style={{ left: `${hx}%`, top: `calc(${hy}% - 40px)` }}>
                  <span className="block animate-pop whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-center text-white shadow-lg [animation-delay:1.4s]">
                    <span className="block font-mono text-[10px] font-semibold">{data[hi]}K</span>
                    <span className="block text-[8px] text-emerald-400">+{Math.round((data[hi] / prev[hi] - 1) * 100)}% kỳ trước</span>
                  </span>
                </span>
              </div>
              <div className="flex justify-between pt-1.5 font-mono text-[8px] text-zinc-400">
                {xLabels.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* side */}
        <div className="hidden min-h-0 flex-col gap-2.5 md:flex">
          <div className="rounded-xl border border-zinc-200 bg-white p-3">
            <div className="text-[11px] font-semibold">Theo nền tảng</div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full">
              {channels.map(([p, , v], i) => (
                <span
                  key={p}
                  style={{ width: `${v}%`, background: ['#1877F2', '#D62976', '#18181b', '#0A66C2'][i], ...d(200 + i * 120) }}
                  className="h-full origin-left animate-draw-x"
                />
              ))}
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {channels.map(([p, l, v]) => (
                <li key={p} className="flex items-center gap-2 text-[10px]">
                  <PlatformMark platform={p} className="size-3.5" />
                  <span className="flex-1">{l}</span>
                  <span className="font-mono text-zinc-500">{v}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-0 flex-1 rounded-xl border border-zinc-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold">Bài nổi bật</span>
              <span className="text-[9px] text-zinc-400">Tiếp cận</span>
            </div>
            <ul className="mt-2 space-y-2">
              {(
                [
                  [8, 'Minigame đoán giá', 'instagram', 31.2],
                  [3, 'Mẹo bảo quản dây da', 'facebook', 18.4],
                  [10, 'Hậu trường studio', 'tiktok', 9.2],
                ] as [number, string, AnyPlatform, number][]
              ).map(([im, t, p, v], i) => (
                <li key={t} style={d(300 + i * 120)} className="flex animate-fade-up items-center gap-2">
                  <span className="w-2 font-mono text-[9px] text-zinc-400">{i + 1}</span>
                  <div className="relative shrink-0">
                    <img src={photos[im].src} alt="" className="size-7 rounded-md object-cover" />
                    <PlatformMark platform={p} className="absolute -bottom-1 -right-1 size-3 rounded-full ring-1 ring-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] font-medium">{t}</div>
                    <div className="mt-0.5 h-1 rounded-full bg-zinc-100">
                      <div className="h-full origin-left animate-draw-x rounded-full bg-brand-400" style={{ width: `${(v / 31.2) * 100}%`, ...d(500 + i * 120) }} />
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-600">{v.toLocaleString('vi-VN')}K</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


function HeroMock() {
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setTab((x) => (x + 1) % screens.length), 7000)
    return () => clearTimeout(t)
  }, [tab, paused])


  return (
    <div className="relative mx-auto max-w-5xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-gradient-to-b from-brand-100/70 via-brand-50/40 to-transparent blur-2xl" />

      {/* tabs */}
      <div className="mb-5 flex justify-center">
        <div className="inline-flex gap-1 rounded-2xl border border-zinc-200 bg-white/80 p-1 shadow-sm backdrop-blur">
          {screens.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setTab(i)}
              className={`relative flex items-center gap-2 overflow-hidden rounded-xl px-3.5 py-2 text-[13px] font-medium transition ${
                tab === i ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <s.icon className="size-4" />
              <span className="hidden sm:inline">{s.label}</span>
              {tab === i && (
                <span
                  key={`${tab}-${paused}`}
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-400 ${paused ? 'scale-x-100 opacity-60' : 'animate-progress'}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_30px_80px_-30px_rgba(24,24,27,0.25)]">
        <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-zinc-200" />
          <span className="size-2.5 rounded-full bg-zinc-200" />
          <span className="size-2.5 rounded-full bg-zinc-200" />
          <span className="ml-3 rounded-md bg-white px-3 py-0.5 font-mono text-[10px] text-zinc-400 ring-1 ring-zinc-200">
            app.postchoice.vn/{['tao-bai-viet', 'lich-noi-dung', 'phan-tich'][tab]}
          </span>
        </div>
        <div className="flex h-[440px]">
          {/* mini sidebar */}
          <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-zinc-100 bg-zinc-50/70 py-4 sm:flex">
            <div className="mb-2 grid size-8 place-items-center rounded-lg bg-brand-400">
              <svg viewBox="0 0 24 24" className="size-4" fill="none">
                <path d="M4 5l16 3-7 3-2 8-3-7z" fill="#18181b" />
              </svg>
            </div>
            {[Layers, PenLine, CalendarDays, Target, ChartColumn, Images].map((I, i) => {
              const active = [1, 2, 4][tab] === i
              return (
                <span
                  key={i}
                  className={`grid size-9 place-items-center rounded-lg transition ${active ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200' : 'text-zinc-400'}`}
                >
                  <I className="size-4" />
                </span>
              )
            })}
          </div>
          <div key={tab} className="min-w-0 flex-1 animate-fade-up [animation-duration:0.5s]">
            {tab === 0 && <ComposeScreen />}
            {tab === 1 && <CalendarScreen />}
            {tab === 2 && <AnalyticsScreen />}
          </div>
        </div>
      </div>

    </div>
  )
}


/* ---------- Hero post deck ---------- */
const deck: { p: AnyPlatform; name: string; handle: string; text: string; img: number; likes: string; time: string }[] = [
  { p: 'instagram', name: 'deszy_creative', handle: 'Instagram', text: 'Bộ sưu tập thu đông đã lên kệ. 5 mẫu dây da mới.', img: 3, likes: '1.284', time: '20:00' },
  { p: 'facebook', name: 'Deszy', handle: 'Trang Facebook', text: 'Flash sale 48h — giảm đến 40% toàn bộ phụ kiện.', img: 1, likes: '842', time: '20:00' },
  { p: 'tiktok', name: 'kiu.chun', handle: 'TikTok', text: 'Unbox đồng hồ mới cùng team studio', img: 7, likes: '12,4K', time: '20:00' },
  { p: 'linkedin', name: 'TalentChoice', handle: 'LinkedIn', text: 'Hậu trường một ngày làm việc tại studio.', img: 10, likes: '86', time: '20:00' },
  { p: 'threads', name: '_ticrn', handle: 'Threads', text: 'Bạn chọn dây da hay dây kim loại?', img: 8, likes: '214', time: '20:00' },
]

function PostDeck() {
  const [top, setTop] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setTop((x) => (x + 1) % deck.length), 2800)
    return () => clearInterval(t)
  }, [paused])

  const slot = (i: number) => (i - top + deck.length) % deck.length
  const style = (pos: number) => {
    const map = [
      'translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 z-30',
      'translate-x-10 translate-y-4 rotate-[6deg] scale-[0.94] opacity-100 z-20',
      'translate-x-20 translate-y-8 rotate-[12deg] scale-[0.88] opacity-90 z-10',
      'translate-x-24 translate-y-10 rotate-[14deg] scale-[0.84] opacity-0 z-0',
    ]
    return pos === deck.length - 1 ? '-translate-x-28 -translate-y-6 -rotate-[14deg] scale-95 opacity-0 z-40' : map[Math.min(pos, 3)]
  }

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[420px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {deck.map((c, i) => {
        const pos = slot(i)
        return (
          <div
            key={c.name}
            className={`absolute left-4 top-4 w-[300px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${style(pos)}`}
          >
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_30px_60px_-24px_rgba(24,24,27,0.35)]">
              <div className="flex items-center gap-2.5 p-3.5">
                <span className="grid size-9 place-items-center rounded-full bg-brand-100 text-[12px] font-semibold text-brand-700">{c.name[0].toUpperCase()}</span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate text-[13px] font-semibold">{c.name}</div>
                  <div className="text-[11px] text-zinc-500">{c.handle}</div>
                </div>
                <PlatformMark platform={c.p} className="size-6" />
              </div>
              <img src={photos[c.img].src} alt="" className="aspect-[4/3.6] w-full object-cover" />
              <div className="p-3.5">
                <p className="text-[13px] leading-snug text-zinc-800">{c.text}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Heart className="size-3.5" /> {c.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-3.5" /> 24
                  </span>
                  <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                    <Check className="size-3" strokeWidth={3} /> Đã đăng {c.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* composer chip */}
      <div className="absolute -left-2 bottom-6 z-40 w-64 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:-left-10">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold">Đang đăng lên</span>
          <span className="font-mono text-zinc-400">{top + 1}/{deck.length}</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {deck.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setTop(i)}
              className={`grid size-8 place-items-center rounded-lg transition ${i === top ? 'bg-zinc-900 ring-2 ring-brand-400' : 'bg-zinc-100'}`}
            >
              <PlatformMark platform={c.p} className="size-4" />
            </button>
          ))}
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-zinc-100">
          <div key={`${top}-${paused}`} className={`h-full origin-left bg-brand-400 ${paused ? 'scale-x-100 opacity-50' : 'animate-progress'}`} style={{ animationDuration: '2800ms' }} />
        </div>
      </div>
    </div>
  )
}

/* ---------- Pricing ---------- */
const plans = [
  {
    name: 'Starter',
    desc: 'Cho cá nhân bắt đầu xây kênh.',
    price: 0,
    features: ['3 kênh mạng xã hội', '30 bài viết / tháng', 'Lịch nội dung', 'Xem trước theo nền tảng', '1 GB thư viện tệp'],
    cta: 'Bắt đầu miễn phí',
  },
  {
    name: 'Pro',
    desc: 'Cho thương hiệu và creator nghiêm túc.',
    price: 499000,
    popular: true,
    features: [
      '10 kênh mạng xã hội',
      '300 bài viết / tháng',
      'Trợ lý AI · 1.000 lượt / tháng',
      'Chiến lược, trụ cột, góc khai thác',
      'UTM & liên kết theo dõi',
      'Phân tích nâng cao',
      '10 GB thư viện tệp',
    ],
    cta: 'Dùng thử Pro 14 ngày',
  },
  {
    name: 'Agency',
    desc: 'Cho agency quản lý nhiều thương hiệu.',
    price: 1290000,
    features: [
      'Không giới hạn kênh',
      'Không giới hạn bài viết',
      'Nhiều thương hiệu & thành viên',
      'Phân quyền, duyệt bài',
      'Báo cáo white-label',
      'Hỗ trợ ưu tiên 1:1',
    ],
    cta: 'Liên hệ tư vấn',
  },
]

const faqs = [
  {
    q: 'PostChoice hỗ trợ những nền tảng nào?',
    a: 'Hiện tại PostChoice hỗ trợ Facebook (Trang), Instagram (tài khoản doanh nghiệp), Threads, X, TikTok và LinkedIn. Bạn có thể đăng cùng lúc lên tất cả hoặc chọn từng kênh.',
  },
  {
    q: 'Tôi có thể viết nội dung khác nhau cho từng kênh không?',
    a: 'Có. Bạn viết một nội dung chung, sau đó bật “Tuỳ chỉnh riêng” cho kênh bất kỳ. PostChoice tự cảnh báo khi nội dung vượt giới hạn ký tự của từng nền tảng, ví dụ 280 ký tự trên X.',
  },
  {
    q: 'Bài đã hẹn giờ có đăng khi tôi tắt máy không?',
    a: 'Có. Bài được lưu trên máy chủ và tự động đăng đúng giờ theo múi giờ bạn chọn, kể cả khi bạn đóng trình duyệt.',
  },
  {
    q: 'Trợ lý AI hoạt động như thế nào?',
    a: 'Trợ lý AI giúp gợi ý dàn ý, viết lại hấp dẫn hơn, rút gọn cho từng nền tảng và đề xuất hashtag. Bạn luôn xem lại và chỉnh sửa trước khi đăng.',
  },
  {
    q: 'Tôi có thể đổi gói hoặc huỷ bất cứ lúc nào không?',
    a: 'Có. Bạn có thể nâng cấp, hạ cấp hoặc huỷ gói trong phần Quản lý license. Khi huỷ, gói vẫn dùng được đến hết chu kỳ đã thanh toán.',
  },
  {
    q: 'Dữ liệu và tài khoản của tôi có an toàn không?',
    a: 'PostChoice kết nối qua API chính thức của từng nền tảng, không lưu mật khẩu mạng xã hội. Bạn có thể thu hồi quyền truy cập bất cứ lúc nào.',
  },
]

export default function Landing() {
  const [yearly, setYearly] = useState(true)
  const [open, setOpen] = useState<number | null>(0)
  const [menu, setMenu] = useState(false)
  const root = useReveal()

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-white text-zinc-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(([id, l]) => (
              <button key={id} onClick={() => scrollTo(id)} className="rounded-lg px-3 py-1.5 text-[13px] text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900">
                {l}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a href={href('login')} className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-zinc-700 hover:bg-zinc-100">
              Đăng nhập
            </a>
            <a href={href('create')} className="flex h-9 items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 text-[13px] font-medium text-white transition hover:bg-zinc-800">
              Dùng miễn phí <ArrowRight className="size-3.5" />
            </a>
          </div>
          <button onClick={() => setMenu((v) => !v)} className="grid size-9 place-items-center rounded-lg hover:bg-zinc-100 md:hidden">
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-zinc-100 px-6 py-3 md:hidden">
            {nav.map(([id, l]) => (
              <button
                key={id}
                onClick={() => {
                  setMenu(false)
                  scrollTo(id)
                }}
                className="block w-full py-2 text-left text-[14px] text-zinc-700"
              >
                {l}
              </button>
            ))}
            <a href={href('login')} className="mt-2 flex h-10 items-center justify-center rounded-lg border border-zinc-200 text-[14px] font-medium text-zinc-800">
              Đăng nhập
            </a>
            <a href={href('create')} className="mt-2 flex h-10 items-center justify-center rounded-lg bg-zinc-900 text-[14px] font-medium text-white">
              Dùng miễn phí
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-12 sm:pt-16">
        {/* background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_70%_10%,black_30%,transparent_100%)]"
          style={{
            backgroundImage: 'linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="pointer-events-none absolute right-[-10%] top-[-120px] -z-10 h-[620px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(253,216,53,0.5),rgba(253,216,53,0.12)_60%,transparent)] blur-2xl" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          {/* copy */}
          <div className="text-center lg:text-left">
            <button
              onClick={() => scrollTo('tinh-nang')}
              className="group inline-flex animate-fade-up items-center gap-2 rounded-full border border-zinc-200 bg-white/80 py-1 pl-1 pr-3 text-[13px] text-zinc-600 shadow-sm backdrop-blur transition hover:border-zinc-300"
            >
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] font-semibold text-brand-400">Mới</span>
              Trợ lý AI viết nội dung bằng tiếng Việt
              <ArrowRight className="size-3.5 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-700" />
            </button>

            <h1 style={d(100)} className="mt-7 animate-fade-up text-[46px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[72px]">
              Soạn một lần.
              <br />
              <Highlight>Đăng mọi nơi.</Highlight>
            </h1>

            <p style={d(200)} className="mx-auto mt-6 max-w-lg animate-fade-up text-[16px] leading-relaxed text-zinc-500 text-pretty sm:text-[18px] lg:mx-0">
              Lên kế hoạch, viết, hẹn giờ và đo lường nội dung cho Facebook, Instagram, TikTok, Threads, X và LinkedIn — trong một màn hình.
            </p>

            <div style={d(300)} className="mt-9 flex animate-fade-up flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
              <a
                href={href('login')}
                className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-zinc-900 px-6 text-[15px] font-semibold text-white shadow-[0_12px_30px_-12px_rgba(24,24,27,0.6)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Bắt đầu miễn phí
                <span className="grid size-6 place-items-center rounded-md bg-brand-400 text-zinc-900 transition group-hover:translate-x-0.5">
                  <ArrowRight className="size-3.5" />
                </span>
              </a>
              <a
                href={href('overview')}
                className="flex h-12 items-center gap-2 rounded-xl px-4 text-[15px] font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Xem bản demo <ArrowRight className="size-4" />
              </a>
            </div>

            <div style={d(400)} className="mt-10 grid animate-fade-up grid-cols-3 gap-4 border-t border-zinc-200 pt-6 text-left">
              {[
                ['6', 'nền tảng'],
                ['−70%', 'thời gian đăng'],
                ['4,9/5', '2.400+ đánh giá'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-[22px] font-semibold tracking-tight">{v}</div>
                  <div className="text-[12px] text-zinc-500">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* card deck */}
          <div style={d(250)} className="animate-fade-up">
            <PostDeck />
          </div>
        </div>

        <div style={d(450)} className="mt-20 animate-fade-up">
          <HeroMock />
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-[12px] font-medium uppercase tracking-wider text-zinc-400">Kết nối với các nền tảng bạn đang dùng</p>
          <div className="mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
            {[...platforms, ...platforms, ...platforms, ...platforms].map((p, i) => (
              <span key={i} className="flex shrink-0 items-center gap-2 text-[14px] font-medium text-zinc-500">
                <PlatformMark platform={p} className="size-5" />
                {{ facebook: 'Facebook', instagram: 'Instagram', threads: 'Threads', x: 'X', tiktok: 'TikTok', linkedin: 'LinkedIn' }[p]}
              </span>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section id="gioi-thieu" className="scroll-mt-16 border-t border-zinc-100 bg-zinc-50/60 px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.25fr]">
          <div className="reveal">
            <Eyebrow>Giới thiệu</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-[42px]">
              Quản lý mạng xã hội không nên là{' '}
              <span className="relative inline-block text-zinc-400">
                6 tab
                <span className="grow-bar absolute inset-x-0 top-1/2 h-[3px] rounded bg-red-500" style={{ transitionDelay: '700ms' }} />
              </span>{' '}
              trình duyệt.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-600">
              Đội ngũ marketing mất hàng giờ mỗi tuần để sao chép nội dung, chỉnh lại cho từng nền tảng, đặt nhắc nhở và tổng hợp số liệu thủ công.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
              <span className="font-medium text-zinc-900">PostChoice gom toàn bộ quy trình vào một nơi</span> — từ chiến lược, soạn thảo, duyệt, lên lịch đến phân tích. Mỗi bài viết đều gắn với trụ cột nội dung, để bạn biết mình đang đăng gì và vì sao.
            </p>

            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:grid-cols-4">
              {(
                [
                  [2400, 0, '+', 'thương hiệu'],
                  [1.2, 1, 'M', 'bài đã đăng'],
                  [70, 0, '%', 'thời gian tiết kiệm'],
                  [4.9, 1, '/5', 'đánh giá'],
                ] as const
              ).map(([v, dec, suf, l], i) => (
                <div key={l} className={`p-4 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t sm:border-t-0' : ''} ${i === 2 ? 'sm:border-l' : ''} border-zinc-200`}>
                  <div className="text-[22px] font-semibold tracking-tight">
                    <CountUp to={v} decimals={dec} suffix={suf} />
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={d(150)} className="reveal">
            <IntroShowcase />
          </div>
        </div>
      </section>

      {/* Strengths */}
      <Strengths />

      {/* Features */}
      <Features />

      {/* Pricing */}
      <section id="bang-gia" className="scroll-mt-16 px-6 py-24">
        <SectionTitle eyebrow="Bảng giá" title="Đơn giản, minh bạch, không phí ẩn" desc="Bắt đầu miễn phí. Nâng cấp khi bạn sẵn sàng." />
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full bg-zinc-100 p-1">
            {[
              [false, 'Theo tháng'],
              [true, 'Theo năm'],
            ].map(([v, l]) => (
              <button
                key={l as string}
                onClick={() => setYearly(v as boolean)}
                className={`flex h-8 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition ${
                  yearly === v ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
                }`}
              >
                {l as string}
                {v && <span className="rounded-full bg-brand-400 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-900">−20%</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((p, idx) => {
            const price = yearly ? Math.round((p.price * 0.8) / 1000) * 1000 : p.price
            return (
              <div
                key={p.name}
                style={d(idx * 120)}
                className={`reveal relative flex flex-col rounded-2xl p-7 ${
                  p.popular ? 'bg-zinc-900 text-white shadow-[0_30px_60px_-30px_rgba(24,24,27,0.5)] lg:-my-3 lg:py-10' : 'border border-zinc-200 bg-white'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-400 px-2.5 py-1 text-[11px] font-semibold text-zinc-900">Phổ biến nhất</span>
                )}
                <h3 className="text-[15px] font-semibold">{p.name}</h3>
                <p className={`mt-1 text-[13px] ${p.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span key={`${p.name}-${yearly}`} className="animate-fade-up text-4xl font-semibold tracking-tight [animation-duration:0.45s]">{price === 0 ? '0₫' : `${price.toLocaleString('vi-VN')}₫`}</span>
                  <span className={`text-[13px] ${p.popular ? 'text-zinc-400' : 'text-zinc-400'}`}>/tháng</span>
                </div>
                <div className={`mt-1 h-4 text-[11px] ${p.popular ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {price > 0 && yearly && `Thanh toán ${(price * 12).toLocaleString('vi-VN')}₫ mỗi năm`}
                </div>
                <a
                  href={href('create')}
                  className={`mt-6 flex h-10 items-center justify-center rounded-xl text-[13px] font-semibold transition ${
                    p.popular ? 'bg-brand-400 text-zinc-900 hover:bg-brand-300' : 'border border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {p.cta}
                </a>
                <ul className={`mt-7 space-y-3 border-t pt-7 text-[13px] ${p.popular ? 'border-white/10' : 'border-zinc-100'}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 size-4 shrink-0 ${p.popular ? 'text-brand-400' : 'text-zinc-900'}`} strokeWidth={2.5} />
                      <span className={p.popular ? 'text-zinc-200' : 'text-zinc-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 border-t border-zinc-100 bg-zinc-50/60 px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Câu hỏi thường gặp</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
              Không tìm thấy câu trả lời? Đội ngũ hỗ trợ của chúng tôi phản hồi trong vòng 2 giờ làm việc.
            </p>
            <a href="mailto:hello@postchoice.vn" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-900 underline decoration-brand-400 decoration-2 underline-offset-4">
              hello@postchoice.vn <ArrowRight className="size-3.5" />
            </a>
          </div>
          <div style={d(150)} className="reveal divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-[14px] font-medium">{f.q}</span>
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full transition ${isOpen ? 'bg-brand-400' : 'bg-zinc-100'}`}>
                      <ChevronDown className={`size-3.5 transition ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-zinc-500">{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-6 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-zinc-500">Nền tảng quản lý và đăng bài mạng xã hội cho thương hiệu Việt.</p>
          </div>
          {[
            ['Sản phẩm', ['Tính năng', 'Bảng giá', 'Cập nhật', 'Trợ lý AI']],
            ['Công ty', ['Về chúng tôi', 'Blog', 'Tuyển dụng', 'Liên hệ']],
            ['Pháp lý', ['Điều khoản', 'Bảo mật', 'Cookie']],
          ].map(([t, items]) => (
            <div key={t as string}>
              <div className="text-[12px] font-semibold">{t as string}</div>
              <ul className="mt-3 space-y-2">
                {(items as string[]).map((i) => (
                  <li key={i} className="text-[13px] text-zinc-500 transition hover:text-zinc-900">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-6 text-[12px] text-zinc-400">
          <span>© 2026 PostChoice. Bảo lưu mọi quyền.</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Mọi hệ thống hoạt động bình thường
          </span>
        </div>
      </footer>
    </div>
  )
}
