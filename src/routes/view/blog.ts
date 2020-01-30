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
  isMe?: boolean
}


interface IndexParam {
  blogData:BlogData,
  userData: UserData
}

router.get('/', loginRedirect, async (ctx, next) => {
  const indexParam: IndexParam = {
    blogData: {
      isEmpty: true,
      blogList: [],
      pageIndex: 0,
      pageSize: 0,
      count: 0
    },
    userData: {
      userInfo: ctx.session.userInfo,
      fansData: {
        count: 0,
        list: []
      },
      followersData: {
        count: 0,
        list: []
      }
    }
  }
  await ctx.render('index', indexParam)
})

interface ProfileParam {
  blogData?: BlogData,
  userData?: Partial<UserData>
}

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

  await ctx.render('profile', profileParam)
})

// * 广场页
router.get('/square', loginRedirect, async (ctx, next) => {
  const { data } = await listSquareBlog(0)
  await ctx.render('square', {
    blogData: data
  } as ProfileParam)
})

export default router
