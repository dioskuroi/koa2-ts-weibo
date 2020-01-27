import { ResModel } from '../types';

/**
 * @description utils controller
 * @author 徐俊
 */

import path from 'path'
import { pathExists, remove, move, ensureDir } from 'fs-extra'
import { ErrorModel, SuccessModel } from '../models/ResModel';
import { uploadFileSizeFailInfo } from '../models/errorInfo';

// * 最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// * 打包路径
const DIST_FILE_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

pathExists(DIST_FILE_PATH).then(exist => {
  if (exist) return
  ensureDir(DIST_FILE_PATH)
})

interface UploadParam {
  name: string
  type: string,
  size: number,
  filePath: string
}


interface UploadRes {
  url: string
}

/**
 * 上传
 * @param name 文件名
 * @param type 文件类型
 * @param size 文件大小
 * @param filePath 文件路径
 */
export async function upload({ name, type, size, filePath }: UploadParam): ResModel<UploadRes> {
  if (size > MAX_SIZE) {
    await remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  const fileName = `${Date.now()}.${name}`
  const distFilePath = path.join(DIST_FILE_PATH, fileName)
  await move(filePath, distFilePath)
  return new SuccessModel<UploadRes>({ url: `/${fileName}` })
}
