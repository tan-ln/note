/**
 * 动态规划
 * 求 最长递增子序列
 * 
 *       [10, 9, 2, 5, 3, 7, 101, 18]
 *  dp = [1， 1， 1，1，1，1，  1 ， 1] 初始
 *  遍历每一个数字，与前面的数字比较
 *  如果有小于它的
 *  就把它的 dp[i] 设置为前面比它小的中最大的 dp[i] + 1
 *      [10, 9, 2, 5, 3, 7, 101, 18]
 *      [1,  1, 1, 2, 2, 3,  4,   4]
 */

const num = [10, 9, 2, 5, 3, 7, 101, 18]

const LIS = () => {
  const dp = new Array(num.length).fill(1)

  for (let i = 0; i < num.length; i++) {
    // j 只需要小于 i，因为每一个数字只要跟前面的比较
    for (let j = 0; j < i; j++) {
      if (num[i] > num[j]) {
        // 当前下标的值 dp[i] 为比他小的 dp[i] 中的最大值 + 1
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

console.log(LIS()) // 4
