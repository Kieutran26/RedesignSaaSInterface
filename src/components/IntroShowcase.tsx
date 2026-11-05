import { useEffect, useState } from 'react'
import { Check, X, TriangleAlert, Clipboard, Clock, FileSpreadsheet, ChevronRight, Lock } from 'lucide-react'
import { PlatformMark, type AnyPlatform } from './ui'

const platforms: AnyPlatform[] = ['facebook', 'instagram', 'tiktok', 'x', 'threads', 'linkedin']
const names: Record<AnyPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  x: 'X',
  threads: 'Threads',
  linkedin: 'LinkedIn',
}

export const comparisons = [
  ['Copy–paste qua 6 ứng dụng', 'Một trình soạn thảo cho mọi kênh'],
  ['Quên giờ đăng, lệch lịch', 'Lịch nội dung tự động đăng'],
  ['Số liệu nằm rải rác', 'Một bảng phân tích tổng'],
  ['Không rõ nội dung nào hiệu quả', 'Đo hiệu quả theo trụ cột'],
] as const

function Before() {
  return (
    <div className="relative h-full">
      {/* scattered chaos */}
      <div className="absolute left-[6%] top-[10%] w-44 rotate-[-6deg] animate-float rounded-md bg-brand-300 p-3 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)]">
        <div className="text-[12px] font-semibold leading-snug">Nhớ đăng TikTok lúc 20h!!</div>
        <div className="mt-1 text-[10px] text-zinc-700">…và sửa caption cho X</div>
      </div>
      <div className="absolute right-[6%] top-[8%] w-52 rotate-[3deg] animate-float rounded-lg border border-zinc-200 bg-white p-3 shadow-lg [animation-delay:-1.5s]">
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-600">
          <FileSpreadsheet className="size-3.5 text-emerald-600" /> lich_dang_T11_final_v3.xlsx
        </div>
        <div className="mt-2 grid grid-cols-3 gap-px overflow-hidden rounded bg-zinc-200 text-[8px]">
          {['Ngày', 'Kênh', 'TT', '04/11', 'FB', 'x', '05/11', 'IG', '?', '06/11', 'TT', ''].map((c, i) => (
            <span key={i} className={`bg-white px-1 py-0.5 ${i < 3 ? 'font-semibold' : 'text-zinc-500'} ${c === '?' ? 'bg-red-50 text-red-600' : ''}`}>
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[14%] left-[10%] flex w-56 rotate-[2deg] animate-float items-start gap-2 rounded-lg border border-red-200 bg-white p-3 shadow-lg [animation-delay:-3s]">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-red-50">
          <TriangleAlert className="size-3.5 text-red-600" />
        </span>
        <div>
          <div className="text-[11px] font-semibold">Đăng thất bại</div>
          <div className="text-[10px] text-zinc-500">Instagram · Phiên đăng nhập hết hạn</div>
        </div>
      </div>
      <div className="absolute bottom-[22%] right-[8%] w-48 rotate-[-4deg] animate-float rounded-lg border border-zinc-200 bg-white p-3 shadow-lg [animation-delay:-2s]">
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-600">
          <Clipboard className="size-3.5" /> Đã sao chép caption
        </div>
        <div className="mt-1 text-[18px] font-semibold tracking-tight text-zinc-900">
          lần thứ 6<span className="text-red-500">.</span>
        </div>
      </div>
      <div className="absolute left-1/2 top-[46%] flex -translate-x-1/2 -translate-y-1/2 animate-float items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-white shadow-xl [animation-delay:-0.8s]">
        <Clock className="size-3.5 text-brand-400" /> 23:47 — vẫn đang chỉnh ảnh
      </div>
    </div>
  )
}

function After() {
  const steps = ['Chiến lược', 'Soạn bài', 'Lên lịch', 'Đăng', 'Phân tích']
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      {/* hub */}
      <div className="relative size-52">
        <div className="absolute inset-0 rounded-full border border-dashed border-zinc-300" />
        <div className="absolute inset-8 rounded-full border border-zinc-200 bg-brand-50/60" />
        <div className="absolute inset-0 animate-[spin_28s_linear_infinite]">
          {platforms.map((p, i) => {
            const a = (i / platforms.length) * Math.PI * 2 - Math.PI / 2
            return (
              <span
                key={p}
                className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md ring-1 ring-zinc-200"
                style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
              >
                <span className="animate-[spin_28s_linear_infinite_reverse]">
                  <PlatformMark platform={p} className="size-5" />
                </span>
              </span>
            )
          })}
        </div>
        <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 animate-pop place-items-center rounded-2xl bg-brand-400 shadow-[0_14px_30px_-10px_rgba(245,196,0,0.9)]">
          <svg viewBox="0 0 24 24" className="size-7" fill="none">
            <path d="M4 5l16 3-7 3-2 8-3-7z" fill="#18181b" />
          </svg>
        </div>
      </div>
      {/* pipeline */}
      <div className="flex flex-wrap items-center justify-center gap-1">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-1">
            <span
              style={{ animationDelay: `${200 + i * 140}ms` }}
              className="flex animate-pop items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium shadow-sm"
            >
              <span className="grid size-3.5 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              {s}
            </span>
            {i < steps.length - 1 && <ChevronRight className="size-3 text-zinc-300" />}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Interactive before/after browser mock for the intro section. */
export function IntroShowcase() {
  const [after, setAfter] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setAfter((v) => !v), after ? 6000 : 4500)
    return () => clearTimeout(t)
  }, [after, paused])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-4 flex justify-center lg:justify-start">
        <div className="relative grid grid-cols-2 rounded-full bg-zinc-200/70 p-1 text-[13px] font-medium">
          <span
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              after ? 'translate-x-full bg-brand-400' : 'bg-white'
            }`}
          />
          {['Trước đây', 'Với PostChoice'].map((l, i) => (
            <button
              key={l}
              onClick={() => setAfter(i === 1)}
              className={`relative z-10 px-4 py-1.5 transition-colors ${after === (i === 1) ? 'text-zinc-900' : 'text-zinc-500'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_30px_60px_-30px_rgba(24,24,27,0.3)]">
        {/* browser chrome with tabs */}
        <div className="flex items-end gap-1 border-b border-zinc-200 bg-zinc-100 px-3 pt-2.5">
          <div className="mb-2 mr-2 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-zinc-300" />
            <span className="size-2.5 rounded-full bg-zinc-300" />
            <span className="size-2.5 rounded-full bg-zinc-300" />
          </div>
          {after ? (
            <div key="a" className="flex animate-fade-up items-center gap-2 rounded-t-lg bg-white px-3 py-1.5 text-[11px] font-medium [animation-duration:0.4s]">
              <span className="grid size-4 place-items-center rounded bg-brand-400">
                <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
                  <path d="M4 5l16 3-7 3-2 8-3-7z" fill="#18181b" />
                </svg>
              </span>
              PostChoice
              <X className="size-3 text-zinc-400" />
            </div>
          ) : (
            <div key="b" className="flex min-w-0 flex-1 gap-0.5">
              {platforms.map((p, i) => (
                <div
                  key={p}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={`flex min-w-0 flex-1 animate-fade-up items-center gap-1.5 rounded-t-lg px-2 py-1.5 text-[10px] [animation-duration:0.4s] ${
                    i === 2 ? 'bg-white font-medium' : 'bg-zinc-200/70 text-zinc-500'
                  }`}
                >
                  <PlatformMark platform={p} className="size-3.5 shrink-0" />
                  <span className="truncate">{names[p]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 border-b border-zinc-100 px-3 py-1.5">
          <Lock className="size-3 text-zinc-400" />
          <span className="font-mono text-[10px] text-zinc-400">{after ? 'app.postchoice.vn' : 'business.tiktok.com/upload?ver=3'}</span>
        </div>
        <div key={String(after)} className={`h-[340px] animate-fade-up [animation-duration:0.5s] ${after ? 'bg-white' : 'bg-zinc-50'}`}>
          {after ? <After /> : <Before />}
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {comparisons.map(([b, a], i) => (
          <li
            key={b}
            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[13px] transition-colors duration-500 ${
              after ? 'border-brand-200 bg-brand-50 text-zinc-900' : 'border-zinc-200 bg-white text-zinc-500'
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full transition-colors duration-500 ${after ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {after ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" />}
            </span>
            <span className={after ? '' : 'line-through decoration-zinc-300'}>{after ? a : b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
