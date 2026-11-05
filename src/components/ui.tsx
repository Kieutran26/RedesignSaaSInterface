import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}
    >
      {children}
    </section>
  )
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Button({
  children,
  variant = 'secondary',
  className = '',
  ...props
}: { variant?: 'primary' | 'secondary' | 'dark' | 'ghost' } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = {
    primary: 'bg-brand-400 text-zinc-900 hover:bg-brand-300 shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]',
    secondary: 'border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50',
    dark: 'bg-zinc-900 text-white hover:bg-zinc-800',
    ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
  }[variant]
  return (
    <button
      {...props}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-[13px] font-medium transition disabled:opacity-50 [&_svg]:size-4 ${v} ${className}`}
    >
      {children}
    </button>
  )
}

export function Tabs<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T
  onChange: (v: T) => void
  items: { value: T; label: string; count?: number }[]
}) {
  return (
    <div className="inline-flex rounded-lg bg-zinc-100 p-1">
      {items.map((i) => (
        <button
          key={i.value}
          onClick={() => onChange(i.value)}
          className={`flex h-7 items-center gap-1.5 rounded-md px-3 text-[12px] font-medium transition ${
            value === i.value ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          {i.label}
          {i.count !== undefined && <span className="font-mono text-[10px] text-zinc-400">{i.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function StatCard({
  label,
  value,
  delta,
  hint,
}: {
  label: string
  value: string
  delta?: number
  hint?: string
}) {
  return (
    <Card className="p-5">
      <div className="text-[12px] font-medium text-zinc-500">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {delta !== undefined && (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
              delta >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {delta >= 0 ? '+' : ''}
            {delta}%
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-[11px] text-zinc-400">{hint}</div>}
    </Card>
  )
}

export function Avatar({ name, platform, size = 'md' }: { name: string; platform?: 'facebook' | 'instagram'; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'size-7 text-[11px]' : 'size-9 text-[13px]'
  return (
    <div className="relative shrink-0">
      <div className={`grid place-items-center rounded-full bg-zinc-100 font-semibold text-zinc-600 ring-2 ring-white ${s}`}>
        {name[0].toUpperCase()}
      </div>
      {platform &&
        (platform === 'facebook' ? (
          <FacebookMark className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white" />
        ) : (
          <InstagramMark className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white" />
        ))}
    </div>
  )
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${on ? 'bg-zinc-900' : 'bg-zinc-200'}`}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`}
      />
    </button>
  )
}

export function ProgressBar({ value, color = 'var(--color-brand-400)' }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, value)}%`, background: color }} />
    </div>
  )
}

export function SectionHeader({
  step,
  title,
  description,
  right,
  done,
}: {
  step: number
  title: string
  description?: string
  right?: ReactNode
  done?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-5">
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-colors ${
            done ? 'bg-brand-400 text-zinc-900' : 'bg-zinc-100 text-zinc-500'
          }`}
        >
          {step}
        </div>
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
          {description && <p className="mt-0.5 text-[13px] text-zinc-500">{description}</p>}
        </div>
      </div>
      {right}
    </div>
  )
}

export function Label({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <span className="text-[12px] font-medium text-zinc-700">{children}</span>
      {hint && <span className="text-[11px] text-zinc-400">{hint}</span>}
    </div>
  )
}

const field =
  'h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-400 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${field} ${props.className ?? ''}`} />
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${field} appearance-none pr-9`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
    </div>
  )
}

export function FacebookMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.1 15.5l.5-3.3h-3.1v-2.1c0-.9.4-1.8 1.9-1.8h1.4V5.5s-1.3-.2-2.5-.2c-2.6 0-4.2 1.5-4.2 4.3v2.6H6.3v3.3h2.8V24h3.4v-8.5z"
        fill="#fff"
      />
    </svg>
  )
}

export function InstagramMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset=".35" stopColor="#FA7E1E" />
          <stop offset=".6" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#ig)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  )
}

export type AnyPlatform = 'facebook' | 'instagram' | 'threads' | 'x' | 'tiktok' | 'linkedin'

export function PlatformMark({ platform, className = 'size-4' }: { platform: AnyPlatform; className?: string }) {
  if (platform === 'facebook') return <FacebookMark className={className} />
  if (platform === 'instagram') return <InstagramMark className={className} />
  if (platform === 'linkedin')
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="5" fill="#0A66C2" />
        <path d="M7.1 9.5h-2.4V18h2.4zM5.9 5.6a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zM18.9 13.2c0-2.3-1.2-3.9-3.4-3.9-1.1 0-1.9.6-2.2 1.2V9.5H11V18h2.4v-4.3c0-1.1.3-2.1 1.6-2.1s1.5 1.2 1.5 2.2V18h2.4z" fill="#fff" />
      </svg>
    )
  if (platform === 'x')
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="12" fill="#000" />
        <path d="M13.2 11.1L17.6 6h-1l-3.9 4.4L9.6 6H6.3l4.6 6.6L6.3 18h1l4.1-4.6 3.2 4.6h3.3zm-1.4 1.6l-.5-.7-3.7-5.2h1.6l3 4.2.5.7 3.9 5.4H15z" fill="#fff" />
      </svg>
    )
  if (platform === 'tiktok')
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="12" fill="#000" />
        <path d="M15.6 5.5h-2.3v8.9a1.9 1.9 0 11-1.9-1.9c.2 0 .4 0 .6.1V10.2a4.3 4.3 0 104 4.2V9.9a5.3 5.3 0 003 1V8.6a3 3 0 01-3.4-3.1z" fill="#fff" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="12" fill="#000" />
      <path d="M15.3 11.5l-.3-.1c-.2-2-1.3-3.1-3.1-3.1-1.1 0-2 .5-2.6 1.3l1 .7c.4-.6 1-.8 1.6-.8.9 0 1.4.5 1.6 1.4a8 8 0 00-1.8-.1c-1.8.1-3 1.2-2.9 2.6.1 1.5 1.4 2.3 2.9 2.2 1.3-.1 2.4-.8 2.8-2.4.5.3.8.8.9 1.2.3.7.2 1.8-.7 2.7-.8.8-1.8 1.2-3.3 1.2-1.7 0-2.9-.6-3.7-1.6-.8-1-1.2-2.4-1.2-4.2s.4-3.2 1.2-4.2c.8-1 2-1.6 3.7-1.6s2.9.6 3.7 1.6c.4.5.7 1.1.9 1.8l1.2-.3c-.2-.9-.6-1.6-1.1-2.3-1.1-1.3-2.6-2-4.7-2s-3.6.7-4.7 2C6.5 8.8 6 10.4 6 12.4s.5 3.6 1.4 4.8c1 1.3 2.6 2 4.7 2 1.8 0 3.1-.5 4.1-1.5 1.4-1.4 1.3-3.1.9-4.1-.3-.7-.9-1.3-1.8-1.7zm-3.1 3c-.8 0-1.5-.4-1.5-1.1 0-.6.4-1.2 1.7-1.3h.5c.5 0 1 .1 1.4.1-.2 1.8-1 2.2-2.1 2.3z" fill="#fff" />
    </svg>
  )
}
