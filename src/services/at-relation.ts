/**
 * @description @ 关系 service
 * @author 徐俊
 */

import { AtRelation, Blog, User } from '../db/models'
import { formatUserInfo, formatBlogData } from './helpers/_format'
import { ListBlogResult } from '../types'

/**
 * 创建 at 关系
 * @param userId 用户id
 * @param blogId 微博id
 */
export async function createAtRelation(userId: number, blogId: number): Promise<AtRelation> {
  const result = await AtRelation.create({
    userId,
    blogId
  })

  return result
}

/**
 * 获取用户 at 数量
 * @param userId 用户id
 */
export async function getAtUserCount(userId: number): Promise<number> {
  const result = await AtRelation.count({
    where: {
      userId,
      isRead: false
    }
  })

  return result
}

interface ListAtRelationParam {
  userId: number
  pageIndex: number
  pageSize: number
}

/**
 * 获取 at 微博列表
 * @param userId 用户id
 * @param pageIndex 页码
 * @param pageSize 每页条数
 */
export async function listAtRelationBlog({ userId, pageIndex, pageSize }: ListAtRelationParam): Promise<ListBlogResult> {
  const { rows, count } = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        as: 'atRelation',
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        as: 'user',
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  const blogList = rows.map(row => {
    row.user = formatUserInfo(row.user)
    return formatBlogData({
      id: row.id,
      userId: row.userId,
      content: row.content,
      image: row.image,
      user: row.user,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    })
  })

  return {
    blogList,
    count
  }
}
