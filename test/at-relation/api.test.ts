/**
 * @description at-relation api test
 * @author 徐俊
 */

import server from '../server'
import { Z_COOKIE, L_COOKIE, L_USER_NAME } from '../common'
import ResCode from '../../src/models/resCode'

let blogId

test('张三发表微博，@李四，应该成功', async () => {
  const content = `unit test @lisi - ${L_USER_NAME}`
  const { body } = await server.post('/api/blog/create').send({ content }).set('Cookie', Z_COOKIE)
  blogId = body.data.id
  expect(body.errno).toBe(ResCode.ERR_OK)
})

test('获取李四 @ 列表，应该有张三的微博', async () => {
  const { body } = await server.get('/api/atMe/loadMore/0').set('Cookie', L_COOKIE)
  expect(body.errno).toBe(ResCode.ERR_OK)
  expect(body.data.blogList.some(blog => blog.id === blogId)).toBeTruthy()
})
