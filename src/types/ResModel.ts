/**
 * @description 返回值 数据模型 接口
 * @author 徐俊
 */

import { SuccessModel, ErrorModel } from '../models/ResModel'

// * 基本返回值接口
export interface ResInterface<T = void> {
  errno: number
  data?: T
  message?: string
}

// * 成功模型接口
export type SuccessInterface<T> = Required<Pick<ResInterface<T>, 'data' | 'errno'>>

// * 错误模型接口
export type ErrorInterface = Required<Pick<ResInterface, 'errno' | 'message'>>

export type ResModel<T> = Promise<SuccessModel<T> | ErrorModel>
