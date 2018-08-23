const express = require('express')
const router = express.Router()
const db = require('./models/db')
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')

/**
 * 校验登录状态中间件
 * @param req
 * @param res
 * @param next
 */
function checkLogin(req, res, next) {
    //如果调用next会执行后面的那个函数
    if (!req.session.user) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
    next()
}

/**
 * 标题校验权限中间件
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function checkTopic(req, res, next) {
    try {
        const {id} = req.params
        const [topic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
        //如果话题不存在
        if(!topic){
            return res.status(404).json({
                error:'Topic not Found'
            })
        }
        //如果话题不属于作者自己
        if(topic.user_id !== req.session.user.id){
            return res.status(400).json({
                error:'Action Invalid'
            })
        }
        next()
    } catch (err) {
        next(err)
    }
}

/**
 * 评论校验权限中间件
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function checkComment(req, res, next) {
    try {
        const {id} = req.params
        const [comment] = await db.query(`SELECT * FROM comments WHERE id=${id}`)
        //如果话题不存在
        if(!comment){
            return res.status(404).json({
                error:'Topic not Found'
            })
        }
        //如果话题不属于作者自己
        if(comment.user_id !== req.session.user.id){
            return res.status(400).json({
                error:'Action Invalid'
            })
        }
        next()
    } catch (err) {
        next(err)
    }
}

/**
 *  用户资源
 */
router
    .get('/users', userController.query)
    .post('/users', userController.new)
    .patch('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)

/**
 *  话题资源
 */
router
    .get('/topics', topicController.query)
    .get('/topics/:id', topicController.getOne)
    .post('/topics', checkLogin, topicController.new)
    .patch('/topics/:id', checkLogin, checkTopic, topicController.update)
    .delete('/topics/:id', checkLogin, checkTopic, topicController.delete)

/**
 *  评论资源
 */
router
    //.get('/comments', commentController.query)
    .get('/comments', commentController.get)
    .post('/comments', checkLogin, commentController.new)
    .patch('/comments/:id', checkLogin, checkComment, commentController.update)
    .delete('/comments/:id', checkLogin, checkComment, commentController.delete)

/**
 *  会话资源
 */
router
    .get('/session', checkLogin, sessionController.get)
    .post('/session', sessionController.create)
    .delete('/session', sessionController.delete)

/**
 *  模块导出
 */
module.exports = router
