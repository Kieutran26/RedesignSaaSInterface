import { useEffect, useState } from 'react'
import {
  House,
  Search,
  SquarePlus,
  Clapperboard,
  User,
  Users,
  Bell,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Repeat2,
  ThumbsUp,
  Share2,
  Globe,
  Music2,
  Ellipsis,
  Plus,
  MonitorPlay,
  Store,
  Menu,
  BriefcaseBusiness,
  ChartNoAxesColumn,
} from 'lucide-react'
import { PlatformMark, type AnyPlatform } from './ui'
import { photos } from '../data'

type P = { text: string; img: number }

const Placeholder = () => (
  <div className="space-y-1">
    <div className="h-1.5 w-11/12 rounded-full bg-zinc-200" />
    <div className="h-1.5 w-3/4 rounded-full bg-zinc-200" />
  </div>
)

function Caption({ text, clamp = 'line-clamp-3', className = '' }: { text: string; clamp?: string; className?: string }) {
  return text ? <p className={`${clamp} text-[9.5px] leading-snug ${className}`}>{text}</p> : <Placeholder />
}

function Avatar({ letter, size = 'size-6', dark }: { letter: string; size?: string; dark?: boolean }) {
  return (
    <div className={`grid shrink-0 place-items-center rounded-full text-[9px] font-semibold ${size} ${dark ? 'bg-zinc-900 text-white' : 'bg-brand-100 text-brand-700'}`}>
      {letter}
    </div>
  )
}

function BottomNav({ icons, dark, active = 0 }: { icons: (typeof House)[]; dark?: boolean; active?: number }) {
  return (
    <div className={`sticky bottom-0 z-10 mt-auto flex shrink-0 items-center justify-around border-t px-2 pb-3 pt-2 ${dark ? 'border-white/10 bg-black text-white' : 'border-zinc-100 bg-white text-zinc-800'}`}>
      {icons.map((I, i) => (
        <I key={i} className={`size-4 ${i === active ? '' : 'opacity-50'}`} strokeWidth={i === active ? 2.4 : 2} />
      ))}
    </div>
  )
}

function Instagram({ text, img }: P) {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-[13px] font-semibold italic tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Instagram
        </span>
        <div className="flex gap-2.5">
          <Heart className="size-3.5" />
          <Send className="size-3.5" />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden px-3 pb-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="shrink-0 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-600 p-[1.5px]">
            <div className="grid size-8 place-items-center rounded-full border-2 border-white bg-zinc-100 text-[8px] font-semibold text-zinc-500">
              {'DNKTM'[i]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t border-zinc-100 px-2.5 py-1.5">
        <Avatar letter="D" />
        <span className="text-[10px] font-semibold">deszy_creative</span>
        <Ellipsis className="ml-auto size-3.5 text-zinc-500" />
      </div>
      <img src={photos[img].src} alt="" className="aspect-square w-full object-cover" />
      <div className="flex gap-2.5 px-2.5 py-1.5">
        <Heart className="size-4" />
        <MessageCircle className="size-4" />
        <Send className="size-4" />
        <Bookmark className="ml-auto size-4" />
      </div>
      <div className="px-2.5 text-[9.5px] font-semibold">1.284 lượt thích</div>
      <div className="px-2.5 pt-0.5">
        {text ? (
          <p className="line-clamp-2 text-[9.5px] leading-snug">
            <span className="font-semibold">deszy_creative</span> {text}
          </p>
        ) : (
          <Placeholder />
        )}
      </div>
      <BottomNav icons={[House, Search, SquarePlus, Clapperboard, User]} />
    </>
  )
}

