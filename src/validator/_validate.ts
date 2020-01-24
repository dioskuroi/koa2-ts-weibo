/**
 * @description json schema 校验方法
 * @author 徐俊
 */

import Ajv, { ErrorObject } from 'ajv'

const ajv = new Ajv({
  // allErrors: true  // * 完全校验，返回所有错误，默认有一个错误后直接返回
})

/**
 * 校验函数
 * @param schema json schema
 * @param data 用户数据
 */
function validate(schema: object, data = {}): ErrorObject | undefined {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

export default validate
