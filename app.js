import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
// 路由配置
import indexRouter from './routes/index.js'
// logger 日志配置
import morgan from 'morgan'
import logger from './logger.js'
// cors跨域配置
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// 使用cors中间件
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}))

// 使用logger 日志
app.use(morgan('dev'))

// 解析请求体
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')))

// 路由配置
app.use('/', indexRouter)

// 捕获404并转发到错误处理器
app.use(function (req, res, next) {
  next(createError(404))
})

// 错误处理器
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message)
  const errorMsg = err.message
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {}
  })
}
app.use(_errorHandler)

export default app
