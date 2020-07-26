/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
    const arr = [];
    const visited = [];
    for(let i=0;i<m;i++){
        const currVisited = [];
        for(let j=0;j<n;j++){
            currVisited.push(0);
        }
        visited.push(currVisited);
    }
    let res = 0;
    const bfs = function(){
        const queue = [];
        queue.push([0,0]);
        while(queue.length!==0){
            let curr = queue.shift();
            let i = curr[0],j = curr[1];
            if(i>=m || j>=n || i<0 || j<0 || count(i,j)>k || visited[i][j]==1) continue;
            visited[i][j] = 1;
            res = res+1;
            queue.push([i+1,j]);
            queue.push([i,j+1]);
        }
    }
    const count = function(a,b){
        let sum = 0;
        while(a!==0){
            sum = sum+a%10;
            a = Math.floor(a/10);
        }
        while(b!==0){
            sum = sum+b%10;
            b = Math.floor(b/10);
        }
        return sum;
    }
    bfs();
    return res;
};