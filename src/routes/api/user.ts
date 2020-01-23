/**
 * @description 用户 API 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { isExist } from 'src/controller/user'

const router = new Router()

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

export default router
