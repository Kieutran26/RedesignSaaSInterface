import { useMemo, useRef, useState } from 'react'
import {
  Check,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Send,
  CalendarClock,
  CalendarDays,
  Save,
  Globe,
  ThumbsUp,
  MessageCircle,
  Share,
  Ellipsis,
  CircleCheck,
  Circle,
  Bookmark,
  Heart,
  Smile,
  Hash,
  Link2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
  Repeat2,
  CircleAlert,
  TriangleAlert,
  PenLine,
  ListTree,
  Wand2,
  Copy,
  Music2,
  Palette,
  Underline,
  Bold,
  Plus,
  Settings,
  Trash2,
  Clock,
} from 'lucide-react'
import { Label, Input, Select, Toggle, PlatformMark, type AnyPlatform } from '../components/ui'
import { photos } from '../data'
import { href } from '../router'

type Channel = { id: string; platform: AnyPlatform; label: string; handle: string }

const channels: Channel[] = [
  { id: 'threads', platform: 'threads', label: 'Threads', handle: '_ticrn' },
  { id: 'fb-deszy', platform: 'facebook', label: 'Trang Facebook', handle: 'Deszy' },
  { id: 'ig', platform: 'instagram', label: 'Instagram', handle: 'deszy_creative' },
  { id: 'x', platform: 'x', label: 'X', handle: 'Kieutran26' },
  { id: 'tiktok', platform: 'tiktok', label: 'TikTok', handle: 'kiu.chun' },
  { id: 'fb-next', platform: 'facebook', label: 'Trang Facebook', handle: 'NextChoice' },
  { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', handle: 'Nguyen Ngoc Kieu Tran' },
  { id: 'fb-talent', platform: 'facebook', label: 'Trang Facebook', handle: 'TalentChoice' },
]

const limits: Record<AnyPlatform, number> = {
  x: 280,
  threads: 500,
  instagram: 2200,
  tiktok: 2200,
  linkedin: 3000,
  facebook: 63206,
}

const platformName: Record<AnyPlatform, string> = {
  facebook: 'facebook',
  instagram: 'instagram',
  threads: 'threads',
  x: 'x',
  tiktok: 'tiktok',
  linkedin: 'linkedin',
}

const pillars = ['Kiến thức sản phẩm', 'Câu chuyện thương hiệu', 'Khuyến mãi', 'Cộng đồng']
const angles: Record<string, string[]> = {
  'Kiến thức sản phẩm': ['Hướng dẫn sử dụng', 'So sánh', 'Mẹo hay'],
  'Câu chuyện thương hiệu': ['Hậu trường', 'Con người'],
  'Khuyến mãi': ['Flash sale', 'Ưu đãi thành viên'],
  'Cộng đồng': ['Feedback khách hàng', 'UGC'],
}

const signatures: Record<string, string> = {
  none: '',
  brand: '\n\n— Deszy · Phụ kiện cho người trẻ',
  contact: '\n\nInbox ngay để được tư vấn miễn phí.',
}

const trackedLinks = [
  { url: 'deszy.vn/flash-sale', campaign: 'flash_sale_t10', clicks: 1284 },
  { url: 'deszy.vn/dong-ho-da', campaign: 'tuan_42', clicks: 642 },
  { url: 'deszy.vn/qua-tang', campaign: 'holiday_2026', clicks: 211 },
]

const urlRe = /https?:\/\/[^\s]+/

const shortCode = (s: string) => {
  let h = 0
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h.toString(36).slice(0, 6)
}

const toBold = (s: string) =>
  Array.from(s)
    .map((ch) => {
      const c = ch.codePointAt(0)!
      if (c >= 65 && c <= 90) return String.fromCodePoint(0x1d5d4 + c - 65)
      if (c >= 97 && c <= 122) return String.fromCodePoint(0x1d5ee + c - 97)
      if (c >= 48 && c <= 57) return String.fromCodePoint(0x1d7ec + c - 48)
      return ch
    })
    .join('')
const toUnderline = (s: string) =>
  Array.from(s)
    .map((ch) => (ch.trim() ? ch + '\u0332' : ch))
    .join('')

function ToolBtn({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: typeof Plus
  label?: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg text-[12px] font-medium transition ${label ? 'px-2.5' : 'w-8 justify-center'} ${
        active ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}

function Initials({ name }: { name: string }) {
  return <>{name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase() || name.slice(0, 2).toUpperCase()}</>
}

export default function CreatePost() {
  const [selected, setSelected] = useState<string[]>(['ig', 'x', 'tiktok', 'fb-next'])
  const [brand, setBrand] = useState('Test')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [signature, setSignature] = useState('none')
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [editTab, setEditTab] = useState<string>('default')
  const [editorOpen, setEditorOpen] = useState(true)
  const [aiOpen, setAiOpen] = useState(false)
  const [media, setMedia] = useState<number[]>([])
  const [pickerOpen, setPickerOpen] = useState(false)
  const [comments, setComments] = useState<string[]>([])
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [utmOpen, setUtmOpen] = useState(false)
  const [utm, setUtm] = useState({ url: '', source: '', medium: 'social', campaign: '', content: '', term: '' })
  const [tracked, setTracked] = useState(true)
  const [replaceUtm, setReplaceUtm] = useState(false)
  const [statsAt, setStatsAt] = useState('14:02')
  const [pillar, setPillar] = useState('')
  const [angle, setAngle] = useState('')
  const [date, setDate] = useState('2026-11-04')
  const [time, setTime] = useState('17:36')
  const [previewId, setPreviewId] = useState('ig')
  const ref = useRef<HTMLTextAreaElement>(null)

  const sel = channels.filter((c) => selected.includes(c.id))

  const toggle = (id: string) =>
    setSelected((s) => {
      if (s.includes(id)) {
        const next = s.filter((x) => x !== id)
        if (previewId === id && next[0]) setPreviewId(next[0])
        if (editTab === id) setEditTab('default')
        return next
      }
      setPreviewId(id)
      return [...s, id]
    })

  const textFor = (id: string) => (overrides[id] ?? body) + signatures[signature]
  const resolved = (c: Channel) => textFor(c.id).split('{platform}').join(platformName[c.platform])

  const editing = sel.find((c) => c.id === editTab)
  const editingCustom = editing ? overrides[editing.id] !== undefined : false
  const editorValue = editing && editingCustom ? overrides[editing.id] : body
  const editorLimit = editing ? limits[editing.platform] : sel.length ? Math.min(...sel.map((c) => limits[c.platform])) : 63206
  const editorLen = editorValue.length + signatures[signature].length
  const overLimit = sel.filter((c) => textFor(c.id).length > limits[c.platform])
  const setEditor = (v: string) => (editing ? setOverrides((o) => ({ ...o, [editing.id]: v })) : setBody(v))
  const readOnly = !!editing && !editingCustom

  const format = (fn: (s: string) => string) => {
    const t = ref.current
    if (!t || readOnly) return
    const { selectionStart: a, selectionEnd: b } = t
    if (a === b) return
    setEditor(editorValue.slice(0, a) + fn(editorValue.slice(a, b)) + editorValue.slice(b))
  }
  const insert = (s: string) => {
    if (readOnly) return
    const t = ref.current
    const a = t?.selectionStart ?? editorValue.length
    setEditor(editorValue.slice(0, a) + s + editorValue.slice(a))
  }

  const preview = (editing ?? sel.find((c) => c.id === previewId) ?? sel[0]) as Channel | undefined

  // UTM
  const baseUrl = utm.url || body.match(urlRe)?.[0] || ''
  const utmUrl = useMemo(() => {
    if (!baseUrl || !utm.medium || !utm.campaign) return ''
    const [path, existing = ''] = baseUrl.split('?')
    const params = existing
      .split('&')
      .filter(Boolean)
      .filter((p) => !replaceUtm || !p.startsWith('utm_'))
    const add = (k: string, v: string) => v && params.push(`${k}=${v === '{platform}' ? v : encodeURIComponent(v)}`)
    add('utm_source', utm.source || '{platform}')
    add('utm_medium', utm.medium)
    add('utm_campaign', utm.campaign)
    add('utm_content', utm.content)
    add('utm_term', utm.term)
    const full = `${path}?${params.join('&')}`
    return tracked ? `https://sc.link/r/${shortCode(full)}#${full}` : full
  }, [baseUrl, utm, tracked, replaceUtm])
  const shownUtm = tracked && utmUrl ? utmUrl.split('#')[0] : utmUrl
  const fullUtm = tracked && utmUrl ? utmUrl.split('#')[1] : utmUrl
  const applyUtm = () => {
    if (!shownUtm) return
    setBody((b) => (urlRe.test(b) ? b.replace(urlRe, shownUtm) : `${b}${b ? '\n\n' : ''}${shownUtm}`))
    setUtm((u) => ({ ...u, url: '' }))
  }

  const checks = [
    { label: 'Chọn ít nhất một tài khoản', ok: sel.length > 0 },
    { label: 'Viết nội dung chính', ok: body.trim().length > 0 },
    {
      label: overLimit.length ? `Rút gọn cho ${overLimit.map((c) => c.label).join(', ')}` : 'Trong giới hạn ký tự',
      ok: body.trim().length > 0 && overLimit.length === 0,
    },
    {
      label: 'Thêm media cho Instagram / TikTok',
      ok: !sel.some((c) => c.platform === 'instagram' || c.platform === 'tiktok') || media.length > 0,
    },
    { label: 'Chọn trụ cột và góc khai thác', ok: !!pillar && !!angle },
  ]
  const progress = checks.filter((c) => c.ok).length
  const ready = checks[0].ok && checks[1].ok && overLimit.length === 0
  const whenLabel = new Date(`${date}T${time}`).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="overflow-clip rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-12px_rgba(16,24,40,0.08)]">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* ============ Composer ============ */}
        <div className="min-w-0 p-6 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">Tạo bài viết</h1>
            <span className="flex h-7 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 text-[11px] font-medium text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Đã lưu tự động
            </span>
          </div>

          {/* Account avatars */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {channels.map((c) => {
              const on = selected.includes(c.id)
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  title={`${c.label} · ${c.handle}`}
                  className="group relative"
                >
                  <span
                    className={`grid size-12 place-items-center rounded-full text-[13px] font-semibold transition ${
                      on
                        ? 'bg-zinc-900 text-white ring-2 ring-brand-400 ring-offset-2'
                        : 'bg-zinc-100 text-zinc-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Initials name={c.handle} />
                  </span>
                  <PlatformMark
                    platform={c.platform}
                    className={`absolute -bottom-0.5 -right-0.5 size-[18px] rounded-full ring-2 ring-white transition ${on ? '' : 'grayscale'}`}
                  />
                </button>
              )
            })}
            <button
              title="Kết nối kênh mới"
              className="grid size-12 place-items-center rounded-full border border-dashed border-zinc-300 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-700"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {/* Channel tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {[{ id: 'default' } as const, ...sel].map((c) => {
              const isDefault = c.id === 'default'
              const ch = isDefault ? null : (c as Channel)
              const active = editTab === c.id
              const over = ch && textFor(ch.id).length > limits[ch.platform]
              return (
                <button
                  key={c.id}
                  onClick={() => setEditTab(c.id)}
                  title={isDefault ? 'Nội dung chung' : `Tuỳ chỉnh cho ${ch!.handle}`}
                  className={`relative grid size-9 place-items-center rounded-lg text-[10px] font-semibold transition ${
                    active
                      ? 'bg-brand-50 text-zinc-900 ring-2 ring-brand-400'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {isDefault ? <Globe className="size-4" /> : <Initials name={ch!.handle} />}
                  {ch && (
                    <PlatformMark platform={ch.platform} className="absolute -bottom-1 -right-1 size-3.5 rounded-full ring-2 ring-white" />
                  )}
                  {(over || (ch && overrides[ch.id] !== undefined)) && (
                    <span
                      className={`absolute -right-1 -top-1 size-2.5 rounded-full ring-2 ring-white ${over ? 'bg-red-500' : 'bg-brand-500'}`}
                    />
                  )}
                </button>
              )
            })}
            {sel.length > 0 && (
              <span className="ml-1 text-[12px] text-zinc-400">
                {editing ? (
                  <>
                    Đang chỉnh cho <span className="font-medium text-zinc-700">{editing.handle}</span>
                  </>
                ) : (
                  'Chọn một kênh để tuỳ chỉnh riêng'
                )}
              </span>
            )}
          </div>

          {/* Editor */}
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50/40 transition focus-within:border-zinc-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-100">
            <div className="flex items-center justify-between gap-3 px-4 pt-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {editing ? `Nội dung riêng · ${editing.label}` : 'Nội dung dùng chung (tất cả kênh)'}
              </span>
              <div className="flex items-center gap-3">
                {editing && (
                  <label className="flex items-center gap-2 text-[12px] font-medium text-zinc-600">
                    Tuỳ chỉnh riêng
                    <Toggle
                      on={editingCustom}
                      onChange={(v) =>
                        setOverrides((o) => {
                          const n = { ...o }
                          if (v) n[editing.id] = body
                          else delete n[editing.id]
                          return n
                        })
                      }
                    />
                  </label>
                )}
                <button onClick={() => setEditorOpen((v) => !v)} className="grid size-6 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100">
                  {editorOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>
            </div>

            {editorOpen && (
              <>
                <textarea
                  ref={ref}
                  value={editorValue}
                  readOnly={readOnly}
                  onChange={(e) => setEditor(e.target.value)}
                  rows={8}
                  placeholder={readOnly ? '' : 'Viết điều gì đó…'}
                  className={`block w-full resize-none bg-transparent px-4 py-3 text-[14px] leading-relaxed outline-none placeholder:text-zinc-400 ${readOnly ? 'cursor-default text-zinc-400' : ''}`}
                />
                {readOnly && (
                  <div className="mx-4 mb-2 rounded-lg bg-zinc-100 px-3 py-2 text-[12px] text-zinc-500">
                    Kênh này đang dùng nội dung chung. Bật “Tuỳ chỉnh riêng” để viết phiên bản khác.
                  </div>
                )}
                {signature !== 'none' && (
                  <div className="whitespace-pre-wrap px-4 pb-2 text-[12px] italic text-zinc-400">{signatures[signature].trim()}</div>
                )}

                {media.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {media.map((m, i) => (
                      <div key={m} className="group relative size-16 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-zinc-200">
                        <img src={photos[m].src} alt={photos[m].name} className="size-full object-cover" />
                        {i === 0 && <span className="absolute inset-x-0 bottom-0 bg-black/55 text-center text-[9px] font-medium text-white">Bìa</span>}
                        <button
                          onClick={() => setMedia((x) => x.filter((y) => y !== m))}
                          className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <X className="size-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 overflow-x-auto border-t border-zinc-100 px-3 py-2">
                  <ToolBtn icon={ImageIcon} label="Chèn media" onClick={() => setPickerOpen((v) => !v)} active={pickerOpen} />
                  <ToolBtn icon={Palette} label="Thiết kế" />
                  <ToolBtn icon={Sparkles} label="Trợ lý AI" onClick={() => setAiOpen((v) => !v)} active={aiOpen} />
                  <div className="relative shrink-0">
                    <select
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="h-8 appearance-none rounded-lg border border-zinc-200 bg-white pl-7 pr-7 text-[12px] font-medium text-zinc-700 outline-none hover:border-zinc-300"
                    >
                      <option value="none">Chữ ký</option>
                      <option value="brand">Chữ ký thương hiệu</option>
                      <option value="contact">Lời kêu gọi liên hệ</option>
                    </select>
                    <PenLine className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-zinc-400" />
                  </div>
                  <span className="mx-1 h-4 w-px shrink-0 bg-zinc-200" />
                  <ToolBtn icon={Underline} onClick={() => format(toUnderline)} />
                  <ToolBtn icon={Bold} onClick={() => format(toBold)} />
                  <ToolBtn icon={Smile} onClick={() => insert('✨')} />
                  <ToolBtn icon={Link2} onClick={() => { setSettingsOpen(true); setUtmOpen(true) }} />
                  <span
                    className={`ml-auto flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 font-mono text-[11px] ${
                      editorLen > editorLimit
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-zinc-200 bg-white text-zinc-500'
                    }`}
                    title={editing ? `Giới hạn ${editing.label}` : 'Giới hạn thấp nhất trong các kênh đã chọn'}
                  >
                    {editorLen > editorLimit && <TriangleAlert className="size-3.5" />}
                    {editorLen.toLocaleString('vi-VN')}/{editorLimit.toLocaleString('vi-VN')}
                  </span>
                </div>

                {pickerOpen && (
                  <div className="border-t border-zinc-100 p-3">
                    <div className="mb-2 flex items-center justify-between text-[12px]">
                      <span className="font-medium">Thư viện tệp <span className="font-normal text-zinc-400">· tối đa 10 ảnh</span></span>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900">
                          <Upload className="size-3.5" /> Tải lên
                        </button>
                        <button onClick={() => setPickerOpen(false)} className="font-medium text-zinc-900">
                          Xong
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                      {photos.map((p, i) => {
                        const on = media.includes(i)
                        return (
                          <button
                            key={p.name}
                            onClick={() => setMedia((x) => (on ? x.filter((y) => y !== i) : x.length < 10 ? [...x, i] : x))}
                            className={`relative aspect-square overflow-hidden rounded-md ring-offset-1 transition ${on ? 'ring-2 ring-brand-400' : 'opacity-80 hover:opacity-100'}`}
                          >
                            <img src={p.src} alt={p.name} className="size-full object-cover" />
                            {on && (
                              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded bg-zinc-900 text-white">
                                <Check className="size-2.5" strokeWidth={3.5} />
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {aiOpen && (
                  <div className="rounded-b-2xl border-t border-zinc-100 bg-brand-50/50 p-3">
                    <div className="mb-2.5 flex items-center gap-2 text-[11px] text-zinc-500">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      OpenRouter
                      <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-zinc-200">openai/gpt-4o-mini</code>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        [ListTree, 'Gợi ý dàn ý'],
                        [Wand2, 'Viết lại hấp dẫn hơn'],
                        [PenLine, 'Rút gọn cho X'],
                        [Hash, 'Thêm hashtag'],
                        [ImageIcon, 'Tạo ảnh AI'],
                      ].map(([I, l]) => {
                        const Icon = I as typeof Hash
                        return (
                          <button
                            key={l as string}
                            className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[12px] text-zinc-700 transition hover:border-zinc-300"
                          >
                            <Icon className="size-3.5 text-zinc-400" />
                            {l as string}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {overLimit.length > 0 && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-700">
              <CircleAlert className="mt-px size-3.5 shrink-0" />
              <span>
                Vượt giới hạn ký tự trên{' '}
                {overLimit.map((c, i) => (
                  <button key={c.id} onClick={() => setEditTab(c.id)} className="font-medium underline underline-offset-2">
                    {c.handle} ({limits[c.platform]}){i < overLimit.length - 1 ? ', ' : ''}
                  </button>
                ))}
                .
              </span>
            </div>
          )}

          {/* Thread comments */}
          {comments.map((c, i) => (
            <div key={i} className="relative mt-3 pl-6">
              <span className="absolute left-2 top-0 h-full w-px bg-zinc-200" />
              <span className="absolute left-[5px] top-4 size-2 rounded-full bg-zinc-300" />
              <div className="rounded-xl border border-zinc-200 bg-white focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-brand-100">
                <div className="flex items-center justify-between px-3 pt-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Bình luận {i + 1}</span>
                  <button
                    onClick={() => setComments((x) => x.filter((_, j) => j !== i))}
                    className="grid size-6 place-items-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <textarea
                  value={c}
                  onChange={(e) => setComments((x) => x.map((y, j) => (j === i ? e.target.value : y)))}
                  rows={2}
                  placeholder="Bình luận đầu tiên hoặc bài tiếp theo trong chuỗi…"
                  className="block w-full resize-none bg-transparent px-3 pb-3 pt-1 text-[13px] outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setComments((x) => [...x, ''])}
            className="mt-3 flex h-8 items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 text-[12px] font-medium text-white transition hover:bg-zinc-800"
          >
            <Plus className="size-3.5" /> Thêm bình luận / bài tiếp
          </button>

          {/* Settings */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200">
            <button
              onClick={() => setSettingsOpen((v) => !v)}
              className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-[13px] font-semibold transition ${
                settingsOpen ? 'bg-brand-400 text-zinc-900' : 'bg-white hover:bg-zinc-50'
              }`}
            >
              <Settings className="size-4" />
              Cài đặt
              <span className={`ml-1 text-[11px] font-normal ${settingsOpen ? 'text-zinc-800/70' : 'text-zinc-400'}`}>
                Thương hiệu · chiến lược · UTM
              </span>
              <ChevronUp className={`ml-auto size-4 transition ${settingsOpen ? '' : 'rotate-180'}`} />
            </button>
            {settingsOpen && (
              <div className="divide-y divide-zinc-100">
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                  <div>
                    <Label>
                      Tiêu đề nội bộ <span className="text-red-500">*</span>
                    </Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Bài đăng ra mắt sản phẩm" />
                  </div>
                  <div>
                    <Label>Thương hiệu</Label>
                    <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                      <option>Test</option>
                      <option>Deszy</option>
                      <option>NextChoice</option>
                      <option>TalentChoice</option>
                    </Select>
                  </div>
                  <div>
                    <Label>Trụ cột</Label>
                    <Select
                      value={pillar}
                      onChange={(e) => {
                        setPillar(e.target.value)
                        setAngle('')
                      }}
                    >
                      <option value="">Chưa phân loại</option>
                      {pillars.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Góc khai thác</Label>
                    <Select value={angle} onChange={(e) => setAngle(e.target.value)} disabled={!pillar}>
                      <option value="">{pillar ? 'Chọn góc khai thác' : 'Chọn trụ cột trước'}</option>
                      {(angles[pillar] ?? []).map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <button onClick={() => setUtmOpen((v) => !v)} className="flex w-full items-center gap-2.5 px-4 py-3 text-left hover:bg-zinc-50">
                    <Link2 className="size-4 text-zinc-500" />
                    <span className="text-[13px] font-medium">Tạo UTM và theo dõi liên kết</span>
                    <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">Tuỳ chọn</span>
                    <ChevronDown className={`ml-auto size-4 text-zinc-400 transition ${utmOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {utmOpen && (
                    <div className="space-y-4 px-4 pb-4">
                      <p className="text-[12px] leading-relaxed text-zinc-500">
                        Gắn UTM cho liên kết trong nội dung trước khi áp dụng. Để trống nguồn để dùng nền tảng của từng tài khoản.
                      </p>
                      <div>
                        <Label hint={!utm.url && baseUrl ? 'Đang dùng liên kết trong nội dung' : undefined}>URL đích</Label>
                        <Input value={utm.url} onChange={(e) => setUtm({ ...utm, url: e.target.value })} placeholder={baseUrl || 'https://deszy.vn/san-pham'} />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <Label hint="Trống = nền tảng">Nguồn</Label>
                          <Input value={utm.source} onChange={(e) => setUtm({ ...utm, source: e.target.value })} placeholder="{platform}" />
                        </div>
                        <div>
                          <Label>
                            Phương tiện <span className="text-red-500">*</span>
                          </Label>
                          <Input value={utm.medium} onChange={(e) => setUtm({ ...utm, medium: e.target.value })} />
                        </div>
                        <div>
                          <Label>
                            Chiến dịch <span className="text-red-500">*</span>
                          </Label>
                          <Input value={utm.campaign} onChange={(e) => setUtm({ ...utm, campaign: e.target.value })} placeholder="flash_sale_t11" />
                        </div>
                        <div>
                          <Label>Nội dung</Label>
                          <Input value={utm.content} onChange={(e) => setUtm({ ...utm, content: e.target.value })} placeholder="banner_a" />
                        </div>
                        <div>
                          <Label>Từ khoá</Label>
                          <Input value={utm.term} onChange={(e) => setUtm({ ...utm, term: e.target.value })} placeholder="dong-ho" />
                        </div>
                      </div>
                      <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                        <label className="flex items-center justify-between gap-4 px-4 py-3">
                          <span>
                            <span className="block text-[13px] font-medium">Liên kết chuyển hướng có thống kê</span>
                            <span className="block text-[12px] text-zinc-500">Đếm lượt nhấp qua đường dẫn rút gọn.</span>
                          </span>
                          <Toggle on={tracked} onChange={setTracked} />
                        </label>
                        <label className="flex items-center justify-between gap-4 px-4 py-3">
                          <span>
                            <span className="block text-[13px] font-medium">Thay các giá trị UTM đã có</span>
                            <span className="block text-[12px] text-zinc-500">Ghi đè tham số utm_ sẵn có trong URL.</span>
                          </span>
                          <Toggle on={replaceUtm} onChange={setReplaceUtm} />
                        </label>
                      </div>
                      <div className="rounded-xl bg-zinc-50 p-4">
                        <div className="mb-2 text-[12px] font-medium text-zinc-700">Xem trước liên kết</div>
                        {utmUrl ? (
                          <>
                            <code className="block break-all font-mono text-[12px] text-zinc-900">{shownUtm}</code>
                            {tracked && <code className="mt-1.5 block break-all font-mono text-[11px] text-zinc-400">→ {fullUtm}</code>}
                          </>
                        ) : (
                          <p className="text-[12px] text-zinc-400">Cần nhập URL, phương tiện và chiến dịch.</p>
                        )}
                        <div className="mt-3 flex justify-end">
                          <button
                            disabled={!utmUrl}
                            onClick={applyUtm}
                            className="h-8 rounded-lg bg-zinc-900 px-3 text-[12px] font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
                          >
                            Áp dụng liên kết vào bản nháp
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[13px] font-medium">Liên kết được theo dõi · {brand}</span>
                          <button
                            onClick={() => setStatsAt(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))}
                            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                          >
                            <RefreshCw className="size-3.5" /> Cập nhật lúc {statsAt}
                          </button>
                        </div>
                        <ul className="divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                          {trackedLinks.map((l) => (
                            <li key={l.url} className="flex items-center gap-3 px-4 py-2.5 text-[12px]">
                              <Link2 className="size-3.5 text-zinc-400" />
                              <span className="flex-1 truncate font-mono">{l.url}</span>
                              <span className="hidden text-zinc-400 sm:inline">{l.campaign}</span>
                              <span className="w-20 text-right font-mono font-medium">{l.clicks.toLocaleString('vi-VN')} lượt</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============ Preview ============ */}
        <aside className="flex flex-col border-t border-zinc-100 bg-zinc-50/70 xl:border-l xl:border-t-0">
          <div className="sticky top-14 flex flex-col p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Xem trước bài viết</h2>
              <a href={href('posts')} title="Đóng" className="grid size-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-200/60 hover:text-zinc-900">
                <X className="size-4" />
              </a>
            </div>

            {sel.length > 0 && (
              <div className="mt-4 flex gap-1 overflow-x-auto">
                {sel.map((c) => (
                  <button
                    key={c.id}
                    title={`${c.label} · ${c.handle}`}
                    onClick={() => {
                      setPreviewId(c.id)
                      if (editing) setEditTab(c.id)
                    }}
                    className={`flex h-8 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium transition ${
                      preview?.id === c.id ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 ring-1 ring-zinc-200 hover:ring-zinc-300'
                    }`}
                  >
                    <PlatformMark platform={c.platform} className="size-3.5" />
                    {c.handle}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 min-h-[360px] rounded-2xl border border-dashed border-zinc-200 bg-white/60 p-4">
              {preview && (body.trim() || media.length || editingCustom) ? (
                <PostPreview channel={preview} text={resolved(preview)} img={media[0]} count={media.length} when="Vừa xong" />
              ) : (
                <div className="grid h-full min-h-[328px] place-items-center text-center">
                  <div>
                    <div className="mx-auto grid size-10 place-items-center rounded-full bg-zinc-100">
                      <PenLine className="size-4 text-zinc-400" />
                    </div>
                    <p className="mt-3 text-[13px] font-medium text-zinc-600">
                      {sel.length ? 'Bắt đầu viết để xem trước' : 'Chọn tài khoản để xem trước'}
                    </p>
                    <p className="mt-0.5 text-[12px] text-zinc-400">Mô phỏng giao diện từng nền tảng</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[12px] font-semibold">Trước khi đăng</span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {progress}/{checks.length}
                </span>
              </div>
              <div className="mb-3 h-1 overflow-hidden rounded-full bg-zinc-200/70">
                <div className="h-full rounded-full bg-brand-400 transition-all duration-500" style={{ width: `${(progress / checks.length) * 100}%` }} />
              </div>
              <ul className="space-y-1.5">
                {checks.map((c) => (
                  <li key={c.label} className="flex items-start gap-2 text-[12px]">
                    {c.ok ? <CircleCheck className="mt-px size-3.5 shrink-0 text-emerald-500" /> : <Circle className="mt-px size-3.5 shrink-0 text-zinc-300" />}
                    <span className={c.ok ? 'text-zinc-400 line-through' : 'text-zinc-600'}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* ============ Footer ============ */}
      <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 border-t border-zinc-200/80 bg-white/90 px-6 py-3 backdrop-blur-md lg:px-8">
        <button className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900">
          <Save className="size-4" /> Lưu nháp
        </button>
        <button className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900">
          <Copy className="size-4" /> Lưu thành mẫu
        </button>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 text-[13px]">
            <CalendarDays className="size-4 text-zinc-400" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent outline-none" />
            <span className="h-4 w-px bg-zinc-200" />
            <Clock className="size-4 text-zinc-400" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-transparent outline-none" />
            <span className="hidden font-mono text-[10px] text-zinc-400 md:inline">GMT+7</span>
          </div>
          <button
            disabled={!ready}
            title={`Lên lịch ${whenLabel}`}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CalendarClock className="size-4" /> Thêm vào lịch
          </button>
          <button
            disabled={!ready}
            className="flex h-9 items-center gap-2 rounded-lg bg-brand-400 px-4 text-[13px] font-semibold text-zinc-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] transition hover:bg-brand-300 active:translate-y-px disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none"
          >
            <Send className="size-4" />
            Đăng ngay{sel.length ? ` · ${sel.length} kênh` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}

function PostPreview({
  channel,
  text,
  img,
  count,
  when,
}: {
  channel: Channel
  text: string
  img?: number
  count: number
  when: string
}) {
  const p = channel.platform
  const Media = ({ ratio }: { ratio: string }) => (
    <div className={`relative ${ratio} overflow-hidden bg-gradient-to-br from-brand-50 to-zinc-100`}>
      {img !== undefined ? (
        <img src={photos[img].src} alt="" className="size-full object-cover" />
      ) : (
        <div className="grid size-full place-items-center">
          <ImageIcon className="size-7 text-zinc-300" />
        </div>
      )}
      {count > 1 && <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">1/{count}</span>}
    </div>
  )
  const Text = ({ clamp = '' }: { clamp?: string }) =>
    text.trim() ? (
      <p className={`whitespace-pre-wrap break-words text-[13px] leading-relaxed text-zinc-800 ${clamp}`}>{text}</p>
    ) : (
      <div className="space-y-1.5 py-1">
        <div className="h-2 w-11/12 rounded-full bg-zinc-100" />
        <div className="h-2 w-4/5 rounded-full bg-zinc-100" />
        <div className="h-2 w-3/5 rounded-full bg-zinc-100" />
      </div>
    )
  const Head = () => (
    <div className="flex items-center gap-2.5 p-3">
      <div className="relative">
        <div className="grid size-9 place-items-center rounded-full bg-zinc-100 text-[13px] font-semibold text-zinc-600">{channel.handle[0].toUpperCase()}</div>
        <PlatformMark platform={p} className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold">{channel.handle}</div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          {when} · <Globe className="size-3" />
        </div>
      </div>
      <Ellipsis className="size-4 text-zinc-400" />
    </div>
  )

  if (p === 'tiktok')
    return (
      <div className="relative mx-auto aspect-[9/16] max-h-[460px] overflow-hidden rounded-lg bg-zinc-900">
        {img !== undefined && <img src={photos[img].src} alt="" className="absolute inset-0 size-full object-cover opacity-90" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-16 right-2 flex flex-col items-center gap-4 text-white">
          <Heart className="size-6" />
          <MessageCircle className="size-6" />
          <Bookmark className="size-6" />
          <Share className="size-6" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 pr-12 text-white">
          <div className="text-[13px] font-semibold">@{channel.handle}</div>
          <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-[12px] leading-snug text-white/90">{text || 'Chú thích video sẽ hiển thị tại đây.'}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/80">
            <Music2 className="size-3" /> Âm thanh gốc
          </div>
        </div>
      </div>
    )

  if (p === 'x' || p === 'threads')
    return (
      <div className="rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200/60">
        <div className="flex gap-2.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-zinc-100 text-[13px] font-semibold text-zinc-600">{channel.handle[0].toUpperCase()}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[13px]">
              <span className="truncate font-semibold">{channel.handle}</span>
              {p === 'x' && <span className="truncate text-zinc-500">@{channel.handle.toLowerCase()}</span>}
              <span className="text-zinc-400">· {when === 'Vừa xong' ? '1 phút' : when}</span>
            </div>
            <div className="mt-1">
              <Text />
            </div>
            {img !== undefined && (
              <div className="mt-2 overflow-hidden rounded-xl ring-1 ring-zinc-200">
                <Media ratio="aspect-[16/10]" />
              </div>
            )}
            <div className="mt-3 flex items-center gap-6 text-zinc-500">
              {p === 'x' ? (
                <>
                  <MessageCircle className="size-4" />
                  <Repeat2 className="size-4" />
                  <Heart className="size-4" />
                  <Bookmark className="size-4" />
                </>
              ) : (
                <>
                  <Heart className="size-4" />
                  <MessageCircle className="size-4" />
                  <Repeat2 className="size-4" />
                  <Send className="size-4" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )

  if (p === 'instagram')
    return (
      <div className="overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200/60">
        <Head />
        <Media ratio="aspect-square" />
        <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-800">
          <Heart className="size-5" />
          <MessageCircle className="size-5" />
          <Send className="size-5" />
          <Bookmark className="ml-auto size-5" />
        </div>
        <div className="px-3 pb-3">
          {text.trim() ? (
            <p className="line-clamp-3 whitespace-pre-wrap break-words text-[12.5px] leading-relaxed">
              <span className="font-semibold">{channel.handle}</span> {text}
            </p>
          ) : (
            <Text />
          )}
        </div>
      </div>
    )

  const actions =
    p === 'linkedin'
      ? [
          [ThumbsUp, 'Thích'],
          [MessageCircle, 'Bình luận'],
          [Repeat2, 'Đăng lại'],
          [Send, 'Gửi'],
        ]
      : [
          [ThumbsUp, 'Thích'],
          [MessageCircle, 'Bình luận'],
          [Share, 'Chia sẻ'],
        ]
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200/60">
      <Head />
      <div className="px-3 pb-3">
        <Text clamp="line-clamp-6" />
      </div>
      <Media ratio="aspect-[16/10]" />
      <div className={`grid border-t border-zinc-100 text-[11.5px] text-zinc-500 ${actions.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {actions.map(([I, l]) => {
          const Icon = I as typeof ThumbsUp
          return (
            <div key={l as string} className="flex items-center justify-center gap-1.5 py-2">
              <Icon className="size-3.5" />
              {l as string}
            </div>
          )
        })}
      </div>
    </div>
  )
}
