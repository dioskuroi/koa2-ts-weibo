/**
 * @description user 数据格式校验
 * @author 徐俊
 */

import validate from './_validate'
import { JsonSchema, UserModelInterface, ValidateFn } from '../types'

type UserSchemaProp = keyof UserModelInterface | 'newPassword'

const USER_SCHEMA: JsonSchema<UserSchemaProp> = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-z0-9_]+$',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

// * 执行校验
/**
 * 用户数据校验
 * @param data 用户数据
 */
const userValidate: ValidateFn = function (data = {}) {
  return validate(USER_SCHEMA, data)
}

export default userValidate
