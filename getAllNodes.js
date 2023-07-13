const findAllNodes = (node, nodes = []) => {
  nodes.push(node)
  const children = node.childrenNodes
  for (let i = 0; i < children.length; i++) {
    findAllNodes(children[i], nodes)
  }
  return nodes
}
const allNodes = findAllNodes(document.documentElement)
