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
    userData: {
      fansData: {
        list: [],
        count: 0
      },
      followersData: {
        list: [],
        count: 0
      },
      amIFollowed: false
    }
  }
  let curUserInfo: UserInfo
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  const { userName: curUserName } = ctx.params as { userName: string }
  const isMe = myUserName === curUserName
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const result = await isExist(curUserName)
    if (isVoid(result.data)) return
    curUserInfo = result.data
  }
  profileParam.userData.userInfo = curUserInfo

  const { data } = await listProfileBlog(curUserInfo.userName, 0)
  profileParam.blogData = data

  await ctx.render('profile', profileParam)
})

export default router
