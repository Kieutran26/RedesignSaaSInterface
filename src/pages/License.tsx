import { useState } from 'react'
import { Check, Copy, KeyRound, Monitor } from 'lucide-react'
import { Card, PageHeader, Button, ProgressBar } from '../components/ui'

const usage = [
  { label: 'Kênh mạng xã hội', used: 4, max: 10 },
  { label: 'Bài viết / tháng', used: 48, max: 300 },
  { label: 'Lưu trữ (GB)', used: 3.8, max: 10 },
  { label: 'Lượt gọi AI', used: 412, max: 1000 },
]

const devices = [
  { name: 'MacBook Pro — Chrome', last: 'Đang hoạt động', current: true },
  { name: 'Windows PC — Edge', last: '2 giờ trước' },
  { name: 'iPhone 15 — Safari', last: '3 ngày trước' },
]

export default function License() {
  const [copied, setCopied] = useState(false)
  const key = 'PC-PRO-7F3K-92MX-Q8LD'
  return (
    <>
      <PageHeader title="Quản lý license" description="Gói dịch vụ, mức sử dụng và thiết bị đã kích hoạt." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="relative overflow-hidden p-6">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-brand-200/50 blur-2xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand-400 px-2 py-0.5 text-[11px] font-semibold">PRO</span>
                <span className="flex items-center gap-1.5 text-[12px] text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Đang hoạt động
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">PostChoice Pro</h2>
              <p className="text-[13px] text-zinc-500">Gia hạn tự động ngày 15/01/2027</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">
                499.000₫<span className="text-[13px] font-normal text-zinc-400">/tháng</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button>Đổi gói</Button>
                <Button variant="primary">Nâng cấp</Button>
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
            <KeyRound className="size-4 text-zinc-400" />
            <code className="flex-1 font-mono text-[13px] tracking-wider">{key}</code>
            <Button
              variant="ghost"
              className="h-8"
              onClick={() => {
                navigator.clipboard?.writeText(key)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
            >
              {copied ? <Check /> : <Copy />} {copied ? 'Đã sao chép' : 'Sao chép'}
            </Button>
          </div>

          <div className="relative mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {usage.map((u) => (
              <div key={u.label}>
                <div className="mb-1.5 flex justify-between text-[12px]">
                  <span className="text-zinc-600">{u.label}</span>
                  <span className="font-mono text-zinc-500">
                    {u.used.toLocaleString('vi-VN')} / {u.max.toLocaleString('vi-VN')}
                  </span>
                </div>
                <ProgressBar value={(u.used / u.max) * 100} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-[15px] font-semibold">Thiết bị kích hoạt</h2>
          <p className="text-[12px] text-zinc-500">3 / 5 thiết bị</p>
          <ul className="mt-4 space-y-3">
            {devices.map((d) => (
              <li key={d.name} className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-zinc-50 ring-1 ring-zinc-100">
                  <Monitor className="size-4 text-zinc-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{d.name}</div>
                  <div className={`text-[11px] ${d.current ? 'text-emerald-600' : 'text-zinc-400'}`}>{d.last}</div>
                </div>
                {!d.current && <button className="text-[12px] font-medium text-zinc-500 hover:text-red-600">Gỡ</button>}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold">Lịch sử thanh toán</h2>
        </div>
        <table className="w-full text-[13px]">
          <tbody className="divide-y divide-zinc-100">
            {['15/10/2026', '15/09/2026', '15/08/2026'].map((d, i) => (
              <tr key={d}>
                <td className="px-5 py-3 font-mono text-[12px] text-zinc-500">#INV-00{42 - i}</td>
                <td className="px-5 py-3">{d}</td>
                <td className="px-5 py-3">PostChoice Pro — tháng</td>
                <td className="px-5 py-3 text-right font-mono">499.000₫</td>
                <td className="px-5 py-3 text-right">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">Đã thanh toán</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}
