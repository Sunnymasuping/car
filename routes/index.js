import express from 'express'
import userController from '../controllers/user.js'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
// 测试user表
router.get('/get_user', userController.showUser)

// 登录 POST 请求
router.post('/login', userController.handleLogin)
// 注册 POST 请求
router.post('/register', userController.handleRegister)

export default router
