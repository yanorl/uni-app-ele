export function debounce (func, delay) {
  let timer
  return function (...args) {
    // console.log(args)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}