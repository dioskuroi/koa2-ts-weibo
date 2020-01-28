/**
 * @description 微博类型定义
 * @author 徐俊
 */

export interface CreateBlog {
  id?: number
  userId: number
  content: string
  image?: string
}

export type CreateBlogParam = Omit<CreateBlog, 'id'>
