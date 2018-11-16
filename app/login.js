const db = require("../config/mysqlLib")
let Login = async (ctx) => {
    let {name,password} = ctx.request.body;
    let sql = `SELECT * from my_database WHERE name = "${name}" AND password = "${password}" `;
    let result = await db.query(sql);
    if (Array.isArray(result) && result.length > 0) {
        result = result[0];
        ctx.session = {
            userName:result.name,
            userId:result.id,
            isLogin:true
        }
    } else {
        result = null
    }
    ctx.body = JSON.stringify({code: "R0001",flag: true,msg: "登陆成功！"})
}
let isLogin = async (ctx) => {
    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
        ctx.body = JSON.stringify({code: "R0001",flag: true,msg: "用户出于登录状态"})
    } else {
        // 没有登录态则跳转到错误页面
        ctx.body = JSON.stringify({code: "E0001",flag: false,msg: "登录失效"})
    }
}
let loginOut = async (ctx) => {
    let SESSION_ID = ctx.request.header.cookie;
    console.log(SESSION_ID)
    let sql = `DELETE FROM _mysql_session_store WHERE id = "${SESSION_ID}" `;
    let result = await db.query(sql);
}

module.exports = {
    isLogin,
    Login,
    loginOut
}