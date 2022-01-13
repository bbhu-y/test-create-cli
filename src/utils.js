const path = require('path')
let chalk = require('chalk')

// 获取运行路径
const getCwdPath = (relPath) => {
  return path.resolve(process.cwd(), relPath)
}

//信息日志
const loggerInfo = (str) => {
  console.log(chalk.whiteBright(`[INFO]： ${str}`));
}

// 警告日志
const loggerWarring = (str) => {
  console.log(chalk.yellowBright(`[WARRING]： ${str}`));
}

// 成功日志
const loggerSuccess = (str) => {
  console.log(chalk.greenBright(`[SUCCESS]： ${str}`));
}

// 报错日志
const loggerError = (str) => {
  console.log(chalk.redBright(`[ERROR]： ${str}`));
}

module.exports = {
  getCwdPath,
  loggerInfo,
  loggerWarring,
  loggerSuccess,
  loggerError
}