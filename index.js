const Koa = require("koa");
const Router = require("koa-router")
const server = new Koa();
const router = new Router();
const views = require("koa-views")
const path = require("path")
const static = require("koa-static")
const bodyParser = require('koa-bodyparser')
// 封装的路由
const routerPath = require("./app/routerPath")
// 引入session 的配置信息
const sessionConfig = require("./app/session")
server.use(bodyParser()); // post 接受数据
server.use(sessionConfig.sessionFun); // session 配置
server.use(static(path.join(__dirname,"/static")));
// 加载模板引擎
server.use(views(path.join(__dirname,"/www"),{
    extension:"ejs"
}))
// 加载静态资源
server.use(static(path.join(__dirname,"/static")))
// 常规的路由操作！
router.get("/get",async function(ctx,next) {
    let name = 'Koa2'
    await ctx.render('index', {
        name,
    })
})
// 涉及到 cookie 的操作
router.get("/cookie",async (ctx)=>{
    ctx.cookies.set("cookie",{
        domain:"http://192.168.1.213:8010", // cookie 所在域名
        path:"/cookie", // cookie 所在路径
        maxAge: 10 * 60 * 1000, //cookie 有效时长
        expires:new Date(new Date('2017-02-15')), // cookie失效时间
        httpOnly:false, // 是否只是用于http请求
        overwrite:false // 是否可以重写
    })
    ctx.body = "Cookie";
})
// session 的 配置
server.use(routerPath())
server.use(router.routes(),router.allowedMethods())
server.use(sessionConfig.setSession) //
/*
    路径的问题
    1. 模板引擎 和 静态资源加载 
    2. 路由的加载
    3. 原生的路径反问 例如 session这个路径的反问 应该放在 router下面
*/
server.listen("8010",function(){
    console.log("run port 8010")
})