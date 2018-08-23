const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

//配置使用post解析表单请求体
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//配置session
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false
}))

//配置路由
app.use(router)

//统一处理500的错误
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})

app.listen(3000, () => {
    console.log('App is running at port 3000.')
    console.log('Please visit http://127.0.0.1:3000/')
})
