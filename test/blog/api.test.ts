/**
 * @description blog api test
 * @author 徐俊
 */

import server from '../server'
import { cookie } from '../common'
import { CreateBlog } from '../../src/types'
import { SuccessModel } from '../../src/models/ResModel'

const blogData: CreateBlog = {
  userId: 1,
  content: 'test',
  image: '/test.png'
}

test('创建微博，应该成功', async () => {
  const result = await server.post('/api/blog/create').send(blogData).set('Cookie', cookie)
  const id = result.body.data.id
  expect(result.body).toEqual(new SuccessModel<CreateBlog>(Object.assign(blogData, { id })))
})
