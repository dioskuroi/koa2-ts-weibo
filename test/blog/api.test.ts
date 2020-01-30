/**
 * @description blog api test
 * @author 徐俊
 */

import server from '../server'
import { Z_COOKIE, Z_USER_NAME } from '../common'
import { CreateBlog } from '../../src/types'
import { SuccessModel } from '../../src/models/ResModel'
import resCode from '../../src/models/resCode'

const blogData: CreateBlog = {
  userId: 1,
  content: 'test',
  image: '/test.png'
}

test('创建微博，应该成功', async () => {
  const result = await server.post('/api/blog/create').send(blogData).set('Cookie', Z_COOKIE)
  const id = result.body.data.id
  expect(result.body).toEqual(new SuccessModel<CreateBlog>(Object.assign(blogData, { id })))
})

test('获取个人主页微博列表，应该成功', async () => {
  const result = await server.get(`/api/profile/loadMore/${Z_USER_NAME}/0`).set('Cookie', Z_COOKIE)
  expect(result.body.errno).toEqual(resCode.ERR_OK)
  expect(result.body.data).toHaveProperty('isEmpty')
  expect(result.body.data).toHaveProperty('blogList')
  expect(result.body.data).toHaveProperty('pageSize')
  expect(result.body.data).toHaveProperty('pageIndex')
  expect(result.body.data).toHaveProperty('count')
  expect(result.body.data).toHaveProperty('blogListTpl')
})

test('获取广场页微博列表，应该成功', async () => {
  const result = await server.get('/api/square/loadMore/0').set('Cookie', Z_COOKIE)
  expect(result.body.errno).toEqual(resCode.ERR_OK)
  expect(result.body.data).toHaveProperty('isEmpty')
  expect(result.body.data).toHaveProperty('blogList')
  expect(result.body.data).toHaveProperty('pageSize')
  expect(result.body.data).toHaveProperty('pageIndex')
  expect(result.body.data).toHaveProperty('count')
  expect(result.body.data).toHaveProperty('blogListTpl')
})
