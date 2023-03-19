
const navs = [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },
    { text: 'Dev', link: '/dev/' },
    { text: 'BigData', link: '/bigdata/' },
    { text: 'Deploy', items: [
      { text: '部署规范', link: '/deploy/standard' },
      { text: '单节点部署', link: '/deploy/standalone' },
      { text: '集群部署', link: '/deploy/cluster' }
    ]
    },
    { text: 'Tools', link: '/tools/' },
    { text: 'External', link: 'https://google.com' },
  ]

module.exports = navs;
