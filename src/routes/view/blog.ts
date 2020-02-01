/**
 * @description blog view 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginRedirect } from '../../middlewares/loginCheck'
import { UserInfo, BlogData } from '../../types'
import { listProfileBlog } from '../../controller/blog-profile'
import { isExist } from '../../controller/user'
import { isVoid } from '../../utils/type'
import { listSquareBlog } from '../../controller/blog-square'
import { listFans, listFollower } from '../../controller/user-relation'
import { listHomeBlog } from '../../controller/blog-home'
import { getAtMeCount, listAtMeBlog, markAsRead } from '../../controller/at-relation'

const router = new Router()


interface UserData {
  userInfo: UserInfo,
  fansData: {
    count: number,
    list: any[]
  },
  followersData: {
    count: number,
    list: any[]
  },
  amIFollowed?: boolean,
  isMe?: boolean,
  atCount?: number
}


interface IndexParam {
  blogData:BlogData,
  userData: UserData,
}

// * 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo

  // * 获取粉丝列表
  const { data: fansData } = await listFans(userInfo.id)

  // * 获取关注人列表
  const { data: followersData } = await listFollower(userInfo.id)

  // * 获取首页微博列表
  const { data: blogData } = await listHomeBlog(userInfo.id, 0)

  // * 获取 at 数量
  const result = await getAtMeCount(userInfo.id)
  const { atCount } = result.data

  const indexParam: IndexParam = {
    blogData,
    userData: {
      userInfo,
      fansData,
      followersData,
      atCount
    },
  }
  await ctx.render('index', indexParam)
})

interface ProfileParam {
  blogData?: BlogData,
  userData?: Partial<UserData>
}

// * 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const profileParam: ProfileParam = {
    userData: {}
  }
  let curUserInfo: UserInfo
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  const { userName: curUserName } = ctx.params as { userName: string }
  const isMe = myUserName === curUserName
  profileParam.userData.isMe = isMe
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const result = await isExist(curUserName)
    if (isVoid(result.data)) return
    curUserInfo = result.data
  }
  profileParam.userData.userInfo = curUserInfo

  // * 获取个人主页 微博列表
  const { data } = await listProfileBlog(curUserInfo.userName, 0)
  profileParam.blogData = data

  // * 获取粉丝列表
  const { data: fansData } = await listFans(curUserInfo.id)
  profileParam.userData.fansData = fansData

  // * 是否关注
  profileParam.userData.amIFollowed = fansData.list.some(fan => fan.userName === myUserName)

  // * 获取关注人列表
  const { data: followersData } = await listFollower(curUserInfo.id)
  profileParam.userData.followersData = followersData

  // * 获取 at 数量
  const { data: { atCount } } = await getAtMeCount(myUserInfo.id)
  profileParam.userData.atCount = atCount

  await ctx.render('profile', profileParam)
})

// * 广场页
router.get('/square', loginRedirect, async (ctx, next) => {
  const { data } = await listSquareBlog(0)
  await ctx.render('square', {
    blogData: data
  } as ProfileParam)
})

interface AtMeParam {
  blogData: BlogData,
  atCount: number,
  UserData: {
    userInfo: UserInfo
  }
}

// * at-me 页
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  // * 获取 at 数量
  const { data: { atCount } } = await getAtMeCount(userInfo.id)

  const { data: blogData } = await listAtMeBlog(userInfo.id, 0)

  const atMeParam: AtMeParam = {
    blogData,
    atCount,
    UserData: {
      userInfo
    }
  }
  await ctx.render('atMe', atMeParam)
  // * 标记已读
  if (atCount > 0) {
    await markAsRead(userInfo.id)
  }
})

export default router
