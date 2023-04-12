import {defaultTheme} from '@vuepress/theme-default'

export default {
    theme: defaultTheme({
        navbar: [
            // NavbarItem
            {
                text: '首页',
                link: '/',
            },
            // NavbarGroup
            {
                text: '学习路线',
                link: '/foo/loo/doh'
            },
            {
                text: '开源项目',
               children:[
                {
                    text: '微信小程序',
                    link: 'https://github.com/keaideng/Ash-Video'
                },
               ]
            },
            {
                text: '作者简介',
                link: '/hom/lo'
            },
        ],
        // URL
        logo: '/图标.png',
        // 你也可以直接将它设置为一个 URL
        repo: 'https://github.com/keaideng',
        sidebar: {

            '/foo/loo/': ["doh","css3","JavaScript","NodeJs","React", "Vue"],

        },
        // docsRepo: 'https://gitlab.com/owner/name',
        // docsBranch: 'master',
        // docsDir: 'docs',
        // editLinkPattern: ':repo/-/edit/:branch/:path',
    }),
}
