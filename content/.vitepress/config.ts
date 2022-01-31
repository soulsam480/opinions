import { defineConfig } from 'vitepress';

export default defineConfig({
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
  },
  title: 'Opinions : Sambit Sahoo',
  description: 'My opinions in Vue 3 and how to build production apps in Vue',
  themeConfig: {
    nextLinks: true,
    prevLinks: true,
    repo: 'soulsam480/opinions',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Guide', link: '/guide/index.html', activeMatch: '^/guide/' },
    ],
    sidebar: {
      '/': getSidebar(),
      '/guide': getSidebar(),
    },
  },
  vite: {
    build: {
      target: 'esnext',
      minify: 'terser',
    },
  },
});

function getSidebar() {
  return [
    {
      text: 'Chapters',
      children: [
        { text: 'Folder structure', link: '/guide/folder-structure' },
        { text: 'Coding practices', link: '/guide/coding-practices' },
        { text: 'Quasar optimizations', link: '/guide/quasar-optimizations' },
      ],
    },
  ];
}
