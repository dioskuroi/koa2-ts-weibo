/**
 * @description 返回值数据模型
 * @author 徐俊
 */
import { ResInterface, SuccessInterface, ErrorInterface } from '../types'
import ResCode from './resCode'

// * 返回值基类
class BasicModel<T = void> implements ResInterface<T> {
  errno: number
  data?: T
  message?: string
  constructor({ errno, data, message }: ResInterface<T>) {
    this.errno = errno
    this.data = data
    this.message = message
  }
}


// * 成功类
export class SuccessModel<T> extends BasicModel<T> implements SuccessInterface<T> {
  errno: number
  data: T
  constructor(data?: T) {
    super({ errno: ResCode.ERR_OK, data })
  }
}


// * 错误类
export class ErrorModel extends BasicModel implements ErrorInterface {
  errno: number
  message: string
  constructor({ errno, message }: ErrorInterface) {
    super({ errno, message })
  }
}
