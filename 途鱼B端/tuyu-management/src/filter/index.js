const fromDate = date => {
  if (date) {
    let Dates = new Date(date * 1000)
    let Y = Dates.getFullYear()
    let M = Dates.getMonth() + 1
    let D = Dates.getDate()

    let h = Dates.getHours()
    let m = Dates.getMinutes()
    let s = Dates.getSeconds()
    
    if (M < 10) M = '0' + M
    if (D < 10) D = '0' + D
    if (h < 10) h = '0' + h
    if (m < 10) m = '0' + m
    if (s < 10) h = '0' + s

    return `${Y}-${M}-${D} ${h}:${m}:${s}`


  } else {
    return
  }
}

export { fromDate }