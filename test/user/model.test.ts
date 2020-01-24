/**
 * @description user model test
 * @author 徐俊
 */

import '../../src/db/seq'
import User from '../../src/db/models/user'
import { UserModelInterface } from 'src/types'

test('User 模型的各个属性，符合预期', () => {
  const userData: Partial<UserModelInterface> = {
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
    picture: '/xxx.png',
    city: '上海',
  }
  const user = User.build(userData)
  expect(user.userName).toBe(userData.userName)
  expect(user.password).toBe(userData.password)
  expect(user.nickName).toBe(userData.nickName)
  expect(user.picture).toBe(userData.picture)
  expect(user.city).toBe(userData.city)
  expect(user.gender).toBe(3)
})
