/**
 * @description 个人主页 api 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import { listProfileBlog } from '../../controller/blog-profile'
import { getBlogListStr } from '../../utils/blog'
import { follow, unFollow } from '../../controller/user-relation'

const router = new Router({ prefix: '/api/profile' })

// * 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  const { userName, pageIndex: pageIndexStr } = ctx.params as { userName: string, pageIndex: string }
  const pageIndex = parseInt(pageIndexStr, 10)

  const result = await listProfileBlog(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList, false)
  ctx.body = result
})

interface FollowParam {
  userId: number
}

// * 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body as FollowParam
  ctx.body = await follow(myUserId, curUserId)
})

// * 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body as FollowParam
  ctx.body = await unFollow(myUserId, curUserId)
})

export default router
