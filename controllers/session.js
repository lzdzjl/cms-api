const db = require('../models/db')
const md5 = require('blueimp-md5')
const session = require('express-session')

module.exports = {
    /**
     * 获取会话状态，当前用户登录
     * @param req
     * @param res
     * @param next
     */
    get (req, res, next) {
        const {user} = req.session
        res.status(200).json(user)
    },

    /**
     * 创建会话：用户登录
     * @param req
     * @param res
     * @param next
     */
    async create (req, res, next) {
        try {
            //1.接受表单数据
            const body = req.body
            body.password = md5(md5(body.password))
            const sqlStr = `
            SELECT * FROM users WHERE 
            email='${body.email}' and password='${body.password}'
            `

            //2.操作数据库处理登录请求
            const [user] = await db.query(sqlStr)
            if (!user) {
                return res.status(404).json({
                    error:'Invalid email or password！'
                })
            }

            //3.登录成功,发送响应,保存session(服务器重启Session自动清空)
            req.session.user = user
            res.status(201).json(user)

        } catch (err) {
            next(err)
        }
    },

    /**
     * 注销登录
     * @param req
     * @param res
     * @param next
     */
    delete (req, res, next) {
        //在RESTful标准中反回空对象
        delete req.session.user
        res.status(201).json({})
    }
}