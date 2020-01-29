/**
 * @description blog view 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginRedirect } from '../../middlewares/loginCheck'
import { UserInfo } from 'src/types'

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
  amIFollowed?: boolean
}

interface BlogData {
  isEmpty: boolean,
  blogList: any[],
  pageSize: number,
  pageIndex: number,
  count: number
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
  blogData: BlogData,
  userData: UserData
}

router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const ProfileParam: ProfileParam = {
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
      },
      amIFollowed: false
    },
  }
  await ctx.render('profile', ProfileParam)
})

export default router
