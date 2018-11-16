const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
// 引入mysql 的配置信息
const sqlconfig = require("../config/mysqlLib")
// 配置 存储session的信息的mysql
let SessionStore = new MysqlSession(sqlconfig.SqlConfig)
// 存放sessionId的 cookie 配置
// 设置session 过期时效性
const expiresTime = require("../config/code")
console.log(expiresTime)
let SesstionCookie = {
    maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
    expires: "", // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: false, // 是否允许重写
    secure: '',
    sameSite: '',
    signed: 'asdfsd',
}
let setSession = async (ctx,next) => {
    if (ctx.url === '/set') {
        ctx.session = {
            user_id: Math.random().toString(36).substr(2),
            count: 0
        }
        ctx.body = ctx.session;
    } else if (ctx.url === '/showsession') {
        // 读取session信息
        ctx.session.count = ctx.session.count + 1
        ctx.body = ctx.session
    }
}
let sessionFun = session({
    key: 'SESSION_ID',
    store: SessionStore,
    cookie: SesstionCookie
})
module.exports = {
    setSession,
    sessionFun
}