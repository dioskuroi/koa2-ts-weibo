"use strict";
/**
 * @description 环境变量
 * @author 徐俊
 */
exports.__esModule = true;
var env = process.env.NODE_ENV;
exports["default"] = {
    isDev: env === 'dev',
    notDev: env !== 'dev',
    isProd: env === 'production',
    notProd: env !== 'production',
    isTest: env === 'test',
    notTest: env !== 'test'
};
