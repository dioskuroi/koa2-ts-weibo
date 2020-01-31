/**
 * @description blog 相关工具函数
 * @author 徐俊
 */

import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import { BlogResult } from '../types'

const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString()

interface GetBlogListStr {
  (blogList?: BlogResult[], canReply?: boolean): string
}

/**
 * 获取微博列表 html
 * @param blogList 微博列表数据
 * @param canReply 能否回复
 */
export const getBlogListStr: GetBlogListStr = function (blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

/**
 * 管道化工具函数
 * @param fns 管道化函数数组
 */
export function pipe<T, U = T>(...fns: Function[]): (arg: T) => U {
  return function (arg: T): U {
    return fns.reduce((prev, curr) => curr(prev), arg)
  }
}
