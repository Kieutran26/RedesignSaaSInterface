import { Plus, Copy, ArrowRight } from 'lucide-react'
import { Card, PageHeader, Button } from '../components/ui'
import { photos } from '../data'
import { href } from '../router'

const templates = [
  { name: 'Giới thiệu sản phẩm mới', pillar: 'Kiến thức sản phẩm', uses: 18, img: 3, body: '[Tên sản phẩm] chính thức ra mắt! Điểm nổi bật: …' },
  { name: 'Flash sale 48h', pillar: 'Khuyến mãi', uses: 12, img: 1, body: 'Chỉ 48h — giảm đến [x]% cho [danh mục]…' },
  { name: 'Hậu trường', pillar: 'Câu chuyện thương hiệu', uses: 7, img: 10, body: 'Một ngày làm việc của team [phòng ban]…' },
  { name: 'Minigame tương tác', pillar: 'Cộng đồng', uses: 9, img: 8, body: 'Bình luận đáp án để có cơ hội nhận…' },
  { name: 'Mẹo sử dụng', pillar: 'Kiến thức sản phẩm', uses: 15, img: 5, body: '3 mẹo giúp bạn dùng [sản phẩm] hiệu quả hơn…' },
  { name: 'Cảm ơn khách hàng', pillar: 'Cộng đồng', uses: 4, img: 11, body: 'Cảm ơn [số] khách hàng đã tin tưởng…' },
]

export default function Templates() {
  return (
    <>
      <PageHeader
        title="Mẫu bài viết"
        description="Tái sử dụng cấu trúc bài viết hiệu quả để soạn nhanh hơn."
        actions={
          <Button variant="primary">
            <Plus /> Tạo mẫu
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <Card key={t.name} className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
              <img src={photos[t.img].src} alt={t.name} className="size-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium backdrop-blur">
                {t.pillar}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-[14px] font-semibold">{t.name}</h3>
              <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-zinc-500">{t.body}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <Copy className="size-3.5" /> Đã dùng {t.uses} lần
                </span>
                <a
                  href={href('create')}
                  className="flex items-center gap-1 text-[12px] font-medium text-zinc-900 opacity-70 transition group-hover:opacity-100"
                >
                  Dùng mẫu <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
