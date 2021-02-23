// 线性结构转树结构
export function buildTree(data, id, pid) {
  var treeList = data.slice(0)
  var afun = function(ys, json) {
    var len = json.length
    var oo
    while (len > 0) {
      len--
      oo = json[len]
      if (ys[id] === oo[pid]) {
        ys.children = ys.children || []
        ys.children.push(oo)
        json.splice(len, 1)
      }
    }
  }
  data.forEach(function(value) {
    afun(value, treeList)
  })
  return treeList
}

// 树结构转线性结构
export function treeConvertList(root) {
  const list = []
  if (root) {
    const Root = JSON.parse(JSON.stringify(root[0]))
    const queue = []
    queue.push(Root)
    while (queue.length) {
      const node = queue.shift()
      if (node.children && node.children.length) {
        queue.push(...node.children)
      }
      delete node.children
      if (node.parentCategoryId !== null && node.parentCategoryId !== undefined) {
        list.push(node)
      }
    }
  }
  return list
}
