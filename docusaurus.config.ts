import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { config as dotEnvConfig } from 'dotenv'
import { existsSync } from 'fs'
import { themes as prismThemes } from 'prism-react-renderer'
import { DOCS_BASE_PATH } from './src/constants'
import { type CustomValues } from './src/constants/generated'
import { isString } from './src/utils/type-check'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const ENV_LOCAL = '.env.local'

const THROW_IF_PRODUCTION = process.env.NODE_ENV === 'production' ? 'throw' : 'warn'

const EDIT_URL = 'https://codeberg.org/rainyy012/pages/src/branch/dev'

if (existsSync(ENV_LOCAL)) {
  dotEnvConfig({ path: ENV_LOCAL })
}

const config: Config = {
  title: 'Rain\'s Blog',
  tagline: 'Just. Rain\'s Blog',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: process.env.SITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rainyy012', // Usually your GitHub org/user name.
  projectName: 'rains-blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: (() => {
    const missingEnvVariables: Array<string> = []
    // KIV: Not needed for now
    // if (!process.env.DISCORD_LINK) {
    //   missingEnvVariables.push('DISCORD_LINK')
    // }
    if (!process.env.GIT_HASH) {
      missingEnvVariables.push('GIT_HASH')
    }
    if (!process.env.GOOGLE_ANALYTICS_ID) {
      missingEnvVariables.push('GOOGLE_ANALYTICS_ID')
    }
    if (!process.env.ETH_DONATION_ADDRESS) {
      missingEnvVariables.push('ETH_DONATION_ADDRESS')
    }
    if (!process.env.BTC_DONATION_ADDRESSES) {
      missingEnvVariables.push('BTC_DONATION_ADDRESSES')
    }
    if (missingEnvVariables.length > 0) {
      throw new Error(`Missing env variable(s): ${missingEnvVariables.join(', ')}`)
    }
    const values: CustomValues = {
      DISCORD_LINK: process.env.DISCORD_LINK,
      GIT_HASH: process.env.GIT_HASH,
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
      ETH_DONATION_ADDRESS: process.env.ETH_DONATION_ADDRESS,
      BTC_DONATION_ADDRESSES: String(
        process.env.BTC_DONATION_ADDRESSES || ''
      ).split('\n').filter(Boolean),
    }
    if (values.BTC_DONATION_ADDRESSES.length <= 0) {
      throw new Error('Unexpected empty array: BTC_DONATION_ADDRESSES')
    }
    return values as unknown as Config['customFields']
  })(),

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl: EDIT_URL,
          path: './resources',
          routeBasePath: '/resources',
        },
        blog: {
          // routeBasePath: '/',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl: EDIT_URL,
          // Useful options to enforce blogging best practices
          onInlineTags: THROW_IF_PRODUCTION,
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: THROW_IF_PRODUCTION,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: isString(process.env.GOOGLE_ANALYTICS_ID) ? {
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
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

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
        {
          to: '/blog',
          label: 'Home',
          position: 'left',
        },
        {
          to: '/resources/glossary',
          label: 'Resources',
          position: 'left',
        },
        {
          to: '/about',
          label: 'About',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site Info',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'Privacy',
              to: '/privacy',
            },
            {
              label: 'Settings',
              to: '/settings',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Glossary',
              to: `${DOCS_BASE_PATH}/glossary`,
            },
            {
              label: 'External',
              to: `${DOCS_BASE_PATH}/external`,
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Support this site',
              to: '/tip',
            },
            {
              label: 'Source Code',
              href: 'https://codeberg.org/rainyy012/pages',
            },
            // {
            //   label: 'Discord',
            //   href: process.env.DISCORD_LINK,
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

}

export default config
