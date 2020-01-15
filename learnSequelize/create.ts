import User from './model/model'

!(async function () {
  const zhangsan = new User({ userName: 'zhangsan', password: '123', nickName: '张三' })
  const userRes = await zhangsan.save()
  // eslint-disable-next-line no-console
  console.log(userRes)
}())
