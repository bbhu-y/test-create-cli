import { addValidationRule } from 'edt-formsy'
import * as validations from 'utils/validations'
import _ from 'lodash'

let validationRules = {
  isPositiveNumber: function (values, value, maxLength = 2) {
    const validResult = validations.isPositiveNumber(value, maxLength)
    return !validResult ? ('请输入大于0的数字，小数位最多为' + maxLength + '位') : true
  },
  isPositiveInt: function(values, value) {
    let validResult = validations.isPositiveInt(value)
    return !validResult ? ('请输入大于0的整数') : true;
  },
  gte: function (values, value, num = 0) {
    let validResult = validations.gte(value, num)
    return !validResult ? ('请输入大于等于' + num + '的数字') : true
  },
  gte_EmptyStr: function (values, value, num = 0) {
    let validResult = validations.gte_EmptyStr(value, num)
    return !validResult ? ('请输入大于' + num + '的数字') : true
  },
  lte: function (values, value, num = 100) {
    let validResult = validations.lte(value, num)
    return !validResult ? ('请输入小于等于' + num + '的数字') : true
  },
  lte_EmptyStr: function (values, value, num = 100) {
    let validResult = validations.lte_EmptyStr(value, num)
    return !validResult ? ('请输入小于等于' + num + '的数字') : true
  },
  arrayMaxLength: function (values, value, num = 10) {
    let validResult = validations.arrayMaxLength(value, num)
    return !validResult ? ('最多' + num + '项') : true
  },
  arrayMinLength: function (values, value, num = 1) {
    let validResult = validations.arrayMinLength(value, num)
    return !validResult ? ('最少需' + num + '项') : true
  },
  arrayLength: function (values, value, num = 10) {
    let validResult = validations.arrayLength(value, num)
    return !validResult ? ('请选择' + num + '项') : true
  },
  isNotEmpty: function (values, value) {
    let validResult = validations.isNotEmpty(value)
    return !validResult ? '必填项不能为空' : true
  },
  isCorpEmails: function (values, value) {
    let validResult = validations.isCorpEmails(value)
    return !validResult ? '输入corp邮箱，以英文分号";"分割' : true
  },
  isCorpEmail: function (values, value) {
    let validResult = validations.isCorpEmail(value)
    return !validResult ? '输入正确的corp邮箱' : true
  },
  isHttpUrl: function isHttpUrl(values, value) {
    let validResult = validations.isHttpUrl(value)
    return !validResult ? '输入正确的网址' : true
  },
  isDomainName: function isDomainName(values, value) {
    let validResult = validations.isDomainName(value)
    return !validResult ? '输入格式正确的域名' : true
  },
  customRegexp: function customRegexp(values, value, params) {
    let validResult = validations.customRegexp(value, params.regexp)
    return !validResult ? params.errorMsg : true
  },
  customValidateFun: function customValidateFun(values, value, params) {
    const { validateFun, ...otherParams } = params
    const { validResult, errorMsg } = validateFun(values, value, otherParams)
    return !validResult ? errorMsg : true
  },
  characterLimit: function (values, value, limit = 0) {
    let validResult = validations.characterLimit(value, limit)
    return !validResult ? `字符数不能超过${limit}个` : true
  },
  characterRange: function (values, value, [min = 0, max = 100]) {
    let validResult = validations.characterRange(value, [min, max])
    return !validResult ? `请输入${min} - ${max}个字符，中文占两个字符` : true
  },
  characterLengthRange: function (values, value, [min = 0, max = 100]) {
    let validResult = validations.characterLengthRange(value, [min, max])
    return !validResult ? `请输入${min} - ${max}个字符，中文占1个字符` : true
  }
}

_.forEach(validationRules, (ruleFunc, ruleName) => {
  addValidationRule(ruleName, ruleFunc)
})
