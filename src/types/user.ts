import User from 'src/db/models/user';

/**
 * @description 用户模块 数据结构
 * @author 徐俊
 */

export type UserModelInterface = {
  userName: string
  password: string
  nickName: string
  gender: number
  picture?: string
  city?: string
}

export type UserInfoAttr = 'id' | keyof Omit<UserModelInterface, 'password' | 'gender'>

export type UserInfo = Pick<User, UserInfoAttr>

export type RegisterParam = Pick<User, 'userName' | 'password' | 'gender'> & Partial<Pick<User, 'nickName'>>

export type LoginParam = Pick<User, 'userName' | 'password'>
