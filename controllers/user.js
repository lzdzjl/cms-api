const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db')

module.exports = {
    async query(req, res, next) {
        try {
            const {email, nickname} = req.query
            if (email) {
                const emailSqlStr = `
                SELECT * from users WHERE email = '${email}'
                `
                const checkEmail = await db.query(emailSqlStr)
                res.status(200).json(checkEmail)
            }
            if (nickname) {
                const nicknameSqlStr = `
                SELECT * from users WHERE nickname = '${nickname}'
                `
                const nicknameEmail = await db.query(nicknameSqlStr)
                res.status(200).json(nicknameEmail)
            }
        } catch (err) {
            next(err)
        }
    },
    async new(req, res, next) {
        try {
            //获得url中的查询字符串
            const body = req.body

            //用户名重复校验
            const checkEmailSqlStr = `
            SELECT email from users WHERE email = '${body.email}'
            `
            const [checkEmail] = await db.query(checkEmailSqlStr)
            if (checkEmail) {
                return res.status(400).json({
                    error: 'Username error'
                })
            }

            //昵称重复校验
            const checkNicknameSqlStr = `
            SELECT nickname from users WHERE nickname = '${body.nickname}'
            `
            const [checkNickname] = await db.query(checkNicknameSqlStr)
            if (checkNickname) {
                return res.status(400).json({
                    error: 'Nickname error'
                })
            }

            //SQL查询字符串
            const sqlStr =
                `INSERT INTO users (username, password, email, avatar, gender, create_time, modify_time, nickname)
            VALUES(
            '${body.email}',
            '${md5(md5(body.password))}',
            '${body.email}',
            'default-avatar.png',
            0,
            '${moment().format('YYYY-MM-DD hh:mm:ss')}',
            '${moment().format('YYYY-MM-DD hh:mm:ss')}',
            '${body.nickname}')`


            const ret = await db.query(sqlStr)
            const users = await db.query(`SELECT * FROM users WHERE id='${ret.insertId}'`)
            //注册成功，返回注册成功的信息
            res.status(201).json(users[0])
        } catch (err) {
            //使用错误处理中间件,4个参数的那个中间件
            next(err)
        }
    },
    update(req, res, next) {

    },
    delete(req, res, next) {

    }
}

