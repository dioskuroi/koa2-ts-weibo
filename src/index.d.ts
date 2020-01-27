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

interface File {
  name: string
  size: number
  type: string
  path: string
}

interface Files {
  file?: File[] | File
}

declare module 'koa' {
  interface BaseContext {
    // *  在 ctx 中 补充 session 定义
    session: koaSession.Session|null;
    sessionSave: boolean|null;
    regenerateSession(): Generator;
  }
  interface Request {
    // * 在 ctx 中 补充 files 定义
    files: Files
  }
}
