/**
 * @description at-relation model test
 * @author 徐俊
 */

import '../../src/db/seq'
import { AtRelation } from '../../src/db/models'

test('AtRelation 模型的各个属性，符合预期', () => {
  const result = AtRelation.build({
    userId: 1,
    blogId: 1
  })
  expect(result.userId).toBe(1)
  expect(result.blogId).toBe(1)
  expect(result.isRead).toBe(false)
})
