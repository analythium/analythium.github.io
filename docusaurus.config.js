// check https://github.com/facebook/docusaurus/blob/master/website/docusaurus.config.js
module.exports = {
  title: 'Analythium Hub',
  tagline: 'Rock solid and open source analytics at your service',
  url: 'https://hub.analythium.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'analythium', // Usually your GitHub org/user name.
  projectName: 'analythium.github.io', // Usually your repo name.
  customFields: {
    description:
      'The hub for open source projects by Analythium.',
  },
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: 'Analythium Hub',
      logo: {
        alt: 'Analythium Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-light.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'blog', 
          label: 'Blog', 
          position: 'left',
        },
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
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/analythium',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/analythium/',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/analythium',
            },
          ],
        },
        {
          title: 'Link',
          items: [
            {
              label: 'Analythium.io',
              href: 'https://www.analythium.io/',
            },
            {
              label: 'Blog',
              to: 'https://blog.analythium.io',
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
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/analythium/analythium.github.io/edit/master/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/analythium/analythium.github.io/edit/master/',
          path: 'blog',
          postsPerPage: 5,
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
