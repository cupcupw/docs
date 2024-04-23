import path from 'path';
import { defineConfig } from 'vitepress'
import { generateNavAndSidebar } from './generate';

const {nav, sidebar} = generateNavAndSidebar(path.join(__dirname, '../src'))

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cupcup_docs",
  titleTemplate: ':title',
  description: "Cupcup的笔记",
  cleanUrls: true,
  srcDir: './src',
  outDir: './docs',
  base: './',
  vite: {
    server: {
      host: '127.0.0.1',
      port: 2852,
    }
  },
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: ' /assets/img/logo.png',
    search: {
      provider: 'local'
    },
    nav: nav as any,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
