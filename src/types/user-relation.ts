/**
 * @description 用户关系数据类型
 * @author 徐俊
 */

import { UserInfo } from '../types'

export interface UserList {
  list: Omit<UserInfo, 'city'>[]
  count: number
}
