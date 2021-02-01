
var permute = function(nums) {
    var res = [];
    var visited = Array(nums.length).fill(false);
    var temp = [];
    const dfs = function(depth) {
        if (depth === nums.length) {
            res.push(temp.slice());
            return;
        }
 
        for (let i = 0; i < nums.length; i++) {
            if (!visited[i]) {
                temp.push(nums[i]);
                visited[i] = true;
                dfs(depth + 1);
 
                temp.pop(); // 回溯
                visited[i] = false;
            }
        }
    }
    dfs(0);
    return res;
};