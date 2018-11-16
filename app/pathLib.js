const db = require("../config/mysqlLib")
const loginState = require("./login")
const page_404 = async function(ctx){
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>"
}
const todo = async function(ctx){
    ctx.body = "<h1>TODOLIST 高锰酸钾</h1>"
}
const getList = async function(ctx){
    let sql = "select * from my_database";
    let result = await db.query(sql);
    console.log(result)
    ctx.body = result
}
module.exports = {
    "GET/404":page_404,
    "GET/todo":todo,
    "GET/getList":getList,
    "POST/login":loginState.Login,
    "POST/isLogin":loginState.isLogin,
    "POST/loginOut":loginState.loginOut

}