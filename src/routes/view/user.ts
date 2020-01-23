/**
 * @description 用户 页面 路由
 * @author 徐俊
 */

import Router from 'koa-router'

interface PageParam {
  isLogin: boolean,
  userName?: string
}

const router = new Router()

router.get('/login', async (ctx, next) => {
  const pageParam: PageParam = {
    isLogin: false
  }
  await ctx.render('login', pageParam)
})

router.get('/register', async (ctx, next) => {
  const pageParam: PageParam = {
    isLogin: false
  }
  await ctx.render('register', pageParam)
})

export default router
