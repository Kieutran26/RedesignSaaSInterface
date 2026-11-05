import { useEffect, useState } from 'react'
import {
  Layers,
  Sparkles,
  CalendarDays,
  Target,
  Link2,
  Images,
  Copy,
  Save,
  MessageSquarePlus,
  UserCheck,
  Building2,
  Download,
  Wand2,
  Hash,
  ListTree,
  MousePointerClick,
  Check,
} from 'lucide-react'
import { PlatformMark, type AnyPlatform } from './ui'
import { photos } from '../data'

const DURATION = 6000

/* ---------- Preview panels ---------- */

function ComposerPanel() {
  const rows: [AnyPlatform, string, number, number, boolean][] = [
    ['x', 'X', 238, 280, false],
    ['threads', 'Threads', 238, 500, false],
    ['instagram', 'Instagram', 412, 2200, true],
    ['linkedin', 'LinkedIn', 238, 3000, false],
    ['tiktok', 'TikTok', 238, 2200, false],
  ]
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Nội dung dùng chung</div>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-800">
          Bộ sưu tập thu đông đã lên kệ. 5 mẫu đồng hồ dây da mới, giảm 20% cho 100 khách đầu tiên.
        </p>
      </div>
      <ul className="space-y-2">
        {rows.map(([p, l, n, max, custom], i) => (
          <li key={p} style={{ animationDelay: `${i * 80}ms` }} className="flex animate-fade-up items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2">
            <PlatformMark platform={p} className="size-5" />
            <span className="w-20 text-[12px] font-medium">{l}</span>
            <div className="h-1.5 flex-1 rounded-full bg-zinc-100">
              <div
                className={`h-full origin-left animate-draw-x rounded-full ${n / max > 0.8 ? 'bg-orange-400' : 'bg-zinc-900'}`}
                style={{ width: `${Math.min(100, (n / max) * 100)}%`, animationDelay: `${200 + i * 80}ms` }}
              />
            </div>
            {custom ? (
              <span className="rounded-md bg-brand-100 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">Tuỳ chỉnh</span>
            ) : (
              <span className="font-mono text-[10px] text-zinc-400">
                {n}/{max}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const aiText = '5 mẫu đồng hồ dây da mới vừa lên kệ — tinh tế cho mùa thu đông. Giảm 20% cho 100 khách đầu tiên, nhanh tay nhé!'
function AIPanel() {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n >= aiText.length) return
    const t = setTimeout(() => setN((x) => x + 1), n === 0 ? 700 : 18)
    return () => clearTimeout(t)
  }, [n])
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-[13px] text-zinc-400 line-through decoration-zinc-300">
        Bộ sưu tập thu đông đã lên kệ. 5 mẫu đồng hồ dây da mới, giảm 20%.
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[
          [Wand2, 'Viết lại hấp dẫn', true],
          [ListTree, 'Gợi ý dàn ý', false],
          [Hash, 'Thêm hashtag', false],
        ].map(([I, l, on]) => {
          const Icon = I as typeof Wand2
          return (
            <span
              key={l as string}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium ${on ? 'bg-zinc-900 text-white' : 'border border-zinc-200 bg-white text-zinc-600'}`}
            >
              <Icon className={`size-3.5 ${on ? 'text-brand-400' : 'text-zinc-400'}`} />
              {l as string}
            </span>
          )
        })}
      </div>
      <div className="flex-1 rounded-2xl border border-brand-300 bg-brand-50 p-4 ring-4 ring-brand-100/60">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-700">
          <Sparkles className="size-3.5" /> Gợi ý từ AI
        </div>
        <p className="mt-2 min-h-[60px] text-[13px] leading-relaxed text-zinc-900">
          {aiText.slice(0, n)}
          {n < aiText.length && <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-zinc-900" />}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['#dongho', '#thudong', '#deszy'].map((h, i) => (
            <span
              key={h}
              style={{ animationDelay: `${2400 + i * 150}ms` }}
              className="animate-pop rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-brand-700 ring-1 ring-brand-200"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CalendarPanel() {
  const cells = Array.from({ length: 28 }, (_, i) => i + 1)
  const posts: Record<number, [AnyPlatform, string][]> = {
    3: [['facebook', '#fdd835']],
    5: [['instagram', '#18181b'], ['tiktok', '#10b981']],
    9: [['x', '#f97316']],
    12: [['linkedin', '#18181b']],
    14: [['instagram', '#10b981']],
    17: [['facebook', '#fdd835'], ['threads', '#f97316']],
    20: [['tiktok', '#fdd835']],
    23: [['instagram', '#18181b']],
    26: [['facebook', '#10b981'], ['x', '#fdd835']],
  }
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-semibold">Tháng 11, 2026</span>
        <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white">12 bài đã lên lịch</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-medium text-zinc-400">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid flex-1 grid-cols-7 gap-1">
        {cells.map((c) => (
          <div key={c} className={`flex flex-col rounded-lg border p-1 ${c === 11 ? 'border-brand-400 bg-brand-50' : 'border-zinc-100 bg-white'}`}>
            <span className={`text-[9px] ${c === 11 ? 'font-semibold' : 'text-zinc-400'}`}>{c}</span>
            <div className="mt-auto flex flex-col gap-0.5">
              {(posts[c] ?? []).map(([p, col], k) => (
                <span
                  key={k}
                  style={{ animationDelay: `${c * 25}ms`, borderLeftColor: col }}
                  className="flex animate-pop items-center gap-0.5 rounded border-l-2 bg-zinc-50 px-0.5 py-px"
                >
                  <PlatformMark platform={p} className="size-2.5" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StrategyPanel() {
  const rows = [
    ['Kiến thức sản phẩm', 38, 35, '#fdd835'],
    ['Câu chuyện thương hiệu', 19, 25, '#18181b'],
    ['Khuyến mãi', 26, 20, '#f97316'],
    ['Cộng đồng', 17, 20, '#10b981'],
  ] as const
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      {rows.map(([l, actual, target, c], i) => {
        const diff = actual - target
        return (
          <div key={l}>
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-2 font-medium">
                <span className="size-2 rounded-full" style={{ background: c }} />
                {l}
              </span>
              <span className="font-mono text-[11px]">
                {actual}% <span className={diff >= 0 ? 'text-emerald-600' : 'text-red-600'}>({diff > 0 ? '+' : ''}{diff})</span>
              </span>
            </div>
            <div className="relative h-2.5 rounded-full bg-zinc-100">
              <div className="h-full origin-left animate-draw-x rounded-full" style={{ width: `${actual * 2}%`, background: c, animationDelay: `${i * 120}ms` }} />
              <span className="absolute -top-1 h-[18px] w-0.5 rounded bg-zinc-900" style={{ left: `${target * 2}%` }} title={`Mục tiêu ${target}%`} />
            </div>
          </div>
        )
      })}
      <div className="flex items-center gap-2 text-[11px] text-zinc-500">
        <span className="h-3 w-0.5 rounded bg-zinc-900" /> Mục tiêu tháng này
      </div>
    </div>
  )
}

function UTMPanel() {
  const parts = [
    ['deszy.vn/flash-sale', 'text-zinc-900'],
    ['?utm_source=', 'text-zinc-400'],
    ['instagram', 'bg-pink-50 text-pink-700'],
    ['&utm_medium=', 'text-zinc-400'],
    ['social', 'bg-sky-50 text-sky-700'],
    ['&utm_campaign=', 'text-zinc-400'],
    ['flash_sale_t11', 'bg-brand-100 text-brand-700'],
  ]
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="text-[11px] font-medium text-zinc-500">Liên kết sau khi gắn UTM</div>
        <code className="mt-2 block break-all font-mono text-[12px] leading-relaxed">
          {parts.map(([t, c], i) => (
            <span key={i} style={{ animationDelay: `${i * 120}ms` }} className={`inline animate-fade-up rounded px-0.5 ${c}`}>
              {t}
            </span>
          ))}
        </code>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4 text-white">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-400 text-zinc-900">
          <Link2 className="size-5" />
        </span>
        <div className="flex-1">
          <div className="font-mono text-[13px]">sc.link/r/k8f2qa</div>
          <div className="text-[11px] text-zinc-400">Liên kết rút gọn có thống kê</div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-lg font-semibold">
            <MousePointerClick className="size-4 text-brand-400" /> 1.284
          </div>
          <div className="text-[10px] text-zinc-400">lượt nhấp</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            ['instagram', 612],
            ['facebook', 448],
            ['tiktok', 224],
          ] as [AnyPlatform, number][]
        ).map(([p, v]) => (
          <div key={p} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
            <PlatformMark platform={p} className="size-4" />
            <span className="font-mono text-[12px] font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MediaPanel() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
      {[0, 1, 2, 4, 5, 6].map((im, i) => (
        <div
          key={im}
          style={{ animationDelay: `${i * 60}ms` }}
          className={`relative animate-pop overflow-hidden rounded-xl bg-zinc-100 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
        >
          <img src={photos[im].src} alt="" className="size-full object-cover" />
          {i === 0 && (
            <div className="absolute inset-x-3 bottom-3 space-y-1.5">
              <div className="text-[13px] font-semibold text-white drop-shadow">Bạn chọn màu nào?</div>
              {[
                ['Trắng sứ', 64],
                ['Đen nhám', 36],
              ].map(([l, v]) => (
                <div key={l as string} className="relative overflow-hidden rounded-lg bg-white/25 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <div className="absolute inset-y-0 left-0 origin-left animate-draw-x bg-brand-400/90 [animation-delay:500ms]" style={{ width: `${v}%` }} />
                  <span className="relative">
                    {l} · {v}%
                  </span>
                </div>
              ))}
            </div>
          )}
          {i === 3 && (
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded bg-zinc-900 text-white">
              <Check className="size-2.5" strokeWidth={3.5} />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

const features = [
  { icon: Layers, title: 'Soạn đa kênh', desc: 'Một nội dung, tự kiểm tra giới hạn ký tự và tuỳ chỉnh riêng cho từng nền tảng.', Panel: ComposerPanel },
  { icon: Sparkles, title: 'Trợ lý AI', desc: 'Viết lại hấp dẫn hơn, gợi ý dàn ý và hashtag chỉ với một cú nhấp.', Panel: AIPanel },
  { icon: CalendarDays, title: 'Lịch nội dung', desc: 'Nhìn cả tháng trong một màn hình, kéo thả để đổi lịch, tự đăng đúng giờ.', Panel: CalendarPanel },
  { icon: Target, title: 'Chiến lược & trụ cột', desc: 'Đặt mục tiêu phân bổ, biết ngay trụ cột nào đang thiếu hay thừa.', Panel: StrategyPanel },
  { icon: Link2, title: 'UTM & liên kết', desc: 'Tự gắn UTM theo nền tảng, rút gọn link và đếm lượt nhấp.', Panel: UTMPanel },
  { icon: Images, title: 'Thư viện & ảnh tương tác', desc: 'Kho media dùng chung cùng mẫu bình chọn, đố vui, đếm ngược.', Panel: MediaPanel },
]

const extras = [
  [Copy, 'Mẫu bài viết'],
  [Save, 'Tự lưu nháp'],
  [MessageSquarePlus, 'Bình luận đầu tiên'],
  [UserCheck, 'Duyệt bài'],
  [Building2, 'Nhiều thương hiệu'],
  [Download, 'Xuất báo cáo'],
] as const

export function Features() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setActive((a) => (a + 1) % features.length), DURATION)
    return () => clearTimeout(t)
  }, [active, paused])
  const { Panel, icon: ActiveIcon, title: activeTitle } = features[active]

  return (
    <section id="tinh-nang" className="scroll-mt-16 border-t border-zinc-100 bg-zinc-50/60 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[12px] font-medium text-zinc-600">
            <span className="size-1.5 rounded-full bg-brand-500" />
            Tính năng
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Mọi thứ để vận hành mạng xã hội</h2>
          <p className="mt-3 text-[15px] text-zinc-500">Từ ý tưởng đến báo cáo, trong một công cụ.</p>
        </div>

        <div
          className="reveal mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[380px_minmax(0,1fr)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* list */}
          <ul className="space-y-1.5">
            {features.map((f, i) => {
              const on = i === active
              return (
                <li key={f.title}>
                  <button
                    onClick={() => setActive(i)}
                    className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition ${
                      on ? 'border-zinc-200 bg-white shadow-[0_12px_30px_-18px_rgba(24,24,27,0.3)]' : 'border-transparent hover:bg-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-xl transition ${on ? 'bg-brand-400 text-zinc-900' : 'bg-white text-zinc-500 ring-1 ring-zinc-200'}`}
                      >
                        <f.icon className="size-4" />
                      </span>
                      <span className={`text-[14px] font-semibold ${on ? 'text-zinc-900' : 'text-zinc-600'}`}>{f.title}</span>
                    </div>
                    <div className={`grid transition-all duration-300 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <p className="overflow-hidden pl-12 text-[13px] leading-relaxed text-zinc-500">
                        <span className="block pt-1.5">{f.desc}</span>
                      </p>
                    </div>
                    {on && (
                      <span
                        key={`${active}-${paused}`}
                        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-400 ${paused ? 'opacity-50' : 'animate-progress'}`}
                        style={{ animationDuration: `${DURATION}ms` }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* preview */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_30px_60px_-30px_rgba(24,24,27,0.25)]">
            <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3">
              <span className="grid size-6 place-items-center rounded-md bg-brand-400">
                <ActiveIcon className="size-3.5" />
              </span>
              <span className="text-[13px] font-semibold">{activeTitle}</span>
              <span className="ml-auto font-mono text-[11px] text-zinc-400">
                {String(active + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
              </span>
            </div>
            <div
              className="h-[440px] bg-zinc-50/60 p-6"
              style={{ backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            >
              <div key={active} className="h-full animate-fade-up [animation-duration:0.5s]">
                <Panel />
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[12px] text-zinc-400">Và còn nữa:</span>
          {extras.map(([I, l]) => (
            <span key={l} className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-600">
              <I className="size-3.5 text-zinc-400" />
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
