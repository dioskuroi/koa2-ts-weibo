/**
 * @description 首页 api 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import { CreateBlogParam } from '../../types'
import { create, listHomeBlog } from '../../controller/blog-home'
import genValidator from '../../middlewares/validator'
import blogValidate from '../../validator/blog'
import { getBlogListStr } from '../../utils/blog'

const router = new Router({ prefix: '/api/blog' })

// * 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body as Omit<CreateBlogParam, 'userId'>
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

// * 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const { id } = ctx.session.userInfo
  const { pageIndex: pageIndexStr } = ctx.params as { pageIndex: string }
  const pageIndex = parseInt(pageIndexStr, 10)
  const result = await listHomeBlog(id, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList, true)
  ctx.body = result
})

export default router
