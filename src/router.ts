import { useEffect, useState } from 'react'

export type Route =
  | 'home'
  | 'login'
  | 'overview'
  | 'create'
  | 'posts'
  | 'templates'
  | 'calendar'
  | 'strategy'
  | 'pillars'
  | 'angles'
  | 'library'
  | 'engagement'
  | 'accounts'
  | 'analytics'
  | 'settings'
  | 'license'

const routes: Route[] = [
  'home',
  'login',
  'overview',
  'create',
  'posts',
  'templates',
  'calendar',
  'strategy',
  'pillars',
  'angles',
  'library',
  'engagement',
  'accounts',
  'analytics',
  'settings',
  'license',
]

function read(): Route {
  const h = window.location.hash.replace(/^#\/?/, '') as Route
  return routes.includes(h) ? h : 'home'
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(read)
  useEffect(() => {
    const on = () => {
      setRoute(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export const href = (r: Route) => `#/${r}`

export const routeMeta: Record<Route, { label: string; group?: string }> = {
  home: { label: 'Trang chủ' },
  login: { label: 'Đăng nhập' },
  overview: { label: 'Tổng quan' },
  create: { label: 'Tạo bài viết', group: 'Nội dung' },
  posts: { label: 'Tất cả bài viết', group: 'Nội dung' },
  templates: { label: 'Mẫu bài viết', group: 'Nội dung' },
  calendar: { label: 'Lịch nội dung', group: 'Nội dung' },
  strategy: { label: 'Chiến lược nội dung', group: 'Nội dung' },
  pillars: { label: 'Trụ cột nội dung', group: 'Nội dung' },
  angles: { label: 'Góc khai thác', group: 'Nội dung' },
  library: { label: 'Thư viện tệp', group: 'Nội dung' },
  engagement: { label: 'Ảnh tương tác', group: 'Nội dung' },
  accounts: { label: 'Tài khoản mạng xã hội', group: 'Kênh' },
  analytics: { label: 'Phân tích', group: 'Kênh' },
  settings: { label: 'Cài đặt', group: 'Hệ thống' },
  license: { label: 'Quản lý license', group: 'Hệ thống' },
}
