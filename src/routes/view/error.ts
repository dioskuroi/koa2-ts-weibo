/**
 * @description 404 和 错误页
 * @author 徐俊
 */

import Router from 'koa-router'

const router = new Router()

router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

export default router
