// Builds a single self-contained HTML file of the Create Post page: `pnpm export:html`
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [
    {
      name: 'export-entry',
      transformIndexHtml: {
        order: 'pre',
        handler: (html: string) =>
          html
            .replace('/src/main.tsx', '/src/export-create-post.tsx')
            .replace('<!-- figma:lang -->', 'vi')
            .replace('<!-- figma:title -->', 'Tạo bài viết — PostChoice')
            .replace(/<!-- figma:[\w-]+ -->/g, ''),
      },
    },
    react(),
    tailwindcss(),
    viteSingleFile(),
  ],
  build: { outDir: 'export', emptyOutDir: true },
})
