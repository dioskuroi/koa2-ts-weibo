/**
 * @description utils api 路由
 * @author 徐俊
 */

import Router from 'koa-router'
import koaForm from 'formidable-upload-koa'
import { loginCheck } from '../../middlewares/loginCheck'
import { isArray, isVoid } from '../../utils/type'
import { upload } from '../../controller/utils'

const router = new Router()

router.prefix('/api/utils')


interface File {
  name: string
  size: number
  type: string
  path: string
}


router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const req = ctx.req as any
  const file = req.files.file as File[] | File
  if (!isVoid(file) && !isArray(file)) {
    const { name, size, type, path } = file
    ctx.body = await upload({ name, size, type, filePath: path })
  }
})

export default router
