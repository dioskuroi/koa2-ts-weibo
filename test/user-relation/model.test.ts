/**
 * @description 用户关系 model test
 * @author 徐俊
 */

import '../../src/db/seq'
import { UserRelation } from '../../src/db/models'

test('UserRelation 模型的各个属性，符合预期', () => {
  const result = UserRelation.build({
    userId: 1,
    followerId: 2
  })
  expect(result.userId).toBe(1)
  expect(result.followerId).toBe(2)
})
