const dateUtil = {
  /**
   * 指定日期是星期几，返回 1,2,3,4,5,6,7 分别代表星期一，星期二...
   * @param date Date
   * @returns {number}
   */
  theDayOfWeek: function (date) {
    const theDay = date.getDay()
    return theDay === 0 ? 7 : theDay
  },
  /**
   * 指定日期所在周的起始日期，及截止日期
   * @param date
   * @returns {{startDate: *|Date, endDate: *|Date}}
   */
  currentWeek: function (date) {
    const theDay = dateUtil.theDayOfWeek(date)
    const startDate = dateUtil.beforeDate(date, theDay - 1)
    const endDate = dateUtil.nextDate(date, 7 - theDay)

    return {
      'startDate': startDate,
      'endDate' : endDate
    }
  },
  /**
   * 给定日期在指定天数后的日期
   * @param date 指定日期
   * @param num 指定天数
   * @returns Date
   */
  nextDate: function (date, num) {
    const tempDate = new Date(date)
    tempDate.setDate(date.getDate() + num)

    return tempDate;
  },
  /**
   * 给定日期在指定天数前的日期
   * @param date 指定日期
   * @param num 指定天数
   * @returns Date
   */
  beforeDate: function (date, num) {
    const tempDate = new Date(date)
    tempDate.setDate(date.getDate() - num)

    return tempDate;
  }
}

export default dateUtil
