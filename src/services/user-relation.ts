/**
 * @description 用户关系 service
 * @author 徐俊
 */

import { UserRelation, User } from '../db/models'
import { UserList } from '../types'
import { formatUserInfo } from './helpers/_format'

/**
 * 根据被关注用户id获取粉丝列表
 * @param followerId 被关注用户id
 */
export async function listUserByFollowerId(followerId: number): Promise<UserList> {
  const { rows, count } = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        as: 'userRelations',
        where: {
          followerId
        }
      }
    ]
  })

  const list = rows.map(row => formatUserInfo({
    id: row.id,
    userName: row.userName,
    nickName: row.nickName,
    picture: row.picture
  }))

  return {
    list,
    count
  }
}

/**
 * 根据当前用户id获取关注人列表
 * @param userId 当前用户id
 */
export async function listFollowerByUserId(userId: number): Promise<UserList> {
  const { rows, count } = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId
    }
  })

  const list = rows.map(row => formatUserInfo({
    id: row.user.id,
    userName: row.user.userName,
    nickName: row.user.nickName,
    picture: row.user.picture
  }))

  return {
    list,
    count
  }
}
