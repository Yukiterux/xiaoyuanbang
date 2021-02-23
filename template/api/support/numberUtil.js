export function handleNumber(num, len, unit) {
  if (num === undefined || num === null) {
    return {number: 0, unit: unit}
  }
  let numLen = num.toString().length
  if (len > 4) {
    len = 5
  } else if (len <= 4) {
    len = 4
  }
  if (numLen > len && num > 10 * len) {
    let result = {number: num, unit: unit}
    if (numLen <= 8) {
      result.number = (num / 10000).toFixed(8 - numLen)
      result.unit = '万' + unit
    } else if (numLen <= 11) {
      result.number = (num / 10000).toFixed(11 - numLen)
      result.unit = '千万' + unit
    } else if (numLen <= 12) {
      result.number = (num / 10000).toFixed(12 - numLen)
      result.unit = '亿' + unit
    } else if (numLen <= 16) {
      result.number = (num / 10000).toFixed(16 - numLen)
      result.unit = '万亿' + unit
    }
    return result
  } else {
    return {number: num, unit: unit}
  }
}

// sDate1和sDate2是2017-9-25格式
export function dateDiff(sDate1, sDate2) {
  let aDate, oDate1, oDate2, iDays
  aDate = sDate1.split('-')
  // 转换为9-25-2017格式
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  aDate = sDate2.split('-')
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  // 把相差的毫秒数转换为天数
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  return iDays
}
