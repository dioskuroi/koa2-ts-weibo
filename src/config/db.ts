/**
 * @description 数据库配置
 * @author 徐俊
 */

import ENV from '../utils/env'
import { ClientOpts } from 'redis'
import { SequelizeOptions } from 'sequelize-typescript'

// eslint-disable-next-line import/no-mutable-exports
export let REDIS_CONF: ClientOpts = {
  host: '127.0.0.1',
  port: 6379
}

interface MysqlConf {
  database: string,
  user: string,
  password: string,
  conf: SequelizeOptions
}

export const MYSQL_CONF: MysqlConf = {
  database: 'koa2_weibo_db',
  user: 'root',
  password: 'paramore123',
  conf: {
    host: 'localhost',
    dialect: 'mysql',
    // models: [User]
  }
}

if (ENV.isProd) {
  REDIS_CONF = {
    host: 'localhost',
    port: 6379
  }

  MYSQL_CONF.conf.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

if (ENV.isTest) {
  MYSQL_CONF.conf.logging = () => {}
}
