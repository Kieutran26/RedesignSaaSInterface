export type Platform = 'facebook' | 'instagram'
export type Status = 'published' | 'scheduled' | 'draft' | 'failed'

const u = (id: string, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const photos = [
  { src: u('1546177461-668e7784915e'), name: 'coffee-cup.jpg', size: '1.2 MB' },
  { src: u('1643168343279-3f93c2e592ef'), name: 'lipstick-set.jpg', size: '2.4 MB' },
  { src: u('1630559809698-e17466a812aa'), name: 'laptop-bag.jpg', size: '1.8 MB' },
  { src: u('1630552237339-9520955b603c'), name: 'watch-black.jpg', size: '980 KB' },
  { src: u('1744798516778-22e8b144eab9'), name: 'sheet-mask.jpg', size: '1.1 MB' },
  { src: u('1652819921040-b819d9dbd94b'), name: 'earbuds.jpg', size: '2.9 MB' },
  { src: u('1632965053719-ef245122de92'), name: 'notebook-card.jpg', size: '1.5 MB' },
  { src: u('1630558673281-46d2d315e235'), name: 'watch-silver.jpg', size: '1.0 MB' },
  { src: u('1625792508553-5e66a81659fa'), name: 'necklace.jpg', size: '760 KB' },
  { src: u('1652819804299-eea887780ca7'), name: 'keyboard.jpg', size: '2.2 MB' },
  { src: u('1676975451976-07c1b20f8e1c'), name: 'flower-book.jpg', size: '1.3 MB' },
  { src: u('1727257048999-3582668ee135'), name: 'plates.jpg', size: '2.0 MB' },
]

export const accounts = [
  { id: 'deszy', name: 'Deszy', platform: 'facebook' as Platform, followers: 12480, brand: 'Deszy', status: 'ok' },
  { id: 'deszy_creative', name: 'deszy_creative', platform: 'instagram' as Platform, followers: 8230, brand: 'Deszy', status: 'ok' },
  { id: 'nextchoice', name: 'NextChoice', platform: 'facebook' as Platform, followers: 25140, brand: 'NextChoice', status: 'ok' },
  { id: 'talentchoice', name: 'TalentChoice', platform: 'facebook' as Platform, followers: 6720, brand: 'TalentChoice', status: 'expiring' },
]

export const pillars = [
  { name: 'Kiến thức sản phẩm', color: '#fdd835', target: 35, actual: 38, posts: 24, angles: 3 },
  { name: 'Câu chuyện thương hiệu', color: '#18181b', target: 25, actual: 19, posts: 12, angles: 2 },
  { name: 'Khuyến mãi', color: '#f97316', target: 20, actual: 26, posts: 16, angles: 2 },
  { name: 'Cộng đồng', color: '#10b981', target: 20, actual: 17, posts: 11, angles: 2 },
]

export const posts: {
  id: number
  title: string
  excerpt: string
  accounts: string[]
  status: Status
  date: string
  pillar: string
  img?: number
  reach?: number
  engagement?: number
}[] = [
  { id: 1, title: 'Tuần 42 — kiến thức sản phẩm', excerpt: '5 mẹo giúp bạn bảo quản đồng hồ da bền đẹp theo năm tháng…', accounts: ['deszy', 'nextchoice'], status: 'published', date: '2026-10-28T09:00', pillar: 'Kiến thức sản phẩm', img: 3, reach: 18420, engagement: 6.2 },
  { id: 2, title: 'Flash sale cuối tháng', excerpt: 'Giảm đến 40% toàn bộ bộ sưu tập phụ kiện chỉ trong 48h…', accounts: ['deszy', 'deszy_creative'], status: 'scheduled', date: '2026-10-31T20:00', pillar: 'Khuyến mãi', img: 1 },
  { id: 3, title: 'Hậu trường buổi chụp', excerpt: 'Một ngày ở studio cùng team sáng tạo của Deszy…', accounts: ['deszy_creative'], status: 'published', date: '2026-10-26T18:30', pillar: 'Câu chuyện thương hiệu', img: 10, reach: 9240, engagement: 8.4 },
  { id: 4, title: 'Feedback khách hàng tháng 10', excerpt: 'Cảm ơn hơn 200 khách hàng đã gửi đánh giá cho chúng mình…', accounts: ['nextchoice'], status: 'draft', date: '2026-11-02T10:00', pillar: 'Cộng đồng' },
  { id: 5, title: 'Tuyển dụng Content Executive', excerpt: 'TalentChoice đang tìm kiếm bạn đồng hành mới…', accounts: ['talentchoice'], status: 'failed', date: '2026-10-29T08:00', pillar: 'Câu chuyện thương hiệu' },
  { id: 6, title: 'So sánh tai nghe 2026', excerpt: 'Chọn tai nghe nào cho dân văn phòng? Cùng so sánh 3 mẫu…', accounts: ['nextchoice', 'deszy'], status: 'scheduled', date: '2026-11-03T12:00', pillar: 'Kiến thức sản phẩm', img: 5 },
  { id: 7, title: 'Minigame: đoán giá', excerpt: 'Đoán đúng giá sản phẩm và nhận ngay voucher 200K…', accounts: ['deszy', 'deszy_creative', 'nextchoice'], status: 'published', date: '2026-10-24T19:00', pillar: 'Cộng đồng', img: 8, reach: 31200, engagement: 11.3 },
  { id: 8, title: 'Bộ quà tặng mùa lễ', excerpt: 'Gợi ý 6 set quà tinh tế cho người thương…', accounts: ['deszy'], status: 'draft', date: '2026-11-05T09:00', pillar: 'Khuyến mãi', img: 0 },
]

export const statusMeta: Record<Status, { label: string; cls: string; dot: string }> = {
  published: { label: 'Đã đăng', cls: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  scheduled: { label: 'Đã lên lịch', cls: 'bg-brand-50 text-brand-700', dot: 'bg-brand-500' },
  draft: { label: 'Bản nháp', cls: 'bg-zinc-100 text-zinc-600', dot: 'bg-zinc-400' },
  failed: { label: 'Lỗi', cls: 'bg-red-50 text-red-700', dot: 'bg-red-500' },
}

export const fmt = (n: number) => n.toLocaleString('vi-VN')
export const fmtDate = (d: string) =>
  new Date(d).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
