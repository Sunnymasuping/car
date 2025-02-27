import { createLogger, format, transports } from 'winston'
import fs from 'fs'
import path from 'path'

const env = process.env.NODE_ENV || 'development'
const logDir = 'log'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const filename = path.join(logDir, 'results.log')

// 获取当前文件的完整路径
const __filename = new URL(import.meta.url).pathname
// 对于 Windows 系统，如果路径以斜杠开头，需要移除这个斜杠
const fixedFilename = path.basename(__filename.startsWith('/') ? __filename.substr(1) : __filename)

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: fixedFilename }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    }),
    new transports.File({
      filename,
      format: format.combine(
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    })
  ]
})

export default logger
