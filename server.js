const Koa = require("koa")
const next = require("next")
const Router = require("koa-router")
const dev = process.env.NODE_ENV !== 'production'
const Redis = require('ioredis')
const auth = require('./server/auth')
const app = next({dev})
const api = require('./server/api')
const koabody = require('koa-body')
const handle = app.getRequestHandler() //处理http请求
//pages 页面加载完成之后，启动服务 相应请求 
const session = require('koa-session')
const RedisSessionStore = require('./server/session-store')
const redis = new Redis()
app.prepare().then(()=>{
     const server = new Koa()
     const router = new Router()
     server.keys = ['it is a text']
     server.use(koabody())
     const SESSION_CONFIG = {
        key:'mm',
        store:new RedisSessionStore(redis)
     }
     server.use(session(SESSION_CONFIG,server))
     auth(server)
     api(server)
     router.get("/a/:id",async (ctx)=>{
        const id= ctx.params.id
        handle(ctx.req,ctx.res,{
           pathname:"/a",
           query:{id}
        })
        ctx.respond = false
     })
     router.get("/api/user/info",async (ctx)=>{
       const user = ctx.session.userInfo
       if(!user){
          ctx.status = 401
          ctx.body = 'Need Login'
       }else{
         ctx.body = user
         ctx.set('Content-Type','application/json')
       }
   })
     server.use(router.routes())
     server.use(async(ctx)=>{
         ctx.req.session = ctx.session
        await handle(ctx.req,ctx.res)
        ctx.respond = false
     })
     server.listen(4000)
})