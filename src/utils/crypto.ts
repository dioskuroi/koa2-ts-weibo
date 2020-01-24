/**
 * @description 加密方法
 * @author 徐俊
 */

import crypto from 'crypto'

import { CRYPTO_SECRET_KEY } from '../config/secretKeys'

/**
 * md5 加密方法
 * @param content 明文
 */
function _md5(content: string): string {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param content 明文
 */
function doCrypto(content: string): string {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

export default doCrypto
