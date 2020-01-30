/**
 * @description 用户关系 controller
 * @author 徐俊
 */

import { SuccessModel } from '../models/ResModel'
import { UserList } from '../types'
import { listUserByFollowerId, listFollowerByUserId } from '../services/user-relation'

/**
 * 获取粉丝列表
 * @param userId 用户id
 */
export async function listFans(userId: number): Promise<SuccessModel<UserList>> {
  const result = await listUserByFollowerId(userId)
  return new SuccessModel<UserList>(result)
}

export async function listFollower(userId: number): Promise<SuccessModel<UserList>> {
  const result = await listFollowerByUserId(userId)
  return new SuccessModel<UserList>(result)
}
