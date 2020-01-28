/**
 * @description 首页 controller
 * @author 徐俊
 */

import xss from 'xss'
import { ResModel, CreateBlog, CreateBlogParam } from '../types';
import { createBlog } from '../services/blog';
import { SuccessModel, ErrorModel } from '../models/ResModel';
import { createBlogFailInfo } from '../models/errorInfo';

/**
 * 创建微博
 * @param userId 用户ID
 * @param content 微博正文
 * @param image 图片地址
 */
export async function create({ userId, content, image }: CreateBlogParam): ResModel<CreateBlog> {
  try {
    const result = await createBlog({ userId, content: xss.filterXSS(content), image })
    return new SuccessModel<CreateBlog>(result)
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex)
    return new ErrorModel(createBlogFailInfo)
  }
}
