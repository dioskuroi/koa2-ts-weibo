/**
 * @description user controller
 * @author 徐俊
 */
import { SuccessModel, ErrorModel } from '../models/ResModel'
import { getUserInfo, createUser, deleteUser, updateUser } from '../services/user'
import { isNull, isVoid } from '../utils/type'
import {
 UserInfo, RegisterParam, LoginParam, ResModel, MiddlewareFnParam, ChangeParam
} from '../types'
import {
 registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo, changeInfoFailInfo
} from '../models/errorInfo'
import doCrypto from '../utils/crypto'
import { BaseContext } from 'koa'

/**
 * 查询用户是否存在
 * @param userName 用户名
 */
export async function isExist(userName: string): ResModel<UserInfo> {
  const result = await getUserInfo(userName)
  return isNull(result) ? new ErrorModel(registerUserNameNotExistInfo) : new SuccessModel(result)
}

/**
 * 注册
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别（ 1 男，2 女，3 保密）
 */
export async function register({ userName, password, gender }: RegisterParam): ResModel<void> {
  const result = await getUserInfo(userName)
  if (!isNull(result)) return new ErrorModel(registerUserNameExistInfo)
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel<void>()
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param ctx 中间件上下文
 * @param userName 用户名
 * @param password 密码
 */
export async function login(ctx: MiddlewareFnParam, { userName, password }: LoginParam): ResModel<void> {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  // * 登录失败
  if (isVoid(userInfo)) {
    return new ErrorModel(loginFailInfo)
  }

  // * 登录成功，设置 session
  ctx.session.userInfo = userInfo
  return new SuccessModel<void>()
}

/**
 * 删除当前用户
 * @param userName 用户名
 */
export async function deleteCurrentUser(userName: string): ResModel<void> {
  const result = await deleteUser(userName)
  return result ? new SuccessModel<void>() : new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param ctx ctx
 * @param nickName 昵称
 * @param city 城市
 * @param picture 头像地址
 */
export async function changeInfo(ctx: BaseContext, { nickName, city, picture }: ChangeParam): ResModel<void> {
  const { userName } = ctx.session.userInfo
  if (isVoid(nickName)) {
    nickName = userName
  }
  const result = await updateUser({ nickName, city, picture }, { userName })
  if (!result) {
    return new ErrorModel(changeInfoFailInfo)
  }
  Object.assign(ctx.session.userInfo, { nickName, city, picture } as Partial<UserInfo>)
  return new SuccessModel<void>()
}
