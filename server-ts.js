const Koa = require("koa")
const next = require("next")
const Router = require("koa-router")
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

const handle = app.getRequestHandler() //处理http请求
//pages 页面加载完成之后，启动服务 相应请求 
// app.prepare().then(()=>{
     const server = new Koa()
     const router = new Router()
     router.get("/test/:id",(ctx)=>{
           console.log(ctx)
      ctx.body = `<span>request /test ${ctx.params.id}</span>`
     })
     router.get("/json",(ctx)=>{
        ctx.body= {
              success:true
        }
        ctx.set("Content-Type","application/json")
     })
     router.get("/",(ctx)=>{
      ctx.body = "<span>index /test</span>"
     })
     server.use(router.routes())

    

     server.listen(4000)
// })