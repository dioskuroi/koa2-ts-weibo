import { Model } from 'sequelize/types';
import validate from '../validator/_validate'

/**
 * @description json schema 数据结构
 * @author 徐俊
 */

// * Json schema 校验规则
export interface JsonSchema<T extends string> {
  type: 'number' | 'integer' | 'string' | 'boolean' | 'array' | 'object' | 'null',
  // * number rules
  maximum?: number
  minimum?: number
  exclusiveMaximum?: boolean
  exclusiveMinimum?: boolean
  multipleOf?: number
  // * string rules
  maxLength?: number
  minLength?: number
  pattern?: string
  format?: 'date' | 'date-time' | 'uri' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'regex'
  formatMaximum?: string
  formatMinimum?: string
  formatExclusiveMaximum?: boolean
  formatExclusiveMinimum?: boolean
  // * array rules
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  items?: JsonSchema<T> | JsonSchema<T>[]
  additionalItems?: boolean | JsonSchema<T>
  contains?: JsonSchema<T>
  // * object rules
  maxProperties?: number
  minProperties?: number
  required?: T[]
  properties?: {
    [P in T]?: JsonSchema<T>
  }
  patternProperties?: {
    [propName: string]: JsonSchema<T>
  }
  additionalProperties?: boolean | JsonSchema<T>
  dependencies?: {
    [P in T]?: T[] | JsonSchema<T>
  }
  propertyNames?: JsonSchema<T>
  patternRequired?: string[]
  // * other
  enum?: any[]
  const?: any
  not?: JsonSchema<T>
  oneOf?: JsonSchema<T>[]
  anyOf?: JsonSchema<T>[]
  allOf?: JsonSchema<T>[]
  if?: JsonSchema<T>
  then?: JsonSchema<T>
  else?: JsonSchema<T>
}

export type ValidateFn = (data?: object) => ReturnType<typeof validate>
