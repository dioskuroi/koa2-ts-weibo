import { UserInfo } from './user'

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

export type BlogResult =
  CreateBlog & { createdAt: string, updatedAt: string, createAtFormat?: string, updateDAtFormat?: string, user: UserInfo }

export interface ListBlogResult {
  blogList: BlogResult[],
  count: number
}

export interface BlogData {
  isEmpty: boolean
  blogList: any[]
  pageSize: number
  pageIndex: number
  count: number
}
