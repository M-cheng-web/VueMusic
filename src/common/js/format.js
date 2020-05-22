/**
 * 补齐位数
 * 如果有小数则补齐小数
 * 没有则补齐整数的
 * eg: 86.22345 => 86.22345
 * eg: 8.2 => 8.20
 * eg: 8 => 08
 * @param {Number} len 要补齐小数到几位
 */
export const decimalPlaces = (num, len = 2) => {
  let inter = String(num).split('.')[0]
  let decimal = String(num).split('.')[1]
  let numLength = String(num).length

  if (decimal) { // 如果有小数,那么给小数进行补齐位数
    numLength = decimal.length
    while (len > numLength) {
      decimal = decimal + '0'
      len--
    }
    num = inter + '.' + decimal
  } else { // 没有小数则给整数补齐位数
    while (len > numLength) {
      num = '0' + num
      len--
    }
  }
  return num
}

/**
 * 数字转化为分秒格式
 * eg: 86.22345 => 1:26
 * eg: 12 => 0:12
 * @param {Number || String} num 
 */
export const changeTimer = num => {
  let minute = parseInt(num / 60)
  let second = decimalPlaces(parseInt(num % 60))
  return minute + ':' + second
}