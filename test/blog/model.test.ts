/**
 * @description blog model test
 * @author 徐俊
 */

import '../../src/db/seq'
import { Blog } from '../../src/db/models';
import { CreateBlogParam } from 'src/types';

test('Blog 模型的各个属性，符合预期', () => {
  const blogData: CreateBlogParam = {
    userId: 1,
    content: 'test',
    image: '/test.png'
  }
  const result = Blog.build(blogData)
  expect(result.userId).toBe(blogData.userId)
  expect(result.content).toBe(blogData.content)
  expect(result.image).toBe(blogData.image)
})
