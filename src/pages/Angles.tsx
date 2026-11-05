import { useState } from 'react'
import { Plus, Compass } from 'lucide-react'
import { Card, PageHeader, Button, Tabs } from '../components/ui'
import { pillars } from '../data'

const angles = [
  { name: 'Hướng dẫn sử dụng', pillar: 'Kiến thức sản phẩm', posts: 10, er: 5.8, example: 'Cách đeo đồng hồ đúng chuẩn' },
  { name: 'So sánh', pillar: 'Kiến thức sản phẩm', posts: 6, er: 7.2, example: 'Tai nghe A vs B: chọn mẫu nào?' },
  { name: 'Mẹo hay', pillar: 'Kiến thức sản phẩm', posts: 8, er: 6.4, example: '5 mẹo bảo quản dây da' },
  { name: 'Hậu trường', pillar: 'Câu chuyện thương hiệu', posts: 7, er: 8.4, example: 'Một ngày ở studio' },
  { name: 'Con người', pillar: 'Câu chuyện thương hiệu', posts: 5, er: 7.9, example: 'Gặp gỡ designer của Deszy' },
  { name: 'Flash sale', pillar: 'Khuyến mãi', posts: 9, er: 4.1, example: 'Giảm 40% trong 48h' },
  { name: 'Ưu đãi thành viên', pillar: 'Khuyến mãi', posts: 7, er: 3.6, example: 'Quà sinh nhật cho member' },
  { name: 'Feedback khách hàng', pillar: 'Cộng đồng', posts: 5, er: 6.9, example: 'Review từ khách hàng tháng 10' },
  { name: 'UGC', pillar: 'Cộng đồng', posts: 6, er: 11.3, example: 'Minigame: đoán giá' },
]

export default function Angles() {
  const [tab, setTab] = useState('all')
  const list = angles.filter((a) => tab === 'all' || a.pillar === tab)
  const maxEr = Math.max(...angles.map((a) => a.er))
  return (
    <>
      <PageHeader
        title="Góc khai thác"
        description="Các cách tiếp cận cụ thể trong từng trụ cột nội dung."
        actions={
          <Button variant="primary">
            <Plus /> Thêm góc
          </Button>
        }
      />
      <div className="mb-4 overflow-x-auto">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'all', label: 'Tất cả', count: angles.length },
            ...pillars.map((p) => ({ value: p.name, label: p.name, count: angles.filter((a) => a.pillar === p.name).length })),
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => {
          const color = pillars.find((p) => p.name === a.pillar)!.color
          return (
            <Card key={a.name} className="p-5 transition hover:border-zinc-300">
              <div className="flex items-center justify-between">
                <div className="grid size-8 place-items-center rounded-lg bg-zinc-50 ring-1 ring-zinc-100">
                  <Compass className="size-4 text-zinc-500" />
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <span className="size-1.5 rounded-full" style={{ background: color }} />
                  {a.pillar}
                </span>
              </div>
              <h3 className="mt-4 text-[14px] font-semibold">{a.name}</h3>
              <p className="mt-1 text-[12px] text-zinc-500">VD: {a.example}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4">
                <div>
                  <div className="text-[11px] text-zinc-400">Bài viết</div>
                  <div className="font-mono text-[14px] font-medium">{a.posts}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400">Tương tác TB</div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[14px] font-medium">{a.er}%</span>
                    <div className="h-1 flex-1 rounded-full bg-zinc-100">
                      <div className="h-full rounded-full bg-brand-400" style={{ width: `${(a.er / maxEr) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
