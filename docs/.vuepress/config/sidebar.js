
const sidebars = {
    // '/guide/':{
    //   title: '的地方三房',
    //   children: [
    //     'guide'
    //   ]
    // },
    '/ansible/':[{
      title: 'ansible部署指南',
      children: [
        ''
      ]
    }
    ],
    '/deploy/': [{
      title: '部署指南',
      children: [
        { title: '部署规范', path:'/deploy/standard'},
        { title: '单节点部署', path:'/deploy/standalone'},
        { title: '集群部署', path:'/deploy/cluster'},
        { title: '工具手册',children: [ { title: 'ansible部署指南', path:'/tools/ansible/'}]}
      ]
    }]
  }
  module.exports = sidebars;