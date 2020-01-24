/**
 * @description user service
 * @author 徐俊
 */

import User from '../db/models/user'
import { UserInfo, UserInfoAttr, RegisterParam } from '../types'
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

/**
 *
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别（ 1 男，2 女，3 保密）
 * @param nickName 昵称
 */
export async function createUser({
  userName,
  password,
  gender,
  nickName
}: RegisterParam): Promise<User> {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName || userName
  })
  return result
}

/**
 * 删除用户
 * @param userName 用户名
 */
export async function deleteUser(userName: string): Promise<boolean> {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // * result 返回的是删除行数
  return result > 0
}
