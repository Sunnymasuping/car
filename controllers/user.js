import configs from '../config.js'
import User from '../models/user.js'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

// 用户处理类
const userController = {
  // 登录验证
  handleLogin: async function (req, res, next) {
    try {
      const { loginName, password } = req.body
      const user = await User.findByUsername(loginName)  // 使用 findByLoginName 方法

      if (!user) {
        return res.json({ code: 0, message: "用户不存在" })
      }
      // 使用 SHA-256 加密
      const hash = crypto.createHash('sha256').update(password).digest('hex')

      if (hash === user.PasswordHash) {
        res.json({
          code: 200,
          message: "登录成功",
          data: user
        })
      } else {
        res.json({
          code: 0,
          message: "密码错误"
        })
      }
    } catch (e) {
      res.json({ code: 0, message: "操作失败", data: e.toString() })
    }
  },

  // 注册验证
  handleRegister: async function (req, res, next) {

    try {
      const { regUserName, regPwd, regConfirmPwd, regCode } = req.body


      // 检查密码是否匹配
      if (regPwd !== regConfirmPwd) {
        return res.json({ code: 0, message: '两次输入的密码不一致' })
      }

      // 检查用户名是否存在
      try {
        const existingUser = await User.findByUsername(regUserName)
        if (existingUser) {
          return res.json({ code: 0, message: '用户已存在' })
        }
      } catch (e) {
        console.error('查询用户名失败:', e)
        return res.json({ code: 0, message: '查询用户名失败', data: e.toString() })
      }

      // 对密码进行SHA-256加密
      const hash = crypto.createHash('sha256').update(regPwd).digest('hex')

      // 生成随机 token
      const token = uuidv4()
      // 权限
      const flag = 3

      // 插入新用户数据
      const insertResult = await User.insert({
        Username: regUserName,
        PasswordHash: hash,
        Token: token,
        CreatedAt: new Date(),
        Permission: flag, // 假设默认权限为3
        RegCode: regCode
      })


      if (insertResult) {
        return res.json({
          code: 200,
          message: '注册成功'
        })
      } else {
        return res.json({
          code: 0,
          message: '注册失败'
        })
      }
    } catch (e) {
      console.error('注册操作失败:', e) // 打印详细的错误信息
      return res.json({ code: 0, message: '操作失败', data: e.toString() })
    }
  },

  
}

export default userController
