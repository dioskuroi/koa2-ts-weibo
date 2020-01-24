/**
 * @description json schema 校验中间件
 * @author 徐俊
 */

import { ErrorModel } from '../models/ResModel'
import { validateJsonSchemaFailInfo } from '../models/errorInfo'
import { ValidateFn, MiddlewareFn } from '../types'
import { isVoid } from '../utils/type'


/**
 * 校验生成器
 * @param validateFn 校验方法
 */
function genValidator(validateFn: ValidateFn): MiddlewareFn {
  return async function (ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (!isVoid(error)) {
      ctx.body = new ErrorModel(validateJsonSchemaFailInfo)
      return
    }
    await next()
  }
}

export default genValidator
