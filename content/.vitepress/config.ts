import { defineConfig } from 'vitepress';

export default defineConfig({
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
  },
  title: 'Opinions',
  description: 'My opinions in Vue 3 and how to build production apps in Vue',
  themeConfig: {
    nextLinks: true,
    prevLinks: true,
    repo: 'soulsam480/opinions',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: "What's this ?",
        link: '/why',
      },
      { text: 'My Blog', link: 'https://sambitsahoo.com', target: '_blank' },
    ],
    sidebar: {
      '/': getSidebar(),
      '/chapters': getSidebar(),
    },
  },
  head: [
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://opinions.sambitsahoo.com/opinions.webp',
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: 'My opinions in Vue 3 and how to build production apps in Vue',
      },
    ],
  ],
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
        { text: 'Folder structure', link: '/chapters/folder-structure' },
        { text: 'Coding practices', link: '/chapters/coding-practices' },
        {
          text: 'Quasar optimizations',
          link: '/chapters/quasar-optimizations',
        },
      ],
    },
  ];
}
