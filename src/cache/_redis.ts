/**
 * @description 连接 redis 的方法 get set
 * @author 徐俊
 */

import { createClient } from 'redis'

import { REDIS_CONF } from '../config/db'
import { isPlainObject, isVoid } from '../utils/type'

const redisClient = createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', (err): void => {
  // eslint-disable-next-line no-console
  console.error('redis error', err)
})

/**
 * redis set
 * @param key 键
 * @param val 值
 * @param timeout 过期时间
 */
export function set(key: string, val: any, timeout = 3600): Promise<boolean> {
  return new Promise(async (resolve) => {
    if (isPlainObject(val)) {
      val = JSON.stringify(val)
    }

    await redisClient.set(key, val)
    await redisClient.expire(key, timeout)
    resolve(true)
  })
}

/**
 * redis get
 * @param key 键
 */
export function get<T = any>(key: string): Promise<T | string | null> {
  return new Promise(async (resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }

      if (isVoid(val)) {
        resolve(null)
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}
