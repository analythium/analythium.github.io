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
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ Check out our <a target="_blank" rel="noopener noreferrer" href="https://hub.analythium.io/covidapp">COVID-19 app</a>! ⭐️',
    },
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
          to: 'blog/', 
          label: 'News', 
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
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'Analythium.io',
              href: 'https://www.analythium.io/',
            },
            {
              label: 'Analythium blog',
              to: 'https://blog.analythium.io',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy policy',
              href: 'https://www.analythium.io/privacy/',
            },
            {
              label: 'Terms of service',
              to: 'https://www.analythium.io/terms/',
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
          homePageId: 'introduction',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/analythium/analythium.github.io/edit/source/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/analythium/analythium.github.io/edit/source/',
          path: 'blog',
          postsPerPage: 5,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Analythium Solutions Inc.`,
          },
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
