/**
 * @description @ 关系 controller
 * @author 徐俊
 */

import { getAtUserCount, listAtRelationBlog } from '../services/at-relation';
import { SuccessModel } from '../models/ResModel';
import { BlogData } from '../types';
import { PAGE_SIZE } from '../config/constant';

interface AtCount {
  atCount: number
}

/**
 * 获取当前用户 at 数量
 * @param userId 当前用户id
 */
export async function getAtMeCount(userId: number): Promise<SuccessModel<AtCount>> {
  const result = await getAtUserCount(userId)
  return new SuccessModel<AtCount>({
    atCount: result
  })
}

/**
 * 获取当前用户 at 微博列表
 * @param userId 用户id
 * @param pageIndex 页码
 */
export async function listAtMeBlog(userId: number, pageIndex: number): Promise<SuccessModel<BlogData>> {
  const { blogList, count } = await listAtRelationBlog({ userId, pageIndex, pageSize: PAGE_SIZE })
  return new SuccessModel<BlogData>({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count
  })
}
