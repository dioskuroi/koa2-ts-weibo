/**
 * @description user controller
 * @author 徐俊
 */

import { SuccessModel, ErrorModel } from '../models/ResModel'
import { getUserInfo } from 'src/services/user'
import { isNull } from 'src/utils/type'
import { UserInfo } from '../types'
import { registerUserNameNotExistInfo } from '../models/errorInfo'

/**
 * 查询用户是否存在
 * @param userName 用户名
 */
export async function isExist(userName: string): Promise<SuccessModel<UserInfo> | ErrorModel> {
  const result = await getUserInfo(userName)
  return isNull(result) ? new ErrorModel(registerUserNameNotExistInfo) : new SuccessModel(result)
}
