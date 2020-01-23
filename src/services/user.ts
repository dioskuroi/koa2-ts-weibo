/**
 * @description user service
 * @author 徐俊
 */

import User from '../db/models/user'
import { UserInfo, UserInfoAttr } from '../types'
import { formatUserInfo } from './helpers/_format'
import { isNull } from '../utils/type'

// * 查询用户
interface FindUserWhereOpt {
  userName: string
  password?: string
  [propName: string]: any
}

/**
 * 获取用户信息
 * @param userName 用户名
 * @param password 密码
 */
export async function getUserInfo(userName: string, password?: string): Promise<UserInfo | null> {
  const whereOpt: FindUserWhereOpt = {
    userName
  }

  if (password) {
    whereOpt.password = password
  }

  const attributes:UserInfoAttr[] = ['id', 'userName', 'nickName', 'picture', 'city']

  const result = await User.findOne({
    attributes,
    raw: true,
    where: whereOpt
  })

  if (!isNull(result)) {
    const {
      id,
      // eslint-disable-next-line no-shadow
      userName,
      nickName,
      picture,
      city
    } = result
    return formatUserInfo<UserInfo>({
      id,
      userName,
      nickName,
      picture,
      city
    })
  }
  return result
}
