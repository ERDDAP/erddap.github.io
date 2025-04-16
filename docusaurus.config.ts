import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ERDDAP™ Documentation',
  tagline: 'Documentation for the ERDDAP™ project',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://erddap.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ERDDAP', // Usually your GitHub org/user name.
  projectName: 'erddap.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: [
      "en",
      "bn",
      "zh",
      "zt",
      "cs",
      "da",
      "nl",
      "fi",
      "fr",
      "de",
      "el",
      "hi",
      "hu",
      "id",
      "ga",
      "it",
      "ja",
      "ko",
      "nb",
      "pl",
      "pt",
      "ro",
      "ru",
      "es",
      "sv",
      "tl",
      "th",
      "tr",
      "uk",
      "ur",
  ]
  },

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
    /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
    ({
      docsRouteBasePath: '/docs',
      docsDir: 'docs',
      searchBarPosition: 'right',
      indexPages: true,
      indexBlog: false,
      // ... Your options.
      // `hashed` is recommended as long-term-cache of index file is possible.
      hashed: true,
      // For Docs using Chinese, The `language` is recommended to set to:
      // ```
      language: ["en"],
      searchResultLimits: 10,
      highlightSearchTermsOnTargetPage: true,
      // ```
    }),
  ],
],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/erddap/erddap.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/noaa_simple.gif',
    wrapPagesHTML: true,
    navbar: {
      style: 'dark',
      title: 'ERDDAP™',
      logo: {
        alt: 'NOAA logo',
        src: 'img/noaab.png',
      },
      items: [

        {
          type: 'localeDropdown',
          position: 'left',
          dropdownItemsAfter: [],
        },
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/governance', label: 'Governance', position: 'left'},
        {to: '/cloud', label: 'Cloud', position: 'left'},
        {
          type: 'search',
          position: 'right',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/erddap/erddap',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
            {
              label: 'License',
              to: 'license',
            },
            {
              label: 'Changes',
              to: '/changes',
            },
            {
              label: 'Cloud',
              to: '/cloud',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {to: '/governance', label: 'Governance'},
            {to: '/technical-board', label: 'Technical Board'},
            {
              label: 'ERDDAP™ User Group',
              href: 'https://groups.google.com/g/erddap',
            },
            {
              label: 'ERDDAP™ Announce',
              href: 'https://groups.google.com/g/erddap-announce',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ERDDAP/erddap/',
            },
            {to: '/credits', label: 'Credits'},
            {to: '/acknowledgements', label: 'Acknowledgements'}
          ],
        },
        {
          title: 'Brought to you by',
          items: [
            {
              label: 'NOAA',
              href: 'https://www.noaa.gov',
            },
            {
              label: 'NMFS',
              href: 'https://www.fisheries.noaa.gov',
            },
            {
              label: 'SWFSC',
              href: 'https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center',
            },
            {
              label: 'ERD',
              href: 'https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center',
            },
          ],
        },
      ],
      copyright: `ERDDAP™, Version 2.26. Copyright © ${new Date().getFullYear()} ERDDAP™. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
