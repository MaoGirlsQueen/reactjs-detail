const config = require("./config")
const withCss = require("@zeit/next-css")
if(typeof requie !== 'undefined'){
   require.extensions['.css'] = file=>{}
}
const configs = {
   distDir :"dest",//编译文件输出目录
   generateEtags: true,//给每个路由生成一个Tags，如果当前路由和上一次路由一样的化，服务端就不返回内容，用缓存的数据，返回显示的内容
   onDemandEntries: {//是说每个page下的每个页面在页面是否缓存
       maxInactiveAge:25*1000,//内容在页面的缓存的时长
       pagesBufferLength:2//同时缓存多少个页面
   },
   pageExtensions:['jsx','js'],//在page目录下可以是的后缀文件
   generateBuildId:async ()=>{//生成build的ID
       if(process.env.YOUR_BUILD_ID){
           return process.env.YOUR_BUILD_ID
       }
       //返回null使用默认的unique id
       return null;
   },
   webpack(config,options){
       return config
   },
   webpackDevMiddleware:config=>{
       return config
   },
   //可以在页面process.env,customKey获取value
   env:{
       customKey:"customKey"
   },

   //通过'next/config'
   //只在服务端渲染的时候才会获取配置
   serverRuntimeConfig:{
       mySecret:'secret',
       secondSecret:process.env.SECOND_SECRET
   },
   //在服务段渲染和客户端渲染都可获取的配置
   publicRuntimeConfig:{
       staticFolder:'/static'
   }

}

module.exports = withCss({
    publicRuntimeConfig:{
        GITHUB_OAUTH_URL:config.GITHUB_OAUTH_URL,
        OAUTH_URL:config.OAUTH_URL
    }
})
