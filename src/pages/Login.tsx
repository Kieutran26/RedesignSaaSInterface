import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Mail, LockKeyhole, User, Check, LoaderCircle, MailCheck, Heart, MessageCircle } from 'lucide-react'
import { Logo } from '../components/Sidebar'
import { PlatformMark, type AnyPlatform } from '../components/ui'
import { photos } from '../data'
import { href } from '../router'

type Mode = 'login' | 'signup' | 'reset'

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 01-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z" fill="#4285F4" />
      <path d="M12 23c3 0 5.5-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0012 23z" fill="#34A853" />
      <path d="M5.8 14.1a6.6 6.6 0 010-4.2V7.1H2.2a11 11 0 000 9.8z" fill="#FBBC05" />
      <path d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 002.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z" fill="#EA4335" />
    </svg>
  )
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path d="M15.1 15.5l.5-3.3h-3.1v-2.1c0-.9.4-1.8 1.9-1.8h1.4V5.5s-1.3-.2-2.5-.2c-2.6 0-4.2 1.5-4.2 4.3v2.6H6.3v3.3h2.8V24h3.4v-8.5z" fill="#fff" />
    </svg>
  )
}

function Field({
  icon: Icon,
  label,
  error,
  right,
  ...props
}: { icon: typeof Mail; label: string; error?: string; right?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-[12px] font-medium text-zinc-700">{label}</span>
      <span
        className={`flex h-11 items-center gap-2.5 rounded-xl border bg-white px-3.5 transition focus-within:ring-4 ${
          error ? 'border-red-300 focus-within:ring-red-100' : 'border-zinc-200 hover:border-zinc-300 focus-within:border-zinc-400 focus-within:ring-brand-100'
        }`}
      >
        <Icon className="size-4 shrink-0 text-zinc-400" />
        <input {...props} className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-zinc-400" />
        {right}
      </span>
      {error && <span className="mt-1 block text-[12px] text-red-600">{error}</span>}
    </label>
  )
}


type WallPost = { p: AnyPlatform; handle: string; text: string; img?: number; likes: string; tall?: boolean }

const wallColumns: WallPost[][] = [
  [
    { p: 'instagram', handle: 'deszy_creative', text: 'Bộ sưu tập thu đông đã lên kệ.', img: 3, likes: '1,2K', tall: true },
    { p: 'x', handle: 'Kieutran26', text: 'Mẹo nhỏ: lau dây da bằng khăn mềm mỗi tuần để giữ màu bền đẹp.', likes: '326' },
    { p: 'facebook', handle: 'Deszy', text: 'Flash sale 48h — giảm đến 40%.', img: 1, likes: '842' },
  ],
  [
    { p: 'tiktok', handle: 'kiu.chun', text: 'Unbox đồng hồ mới cùng team', img: 7, likes: '12,4K', tall: true },
    { p: 'linkedin', handle: 'TalentChoice', text: 'Chúng tôi đang tuyển Content Executive tại TP.HCM.', likes: '86' },
    { p: 'instagram', handle: 'deszy_creative', text: 'Minigame đoán giá cuối tuần', img: 8, likes: '2,1K' },
  ],
  [
    { p: 'threads', handle: '_ticrn', text: 'Bạn thích đồng hồ dây da hay dây kim loại hơn?', likes: '214' },
    { p: 'facebook', handle: 'NextChoice', text: 'So sánh 3 mẫu tai nghe cho dân văn phòng', img: 5, likes: '512', tall: true },
    { p: 'x', handle: 'Kieutran26', text: 'Hậu trường buổi chụp hôm nay', img: 10, likes: '98' },
  ],
]