function Facebook({ text, img }: P) {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-[17px] font-bold tracking-tight text-[#1877F2]">facebook</span>
        <div className="flex gap-1.5">
          {[Plus, Search, MessageCircle].map((I, i) => (
            <span key={i} className="grid size-6 place-items-center rounded-full bg-zinc-100">
              <I className="size-3" />
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-around border-b border-zinc-200 pb-1.5 text-zinc-500">
        <House className="size-4 text-[#1877F2]" />
        <MonitorPlay className="size-4" />
        <Users className="size-4" />
        <Store className="size-4" />
        <Bell className="size-4" />
        <Menu className="size-4" />
      </div>
      <div className="h-1.5 bg-zinc-200" />
      <div className="flex items-center gap-1.5 px-2.5 pt-2">
        <Avatar letter="D" size="size-7" />
        <div className="leading-tight">
          <div className="text-[10px] font-semibold">Deszy</div>
          <div className="flex items-center gap-0.5 text-[8px] text-zinc-500">
            Vừa xong · <Globe className="size-2" />
          </div>
        </div>
        <Ellipsis className="ml-auto size-3.5 text-zinc-500" />
      </div>
      <div className="px-2.5 py-1.5">
        <Caption text={text} clamp="line-clamp-4" />
      </div>
      <img src={photos[img].src} alt="" className="aspect-[4/3.4] w-full object-cover" />
      <div className="flex items-center justify-between px-2.5 py-1 text-[8px] text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="grid size-3 place-items-center rounded-full bg-[#1877F2]">
            <ThumbsUp className="size-1.5 fill-white text-white" />
          </span>
          328
        </span>
        <span>24 bình luận · 6 chia sẻ</span>
      </div>
      <div className="mx-2.5 grid grid-cols-3 border-t border-zinc-200 py-1.5 text-[8.5px] font-medium text-zinc-600">
        {[
          [ThumbsUp, 'Thích'],
          [MessageCircle, 'Bình luận'],
          [Share2, 'Chia sẻ'],
        ].map(([I, l]) => {
          const Icon = I as typeof House
          return (
            <span key={l as string} className="flex items-center justify-center gap-1">
              <Icon className="size-3" />
              {l as string}
            </span>
          )
        })}
      </div>
    </>
  )
}

function TikTok({ text, img }: P) {
  return (
    <div className="relative flex flex-1 flex-col bg-black text-white">
      <img src={photos[img].src} alt="" className="absolute inset-0 size-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="relative flex justify-center gap-3 pt-1 text-[10px] font-semibold">
        <span className="opacity-60">Đang follow</span>
        <span className="border-b-2 border-white pb-0.5">Dành cho bạn</span>
      </div>
      <div className="relative mt-auto flex items-end gap-2 px-2.5 pb-2">
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-semibold">@kiu.chun</div>
          <Caption text={text} className="mt-1 text-white/90" />
          <div className="mt-1.5 flex items-center gap-1 text-[8.5px] text-white/80">
            <Music2 className="size-2.5" /> Âm thanh gốc · kiu.chun
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 pb-1">
          <div className="relative">
            <Avatar letter="K" size="size-8" />
            <span className="absolute -bottom-1.5 left-1/2 grid size-3.5 -translate-x-1/2 place-items-center rounded-full bg-[#fe2c55]">
              <Plus className="size-2.5" strokeWidth={3} />
            </span>
          </div>
          {[
            [Heart, '12,4K'],
            [MessageCircle, '318'],
            [Bookmark, '1,2K'],
            [Share2, '96'],
          ].map(([I, v]) => {
            const Icon = I as typeof House
            return (
              <span key={v as string} className="flex flex-col items-center text-[8px] font-semibold">
                <Icon className="size-5 fill-white/90" />
                {v as string}
              </span>
            )
          })}
          <span className="grid size-7 animate-[spin_4s_linear_infinite] place-items-center rounded-full bg-zinc-800 ring-4 ring-zinc-900">
            <Music2 className="size-3" />
          </span>
        </div>
      </div>
      <div className="relative">
        <BottomNav icons={[House, Users, SquarePlus, MessageCircle, User]} dark />
      </div>
    </div>
  )
}

function XApp({ text, img }: P) {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-1.5">
        <Avatar letter="K" />
        <PlatformMark platform="x" className="size-5" />
        <span className="size-6" />
      </div>
      <div className="grid grid-cols-2 border-b border-zinc-200 text-center text-[9.5px]">
        <span className="mx-auto border-b-2 border-[#1d9bf0] pb-1.5 font-semibold">Dành cho bạn</span>
        <span className="pb-1.5 text-zinc-500">Đang theo dõi</span>
      </div>
      <div className="flex gap-2 border-b border-zinc-100 px-2.5 py-2.5">
        <Avatar letter="K" size="size-7" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[9.5px]">
            <span className="font-bold">Kieu Tran</span>
            <span className="truncate text-zinc-500">@Kieutran26 · 1 phút</span>
          </div>
          <div className="mt-0.5">
            <Caption text={text} clamp="line-clamp-5" />
          </div>
          <img src={photos[img].src} alt="" className="mt-2 aspect-[4/3] w-full rounded-xl border border-zinc-200 object-cover" />
          <div className="mt-2 flex justify-between pr-2 text-[8px] text-zinc-500">
            {[
              [MessageCircle, '12'],
              [Repeat2, '48'],
              [Heart, '326'],
              [ChartNoAxesColumn, '8,1K'],
            ].map(([I, v]) => {
              const Icon = I as typeof House
              return (
                <span key={v as string} className="flex items-center gap-0.5">
                  <Icon className="size-3" />
                  {v as string}
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-2 px-2.5 py-2.5 opacity-60">
        <Avatar letter="N" size="size-7" dark />
        <div className="flex-1 space-y-1 pt-1">
          <div className="h-1.5 w-1/2 rounded-full bg-zinc-200" />
          <div className="h-1.5 w-11/12 rounded-full bg-zinc-200" />
        </div>
      </div>
      <BottomNav icons={[House, Search, Users, Bell, MessageCircle]} />
    </>
  )
}

function Threads({ text, img }: P) {
  return (
    <>
      <div className="flex justify-center py-1.5">
        <PlatformMark platform="threads" className="size-6" />
      </div>
      <div className="flex gap-2 border-b border-zinc-100 px-2.5 py-2">
        <div className="flex flex-col items-center">
          <Avatar letter="T" size="size-7" dark />
          <span className="mt-1 w-px flex-1 bg-zinc-200" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[9.5px]">
            <span className="font-semibold">_ticrn</span>
            <span className="text-zinc-400">1 phút</span>
            <Ellipsis className="ml-auto size-3 text-zinc-400" />
          </div>
          <div className="mt-0.5">
            <Caption text={text} clamp="line-clamp-5" />
          </div>
          <div className="mt-2 flex gap-1.5">
            <img src={photos[img].src} alt="" className="aspect-[3/4] w-[60%] rounded-lg object-cover" />
            <img src={photos[(img + 2) % photos.length].src} alt="" className="aspect-[3/4] w-[60%] rounded-lg object-cover" />
          </div>
          <div className="mt-2 flex gap-3 text-zinc-700">
            <Heart className="size-3.5" />
            <MessageCircle className="size-3.5" />
            <Repeat2 className="size-3.5" />
            <Send className="size-3.5" />
          </div>
          <div className="mt-1 text-[8px] text-zinc-400">18 trả lời · 214 lượt thích</div>
        </div>
      </div>
      <div className="flex gap-2 px-2.5 py-2 opacity-60">
        <Avatar letter="M" size="size-7" />
        <div className="flex-1 space-y-1 pt-1">
          <div className="h-1.5 w-1/3 rounded-full bg-zinc-200" />
          <div className="h-1.5 w-4/5 rounded-full bg-zinc-200" />
        </div>
      </div>
      <BottomNav icons={[House, Search, SquarePlus, Heart, User]} />
    </>
  )
}

function LinkedIn({ text, img }: P) {
  return (
    <div className="flex flex-1 flex-col bg-[#f4f2ee]">
      <div className="flex items-center gap-2 bg-white px-2.5 py-1.5">
        <Avatar letter="N" />
        <div className="flex flex-1 items-center gap-1 rounded bg-[#edf3f8] px-2 py-1 text-[8.5px] text-zinc-500">
          <Search className="size-2.5" /> Tìm kiếm
        </div>
        <MessageCircle className="size-3.5 text-zinc-600" />
      </div>
      <div className="mt-1.5 bg-white">
        <div className="flex items-center gap-1.5 px-2.5 pt-2">
          <div className="grid size-7 place-items-center rounded bg-zinc-900 text-[9px] font-semibold text-white">N</div>
          <div className="leading-tight">
            <div className="text-[9.5px] font-semibold">Nguyen Ngoc Kieu Tran</div>
            <div className="text-[7.5px] text-zinc-500">Content Lead · 1.240 người theo dõi</div>
            <div className="flex items-center gap-0.5 text-[7.5px] text-zinc-500">
              Vừa xong · <Globe className="size-2" />
            </div>
          </div>
        </div>
        <div className="px-2.5 py-1.5">
          <Caption text={text} clamp="line-clamp-3" />
        </div>
        <img src={photos[img].src} alt="" className="aspect-[4/3] w-full object-cover" />
        <div className="flex items-center gap-1 px-2.5 py-1 text-[7.5px] text-zinc-500">
          <span className="grid size-3 place-items-center rounded-full bg-[#0A66C2]">
            <ThumbsUp className="size-1.5 fill-white text-white" />
          </span>
          86 · 12 bình luận
        </div>
        <div className="mx-2.5 grid grid-cols-4 border-t border-zinc-200 py-1.5 text-[7.5px] font-medium text-zinc-600">
          {[
            [ThumbsUp, 'Thích'],
            [MessageCircle, 'Bình luận'],
            [Repeat2, 'Đăng lại'],
            [Send, 'Gửi'],
          ].map(([I, l]) => {
            const Icon = I as typeof House
            return (
              <span key={l as string} className="flex flex-col items-center gap-0.5">
                <Icon className="size-3" />
                {l as string}
              </span>
            )
          })}
        </div>
      </div>
      <BottomNav icons={[House, Users, SquarePlus, Bell, BriefcaseBusiness]} />
    </div>
  )
}

const screens: Record<AnyPlatform, (p: P) => React.ReactElement> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
  x: XApp,
  threads: Threads,
  linkedin: LinkedIn,
}

const labels: Record<AnyPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  x: 'X',
  threads: 'Threads',
  linkedin: 'LinkedIn',
}

/** Tall phone mock that cycles through each selected platform's native post UI. */
export function PhonePreview({ platforms, text, img, onDark }: { platforms: AnyPlatform[]; text: string; img: number; onDark?: boolean }) {
  const [i, setI] = useState(0)
  const key = platforms.join(',')
  useEffect(() => setI(0), [key])
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % platforms.length), 2600)
    return () => clearInterval(t)
  }, [key, platforms.length])

  const current = platforms[i % platforms.length]
  const Screen = screens[current]
  const dark = current === 'tiktok'

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative h-[392px] w-[200px] rounded-[34px] bg-zinc-900 p-[6px] shadow-[0_28px_60px_-22px_rgba(24,24,27,0.55)] ring-1 ring-zinc-700">
        <span className="absolute -left-[3px] top-20 h-8 w-[3px] rounded-l bg-zinc-700" />
        <span className="absolute -right-[3px] top-24 h-12 w-[3px] rounded-r bg-zinc-700" />
        <div className={`relative flex h-full flex-col overflow-hidden rounded-[28px] ${dark ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
          <div className={`relative z-10 flex items-center justify-between px-5 pb-1 pt-2 font-mono text-[8px] font-semibold ${dark ? 'text-white' : ''}`}>
            <span>9:41</span>
            <span className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
            <span>5G</span>
          </div>
          <div key={`${current}-${img}`} className="flex min-h-0 flex-1 animate-fade-up flex-col overflow-hidden [animation-duration:0.45s]">
            <Screen text={text} img={img} />
          </div>
          <span className={`absolute bottom-1 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full ${dark ? 'bg-white/70' : 'bg-zinc-900/80'}`} />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {platforms.map((p, k) => (
          <button
            key={p}
            onClick={() => setI(k)}
            title={labels[p]}
            className={`flex items-center gap-1 rounded-full transition-all ${
              k === i % platforms.length
                ? `py-0.5 pl-0.5 pr-2 text-[9px] font-medium ${onDark ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'}`
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <PlatformMark platform={p} className="size-4" />
            {k === i % platforms.length && labels[p]}
          </button>
        ))}
      </div>
    </div>
  )
}
