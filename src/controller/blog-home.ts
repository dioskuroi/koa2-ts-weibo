/**
 * @description 首页 controller
 * @author 徐俊
 */

import xss from 'xss'
import { ResModel, CreateBlog, CreateBlogParam, BlogData } from '../types';
import { createBlog, listFollowerBlogByUserId } from '../services/blog';
import { SuccessModel, ErrorModel } from '../models/ResModel';
import { createBlogFailInfo } from '../models/errorInfo';
import { PAGE_SIZE, REG_FOR_AT_WHO } from '../config/constant';
import { getUserInfo } from '../services/user';
import { createAtRelation } from '../services/at-relation';

/**
 * 创建微博
 * @param userId 用户ID
 * @param content 微博正文
 * @param image 图片地址
 */
export async function create({ userId, content, image }: CreateBlogParam): ResModel<CreateBlog> {
  // * 获取 @ 用户id
  const atUserNameList: string[] = []
  content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName)
    return matchStr
  })
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)))
  const atUserIdList: number[] = atUserList.map(user => user.id)

  try {
    const result = await createBlog({ userId, content: xss.filterXSS(content), image })
    // * 创建 @ 关系
    await Promise.all(atUserIdList.map(atUserId => createAtRelation(atUserId, result.id)))
    return new SuccessModel<CreateBlog>(result)
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博立标
 * @param userId 用户id
 * @param pageIndex 页码
 */
export async function listHomeBlog(userId: number, pageIndex: number): Promise<SuccessModel<BlogData>> {
  const { blogList, count } = await listFollowerBlogByUserId({ curUserId: userId, pageIndex, pageSize: PAGE_SIZE })
  return new SuccessModel<BlogData>({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count
  })
}