function WallCard({ p, handle, text, img, likes, tall }: WallPost) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgba(24,24,27,0.25)]">
      <div className="flex items-center gap-2 px-3 pt-3">
        <span className="grid size-6 place-items-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-600">{handle[0].toUpperCase()}</span>
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">{handle}</span>
        <PlatformMark platform={p} className="size-4" />
      </div>
      <p className="px-3 py-2 text-[11.5px] leading-snug text-zinc-700">{text}</p>
      {img !== undefined && <img src={photos[img].src} alt="" className={`w-full object-cover ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} />}
      <div className="flex items-center gap-3 px-3 py-2 text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <Heart className="size-3" /> {likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-3" /> 24
        </span>
        <span className="ml-auto flex items-center gap-1 text-emerald-600">
          <Check className="size-3" strokeWidth={3} /> Đã đăng
        </span>
      </div>
    </div>
  )
}

export default function Login() {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [touched, setTouched] = useState(false)

  const emailOk = /^\S+@\S+\.\S+$/.test(email)
  const errors = {
    name: mode === 'signup' && !name.trim() ? 'Vui lòng nhập họ tên' : undefined,
    email: !email ? 'Vui lòng nhập email' : !emailOk ? 'Email không hợp lệ' : undefined,
    password: mode !== 'reset' && password.length < 8 ? 'Mật khẩu tối thiểu 8 ký tự' : undefined,
    agree: mode === 'signup' && !agree ? 'Bạn cần đồng ý với điều khoản' : undefined,
  }
  const valid = !Object.values(errors).some(Boolean)
  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length)

  const switchMode = (m: Mode) => {
    setMode(m)
    setTouched(false)
    setSent(false)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (mode === 'reset') setSent(true)
      else window.location.hash = href('overview')
    }, 900)
  }

  const social = () => {
    setLoading(true)
    setTimeout(() => (window.location.hash = href('overview')), 700)
  }

  const titles: Record<Mode, [string, string]> = {
    login: ['Chào mừng trở lại', 'Đăng nhập để tiếp tục quản lý nội dung của bạn.'],
    signup: ['Tạo tài khoản miễn phí', 'Bắt đầu với gói Starter — không cần thẻ thanh toán.'],
    reset: ['Quên mật khẩu?', 'Nhập email, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.'],
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[1fr_1.05fr]">
      {/* Form side */}
      <div className="flex flex-col px-6 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <a href="#/">
            <Logo />
          </a>
          <a href="#/" className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
            <ArrowLeft className="size-3.5" /> Trang chủ
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-10">
          <div key={mode} className="animate-fade-up [animation-duration:0.5s]">
            {mode !== 'reset' && (
              <div className="mb-8 grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-[13px] font-medium">
                {(['login', 'signup'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`h-9 rounded-lg transition ${mode === m ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
                  >
                    {m === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                  </button>
                ))}
              </div>
            )}

            <h1 className="text-[28px] font-semibold tracking-tight">{titles[mode][0]}</h1>
            <p className="mt-1.5 text-[14px] text-zinc-500">{titles[mode][1]}</p>

            {mode === 'reset' && sent ? (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <MailCheck className="size-6 text-emerald-600" />
                <div className="mt-3 text-[14px] font-semibold">Kiểm tra hộp thư của bạn</div>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">
                  Nếu <span className="font-medium text-zinc-900">{email}</span> có tài khoản, liên kết đặt lại mật khẩu sẽ đến trong vài phút.
                </p>
                <button onClick={() => switchMode('login')} className="mt-4 text-[13px] font-medium text-zinc-900 underline decoration-brand-400 decoration-2 underline-offset-4">
                  Quay lại đăng nhập
                </button>
              </div>
            ) : (
              <>
                {mode !== 'reset' && (
                  <>
                    <div className="mt-8 grid grid-cols-2 gap-2.5">
                      <button
                        onClick={social}
                        disabled={loading}
                        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 text-[13px] font-medium transition hover:border-zinc-300 hover:bg-zinc-50 disabled:opacity-60"
                      >
                        <GoogleMark /> Google
                      </button>
                      <button
                        onClick={social}
                        disabled={loading}
                        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 text-[13px] font-medium transition hover:border-zinc-300 hover:bg-zinc-50 disabled:opacity-60"
                      >
                        <FacebookMark /> Facebook
                      </button>
                    </div>
                    <div className="my-6 flex items-center gap-3 text-[12px] text-zinc-400">
                      <span className="h-px flex-1 bg-zinc-200" />
                      hoặc dùng email
                      <span className="h-px flex-1 bg-zinc-200" />
                    </div>
                  </>
                )}

                <form onSubmit={submit} noValidate className={`space-y-4 ${mode === 'reset' ? 'mt-8' : ''}`}>
                  {mode === 'signup' && (
                    <Field icon={User} label="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" autoComplete="name" error={touched ? errors.name : undefined} />
                  )}
                  <Field
                    icon={Mail}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@congty.vn"
                    autoComplete="email"
                    error={touched ? errors.email : undefined}
                    right={emailOk ? <Check className="size-4 text-emerald-500" /> : undefined}
                  />
                  {mode !== 'reset' && (
                    <div>
                      <Field
                        icon={LockKeyhole}
                        label="Mật khẩu"
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tối thiểu 8 ký tự"
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        error={touched ? errors.password : undefined}
                        right={
                          <button type="button" onClick={() => setShow((v) => !v)} className="text-zinc-400 hover:text-zinc-700" aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        }
                      />
                      {mode === 'signup' && password && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="grid flex-1 grid-cols-4 gap-1">
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className={`h-1 rounded-full transition-colors ${
                                  i < strength ? ['bg-red-400', 'bg-orange-400', 'bg-brand-400', 'bg-emerald-500'][strength - 1] : 'bg-zinc-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="w-16 text-right text-[11px] text-zinc-500">{['Rất yếu', 'Yếu', 'Khá', 'Tốt', 'Mạnh'][strength]}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex items-center justify-between text-[13px]">
                      <label className="flex cursor-pointer items-center gap-2 text-zinc-600">
                        <span
                          className={`grid size-4 place-items-center rounded border transition ${remember ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300'}`}
                        >
                          {remember && <Check className="size-3" strokeWidth={3} />}
                        </span>
                        <input type="checkbox" className="sr-only" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                        Ghi nhớ đăng nhập
                      </label>
                      <button type="button" onClick={() => switchMode('reset')} className="font-medium text-zinc-900 hover:underline">
                        Quên mật khẩu?
                      </button>
                    </div>
                  )}

                  {mode === 'signup' && (
                    <div>
                      <label className="flex cursor-pointer items-start gap-2 text-[13px] text-zinc-600">
                        <span
                          className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded border transition ${agree ? 'border-zinc-900 bg-zinc-900 text-white' : touched && errors.agree ? 'border-red-400' : 'border-zinc-300'}`}
                        >
                          {agree && <Check className="size-3" strokeWidth={3} />}
                        </span>
                        <input type="checkbox" className="sr-only" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                        <span>
                          Tôi đồng ý với <span className="font-medium text-zinc-900 underline underline-offset-2">Điều khoản</span> và{' '}
                          <span className="font-medium text-zinc-900 underline underline-offset-2">Chính sách bảo mật</span>
                        </span>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-400 text-[14px] font-semibold text-zinc-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] transition hover:bg-brand-300 active:translate-y-px disabled:opacity-70"
                  >
                    {loading ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <>
                        {mode === 'login' ? 'Đăng nhập' : mode === 'signup' ? 'Tạo tài khoản' : 'Gửi liên kết đặt lại'}
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-[13px] text-zinc-500">
                  {mode === 'login' && (
                    <>
                      Chưa có tài khoản?{' '}
                      <button onClick={() => switchMode('signup')} className="font-medium text-zinc-900 hover:underline">
                        Đăng ký miễn phí
                      </button>
                    </>
                  )}
                  {mode === 'signup' && (
                    <>
                      Đã có tài khoản?{' '}
                      <button onClick={() => switchMode('login')} className="font-medium text-zinc-900 hover:underline">
                        Đăng nhập
                      </button>
                    </>
                  )}
                  {mode === 'reset' && (
                    <button onClick={() => switchMode('login')} className="inline-flex items-center gap-1.5 font-medium text-zinc-900 hover:underline">
                      <ArrowLeft className="size-3.5" /> Quay lại đăng nhập
                    </button>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-zinc-400">
          <span>© 2026 PostChoice</span>
          <span className="flex gap-4">
            <span className="hover:text-zinc-700">Điều khoản</span>
            <span className="hover:text-zinc-700">Bảo mật</span>
            <span className="hover:text-zinc-700">Hỗ trợ</span>
          </span>
        </div>
      </div>

      {/* Brand side */}
      <div className="hidden p-3 lg:block">
        <div className="relative h-full min-h-[760px] overflow-hidden rounded-[28px] bg-brand-400">
          {/* scrolling post wall */}
          <div className="absolute inset-0 grid grid-cols-3 gap-4 px-6 [mask-image:linear-gradient(transparent,black_10%,black_60%,transparent_92%)]">
            {wallColumns.map((col, ci) => (
              <div key={ci} className="relative overflow-hidden">
                <div className={`${ci === 1 ? 'animate-marquee-y-reverse' : 'animate-marquee-y'} ${ci === 1 ? '' : ci === 2 ? '[animation-duration:30s]' : ''}`}>
                  {[...col, ...col].map((post, i) => (
                    <div key={i} className="pb-4">
                      <WallCard {...post} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* overlay card */}
          <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white p-7 shadow-[0_30px_60px_-20px_rgba(24,24,27,0.35)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-[30px] font-semibold leading-[1.1] tracking-tight text-balance">
                  Soạn một lần. <span className="relative whitespace-nowrap"><span className="absolute inset-x-[-3px] bottom-[0.08em] h-[0.35em] rounded-sm bg-brand-300" /><span className="relative">Đăng mọi nơi.</span></span>
                </h2>
                <p className="mt-2 text-[14px] text-zinc-500">Mỗi ngày hơn 12.000 bài viết được đăng qua PostChoice.</p>
              </div>
              <div className="hidden shrink-0 grid-cols-3 gap-1 xl:grid">
                {(['facebook', 'instagram', 'tiktok', 'x', 'threads', 'linkedin'] as const).map((p) => (
                  <span key={p} className="grid size-9 place-items-center rounded-xl bg-zinc-50 ring-1 ring-zinc-100">
                    <PlatformMark platform={p} className="size-4" />
                  </span>
                ))}
              </div>
            </div>
            <figure className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white">KT</span>
              <div className="min-w-0">
                <blockquote className="text-[13px] leading-snug text-zinc-700">“Từ 6 tab trình duyệt xuống còn một. Team mình tiết kiệm gần nửa ngày mỗi tuần.”</blockquote>
                <figcaption className="mt-0.5 text-[12px] text-zinc-400">Kiều Trần · Content Lead, Deszy</figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}
