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