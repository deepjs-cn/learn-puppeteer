

/**
 * 递归方法实现斐波那契数列
 *
 * @param {number} n
 * @returns
 */
function recurse(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return recurse(n - 1) + recurse(n - 2)
}

export default recurse
