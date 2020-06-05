const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/common/styles/mixins.scss";
          @import "@/common/styles/utils.scss";
          @import "@/common/styles/variables.scss";
        `
      }
    }
  },
  devServer: {
    open: true,
    // host: '192.168.2.136',
    // port: 8080,
    proxy: {
      // 推荐的热门歌单获取
      '/api/getDiscList': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', //地址
        secure: true, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        headers: { // 配置请求头,冒充作用
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com',
        },
        pathRewrite: { // 路径改写规则
          '^/api/getDiscList': '' // 以/proxy/为开头的改写为''
        }
      },
      // 歌曲的url的vkey获取  获取目标歌手歌单
      '/api/getPlaySongVkey': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg', //地址
        secure: true, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        headers: { // 配置请求头,冒充作用
          referer: 'https://u.y.qq.com',
          host: 'u.y.qq.com',
        },
        pathRewrite: { // 路径改写规则
          '^/api/getPlaySongVkey': '' // 以/proxy/为开头的改写为''
        }
      },
      // 歌词获取
      '/api/lyric': {
        target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg', //地址
        secure: true, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        headers: { // 配置请求头,冒充作用
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com',
        },
        pathRewrite: { // 路径改写规则
          '^/api/lyric': '' // 以/proxy/为开头的改写为''
        }
      },
      // 获取推荐歌单的歌曲列表
      '/api/getSongList': {
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        secure: true,
        changeOrigin: true,
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com',
        },
        pathRewrite: {
          '^/api/getSongList': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'common': '@/common',
        'components': '@/components',
        'base': '@/views/base',
        'api': '@/api',
        'http': '@/http'
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude
      .add(path.resolve('src/common/svg'))
      .end()

    config.module
      .rule('svg-sprite-loader') // 添加一条规则叫做svg-sprite-loader
      .test(/\.svg$/) // 文件匹配的正则
      .include // 允许处理的
      .add(path.resolve('src/common/svg')) // 将svg目录添加为允许处理
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    process.env.NODE_ENV === 'production' && config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
