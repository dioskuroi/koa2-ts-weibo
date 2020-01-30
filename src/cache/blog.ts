/**
 * @description 微博相关缓存函数
 * @author 徐俊
 */

import { get, set } from './_redis'
import { listProfileBlogByUser } from '../services/blog'
import { ListBlogResult } from '../types'
import { isNull } from '../utils/type'

const REDIS_PREFIX = 'weibo:square:'

export async function listCacheSquareBlog(pageIndex: number, pageSize: number): Promise<ListBlogResult> {
  const key = `${REDIS_PREFIX}${pageIndex}_${pageSize}`
  const redisResult = await get(key) as ListBlogResult | null
  // * 有缓存，直接返回
  if (!isNull(redisResult)) {
    return redisResult
  }
  // * 没缓存，从数据库查询，缓存结果
  const result = await listProfileBlogByUser({ pageIndex, pageSize })
  set(key, result, 60)
  return result
}
