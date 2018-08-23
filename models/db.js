const mysql = require('mysql')
const config = require('../config')

//创建一个连接池  创建一个池子，不需要每次数据库操作都创建连接
const pool = mysql.createPool(config.db);

/**
 * 封装了Promise才可以使用async函数
 * 查询返回数组
 * 增删该操作返回对象
 * @param sqlStr
 */
exports.query = function (sqlStr) {
    return new Promise((resolve, reject) => {
        //每次从池子里拿一个连接帮我们处理业务
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            connection.query(sqlStr,(err, ...args) => {
                //操作结束，释放连接池里面的连接
                connection.release()
                if (err) {
                    return reject(err)
                }
                resolve(...args)
            })
        })
    })
}

