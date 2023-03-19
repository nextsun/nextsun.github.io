const nav = require("./config/nav");
const sidebar = require("./config/sidebar");

module.exports = {
    base: '/',
    title: '石头的文档',
    description: '石头的文档',
    themeConfig: {
        // logo: '/assets/img/logo.png',
        nav:nav,
        sidebar:sidebar,
        // sidebar: 'auto',
        displayAllHeaders: true, // 默认值：false,
    },
    markdown: {
      // markdown-it-anchor 的选项
      anchor: { permalink: false },
      // markdown-it-toc 的选项
      // toc: { includeLevel: [1, 2] },
      config: md => {
        // 使用更多 markdown-it 插件！
        // md.use(require('vuepress-plugin-code-copy'))
      }
    },
    plugins: [
      [
        "vuepress-plugin-code-copy-plus", {
          selector: 'div[class*="language-"] pre',
          align: "top",
          color: "#ffffff",
          backgroundTransition: true,
          backgroundColor: "#ffffff",
          successText: "已复制!",
          staticIcon:false,
          trimContent: true
        },
      ]
    ]
    
}