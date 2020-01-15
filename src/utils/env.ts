/**
 * @description 环境变量
 * @author 徐俊
 */

const env = process.env.NODE_ENV as string

type EnvKey = 'isDev' | 'notDev' | 'isProd' | 'notProd'

type EnvMap = Record<EnvKey, boolean>

export default {
  isDev: env === 'dev',
  notDev: env !== 'dev',
  isProd: env === 'production',
  notProd: env !== 'production'
} as EnvMap
