#!/usr/bin/env node

var program = require('commander')
const config = require('../../package.json')
const {init} = require('../template')
const {loggerError} = require('../utils')

const createCommand = {
  version:config.version,
  description: 'create app',
  command: 'create',
  action: () => {
    try{
      const arguments  = process.argv.splice(2)
      init(...arguments)
    }catch(error) {
      loggerError(error)
    }
  }
}

const { version, description, command, action } = createCommand

program
  .version(version)
  .command(command)
  .description(description)
  .action((value) => {
    action(value)
  })
  .parse(process.argv)
