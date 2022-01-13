import { countWordLength } from 'edt-common'
import _ from 'lodash'

export function isPositiveNumber(value, maxLength = 2) {
  // return isPositiveNumber(value, maxLength) ? true: '请输入小数位不超过' + maxLength +  '位的数字';
  let validResult = matchRegex(value, new RegExp('^([1-9]\\d*|0)(\\.([0-9]{1,' + maxLength + '})?)?$'))

  //如果正则判断是否满足0.的话会难以维护
  if (parseFloat(value) === 0) {
    validResult = false
  }
  return validResult
}
export function isPositiveInt(value) {
  return matchRegex(value, /^[1-9]\d*$/)
}
export function gte(value, num = 0) {
  return _.isNil(value) || _.gte(value, num)
}
// 不填也通过验证，其他同gte
export function gte_EmptyStr(value, num = 0) {
  return value === '' || _.isNil(value) || _.gte(value, num)
}
export function lte(value, num = 100) {
  let validResult = _.isNil(value) || _.lte(value, num)
  return validResult
}
// 不填也通过验证，其他同lte
export function lte_EmptyStr(value, num = 100) {
  return value === '' || _.isNil(value) || _.lte(value, num)
}
export function arrayMaxLength(value, num = 10) {
  let validResult = _.isNil(value) || _.isEmpty(value)
  if (!validResult) {
    validResult = _.isArray(value) && value.length <= num
  }
  return validResult
}
export function arrayMinLength(value, num = 1) {
  let validResult = _.isNil(value) || _.isEmpty(value)
  if (!validResult) {
    validResult = _.isArray(value) && value.length >= num
  }
  return validResult
}
export function arrayLength(value, num = 10) {
  let validResult = _.isNil(value) || _.isEmpty(value)
  if (!validResult) {
    validResult = _.isArray(value) && value.length === num
  }
  return validResult
}
export function isNotEmpty(value) {
  return _.isNil(value) || !_.isEmpty(value)
}
export function isCorpEmails(value) {
  let pattern = /^(?:([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@corp\.netease\.com(;?$|;))*$/
  return matchRegex(value, pattern);
}
export function isCorpEmail(value) {
  let pattern = /^[A-Za-z0-9_\-\.\u4e00-\u9fa5]+\@corp\.netease\.com$/
  return matchRegex(value, pattern);
}
export function isMesgCorpEmail(value) {
  let pattern = /^[A-Za-z0-9_\-\.\u4e00-\u9fa5]+\@mesg\.corp\.netease\.com$/
  return matchRegex(value, pattern);
}
export function isHttpUrl(value) {
  // 顶级域名：至少一位以上的字母组合
  return matchRegex(value, /^(?:https?:)\/\/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})*(\.[a-zA-Z]{1,62}))((?=\/)\S*)?$/i)
}
export function isAndroidUrl(value) {
  // 只检查.apk
  return matchRegex(value, /\.apk/)
}
export function isIosUrl(value) {
  // 只检查域名
  return matchRegex(value, /itunes\.apple\.com/) || matchRegex(value, /apps\.apple\.com/)
}
export function isDomainName(value) {
  return matchRegex(value, /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/)
}
export function characterLimit(value, limit = 0) {
  let validResult
  if (_.isNil(value)) {
    validResult = true
  } else {
    let length = countWordLength(value)
    validResult = length <= limit
  }
  return validResult
}
export function characterRange(value, [min = 0, max = 100]) {
  let validResult
  if (_.isNil(value)) {
    validResult = true
  } else {
    let length = countWordLength(value)
    validResult = length >= min && length <= max
  }
  return validResult
}
export function characterLengthRange (value, [min = 0, max = 100]) {
  let validResult
  if (_.isNil(value)) {
    validResult = true
  } else {
    let length = _.get(value, 'length', 0)
    validResult = length >= min && length <= max
  }
  return validResult
}
export function customRegexp(value, regexp) {
  return matchRegex(value, regexp)
}

function matchRegex(value, regexp) {
  return !value || regexp.test(value)
}
