import { Plus, Ellipsis } from 'lucide-react'
import { Card, PageHeader, Button, ProgressBar } from '../components/ui'
import { pillars } from '../data'

const desc: Record<string, string> = {
  'Kiến thức sản phẩm': 'Hướng dẫn, so sánh và mẹo giúp khách hàng hiểu và dùng sản phẩm tốt hơn.',
  'Câu chuyện thương hiệu': 'Hậu trường, con người và giá trị tạo nên thương hiệu.',
  'Khuyến mãi': 'Ưu đãi, flash sale và chương trình dành cho thành viên.',
  'Cộng đồng': 'Feedback khách hàng, minigame và nội dung do người dùng tạo.',
}

export default function Pillars() {
  return (
    <>
      <PageHeader
        title="Trụ cột nội dung"
        description="Các chủ đề chính giúp nội dung luôn cân bằng và nhất quán."
        actions={
          <Button variant="primary">
            <Plus /> Thêm trụ cột
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {pillars.map((p) => {
          const diff = p.actual - p.target
          return (
            <Card key={p.name} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl" style={{ background: `${p.color}1f` }}>
                    <span className="size-3 rounded-full" style={{ background: p.color }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold">{p.name}</h3>
                    <p className="text-[12px] text-zinc-500">
                      {p.posts} bài · {p.angles} góc khai thác
                    </p>
                  </div>
                </div>
                <button className="grid size-8 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100">
                  <Ellipsis className="size-4" />
                </button>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-zinc-600">{desc[p.name]}</p>
              <div className="mt-5 flex items-center justify-between text-[12px]">
                <span className="text-zinc-500">Thực tế / mục tiêu</span>
                <span className="font-mono">
                  {p.actual}% / {p.target}%{' '}
                  <span className={diff >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                    ({diff >= 0 ? '+' : ''}
                    {diff})
                  </span>
                </span>
              </div>
              <div className="relative mt-2">
                <ProgressBar value={(p.actual / 50) * 100} color={p.color} />
                <span className="absolute -top-1 h-3.5 w-0.5 rounded bg-zinc-900" style={{ left: `${(p.target / 50) * 100}%` }} />
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
