import { useState } from 'react'
import { Card, PageHeader, Button, Input, Select, Label, Toggle } from '../components/ui'

const sections = ['Chung', 'Thương hiệu', 'Thông báo', 'Thành viên', 'Tích hợp AI']

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <div className="text-[13px] font-medium">{title}</div>
        <div className="text-[12px] text-zinc-500">{desc}</div>
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [sec, setSec] = useState('Chung')
  const [n, setN] = useState({ publish: true, fail: true, weekly: false, expire: true })
  const [aiOn, setAiOn] = useState(true)
  return (
    <>
      <PageHeader title="Cài đặt" description="Tuỳ chỉnh không gian làm việc của bạn." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setSec(s)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-left text-[13px] transition ${
                sec === s ? 'bg-white font-medium shadow-sm ring-1 ring-zinc-200' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[15px] font-semibold">Thông tin không gian</h2>
            <p className="text-[12px] text-zinc-500">Hiển thị cho mọi thành viên.</p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Tên không gian</Label>
                <Input defaultValue="PostChoice Workspace" />
              </div>
              <div>
                <Label>Email liên hệ</Label>
                <Input defaultValue="team@postchoice.vn" />
              </div>
              <div>
                <Label>Múi giờ mặc định</Label>
                <Select defaultValue="hcm">
                  <option value="hcm">(GMT+7) Asia/Ho_Chi_Minh</option>
                  <option value="sg">(GMT+8) Asia/Singapore</option>
                </Select>
              </div>
              <div>
                <Label>Ngôn ngữ</Label>
                <Select defaultValue="vi">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t border-zinc-100 pt-4">
              <Button variant="ghost">Huỷ</Button>
              <Button variant="dark">Lưu thay đổi</Button>
            </div>
          </Card>

          <Card className="px-6 pt-6 pb-2">
            <h2 className="text-[15px] font-semibold">Thông báo</h2>
            <div className="mt-2 divide-y divide-zinc-100">
              <Row title="Bài viết đã đăng" desc="Nhận thông báo khi bài được xuất bản thành công.">
                <Toggle on={n.publish} onChange={(v) => setN({ ...n, publish: v })} />
              </Row>
              <Row title="Đăng thất bại" desc="Cảnh báo ngay khi có lỗi đăng bài.">
                <Toggle on={n.fail} onChange={(v) => setN({ ...n, fail: v })} />
              </Row>
              <Row title="Báo cáo hàng tuần" desc="Tóm tắt hiệu quả gửi qua email mỗi thứ Hai.">
                <Toggle on={n.weekly} onChange={(v) => setN({ ...n, weekly: v })} />
              </Row>
              <Row title="Kết nối sắp hết hạn" desc="Nhắc nhở trước 7 ngày.">
                <Toggle on={n.expire} onChange={(v) => setN({ ...n, expire: v })} />
              </Row>
            </div>
          </Card>

          <Card className="px-6 pt-6 pb-2">
            <h2 className="text-[15px] font-semibold">Trợ lý AI</h2>
            <div className="mt-2 divide-y divide-zinc-100">
              <Row title="Bật trợ lý viết nội dung" desc="Sử dụng Google Gemini để gợi ý nội dung.">
                <Toggle on={aiOn} onChange={setAiOn} />
              </Row>
              <Row title="Giọng điệu mặc định" desc="Áp dụng cho mọi gợi ý AI.">
                <div className="w-44">
                  <Select defaultValue="friendly">
                    <option value="friendly">Thân thiện</option>
                    <option value="pro">Chuyên nghiệp</option>
                    <option value="fun">Hài hước</option>
                  </Select>
                </div>
              </Row>
            </div>
          </Card>

          <Card className="border-red-100 p-6">
            <h2 className="text-[15px] font-semibold text-red-700">Vùng nguy hiểm</h2>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-[12px] text-zinc-500">Xoá vĩnh viễn không gian làm việc và toàn bộ dữ liệu.</p>
              <button className="h-9 shrink-0 rounded-lg border border-red-200 px-3 text-[13px] font-medium text-red-600 transition hover:bg-red-50">
                Xoá không gian
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
