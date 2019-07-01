const formatDate = function(nTimestamp) {
  /**
   * 前置补充0
   * @param {Number} num 数值
   * @param {Number} fill 最终长度
   * @return {String} fill为2时 1 => 01
   */
  const preZeroFill = (num, fill = 2) => {
    // 当前数字位数
    const nLen = ('' + num).length
    // 缺少的位数的长度
    const sPreLen = fill > nLen ? fill - nLen : 0
    return (
      Array(sPreLen)
        .fill(0)
        .join('') + num
    )
  }
  const date = new Date(nTimestamp)
  const sYear = date.getFullYear()
  const sMonth = preZeroFill(date.getMonth() + 1)
  const sDay = preZeroFill(date.getDate())
  const sHour = preZeroFill(date.getHours())
  const sMunite = preZeroFill(date.getMinutes())
  const sSecond = preZeroFill(date.getSeconds())
  return `${sYear}-${sMonth}-${sDay} ${sHour}:${sMunite}:${sSecond}`
}

export default { formatDate }
