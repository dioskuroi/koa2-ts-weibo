
/**
 * @description API 登录验证
 * @author 徐俊
 */

import { MiddlewareFn } from '../types';
import { isVoid } from '../utils/type';
import { ErrorModel } from '../models/ResModel';
import { loginCheckFailInfo } from '../models/errorInfo';


export const loginCheck: MiddlewareFn = async function (ctx, next) {
  if (!isVoid(ctx.session) && !isVoid(ctx.session.userInfo)) {
    await next()
    return
  }
  // * 未登录，返回错误信息
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

export const loginRedirect: MiddlewareFn = async function (ctx, next) {
  if (!isVoid(ctx.session) && !isVoid(ctx.session.userInfo)) {
    await next()
    return
  }
  const url = ctx.url
  ctx.redirect(`/login?url=${encodeURIComponent(url)}`)
}
