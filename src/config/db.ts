/**
 * @description 数据库配置
 * @author 徐俊
 */

import env from '../utils/env'
import { ClientOpts } from 'redis'


// eslint-disable-next-line import/no-mutable-exports
let REDIS_CONF: ClientOpts = {
  host: '127.0.0.1',
  port: 6379
}

if (env.isProd) {
  REDIS_CONF = {
    host: 'localhost',
    port: 6379
  }
}

export default REDIS_CONF
