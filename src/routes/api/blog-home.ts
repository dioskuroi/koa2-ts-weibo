/**
 * @description 首页 api 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import { CreateBlogParam } from '../../types'
import { create } from '../../controller/blog-home'

const router = new Router({ prefix: '/api/blog' })
router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body as Omit<CreateBlogParam, 'userId'>
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

export default router
