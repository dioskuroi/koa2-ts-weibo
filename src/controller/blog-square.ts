/**
 * @description 广场 controller
 * @author 徐俊
 */

import { PAGE_SIZE } from '../config/constant'
import { SuccessModel } from '../models/ResModel';
import { BlogData } from '../types';
import { listCacheSquareBlog } from '../cache/blog';

/**
 * 获取广场页微博列表
 * @param pageIndex 页码
 */
export async function listSquareBlog(pageIndex: number): Promise<SuccessModel<BlogData>> {
  const { blogList, count } = await listCacheSquareBlog(pageIndex, PAGE_SIZE)
  return new SuccessModel<BlogData>({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count
  })
}
