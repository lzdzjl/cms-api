const db = require('../models/db')

module.exports = {
    async query (req, res, next) {
        try {
            //处理分页
            let {_page = 1, _limit = 20} = req.query
            _page = _page < 1 ? 1 : _page
            _limit = _limit < 1 ? 1 : _limit
            _limit = _limit > 20 ? 20 : _limit
            const start = (_page - 1) * _limit

            //查询数据
            const sqlStr = `
            SELECT * FROM comments 
            order by comments.modify_time desc
            LIMIT ${start}, ${_limit}
            `
            const ret = await db.query(sqlStr)

            //响应
            res.status(200).json(ret)
        } catch (err) {
            next(err)
        }
    },
    async get (req, res, next) {
        try {
            const {topic_id} = req.query
            const sqlStr = `
            SELECT * FROM comments WHERE topic_id=${topic_id}
            `
            const comments = await db.query(sqlStr)
            res.status(200).json(comments)
        } catch (err) {

        }
    }
    ,
    async new (req, res, next) {
        try {
            //获取表单数据
            const {
                content = '',
                topic_id
            } = req.body
            const sqlStr = `
                INSERT INTO comments(content, create_time, modify_time, topic_id, user_id)
                VALUES(
                '${content}',
                '${Date.now()}',
                '${Date.now()}',
                ${topic_id},
                ${req.session.user.id})`

            //操作数据库,新增数据,返回对象 对象结构
            const {insertId} = await db.query(sqlStr)

            //发送响应 查询操作返回数组 数组解构
            const [comment] = await db.query(`SELECT * FROM comments WHERE id=${insertId}`)
            res.status(201).json(comment)
        } catch (err) {
            next(err)
        }
    },
    async update (req, res, next) {
        try {
            const {id} = req.params
            const body = req.body
            const sqlStr = `UPDATE comments SET 
            content='${body.content}',
            modify_time='${Date.now()}'
            WHERE id=${id}`

            await db.query(sqlStr)
            const [comment] = await db.query(`SELECT * FROM comments WHERE id=${id}`)
            res.status(201).json(comment)
        } catch (err) {
            next(err)
        }
    },
    async delete (req, res, next) {
        try {
            //获得删除id
            const {id} = req.params
            const sqlStr = `DELETE FROM comments WHERE id=${id}`
            db.query(sqlStr)
            res.status(201).json({})
        } catch (err) {
            next(err)
        }
    }
}