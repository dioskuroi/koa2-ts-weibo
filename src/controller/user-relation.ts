/**
 * @description 用户关系 controller
 * @author 徐俊
 */

import { SuccessModel, ErrorModel } from '../models/ResModel'
import { UserList, ResModel } from '../types'
import { listUserByFollowerId, listFollowerByUserId, addFollow, deleteFollow } from '../services/user-relation'
import { addFollowFailInfo, deleteFollowFailInfo } from '../models/errorInfo'

/**
 * 获取粉丝列表
 * @param userId 用户id
 */
export async function listFans(userId: number): Promise<SuccessModel<UserList>> {
  const result = await listUserByFollowerId(userId)
  return new SuccessModel<UserList>(result)
}

/**
 * 获取关注人列表
 * @param userId 用户id
 */
export async function listFollower(userId: number): Promise<SuccessModel<UserList>> {
  const result = await listFollowerByUserId(userId)
  return new SuccessModel<UserList>(result)
}

/**
 * 关注
 * @param myUserId 当前用户id
 * @param curUserId 被关注用户id
 */
export async function follow(myUserId: number, curUserId: number): ResModel<void> {
  try {
    await addFollow(myUserId, curUserId)
    return new SuccessModel<void>()
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex)
    return new ErrorModel(addFollowFailInfo)
  }
}

/**
 * 取消关注
 * @param myUserId 当前用户id
 * @param curUserId 被关注用户id
 */
export async function unFollow(myUserId: number, curUserId: number): ResModel<void> {
  const result = await deleteFollow(myUserId, curUserId)
  return result ? new SuccessModel<void>() : new ErrorModel(deleteFollowFailInfo)
}
