import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'
import { DISCORD_LINK, RAIN_GITHUB_IO } from './src/constants/metadata'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Rain\'s Blog',
  tagline: 'Just. Rain\'s Blog',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: RAIN_GITHUB_IO,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rainyy012', // Usually your GitHub org/user name.
  projectName: 'rains-blog', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/rainyy012/rains-blog/tree/dev/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/rainyy012/rains-blog/tree/dev/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: process.env.GOOGLE_ANALYTICS_ID ? {
          trackingID: process.env.GOOGLE_ANALYTICS_ID,
          anonymizeIP: true,
        } : undefined,
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params
            const items = await defaultCreateSitemapItems(rest)
            return items.filter((item) => !item.url.includes('/page/'))
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    // mermaid: true,
  },
  // themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Rain\'s Blog',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   to: '/blog',
        //   label: 'Blog',
        //   position: 'left',
        // },
        // {
        //   href: DISCORD_LINK,
        //   label: 'Discord',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'Glossary',
              to: '/docs/category/glossary',
            },
            {
              label: 'Privacy',
              to: '/privacy',
            },
            // Hiding as it doesn't make much sense for now.
            // This is a blog site, not a docs site.
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/rainyy012',
            // },
          ],
        },
        {
          // title: '',
          items: [
            {
              label: 'External Resources',
              to: '/docs/external-resources',
            },
            // {
            //   label: 'Discord',
            //   to: DISCORD_LINK,
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rain.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/blog',
            from: '/',
          },
        ],
      },
    ],
  ],

}

export default config
