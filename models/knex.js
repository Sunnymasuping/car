// 引用配置文件
import configs from '../config.js'
import knex from 'knex'

// 把配置文件中的信息，设置在初始化配置中
const db = knex({
  client: 'mysql',
  connection: {
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.password,
    database: configs.mysql.database
  },
  // 打印错误
  log: {
    error (message) {
      console.log('[knex error]', message)
    }
  }
})

export default db
