/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return []
  }
  let res = []
  let stack = [root]
  let level = 0
  while (!!stack.length) {
    const currLen = stack.length
    for (let i = 0; i < currLen; i++) {
      const currNode = stack.shift()
      if (!!currNode.left) {
        stack.push(currNode.left)
      }
      if (!!currNode.right) {
        stack.push(currNode.right)
      }
      if (res?.[level]?.length) {
        res?.[level]?.push(currNode.val)
      } else {
        res[level] = [currNode.val]
      }
    }
    level++
  }
  return res
}
