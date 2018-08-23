const moment = require('moment')
const db = require('../models/db')

module.exports = {
    async query(req, res, next) {
        try {
            let {_page = 1, _limit = 20} = req.query
            _page = _page < 1 ? 1 : _page
            _limit = _limit < 1 ? 1 : _limit
            _limit = _limit > 20 ? 20 : _limit

            const start = (_page - 1) * _limit
            // page  start   limit
            //  1      0      20
            //  2     20      20
            //  3     40      20
            const sqlStr = `
            SELECT * FROM topics 
            order by topics.modify_time desc
            LIMIT ${start}, ${_limit}
            `
            //查询总条数
            const [{count}] = await db.query(`SELECT COUNT(*) as count FROM topics`)
            //获取分页数据
            const topics = await db.query(sqlStr)
            res.status(200).json({topics,count})
        } catch (err) {
            next(err)
        }
    },
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const sqlStr = `
            SELECT * FROM topics WHERE id=${id}
            `
            const topic = await db.query(sqlStr)
            res.status(200).json(topic[0])
        } catch (err) {
            next(err)
        }
    },
    async new(req, res, next) {
        try {
            const body = req.body
            body.user_id = req.session.user.id

            const sqlStr = `
          INSERT INTO topics(title, content, user_id, create_time, modify_time)
          VALUES(
          '${body.title}',
          '${body.content}',
          '${body.user_id}',
          '${moment().format('YYYY-MM-DD hh:mm:ss')}',
          '${moment().format('YYYY-MM-DD hh:mm:ss')}')`

            //数据库操作 查询返回数组 增删该返回对象
            const ret = await db.query(sqlStr)
            const [topic] = await db.query(`SELECT * FROM topics WHERE id=${ret.insertId}`)
            res.status(201).json(topic)
        } catch (err) {
            next(err)
        }
    },
    async update(req, res, next) {
        try {
            const {id} = req.params
            const body = req.body
            const sqlStr = `UPDATE topics SET 
            title='${body.title}', 
            content='${body.content}',
            modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}'
            WHERE id=${id}`

            //执行更新操作
            await db.query(sqlStr)
            const [updatedTopic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
            res.status(201).json(updatedTopic)
        } catch (err) {
            next(err)
        }
    },
    async delete(req, res, next) {
        //根据话题的id查询得到话题，得到话题中存储的作者ID
        //如果话题中的user_id === 当前用户登录的id，则有权限删除数据
        //url中的:ID叫做动态路由参数，可以通过req.params来获取动态路由参数
        //总结如下:
        //查询字符串：req.query
        //POST:req.body
        //动态路径参数：req.params
        try {
            //删除这个资源
            const {id} = req.params
            const sqlStr = `DELETE FROM topics WHERE id=${id}`
            await db.query(sqlStr) //不报错就删除成功
            res.status(201).json({})
        } catch (err) {
            next(err)
        }
    }
}