/**
 * @description 数据格式化
 * @author 徐俊
 */

import { DEFAULT_PICTURE, REG_FOR_AT_WHO } from '../../config/constant'
import { UserInfo, BlogResult } from '../../types'
import { isArray } from '../../utils/type'
import { formatTime } from '../../utils/dt'
import { pipe } from '../../utils/blog'

/**
 * 设置默认头像
 * @param userInfo 用户数据
 */
function _formatUserPicture(userInfo: UserInfo): UserInfo {
  if (!userInfo.picture) {
    userInfo.picture = DEFAULT_PICTURE
  }
  return userInfo
}

/**
 * 格式化用户数据
 * @param userInfo 用户数据
 */
export function formatUserInfo<T extends UserInfo[] | UserInfo>(userInfo: T): T {
  if (isArray<UserInfo>(userInfo)) {
    return userInfo.map(_formatUserPicture) as T
  }
  return _formatUserPicture(userInfo as UserInfo) as T
}

/**
 * 格式化数据库时间
 * @param blogData 微博数据
 */
function _formatDBTime(blogData: BlogResult): BlogResult {
  blogData.createAtFormat = formatTime(blogData.createdAt)
  blogData.updateDAtFormat = formatTime(blogData.updatedAt)
  return blogData
}

function _formatContent(blogData: BlogResult): BlogResult {
  blogData.contentFormat = blogData.content.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => `<a href="/profile/${userName}" >@${nickName}</a>`
  )
  return blogData
}

const _formatBlog = pipe<BlogResult>(_formatDBTime, _formatContent)

/**
 * 格式化微博数据
 * @param blogData 微博数据
 */
export function formatBlogData<T extends BlogResult[] | BlogResult>(blogData: T): T {
  if (isArray<BlogResult>(blogData)) {
    return blogData.map(_formatBlog) as T
  }
  return _formatBlog(blogData as BlogResult) as T
}
