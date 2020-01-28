/**
 * @description 补充三方库类型定义
 * @author 徐俊
 */

import * as Koa from 'koa'
import * as http from 'http'
import * as koaSession from 'koa-generic-session'
import { UserInfo } from './types'

declare module 'koa-generic-session' {
  interface Session {
    userInfo?: UserInfo
  }
}

declare module 'koa' {
  interface BaseContext {
    // *  在 ctx 中 补充 session 定义
    session: koaSession.Session|null;
    sessionSave: boolean|null;
    regenerateSession(): Generator;
    // * 在 ctx 中 补充 render 定义
    render(viewPath: string, locals?: any): Promise<void>;
  }
}
