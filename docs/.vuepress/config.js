module.exports = {
    base: '/',
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        // logo: '/assets/img/logo.png',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'Test', link: '/test/' },
          { text: 'Hello', link: '/guide/hello' },
          { text: 'External', link: 'https://google.com' },
        ],
        // sidebar: 'auto'
        // displayAllHeaders: true, // 默认值：false,

        sidebar: [
          {
            title: 'Group 1',   // 必要的
            path: '/guide/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
              '/',
              '/guide/',
              '/guide/hello'
            ]
          },
          {
            title: 'Group 2',
            path: '/test/',
            children: [ /* ... */ ],
            initialOpenGroupIndex: -1 // 可选的, 默认值是 0
          },
          {
            title: 'Group 3',
            children: [ /* ... */ ],
            initialOpenGroupIndex: -1 // 可选的, 默认值是 0
          }
        ]
    
      }
  }