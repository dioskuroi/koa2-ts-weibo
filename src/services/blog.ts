/**
 * @description blog service
 * @author 徐俊
 */

import { CreateBlogParam, CreateBlog, ListBlogResult, StringIndexObj } from '../types';
import { Blog, User, UserRelation } from '../db/models';
import { isVoid } from '../utils/type';
import { formatUserInfo, formatBlogData } from './helpers/_format';

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

interface ListBlogParam {
  curUserName?: string
  pageIndex: number
  pageSize: number
}

interface UserWhereOpt extends StringIndexObj {
  userName?: string
}

/**
 * 根据用户名查询个人主页微博列表
 * @param curUsername 当前用户名
 * @param pageIndex 页码
 * @param pageSize 每页条数
 */
export async function listProfileBlogByUser({ curUserName, pageIndex, pageSize }: ListBlogParam): Promise<ListBlogResult> {
  const userWhereOpt: UserWhereOpt = {}

  if (!isVoid(curUserName)) {
    userWhereOpt.userName = curUserName
  }
  const { rows, count } = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpt
      }
    ]
  })
  const blogList = rows.map(row => {
    const { user: tempUser, id, userId, content, image, createdAt, updatedAt } = row
    const { userName, nickName, picture } = tempUser
    const user = formatUserInfo({ userName, nickName, picture })
    return formatBlogData({
      id,
      userId,
      content,
      image,
      createdAt,
      updatedAt,
      user
    })
  })

  return {
    blogList,
    count
  }
}

interface ListFollowerBlogParam {
  curUserId: number
  pageIndex: number
  pageSize: number
}

/**
 * 获取关注人微博列表（首页）
 * @param curUserId 当前用户id
 * @param pageIndex 页码
 * @param pageSize 每页条数
 */
export async function listFollowerBlogByUserId({ curUserId, pageIndex, pageSize }: ListFollowerBlogParam): Promise<ListBlogResult> {
  const { rows, count } = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        as: 'userRelation',
        attributes: ['userId', 'followerId'],
        where: {
          userId: curUserId
        }
      }
    ]
  })

  const blogList = rows.map(row => {
    const { user: tempUser, id, userId, content, image, createdAt, updatedAt } = row
    const { userName, nickName, picture } = tempUser
    const user = formatUserInfo({ userName, nickName, picture })
    return formatBlogData({
      id,
      userId,
      content,
      image,
      createdAt,
      updatedAt,
      user
    })
  })

  return {
    blogList,
    count
  }
}
