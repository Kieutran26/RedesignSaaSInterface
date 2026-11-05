import { Plus, RefreshCw, TriangleAlert, Ellipsis } from 'lucide-react'
import { Card, PageHeader, Button, Avatar, FacebookMark, InstagramMark } from '../components/ui'
import { accounts, fmt } from '../data'

const platforms = [
  { name: 'Facebook', desc: 'Trang và nhóm', mark: <FacebookMark className="size-6" />, connected: 3 },
  { name: 'Instagram', desc: 'Tài khoản doanh nghiệp', mark: <InstagramMark className="size-6" />, connected: 1 },
  {
    name: 'TikTok',
    desc: 'Sắp ra mắt',
    mark: (
      <div className="grid size-6 place-items-center rounded-md bg-zinc-900 text-[10px] font-bold text-white">TT</div>
    ),
    connected: 0,
    soon: true,
  },
]

export default function Accounts() {
  return (
    <>
      <PageHeader
        title="Tài khoản mạng xã hội"
        description="Kết nối và quản lý các kênh mà PostChoice có thể đăng bài."
        actions={
          <Button variant="primary">
            <Plus /> Kết nối kênh
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {platforms.map((p) => (
          <Card key={p.name} className="flex items-center gap-4 p-5">
            <div className="grid size-11 place-items-center rounded-xl bg-zinc-50 ring-1 ring-zinc-100">{p.mark}</div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold">{p.name}</div>
              <div className="text-[12px] text-zinc-500">{p.desc}</div>
            </div>
            {p.soon ? (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500">Sắp có</span>
            ) : (
              <span className="font-mono text-[12px] text-zinc-500">{p.connected} kênh</span>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-brand-700" />
        <div className="flex-1 text-[13px]">
          <span className="font-medium">Quyền truy cập của TalentChoice sắp hết hạn.</span>{' '}
          <span className="text-zinc-600">Kết nối lại trong 5 ngày tới để không bị gián đoạn lịch đăng.</span>
        </div>
        <Button className="h-8">
          <RefreshCw /> Kết nối lại
        </Button>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold">Kênh đã kết nối</h2>
        </div>
        <ul className="divide-y divide-zinc-100">
          {accounts.map((a) => (
            <li key={a.id} className="flex items-center gap-4 px-5 py-4">
              <Avatar name={a.name} platform={a.platform} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium">{a.name}</div>
                <div className="text-[12px] text-zinc-500">
                  {a.platform === 'facebook' ? 'Trang Facebook' : 'Instagram'} · Thương hiệu {a.brand}
                </div>
              </div>
              <div className="hidden text-right sm:block">
                <div className="font-mono text-[13px]">{fmt(a.followers)}</div>
                <div className="text-[11px] text-zinc-400">người theo dõi</div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  a.status === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-brand-50 text-brand-700'
                }`}
              >
                <span className={`size-1.5 rounded-full ${a.status === 'ok' ? 'bg-emerald-500' : 'bg-brand-500'}`} />
                {a.status === 'ok' ? 'Hoạt động' : 'Sắp hết hạn'}
              </span>
              <button className="grid size-8 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100">
                <Ellipsis className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}
