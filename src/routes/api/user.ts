/**
 * @description 用户 API 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import {
 isExist, register, login, deleteCurrentUser, changeInfo
} from '../../controller/user'
import { RegisterParam, LoginParam, ChangeParam } from '../../types'
import genValidator from '../../middlewares/validator'
import userValidate from '../../validator/user'
import { loginCheck } from '../../middlewares/loginCheck'
import ENV from '../../utils/env'
import { isVoid } from '../../utils/type'

const router = new Router()

router.prefix('/api/user')

interface IsExistParam {
  userName: string
}

// * 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body as IsExistParam
  ctx.body = await isExist(userName)
})

// * 注册
router.post(
  '/register',
  genValidator(userValidate),
  async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body as RegisterParam
    ctx.body = await register({ userName, password, gender })
  }
)

// * 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body as LoginParam
  ctx.body = await login(ctx, { userName, password })
})

// * 删除用户（测试用）
router.post('/delete', loginCheck, async (ctx, next) => {
  if (ENV.isTest) {
    // * 测试环境下，测试账号登录后，删除自己
    if (!isVoid(ctx.session) && !isVoid(ctx.session.userInfo)) {
      const { userName } = ctx.session.userInfo
      ctx.body = await deleteCurrentUser(userName)
    }
  }
})

// * 修改用户信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body as ChangeParam
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

export default router
