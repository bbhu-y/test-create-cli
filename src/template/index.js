let path = require('path')
let fs = require('fs')
let inquirer = require('inquirer')
let handlebars = require('handlebars')
let {loggerError, loggerInfo, loggerSuccess, getCwdPath} = require('../utils')
const chalk = require('chalk')

/**
 * 复制模板文件
 */
function copyTemplate(filename, meta) {
  const template = (meta.template || '').split('：')[0]
  const tempFile = templatesMap[template] && templatesMap[template].fileName
  let desPath = path.join(__dirname, `../template/${tempFile}`)
  copyDir(desPath, filename, meta)
}

/**
 * 用户交互
 */
function createQuestion() {
  const templateChoices = Object.keys(templatesMap).map(key => {
    return key + `：${templatesMap[key].description}`
  })
  const questions = [{
    type: 'list',
    name: 'template',
    message: 'please pick a tepmplate：',
    choices: templateChoices
  },{
    type: 'input',
    name: 'name',
    message: 'project name：',
    validate: function (value) {
      let pass = value.match(/\w+/);
      if (pass) {
        return true
      }
      return '请输入正确的文件名称(数字文字下划线)'
    }
  }, {
    type: 'input',
    name: 'description',
    message: 'project description：'
  }, {
    type: 'input',
    name: 'title',
    message: 'project title：'
  }, {
    type: 'input',
    name: 'author',
    message: 'project author：'
  }]
  return inquirer.prompt(questions)
}

/**
  * 复制
  * @param src
  * @param dist

  * @param callback
  */
function copyDir(src, dist, meta, callback) {
  fs.access(dist, (err) => {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist, {
        recursive: true
      })
    }
    _copy(null, src, dist)
  })

  const _copy = (err, src, dist) => {
    if (err) {
      callback(err)
    } else {
      let dir = fs.readdirSync(src, 'utf-8')
      for (let j of dir) {
        let _src = src + '/' + j
        let _dist = dist + '/' + j
        let stat = fs.statSync(_src)
        if (stat.isDirectory()) {
          copyDir(_src, _dist, meta, callback)
        } else {
          let file = fs.readFileSync(_src, {
            encoding: 'utf-8'
          })
          if(!!_src && _src.indexOf('package.json') > -1){
            file = handlebars.compile(file.toString())(meta)
          }
          fs.writeFileSync(_dist, file)
        }
      }
    }
  }
}

function init (projectName) {
  if(!projectName) {
    loggerError('请在命令后输入文件名称')
  }else if(!!projectName && fs.existsSync(projectName)){
    loggerError(projectName+'项目已存在')
  }else{
    console.log('\n')
    console.log('>edt-create-app  init')
    console.log('\n')
    createQuestion().then((res) => {
      console.log('\n')
      loggerInfo('creating project in '+chalk.yellowBright(getCwdPath(projectName)))
      copyTemplate(projectName, res)
      console.log('\n')
      loggerInfo('Successfully create project ' + chalk.yellowBright(projectName))
      loggerInfo('Get started with the following commands:')
      console.log('\n')
      console.log(chalk.blueBright('    $ cd ' + projectName))
      console.log(chalk.blueBright('    $ npm install'))
      console.log(chalk.blueBright('    $ npm run start'))
      console.log('\n')
    })
  }
}


const templatesMap = {
  "default-temp":{
    fileName: 'defaultTemp',
    description: 'react16、webpack4',
  },
  "template1": {
    fileName: 'temp1',
    description: 'react16、webpack4、edt-webpack'
  }
}

module.exports = {
  init
}
