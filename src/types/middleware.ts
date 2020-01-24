/**
 * @description 中间件通用类型
 * @author 徐俊
 */

import { Middleware } from 'koa-compose'
import { ParameterizedContext } from 'koa'
import Router from 'koa-router'

// * 中间件函数参数类型
export type MiddlewareFnParam = ParameterizedContext<any, Router.IRouterParamContext<any, {}>>

// * 中间件函数类型
export type MiddlewareFn = Middleware<MiddlewareFnParam>
