/**
 * 级联选择器list转树
 * @param data list集合
 * @param idName 主键字段名称
 * @param pidName 父主键字段名称
 * @param valueName 选择器绑定value字段名
 * @param labelName 选择器绑定label字段名
 * @returns {*}
 */
export function buildCascadeValue(data, idName, pidName, valueName, labelName) {
  var treeList = data.slice(0)
  var afun = function(ys, json) {
    if (valueName !== 'value') {
      ys.value = ys[valueName]
    }
    if (labelName !== 'label') {
      ys.label = ys[labelName]
    }

    var len = json.length
    var oo
    while (len > 0) {
      len--
      oo = json[len]
      if (ys[idName] === oo[pidName]) {
        ys.children = ys.children || []
        ys.children.push(oo)
        json.splice(len, 1)
      }
    }
  }
  data.forEach(function(value) {
    afun(value, treeList)
  })
  if (treeList.length > 0 && treeList[0].children) {
    return treeList[0].children
  } else {
    return []
  }
}

export function _buildCascadeValue(data, idName, pidName, valueName, labelName) {
  var treeList = data.slice(0)
  var afun = function(ys, json) {
    ys.value = ys[valueName]
    ys.label = ys[labelName]
    var len = json.length
    var oo
    while (len > 0) {
      len--
      oo = json[len]
      if (ys[idName] === oo[pidName]) {
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

/**
 * 级联选择器list回显
 * @param tree 树形集合
 * @param id 主键值
 * @param pidName 父主键字段名称
 * @returns {*[]}
 */
export function getParentTreeNode(tree, id, pidName) {
  let parentNode = null
  let node = null
  const parm = []
  parm.push(id)
  getModeId(id)
  function getModeId(obj) {
    parentNode = null
    node = null
    const nodes = getNode(tree, obj).node
    if (nodes == null || nodes[pidName] === '0') {
      return null
    } else {
      const par = nodes[pidName]
      parm.push(par)
      getModeId(par)
    }
  }
  function getNode(json, nodeId) {
    // 1.第一层 root 深度遍历整个JSON
    for (let i = 0; i < json.length; i++) {
      if (node) {
        break
      }
      const obj = json[i]
      // 没有就下一个
      if (!obj || !obj.value) {
        continue
      }
      // 2.有节点就开始找，一直递归下去
      if (obj.value === nodeId) {
        // 找到了与nodeId匹配的节点，结束递归
        node = obj
        break
      } else {
        // 3.如果有子节点就开始找
        if (obj.children) {
          // 4.递归前，记录当前节点，作为parent 父亲
          parentNode = obj
          // 递归往下找
          getNode(obj.children, nodeId)
        } else {
          // 跳出当前递归，返回上层递归
          continue
        }
      }
    }
    // 5.如果木有找到父节点，置为null，因为没有父亲
    if (!node) {
      parentNode = null
    }
    // 6.返回结果obj
    return {
      parentNode: parentNode,
      node: node
    }
  }

  return parm.reverse()
}

/**
 * 获取选中分类信息
 * @param tree 树形集合
 * @param id 主键值
 * @returns {*}
 */
export function getNodeSelf(tree, id) {
  let parentNode = null
  let node = null
  getNode(tree, id)
  function getNode(json, nodeId) {
    // 1.第一层 root 深度遍历整个JSON
    for (let i = 0; i < json.length; i++) {
      if (node) {
        break
      }
      const obj = json[i]
      // 没有就下一个
      if (!obj || !obj.value) {
        continue
      }
      // 2.有节点就开始找，一直递归下去
      if (obj.value === nodeId) {
        // 找到了与nodeId匹配的节点，结束递归
        node = obj
        break
      } else {
        // 3.如果有子节点就开始找
        if (obj.children) {
          // 4.递归前，记录当前节点，作为parent 父亲
          parentNode = obj
          // 递归往下找
          getNode(obj.children, nodeId)
        } else {
          // 跳出当前递归，返回上层递归
          continue
        }
      }
    }
    // 5.如果木有找到父节点，置为null，因为没有父亲
    if (!node) {
      parentNode = null
    }
    // 6.返回结果obj
    return {
      parentNode: parentNode,
      node: node
    }
  }
  return node
}

/**
 * 级联选择器选择count级至maxNum级有效选择
 * @param tree 树形集合
 * @param count count级
 * @param maxNum maxNum级
 */
export function setDisable(tree, count, maxNum) {
  if (count > maxNum) { // 最多几级就写几
    tree.forEach(v => {
      v.disabled = true // 超过设定的最大级数,给这一集的数据添加disabled属性
    })
  } else {
    tree.forEach(v => {
      v.count = count // 设置最外层数据的初始count
      if (v.children && v.children.length) {
        v.count++
        this.setDisable(v.count, v.children, maxNum) // 子级循环时把这一层数据的count传入
      }
    })
  }
}
