/**
 * @description 日期相关工具函数
 * @author 徐俊
 */

import { format } from 'date-fns'

/**
 * 格式化时间
 * @param str 时间字符串
 */
export function formatTime(str: string): string {
  return format(new Date(str), 'MM.dd HH:mm')
}
