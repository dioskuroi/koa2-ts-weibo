/**
 * @description 补充三方库类型定义
 * @author 徐俊
 */

import * as Koa from 'koa'
import * as koaSession from 'koa-generic-session'
import { UserInfo } from './types'

declare module 'koa-generic-session' {
  interface Session {
    userInfo?: UserInfo
  }
}

// *  在 ctx 中 补充 session 定义
declare module 'koa' {
  interface BaseContext {
      session: koaSession.Session|null;
      sessionSave: boolean|null;
      regenerateSession(): Generator;
  }
}
