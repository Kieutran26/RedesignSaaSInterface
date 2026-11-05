import { useState } from 'react'
import { Upload, Search, LayoutGrid, List, Check, FolderOpen } from 'lucide-react'
import { Card, PageHeader, Button } from '../components/ui'
import { photos } from '../data'

const folders = ['Tất cả', 'Sản phẩm', 'Chiến dịch', 'Hậu trường', 'Logo & brand']

export default function Library() {
  const [sel, setSel] = useState<number[]>([])
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [folder, setFolder] = useState('Tất cả')
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))

  return (
    <>
      <PageHeader
        title="Thư viện tệp"
        description="Ảnh và video dùng chung cho mọi bài viết."
        actions={
          <Button variant="primary">
            <Upload /> Tải tệp lên
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <div className="space-y-4">
          <nav className="space-y-0.5">
            {folders.map((f) => (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition ${
                  folder === f ? 'bg-white font-medium shadow-sm ring-1 ring-zinc-200' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <FolderOpen className="size-4 text-zinc-400" />
                {f}
              </button>
            ))}
          </nav>
          <Card className="p-4">
            <div className="text-[12px] font-medium">Dung lượng</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full w-[38%] rounded-full bg-brand-400" />
            </div>
            <div className="mt-1.5 text-[11px] text-zinc-500">3,8 GB / 10 GB</div>
          </Card>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex h-9 w-64 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3">
              <Search className="size-4 text-zinc-400" />
              <input placeholder="Tìm tệp…" className="w-full bg-transparent text-[13px] outline-none placeholder:text-zinc-400" />
            </div>
            <div className="flex items-center gap-2">
              {sel.length > 0 && (
                <span className="text-[12px] text-zinc-500">
                  Đã chọn {sel.length} ·{' '}
                  <button onClick={() => setSel([])} className="font-medium text-zinc-900 hover:underline">
                    Bỏ chọn
                  </button>
                </span>
              )}
              <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5">
                {(
                  [
                    ['grid', LayoutGrid],
                    ['list', List],
                  ] as const
                ).map(([k, I]) => (
                  <button
                    key={k}
                    onClick={() => setView(k)}
                    className={`grid size-7 place-items-center rounded-md ${view === k ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400'}`}
                  >
                    <I className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {photos.map((p, i) => {
                const on = sel.includes(i)
                return (
                  <button
                    key={p.name}
                    onClick={() => toggle(i)}
                    className={`group relative overflow-hidden rounded-xl bg-zinc-100 text-left ring-offset-2 transition ${on ? 'ring-2 ring-brand-400' : ''}`}
                  >
                    <img src={p.src} alt={p.name} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2.5 pt-8 opacity-0 transition group-hover:opacity-100">
                      <div className="truncate text-[12px] font-medium text-white">{p.name}</div>
                      <div className="text-[10px] text-white/70">{p.size}</div>
                    </div>
                    <span
                      className={`absolute right-2 top-2 grid size-5 place-items-center rounded-md border transition ${
                        on ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-white/80 bg-white/40 text-transparent opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <Card className="divide-y divide-zinc-100">
              {photos.map((p, i) => (
                <button key={p.name} onClick={() => toggle(i)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] hover:bg-zinc-50">
                  <img src={p.src} alt="" className="size-9 rounded-md object-cover" />
                  <span className="flex-1 truncate font-medium">{p.name}</span>
                  <span className="font-mono text-[12px] text-zinc-500">{p.size}</span>
                  <span className={`grid size-4 place-items-center rounded border ${sel.includes(i) ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300'}`}>
                    {sel.includes(i) && <Check className="size-3" strokeWidth={3} />}
                  </span>
                </button>
              ))}
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
