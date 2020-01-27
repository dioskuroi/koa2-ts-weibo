/**
 * @description user service
 * @author 徐俊
 */

import { User } from '../db/models'
import { UserInfo, UserInfoAttr, RegisterParam, ChangeParam, StringIndexObj } from '../types'
import { formatUserInfo } from './helpers/_format'
import { isNull, isVoid } from '../utils/type'

// * 查询用户
interface FindUserWhereOpt extends StringIndexObj {
  userName: string
  password?: string
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

interface UpdateUserWhere extends StringIndexObj {
  userName: string
  password?: string
}

/**
 * 更新用户数据
 * @param param0 更新数据 { nickName, city, picture, newPassword }
 * @param param1 条件 { userName, passowrd }
 */
export async function updateUser(
  { nickName, city, picture, newPassword }: ChangeParam,
  { userName, password }: UpdateUserWhere
): Promise<boolean> {
  const whereOpt: UpdateUserWhere = {
    userName
  }
  const updateData: ChangeParam = {}
  if (!isVoid(nickName)) {
    updateData.nickName = nickName
  }
  if (!isVoid(city)) {
    updateData.city = city
  }
  if (!isVoid(picture)) {
    updateData.picture = picture
  }

  if (!isVoid(newPassword)) {
    if (isVoid(password)) return false
    updateData.password = newPassword
    whereOpt.password = password
  }

  const result = await User.update(updateData, {
    where: whereOpt
  })
  return result[0] > 0
}
