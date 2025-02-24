import Base from './base.js'

class User extends Base {
  // 定义参数默认值为 users 表
  constructor(props = 'users') {
    super(props)
  }
}

const userInstance = new User()

export default userInstance
