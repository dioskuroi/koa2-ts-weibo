/**
 * @description blog service
 * @author 徐俊
 */

import { CreateBlogParam, CreateBlog } from '../types';
import { Blog } from '../db/models';

/**
 * 创建微博
 * @param userId 用户ID
 * @param content 微博正文
 * @param image 图片地址
 */
export async function createBlog({ userId, content, image }: CreateBlogParam): Promise<CreateBlog> {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return {
    id: result.id,
    userId: result.userId,
    content: result.content,
    image: result.image
  }
}
