/**
 * 判断元素是否包含对应类名
 * @param {*} el 元素
 * @param {*} className 类名
 */
export function hasClass (el, className) {
  return el.classList.contains(className)
}

/**
 * 给元素添加对应类
 * @param {*} el 元素
 * @param {*} className 类名
 */
export function addClass (el, className) {
  el.classList.add(className)
}

/**
 * 能力检测
 * 对当前浏览器的能力判断
 */
let elementStyle = document.createElement('div').style

/**
 * 供应商
 * 返回当前引擎
 */
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform', // safari 苹果
    Moz: 'MozTransform', // 火狐
    O: 'OTransform',
    ms: 'msTransform', // IE
    standard: 'transform' // 标准
  }

  for (let key in transformNames) {
    // 获取供应商key
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 * 返回当前样式,当前引擎的兼容性写法
 * eg: prefixStyle(transform) => webkitTransform
 */
export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}