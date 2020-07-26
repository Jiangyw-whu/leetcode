/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length===0) return 0;
    let minStack = prices[0];
    const len = prices.length;
    const dp = new Array(len).fill(0);
    for(let i=1;i<len;i++){
        minStack = Math.min(minStack,prices[i]);
        dp[i] = Math.max(dp[i-1],prices[i]-minStack);
    }
    return dp[len-1];

};