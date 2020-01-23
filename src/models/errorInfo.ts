/**
 * @description 失败信息集合，包括 errno 和 message
 * @author 徐俊
 */

import { ErrorInterface } from '../types'
import resCode from './resCode'

export const registerUserNameExistInfo: ErrorInterface = {
  errno: resCode.ERR_REGISTER_USERNAME_EXIST,
  message: '用户名已存在'
}

export const registerFailInfo: ErrorInterface = {
  errno: resCode.ERR_REGISTER_FAIL,
  message: '注册失败，请重试'
}

export const registerUserNameNotExistInfo: ErrorInterface = {
  errno: resCode.ERR_REGISTER_USERNAME_NOT_EXIST,
  message: '用户名未存在'
}

export const loginFailInfo: ErrorInterface = {
  errno: resCode.ERR_LOGIN_FAIL,
  message: '登录失败，用户名或密码错误'
}

export const loginCheckFailInfo: ErrorInterface = {
  errno: resCode.ERR_LOGIN_CHECK_FAIL,
  message: '您尚未登录'
}

export const validateJsonSchemaFailInfo: ErrorInterface = {
  errno: resCode.ERR_VALIDATE_JSON_SCHEMA_FAIL,
  message: '数据格式校验错误'
}

export const deleteUserFailInfo: ErrorInterface = {
  errno: resCode.ERR_DELETE_USER_FAIL,
  message: '删除用户失败'
}
