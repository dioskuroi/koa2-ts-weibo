/**
 * @description 数据格式化
 * @author 徐俊
 */

import { DEFAULT_PICTURE } from '../../config/constant'
import { UserInfo } from '../../types'
import { isArray } from '../../utils/type'

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
