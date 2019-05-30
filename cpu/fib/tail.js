

/**
 * 尾递归优化实现斐波那契数列
 *
 * @param {number} n
 * @returns
 */
function tail(n) {
  return fib(n, 0, 1)
}

/**
 * 尾递归优化
 *
 * @param {number} n
 * @param {number} current
 * @param {number} next
 * @returns
 */
function fib(n, current, next) {
  if (n === 0) return current
  return fib(n - 1, next, current + next)
}

export default tail
