/**
 * @description blog view 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import { loginRedirect } from '../../middlewares/loginCheck'
import { UserInfo } from 'src/types'

const router = new Router()

interface IndexParam {
  blogData: {
    blogList: any[]
  },
  userData: {
    userInfo: UserInfo,
    fansData: {
      count: number,
      list: any[]
    },
    followersData: {
      count: number,
      list: any[]
    }
  }
}

router.get('/', loginRedirect, async (ctx, next) => {
  const indexParam: IndexParam = {
    blogData: {
      blogList: []
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

export default router
