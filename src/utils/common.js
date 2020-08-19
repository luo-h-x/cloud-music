const utils = {
  // 123456 => 12万
  countToString(val) {
    val = val + ''
    return val.length > 3 ? val.replace(/(\d+)(\d){4}/g, '$1万') : val
  },
  // 时间戳 => 年-月-日
  formatDate(data, t) {
    return t
      ? new Date(data).toLocaleString()
      : new Date(data).toLocaleDateString().replace(/\//g, '-')
  },
  // 时间戳 => 分:秒
  formatDay(data) {
    let min = parseInt(data / 60000)
    let s = parseInt((data / 1000) % 60)
    if (min < 10) {
      min = '0' + min.toString()
    } else {
      min = min.toString()
    }
    if (s < 10) {
      s = '0' + s.toString()
    } else {
      s = s.toString()
    }
    return `${min}:${s}`
  },
  // 防抖
  debounce(fn, delay) {
    let timer
    return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}

export default utils
