
/**
 * 迭代方式来实现斐波那契数列
 *
 * @param {number} n
 * @returns
 */
function iter(n) {
  let current = 0
  let next = 1
  /* eslint no-plusplus: 0 */
  for (let i = 0; i < n; i++) {
    const swap = current
    current = next
    next = swap + next
  }
  return current
}

export default iter
