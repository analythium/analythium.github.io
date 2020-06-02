// check https://github.com/facebook/docusaurus/blob/master/website/docusaurus.config.js
module.exports = {
  title: 'Analythium Hub',
  tagline: 'Rock solid and open source analytics at your service',
  url: 'https://hub.analythium.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'analythium', // Usually your GitHub org/user name.
  projectName: 'analythium.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Analythium Hub',
      logo: {
        alt: 'Analythium Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/analythium/analythium.github.io',
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/analythium',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/analythium',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/analythium',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Analythium Solutions Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/analythium/analythium.github.io/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [
    {
      src:
        'https://www.googletagmanager.com/gtag/js?id=UA-147215898-3',
      async: true,
    },
    'gascript.js',
  ],
};
