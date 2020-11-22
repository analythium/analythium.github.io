module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'introduction',
    },
    {
      type: 'category',
      label: 'Shiny',
      items: ['shiny', 'shiny-ui', 'shiny-server', 'shiny-app'],
    },
    {
      type: 'category',
      label: 'Containers',
      items: ['containers', 'containers-docker', 'containers-shiny'],
    },
    {
      type: 'category',
      label: 'ShinyProxy',
      items: ['shinyproxy', 'shinyproxy-setup', 'shinyproxy-secure', 'shinyproxy-update', 'shinyproxy-webhook'],
    },
  ],
};
