/**
 * @description 个人主页 controller
 * @author 徐俊
 */

import { BlogData } from '../types';
import { listProfileBlogByUser } from '../services/blog';
import { PAGE_SIZE } from '../config/constant';
import { SuccessModel } from '../models/ResModel';

/**
 * 获取个人主页微博列表
 * @param userName 用户名
 * @param pageIndex 页码
 */
export async function listProfileBlog(userName: string, pageIndex: number): Promise<SuccessModel<BlogData>> {
  const { blogList, count } = await listProfileBlogByUser({ curUserName: userName, pageIndex, pageSize: PAGE_SIZE })
  return new SuccessModel<BlogData>({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}
