/**
 * @description 用户关系 api test
 * @author 徐俊
 */

import server from '../server'
import { Z_COOKIE, Z_USER_NAME, Z_ID, L_ID, L_USER_NAME } from '../common'
import { listFans, listFollower } from '../../src/controller/user-relation'
import { SuccessModel } from '../../src/models/ResModel'
import ResCode from '../../src/models/resCode'

test('无论怎样，张三先取消关注李四', async () => {
  const result = await server.post('/api/profile/unFollow').send({ userId: L_ID }).set('Cookie', Z_COOKIE)
  expect(1).toBe(1)
})

test('张三关注李四，应该成功', async () => {
  const result = await server.post('/api/profile/follow').send({ userId: L_ID }).set('Cookie', Z_COOKIE)
  expect(result.body).toEqual(new SuccessModel<void>())
})

test('张三获取关注人列表，应该有李四', async () => {
  const { data, errno } = await listFollower(Z_ID)
  expect(errno).toBe(ResCode.ERR_OK)
  expect(data.count).toBeGreaterThan(0)
  expect(data.list.some(user => user.userName === L_USER_NAME)).toBeTruthy()
})

test('获取张三的At列表，应该有李四', async () => {
  const result = await server.get('/api/user/getAtList').set('Cookie', Z_COOKIE)
  const list = result.body
  expect(list.some(str => str.indexOf(`- ${L_USER_NAME}`) > 0)).toBeTruthy()
})

test('李四获取粉丝立标，应该有张三', async () => {
  const { data, errno } = await listFans(L_ID)
  expect(errno).toBe(ResCode.ERR_OK)
  expect(data.count).toBeGreaterThan(0)
  expect(data.list.some(user => user.userName === Z_USER_NAME)).toBeTruthy()
})

test('张三取关李四，应该成功', async () => {
  const result = await server.post('/api/profile/unFollow').send({ userId: L_ID }).set('Cookie', Z_COOKIE)
  expect(result.body).toEqual(new SuccessModel<void>())
})

test('取关后，张三的关注人列表中，应该没有李四', async () => {
  const { data, errno } = await listFollower(Z_ID)
  expect(errno).toBe(ResCode.ERR_OK)
  expect(data.list.every(user => user.userName !== L_USER_NAME)).toBeTruthy()
})
