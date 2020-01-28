import { CreateBlogParam, CreateBlog } from '../types';
import { Blog } from '../db/models';

/**
 * @description blog service
 * @author 徐俊
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
