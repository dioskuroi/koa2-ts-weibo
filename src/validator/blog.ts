/**
 * @description blog 数据格式校验
 * @author 徐俊
 */

import validate from './_validate'
import { JsonSchema, CreateBlogParam, ValidateFn } from '../types'

const BLOG_SCHEMA: JsonSchema<keyof CreateBlogParam> = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

// * 执行校验
const blogValidate: ValidateFn = function (data = {}) {
  return validate(BLOG_SCHEMA, data)
}

export default blogValidate
