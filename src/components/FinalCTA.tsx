import { useState } from 'react'
import { ArrowRight, Check, CircleCheck, CalendarClock, MousePointerClick } from 'lucide-react'
import { PlatformMark, type AnyPlatform } from './ui'
import { photos } from '../data'
import { href } from '../router'

const feed: { p: AnyPlatform; title: string; meta: string; img?: number; kind: 'posted' | 'scheduled' | 'clicks' }[] = [
  { p: 'instagram', title: 'Đã đăng · Bộ sưu tập thu đông', meta: 'deszy_creative · vừa xong', img: 3, kind: 'posted' },
  { p: 'facebook', title: 'Lên lịch · Flash sale 48h', meta: 'Deszy · 20:00 hôm nay', kind: 'scheduled' },
  { p: 'tiktok', title: 'Đã đăng · Unbox đồng hồ mới', meta: 'kiu.chun · 2 phút trước', img: 7, kind: 'posted' },
  { p: 'x', title: '+128 lượt nhấp liên kết', meta: 'flash_sale_t11 · 1 giờ qua', kind: 'clicks' },
  { p: 'linkedin', title: 'Đã đăng · Tuyển Content Exec', meta: 'TalentChoice · 5 phút trước', img: 10, kind: 'posted' },
  { p: 'threads', title: 'Lên lịch · Hỏi đáp cộng đồng', meta: '_ticrn · 19:00 mai', kind: 'scheduled' },
]

function FeedItem({ it }: { it: (typeof feed)[number] }) {
  const Icon = it.kind === 'posted' ? CircleCheck : it.kind === 'scheduled' ? CalendarClock : MousePointerClick
  const tone = it.kind === 'posted' ? 'text-emerald-400' : it.kind === 'scheduled' ? 'text-brand-400' : 'text-sky-400'
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur">
      <div className="relative shrink-0">
        {it.img !== undefined ? (
          <img src={photos[it.img].src} alt="" className="size-11 rounded-xl object-cover" />
        ) : (
          <div className="grid size-11 place-items-center rounded-xl bg-white/10">
            <Icon className={`size-5 ${tone}`} />
          </div>
        )}
        <PlatformMark platform={it.p} className="absolute -bottom-1 -right-1 size-4 rounded-full ring-2 ring-zinc-900" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-white">{it.title}</div>
        <div className="truncate text-[11px] text-zinc-400">{it.meta}</div>
      </div>
      <Icon className={`size-4 shrink-0 ${tone}`} />
    </div>
  )
}

export function FinalCTA() {
  const [email, setEmail] = useState('')
  return (
    <section className="px-6 py-24">
      <div className="reveal relative mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] bg-zinc-900 lg:grid-cols-[1.15fr_1fr]">
        {/* glow + grid */}
        <div className="pointer-events-none absolute -left-32 -top-32 size-[420px] rounded-full bg-brand-400/25 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative p-8 sm:p-12 lg:p-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-zinc-300">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-brand-400" />
              <span className="relative size-1.5 rounded-full bg-brand-400" />
            </span>
            Bắt đầu trong 2 phút
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl">
            Sẵn sàng đăng <span className="text-brand-400">thông minh hơn?</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
            Kết nối kênh, soạn bài đầu tiên và lên lịch cả tuần — ngay hôm nay.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.hash = href('create')
            }}
            className="mt-8 flex max-w-md flex-col gap-2 rounded-2xl bg-white/[0.06] p-1.5 ring-1 ring-white/10 transition focus-within:ring-brand-400/60 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email công việc của bạn"
              aria-label="Email"
              className="h-11 min-w-0 flex-1 bg-transparent px-3.5 text-[14px] text-white outline-none placeholder:text-zinc-500"
            />
            <button className="group flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 text-[14px] font-semibold text-zinc-900 transition hover:bg-brand-300">
              Dùng miễn phí <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-zinc-400">
            {['Gói Starter miễn phí', 'Không cần thẻ', 'Huỷ bất cứ lúc nào'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-brand-400" strokeWidth={3} /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              {['DE', 'NC', 'TC', 'KT', 'MV'].map((n, i) => (
                <span
                  key={n}
                  className={`grid size-8 place-items-center rounded-full text-[10px] font-semibold ring-2 ring-zinc-900 ${
                    ['bg-brand-400 text-zinc-900', 'bg-white text-zinc-900', 'bg-emerald-400 text-zinc-900', 'bg-orange-400 text-zinc-900', 'bg-zinc-700 text-white'][i]
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="text-[12px] leading-snug text-zinc-400">
              <span className="font-semibold text-white">2.400+ thương hiệu</span>
              <br />
              đang dùng PostChoice mỗi ngày
            </p>
          </div>
        </div>

        {/* live feed */}
        <div className="relative hidden h-full min-h-[460px] overflow-hidden border-l border-white/10 lg:block [mask-image:linear-gradient(transparent,black_18%,black_82%,transparent)]">
          <div className="absolute inset-x-8 top-0 animate-marquee-y hover:[animation-play-state:paused]">
            {[...feed, ...feed].map((it, i) => (
              <div key={i} className="pb-3">
                <FeedItem it={it} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
