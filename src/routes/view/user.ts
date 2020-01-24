/**
 * @description 用户 页面 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { isVoid } from '../../utils/type'

interface PageParam {
  isLogin: boolean,
  userName?: string
}

const router = new Router()

router.get('/login', async (ctx, next) => {
  const pageParam: PageParam = {
    isLogin: false
  }
  // * 登录后给模版传参
  if (ctx.session) {
    const { userInfo } = ctx.session
    if (!isVoid(userInfo)) {
      pageParam.isLogin = true
      pageParam.userName = userInfo.userName
    }
  }

  await ctx.render('login', pageParam)
})

router.get('/register', async (ctx, next) => {
  const pageParam: PageParam = {
    isLogin: false
  }
  // * 登录后给模版传参
  if (ctx.session) {
    const { userInfo } = ctx.session
    if (!isVoid(userInfo)) {
      pageParam.isLogin = true
      pageParam.userName = userInfo.userName
    }
  }

  await ctx.render('register', pageParam)
})

export default router
