/**
 * @description 数据格式化
 * @author 徐俊
 */

import { DEFAULT_PICTURE } from '../../config/constant'
import { UserInfo, BlogResult } from '../../types'
import { isArray } from '../../utils/type'
import { formatTime } from '../../utils/dt'

function _formatUserPicture(userInfo: UserInfo): UserInfo {
  if (!userInfo.picture) {
    userInfo.picture = DEFAULT_PICTURE
  }
  return userInfo
}


export function formatUserInfo<T extends UserInfo[] | UserInfo>(userInfo: T): T {
  if (isArray<UserInfo>(userInfo)) {
    return userInfo.map(_formatUserPicture) as T
  }
  return _formatUserPicture(userInfo as UserInfo) as T
}

function _formatDBTime(blogData: BlogResult): BlogResult {
  blogData.createAtFormat = formatTime(blogData.createdAt)
  blogData.updateDAtFormat = formatTime(blogData.updatedAt)
  return blogData
}

export function formatBlogData<T extends BlogResult[] | BlogResult>(blogData: T): T {
  if (isArray<BlogResult>(blogData)) {
    return blogData.map(_formatDBTime) as T
  }
  return _formatDBTime(blogData as BlogResult) as T
}
