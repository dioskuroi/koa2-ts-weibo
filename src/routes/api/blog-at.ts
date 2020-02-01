/**
 * @description at 关系 api 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import { listAtMeBlog } from '../../controller/at-relation'
import { getBlogListStr } from '../../utils/blog'

const router = new Router({ prefix: '/api/atMe' })

// * 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const { id } = ctx.session.userInfo
  const { pageIndex: pageIndexStr } = ctx.params as { pageIndex: string }
  const pageIndex = parseInt(pageIndexStr, 10)
  const result = await listAtMeBlog(id, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList, true)
  ctx.body = result
})

export default router
