const mysql = require("mysql");
const SqlConfig = {
    host: "localhost",
    port: "3307",
    password: "123456a",
    user: "root",
    database: 'koa' // 选中数据库
}
const pool = mysql.createPool(SqlConfig)
let query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (error, connection) {
            connection.query(sql, (error, results, fields) => {
                console.log(results)
                // 结束会话
                connection.release();
                // 如果有错误就抛出
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    })
}
module.exports = {
    query,SqlConfig
}