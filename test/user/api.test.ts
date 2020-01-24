/**
 * @description user api test
 * @author 徐俊
 */

import server from '../server'
import { SuccessModel, ErrorModel } from '../../src/models/ResModel'
import {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  validateJsonSchemaFailInfo,
  loginFailInfo,
  loginCheckFailInfo,
} from '../../src/models/errorInfo'
import { RegisterParam } from '../../src/types'

// * 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser: RegisterParam = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// * 存储 cookie
let COOKIE = ''

test('注册用户，应该成功', async () => {
  const result = await server.post('/api/user/register').send(testUser)
  expect(result.body).toEqual(new SuccessModel<void>())
})

test('重复注册，应该失败，报用户名已存在', async () => {
  const result = await server.post('/api/user/register').send(testUser)
  expect(result.body).toEqual(new ErrorModel(registerUserNameExistInfo))
})

test('json schema 校验，应该失败', async () => {
  const notValidUser: RegisterParam = {
    userName,
    password: '12',
    gender: 3
  }
  const result = await server.post('/api/user/register').send(notValidUser)
  expect(result.body).toEqual(new ErrorModel(validateJsonSchemaFailInfo))
})

test('查询注册的用户名，应该存在', async () => {
  const result = await server.post('/api/user/isExist').send({ userName })
  expect(result.body.errno).toBe(0)
})

test('查询注册的用户名，应该不存在', async () => {
  const result = await server.post('/api/user/isExist').send({ userName: `u_temp_${Date.now()}` })
  expect(result.body).toEqual(new ErrorModel(registerUserNameNotExistInfo))
})

test('错误用户名登录，应该失败', async () => {
  const result = await server.post('/api/user/login').send({ userName: `u_temp_${Date.now()}`, password })
  expect(result.body).toEqual(new ErrorModel(loginFailInfo))
})

test('错误密码登录，应该失败', async () => {
  const result = await server.post('/api/user/login').send({ userName, password: `p_temp_${Date.now()}` })
  expect(result.body).toEqual(new ErrorModel(loginFailInfo))
})

test('用户登录，应该成功', async () => {
  const result = await server.post('/api/user/login').send({ userName, password })
  expect(result.body).toEqual(new SuccessModel<void>())
  COOKIE = result.header['set-cookie'].join(';')
})

test('没有登录时删除用户，应该失败', async () => {
  const result = await server.post('/api/user/delete')
  expect(result.body).toEqual(new ErrorModel(loginCheckFailInfo))
})

test('登录后删除用户，应该成功', async () => {
  const result = await server.post('/api/user/delete').set('Cookie', COOKIE)
  expect(result.body).toEqual(new SuccessModel<void>())
})

test('删除后，再次查询该注册用户，应该不存在', async () => {
  const result = await server.post('/api/user/isExist').send({ userName })
  expect(result.body).toEqual(new ErrorModel(registerUserNameNotExistInfo))
})
