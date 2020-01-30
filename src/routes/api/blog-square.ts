/**
 * @description 广场 api 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import { listSquareBlog } from '../../controller/blog-square'
import { getBlogListStr } from '../../utils/blog'

const router = new Router({ prefix: '/api/square' })

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const { pageIndex: pageIndexStr } = ctx.params as { pageIndex: string }
  const pageIndex = parseInt(pageIndexStr, 10)
  const result = await listSquareBlog(pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList, false)
  ctx.body = result
})

export default router
