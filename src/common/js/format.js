/**
 * 补齐位数
 * 如果有小数则补齐小数
 * 没有则补齐整数的
 * @param {Number} len 要补齐小数到几位
 */
export const decimalPlaces = (num, len = 2) => {
  let inter = String(num).split('.')[0]
  let decimal = String(num).split('.')[1]
  let numLength = String(num.length)

  if (decimal) { // 如果有小数,那么给小数进行补齐位数
    numLength = decimal.length
    while (len > numLength) {
      decimal = '0' + decimal
      len--
    }
    num = inter + '.' + decimal
  } else { // 没有小数则给整数补齐位数
    while (len > numLength) {
      num = '0' + num
      len--
    }
  }
  console.log(num);
  return num
}